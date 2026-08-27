'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function isAnalyticsReady() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

function getLocationFromPath(pathname) {
  if (!pathname || pathname === '/') return 'home';
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment || 'home';
}

function trackEvent(eventName, params = {}) {
  if (!isAnalyticsReady()) return;
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : undefined;

  const payload = {
    ...(params && typeof params === 'object' ? params : {})
  };

  if (pagePath && payload.page_path == null) {
    payload.page_path = pagePath;
  }

  window.gtag('event', eventName, payload);
}

/*
 * Vista de página. En App Router el `config` de gtag corre una sola vez, así
 * que las navegaciones internas hay que reportarlas a mano (lo hace
 * PageviewTracker). Por eso el layout arranca con `send_page_view: false`:
 * la primera vista también sale de acá y no se duplica.
 */
export function trackPageView({ pagePath, pageTitle } = {}) {
  if (isAnalyticsReady()) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: typeof window !== 'undefined' ? window.location.href : undefined
    });
  }

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

export function trackPhoneClick({ location } = {}) {
  trackEvent('phone_click', { link_location: location });
}

export function trackEmailClick({ location } = {}) {
  trackEvent('email_click', { link_location: location });
}

/* Apertura del popup "+ info" de una tarjeta de soluciones: es el mejor
   indicador de qué producto está mirando cada visitante. */
export function trackSolutionInfo({ solution, vertical } = {}) {
  trackEvent('solution_info_open', {
    solution_name: solution,
    vertical
  });
}

/* Avance del cotizador paso a paso, para ver dónde abandona la gente. */
export function trackQuoteStep({ stepIndex, stepKey, variant } = {}) {
  trackEvent('quote_step', {
    step_index: stepIndex,
    step_key: stepKey,
    form_variant: variant
  });
}

export function trackWhatsAppClick({ location, label = 'whatsapp' } = {}) {
  trackEvent('whatsapp_click', {
    link_location: location,
    link_text: label
  });
}

export function trackFormStart({ formName, variant } = {}) {
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : undefined;
  trackEvent('form_start', {
    form_name: formName,
    form_variant: variant,
    form_location: getLocationFromPath(pagePath)
  });
}

export function trackFormSubmit({ formName, variant, status = 'success' } = {}) {
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : undefined;
  trackEvent('form_submit', {
    form_name: formName,
    form_variant: variant,
    form_status: status,
    form_location: getLocationFromPath(pagePath)
  });

  if (status === 'success') {
    trackEvent('generate_lead', {
      currency: 'ARS',
      value: 1,
      form_name: formName,
      form_variant: variant,
      form_location: getLocationFromPath(pagePath)
    });
  }
}

export function useTrackSectionView(sectionName, options = {}) {
  const { enabled = true, threshold = 0.35 } = options;
  const pathname = usePathname();
  const sectionRef = useRef(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !sectionRef.current || hasTrackedRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasTrackedRef.current) return;

        hasTrackedRef.current = true;
        trackEvent('section_view', {
          section_name: sectionName,
          page_path: pathname
        });
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [enabled, pathname, sectionName, threshold]);

  return sectionRef;
}
