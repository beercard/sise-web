'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './HeroCarousel.module.scss';

/*
 * Cada slide usa las mismas fotos que el hero de su página de negocio, ya
 * exportadas al tamaño final (desktop 1920, mobile 804 @2x), así que van
 * directo sin el optimizador de Next (que en dev se cuelga con estos webp).
 */
const HERO_SLIDES = [
  { id: 'hogar', desktopImage: '/image/hero-hogar-casa-desktop.webp', mobileImage: '/image/hero-hogar-casa-mobile.webp' },
  { id: 'comercio', desktopImage: '/image/hero-comercio-local-desktop.webp', mobileImage: '/image/hero-comercio-local-mobile.webp' },
  { id: 'industria', desktopImage: '/image/hero-industria-planta-desktop.webp', mobileImage: '/image/hero-industria-planta-mobile.webp' },
  { id: 'edificios', desktopImage: '/image/hero-edificios-torre-desktop.webp', mobileImage: '/image/hero-edificios-torre-mobile.webp' },
  { id: 'construccion', desktopImage: '/image/hero-construccion-obra-desktop.webp', mobileImage: '/image/hero-construccion-obra-mobile.webp' },
  { id: 'agro', desktopImage: '/image/hero-agro-campo-desktop.webp', mobileImage: '/image/hero-agro-campo-mobile.webp' },
  { id: 'ciudad', desktopImage: '/image/hero-ciudad-poste-desktop.webp', mobileImage: '/image/hero-ciudad-poste-mobile.webp' }
].map((slide) => ({
  ...slide,
  id: `hero-slide-${slide.id}`,
  titleLineOne: 'Soluciones en seguridad electrónica',
  titleBold: 'accesible, moderna y humana',
  titleRegularEnd: '.'
}));

const AUTOPLAY_DELAY = 5000;
const TRANSITION_MS = 720;

export default function HeroCarousel() {
  const slides = useMemo(() => HERO_SLIDES, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add(styles.heroReady);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const setSlide = useCallback((nextIndex) => {
    if (nextIndex === activeIndex) return;
    if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimeoutRef.current = null;
    }, TRANSITION_MS);
  }, [activeIndex]);

  const advanceSlide = () => {
    if (slides.length <= 1) return;
    setSlide((activeIndex + 1) % slides.length);
  };

  const goToSlide = (event, index) => {
    event.stopPropagation();
    setSlide(index);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncReducedMotionPreference();
    mediaQuery.addEventListener('change', syncReducedMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', syncReducedMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || isAutoplayPaused || prefersReducedMotion) return undefined;

    const intervalId = window.setInterval(() => {
      setSlide((activeIndex + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isAutoplayPaused, prefersReducedMotion, setSlide, slides.length]);

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];
    if (!nextSlide) return undefined;

    const preload = () => {
      const desktopPreload = new Image();
      desktopPreload.decoding = 'async';
      desktopPreload.src = nextSlide.desktopImage;

      const mobilePreload = new Image();
      mobilePreload.decoding = 'async';
      mobilePreload.src = nextSlide.mobileImage;
    };

    if (typeof window === 'undefined') return undefined;

    if (window.requestIdleCallback) {
      const idleId = window.requestIdleCallback(preload, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(preload, 900);
    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, slides]);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-label="Hero principal"
      onClick={advanceSlide}
      onMouseEnter={() => setIsAutoplayPaused(true)}
      onMouseLeave={() => setIsAutoplayPaused(false)}
      onFocusCapture={() => setIsAutoplayPaused(true)}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setIsAutoplayPaused(false);
      }}
    >
      <div className={styles.heroViewport}>
        {slides.map((slide, index) => {
          const TitleTag = index === activeIndex ? 'h1' : 'p';
          const shouldRenderMedia = index === activeIndex || index === previousIndex;
          const isPriority = index === 0 && activeIndex === 0;

          return (
            <article
              key={slide.id}
              className={`${styles.heroSlide} ${index === activeIndex ? styles.heroSlideActive : ''}`}
              aria-hidden={index !== activeIndex}
            >
              {shouldRenderMedia ? (
                <picture className={styles.heroMedia}>
                  <source srcSet={slide.mobileImage} media="(max-width: 960px)" />
                  <img
                    className={styles.heroImage}
                    src={slide.desktopImage}
                    alt=""
                    decoding="async"
                    loading={isPriority ? 'eager' : 'lazy'}
                    fetchPriority={isPriority ? 'high' : 'auto'}
                  />
                </picture>
              ) : (
                <div className={styles.heroMedia} aria-hidden="true" />
              )}
              <div className={styles.heroContent}>
                <TitleTag className={styles.heroTitle}>
                  <span className={styles.heroTitleLine}>
                    <span className={styles.heroTitleRegular}>
                      {slide.titleLineOne}{' '}
                    </span>
                  </span>
                  <span className={styles.heroTitleLine}>
                    <span className={styles.heroTitleBold}>{slide.titleBold}</span>
                    <span className={styles.heroTitleRegular}>{slide.titleRegularEnd}</span>
                  </span>
                </TitleTag>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.heroDots} aria-label="Navegación del hero">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`${styles.heroDot} ${index === activeIndex ? styles.heroDotActive : ''}`}
            aria-label={`Ir al slide ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={(event) => goToSlide(event, index)}
          />
        ))}
      </div>
    </section>
  );
}
