'use client';

import { useEffect, useMemo, useState } from 'react';

import styles from './HeroCarousel.module.scss';

const HERO_SLIDES = Array.from({ length: 7 }, (_, index) => ({
  id: `hero-slide-${index + 1}`,
  desktopImage: '/image/home-hero-desktop.webp',
  mobileImage: '/image/home-hero-mobile.webp',
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
