'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import styles from './HeroCarousel.module.scss';

const defaultSlides = [
  { src: '/image/mpr027zv-tyj9vj2.webp', alt: '' },
  { src: '/image/mpr027zv-tyj9vj2.webp', alt: '' },
  { src: '/image/mpr027zv-tyj9vj2.webp', alt: '' }
];

export default function HeroCarousel({ slides = defaultSlides, intervalMs = 5500 }) {
  const safeSlides = useMemo(() => (slides?.length ? slides : defaultSlides), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || safeSlides.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % safeSlides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, safeSlides.length]);

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {safeSlides.map((slide, index) => (
            <div key={`${slide.src}-${index}`} className={styles.slide}>
              <Image
                src={slide.src}
                alt={slide.alt}
                className={styles.heroImage}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.heroGradient} aria-hidden="true" />

      <h1 className={styles.heroTitle}>
        <span className={styles.heroTitleRegular}>Soluciones en seguridad electrónica&nbsp;</span>
        <br className={styles.heroBreak} />
        <span className={styles.heroTitleBold}>accesible, moderna y humana</span>
        <span className={styles.heroTitleRegular}>.</span>
      </h1>

      <div className={styles.dots} role="group" aria-label="Cambiar slide">
        {safeSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
