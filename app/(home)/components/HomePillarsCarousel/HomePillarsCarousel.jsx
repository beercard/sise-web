'use client';

import { useEffect, useMemo, useState } from 'react';

import styles from './HomePillarsCarousel.module.scss';

const pillars = [
  {
    title: 'Soluciones a tu medida',
    bodyWidth: 477,
    titleWidth: 438,
    previewBodyWidth: 389,
    previewTitleWidth: 351,
    text: (
      <>
        <span className={styles.textRegular}>Armamos la </span>
        <span className={styles.textStrong}>configuración exacta</span>
        <span className={styles.textRegular}>
          {' '}
          de seguridad electrónica para hogares, comercios o predios rurales, con{' '}
        </span>
        <span className={styles.textStrong}>proyectos específicos</span>
        <span className={styles.textRegular}> que se adaptan a tu realidad.</span>
      </>
    )
  },
  {
    title: 'Soporte técnico local',
    bodyWidth: 518,
    titleWidth: 438,
    previewBodyWidth: 416,
    previewTitleWidth: 352,
    text: (
      <>
        <span className={styles.textRegular}>Nuestra base técnica comercial está </span>
        <span className={styles.textStrong}>operativa en Resistencia, Chaco</span>
        <span className={styles.textRegular}>, asegurando un </span>
        <span className={styles.textStrong}>soporte directo y continuo</span>
        <span className={styles.textRegular}>
          .<br />
          Ante una urgencia, nuestro equipo real está en la zona.
        </span>
      </>
    )
  },
  {
    title: 'Prevención como prioridad',
    bodyWidth: 485,
    titleWidth: 438,
    previewBodyWidth: 389,
    previewTitleWidth: 351,
    text: (
      <>
        <span className={styles.textRegular}>
          Nuestra tecnología se anticipa al riesgo. Integramos{' '}
        </span>
        <span className={styles.textStrong}>alarmas monitoreadas y videovigilancia</span>
        <span className={styles.textRegular}> para </span>
        <span className={styles.textStrong}>disuadir y frenar amenazas</span>
        <span className={styles.textRegular}> antes de que ingresen a tu propiedad.</span>
      </>
    )
  }
];

function mod(index, length) {
  return (index + length) % length;
}

export default function HomePillarsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isPaused || pillars.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => mod(current + 1, pillars.length));
    }, 4200);

    return () => window.clearInterval(id);
  }, [isPaused]);

  const visibleItems = useMemo(() => {
    const previousIndex = mod(activeIndex - 1, pillars.length);
    const nextIndex = mod(activeIndex + 1, pillars.length);

    return {
      previous: pillars[previousIndex],
      active: pillars[activeIndex],
      next: pillars[nextIndex]
    };
  }, [activeIndex]);

  return (
    <section
      className={styles.section}
      aria-label="Nuestros pilares"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Pilares</h2>
          <p className={styles.subtitle}>
            El respaldo que necesitás para vivir y trabajar tranquilo.
          </p>
        </div>

        <div className={styles.carousel}>
          <article
            className={`${styles.card} ${styles.previewCard} ${styles.previewLeft}`}
            aria-hidden="true"
            style={{
              '--body-width': `${visibleItems.previous.previewBodyWidth}px`,
              '--title-width': `${visibleItems.previous.previewTitleWidth}px`
            }}
          >
            <h3 className={styles.cardTitle}>{visibleItems.previous.title}</h3>
            <p className={styles.cardText}>{visibleItems.previous.text}</p>
          </article>

          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonPrev}`}
            aria-label="Ver pilar anterior"
            onClick={() => setActiveIndex((current) => mod(current - 1, pillars.length))}
          >
            <span className={styles.arrowLeft} />
          </button>

          <article
            className={`${styles.card} ${styles.activeCard}`}
            style={{
              '--body-width': `${visibleItems.active.bodyWidth}px`,
              '--title-width': `${visibleItems.active.titleWidth}px`
            }}
          >
            <h3 className={styles.cardTitle}>{visibleItems.active.title}</h3>
            <p className={styles.cardText}>{visibleItems.active.text}</p>
          </article>

          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonNext}`}
            aria-label="Ver siguiente pilar"
            onClick={() => setActiveIndex((current) => mod(current + 1, pillars.length))}
          >
            <span className={styles.arrowRight} />
          </button>

          <article
            className={`${styles.card} ${styles.previewCard} ${styles.previewRight}`}
            aria-hidden="true"
            style={{
              '--body-width': `${visibleItems.next.previewBodyWidth}px`,
              '--title-width': `${visibleItems.next.previewTitleWidth}px`
            }}
          >
            <h3 className={styles.cardTitle}>{visibleItems.next.title}</h3>
            <p className={styles.cardText}>{visibleItems.next.text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
