'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import styles from './HomePillarsCarousel.module.scss';

const pillars = [
  {
    title: 'Soluciones a tu medida',
    mobileTitle: (
      <>
        Soluciones a
        <br />
        tu medida
      </>
    ),
    icon: '/image/pillar-soluciones.svg',
    mobileIcon: '/image/pillar-soluciones-mobile.svg',
    iconWidth: 60,
    iconHeight: 56,
    mobileIconWidth: 44,
    mobileIconHeight: 41,
    bodyWidth: 477,
    titleWidth: 438,
    previewBodyWidth: 389,
    previewTitleWidth: 351,
    mobileBodyWidth: 156,
    mobileTitleWidth: 168,
    paddingX: 47,
    paddingTop: 43,
    paddingBottom: 29,
    titleGap: 14,
    textGap: 13,
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
    mobileTitle: 'Soporte técnico local',
    icon: '/image/pillar-soporte.svg',
    mobileIcon: '/image/pillar-soporte-mobile.svg',
    iconWidth: 38,
    iconHeight: 54,
    mobileIconWidth: 28,
    mobileIconHeight: 40,
    bodyWidth: 518,
    titleWidth: 438,
    previewBodyWidth: 416,
    previewTitleWidth: 352,
    mobileBodyWidth: 149,
    mobileTitleWidth: 168,
    paddingX: 26,
    paddingTop: 44,
    paddingBottom: 29,
    titleGap: 15,
    textGap: 13,
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
    mobileTitle: (
      <>
        Prevención como
        <br />
        prioridad
      </>
    ),
    icon: '/image/pillar-prevencion.svg',
    mobileIcon: '/image/pillar-prevencion-mobile.svg',
    iconWidth: 59,
    iconHeight: 56,
    mobileIconWidth: 47,
    mobileIconHeight: 41,
    bodyWidth: 485,
    titleWidth: 438,
    previewBodyWidth: 389,
    previewTitleWidth: 351,
    mobileBodyWidth: 156,
    mobileTitleWidth: 168,
    paddingX: 47,
    paddingTop: 43,
    paddingBottom: 29,
    titleGap: 14,
    textGap: 13,
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

function getCardStyle(pillar, preview = false) {
  return {
    '--body-width': `${preview ? pillar.previewBodyWidth : pillar.bodyWidth}px`,
    '--title-width': `${preview ? pillar.previewTitleWidth : pillar.titleWidth}px`,
    '--icon-width': `${pillar.iconWidth}px`,
    '--icon-height': `${pillar.iconHeight}px`,
    '--mobile-body-width': `${pillar.mobileBodyWidth ?? pillar.bodyWidth}px`,
    '--mobile-title-width': `${pillar.mobileTitleWidth ?? pillar.titleWidth}px`,
    '--mobile-icon-width': `${pillar.mobileIconWidth ?? pillar.iconWidth}px`,
    '--mobile-icon-height': `${pillar.mobileIconHeight ?? pillar.iconHeight}px`,
    '--card-pad-x': `${pillar.paddingX}px`,
    '--card-pad-top': `${pillar.paddingTop}px`,
    '--card-pad-bottom': `${pillar.paddingBottom}px`,
    '--title-gap': `${pillar.titleGap}px`,
    '--text-gap': `${pillar.textGap}px`
  };
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
            style={getCardStyle(visibleItems.previous, true)}
          >
            <div className={styles.cardIcon}>
              <Image
                src={visibleItems.previous.icon}
                alt=""
                width={visibleItems.previous.iconWidth}
                height={visibleItems.previous.iconHeight}
                className={`${styles.cardIconImage} ${styles.cardIconDesktop}`}
              />
              <Image
                src={visibleItems.previous.mobileIcon}
                alt=""
                width={visibleItems.previous.mobileIconWidth}
                height={visibleItems.previous.mobileIconHeight}
                className={`${styles.cardIconImage} ${styles.cardIconMobile}`}
              />
            </div>
            <h3 className={styles.cardTitle}>
              <span className={styles.cardTitleDesktop}>{visibleItems.previous.title}</span>
              <span className={styles.cardTitleMobile}>{visibleItems.previous.mobileTitle}</span>
            </h3>
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
            style={getCardStyle(visibleItems.active)}
          >
            <div className={styles.cardIcon}>
              <Image
                src={visibleItems.active.icon}
                alt=""
                width={visibleItems.active.iconWidth}
                height={visibleItems.active.iconHeight}
                className={`${styles.cardIconImage} ${styles.cardIconDesktop}`}
              />
              <Image
                src={visibleItems.active.mobileIcon}
                alt=""
                width={visibleItems.active.mobileIconWidth}
                height={visibleItems.active.mobileIconHeight}
                className={`${styles.cardIconImage} ${styles.cardIconMobile}`}
              />
            </div>
            <h3 className={styles.cardTitle}>
              <span className={styles.cardTitleDesktop}>{visibleItems.active.title}</span>
              <span className={styles.cardTitleMobile}>{visibleItems.active.mobileTitle}</span>
            </h3>
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
            style={getCardStyle(visibleItems.next, true)}
          >
            <div className={styles.cardIcon}>
              <Image
                src={visibleItems.next.icon}
                alt=""
                width={visibleItems.next.iconWidth}
                height={visibleItems.next.iconHeight}
                className={`${styles.cardIconImage} ${styles.cardIconDesktop}`}
              />
              <Image
                src={visibleItems.next.mobileIcon}
                alt=""
                width={visibleItems.next.mobileIconWidth}
                height={visibleItems.next.mobileIconHeight}
                className={`${styles.cardIconImage} ${styles.cardIconMobile}`}
              />
            </div>
            <h3 className={styles.cardTitle}>
              <span className={styles.cardTitleDesktop}>{visibleItems.next.title}</span>
              <span className={styles.cardTitleMobile}>{visibleItems.next.mobileTitle}</span>
            </h3>
            <p className={styles.cardText}>{visibleItems.next.text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
