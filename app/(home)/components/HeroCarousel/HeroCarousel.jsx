'use client';

import { useEffect, useMemo, useState } from 'react';

import styles from './HeroCarousel.module.scss';

/*
 * Un slide por vertical, con el mismo par de fotos que usa el hero de cada
 * página de negocio: la de escritorio arriba de 960px y la vertical debajo,
 * que es donde el módulo cambia de variable (ver HeroCarousel.module.scss).
 * Hogar comparte las dos con el home, de ahí que repita los nombres.
 */
const HERO_SLIDES = [
  { id: 'hogar', desktopImage: '/image/hero-hogar-desktop.webp', mobileImage: '/image/home-hero-mobile.webp' },
  { id: 'comercio', desktopImage: '/image/mpvuunzj-eolvy7n.webp', mobileImage: '/image/hero-comercio-mobile.webp' },
  { id: 'industria', desktopImage: '/image/hero-industria-desktop.webp', mobileImage: '/image/hero-industria-mobile.webp' },
  { id: 'edificios', desktopImage: '/image/hero-edificios-desktop.webp', mobileImage: '/image/hero-edificios-mobile.webp' },
  { id: 'construccion', desktopImage: '/image/mq11fkmb-be8tqg4.webp', mobileImage: '/image/hero-construccion-mobile.webp' },
  { id: 'agro', desktopImage: '/image/mq1fh69q-uknmp86.webp', mobileImage: '/image/hero-agro-mobile.webp' },
  { id: 'ciudad', desktopImage: '/image/mq1jm0cy-0248t30.webp', mobileImage: '/image/hero-ciudad-mobile.webp' }
].map((slide) => ({
  ...slide,
  id: `hero-slide-${slide.id}`,
  titleLineOne: 'Soluciones en seguridad electrónica',
  titleBold: 'accesible, moderna y humana',
  titleRegularEnd: '.'
}));

const AUTOPLAY_DELAY = 5000;

export default function HeroCarousel() {
  const slides = useMemo(() => HERO_SLIDES, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [isAutoplayPaused, prefersReducedMotion, slides.length]);

  return (
    <section
      className={styles.hero}
      aria-label="Hero principal"
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

          return (
            <article
              key={slide.id}
              className={`${styles.heroSlide} ${index === activeIndex ? styles.heroSlideActive : ''}`}
              aria-hidden={index !== activeIndex}
            >
              <div
                className={styles.heroMedia}
                style={{
                  '--hero-desktop-image': `url('${slide.desktopImage}')`,
                  '--hero-mobile-image': `url('${slide.mobileImage}')`
                }}
                aria-hidden="true"
              />
              <div className={styles.heroGradient} aria-hidden="true" />

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
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
