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

export function trackEvent(eventName, params = {}) {
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
