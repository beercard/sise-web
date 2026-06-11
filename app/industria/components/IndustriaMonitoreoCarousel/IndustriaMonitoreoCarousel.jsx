'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import { useAutoplay, useSlideTransition } from '../../../lib/hooks';

import styles from '../../page.module.scss';

const AUTOPLAY_MS = 6000;

export default function IndustriaMonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'alarmas',
        title: 'Monitoreo de alarmas',
        body: 'Protección integral de instalaciones con respuesta inmediata ante eventos.',
        padding: { top: 73, right: 54, bottom: 80, left: 54 },
        contentWidth: 334,
        arrows: { left: '/image/mq017wmw-gpicuyk.png', right: '/image/mq017wmx-rtpg205.png' }
      },
      {
        key: 'cctv',
        title: 'CCTV / Videovigilancia',
        body: 'Supervisión de procesos productivos, perímetros y áreas sensibles.',
        padding: { top: 78, right: 54, bottom: 79, left: 53 },
        contentWidth: 335,
        arrows: { left: '/image/mq020o1k-9j6uzy1.png', right: '/image/mq020o1k-gt0s1r7.png' }
      },
      {
        key: 'cerco',
        title: 'Cerco eléctrico',
        body: 'Defensa perimetral activa para prevenir intrusiones.',
        padding: { top: 78, right: 76, bottom: 79, left: 75 },
        contentWidth: 291,
        arrows: { left: '/image/mq020o1r-agxaozr.png', right: '/image/mq020o1r-ae9x4z6.png' }
      },
      {
        key: 'accesos',
        title: 'Control de accesos',
        body: 'Gestión de ingresos por niveles de autorización, mejorando el control interno.',
        padding: { top: 78, right: 34, bottom: 79, left: 33 },
        contentWidth: 375,
        arrows: { left: '/image/mq020o54-u0whe1a.png', right: '/image/mq020o54-cof80g4.png' }
      },
      {
        key: 'gps',
        title: 'GPS corporativo',
        body: 'Monitoreo de flota en tiempo real para optimizar operaciones y reducir riesgos.',
        padding: { top: 78, right: 56, bottom: 79, left: 56 },
        contentWidth: 330,
        arrows: { left: '/image/mq020o58-rh90vaj.png', right: '/image/mq020o59-s359km1.png' }
      }
    ],
    []
  );

  const [isPaused, setIsPaused] = useState(false);

  const { activeIndex, previousIndex, direction, goPrev, goNext } = useSlideTransition({
    length: slides.length
  });

  useAutoplay({ paused: isPaused, length: slides.length, intervalMs: AUTOPLAY_MS, advance: goNext });

  const activeSlide = slides[activeIndex];
  const previousSlide = previousIndex === null ? null : slides[previousIndex];

  const renderSlide = (slide) => (
    <>
      <p className={styles.heroCardTitle}>{slide.title}</p>
      <p className={styles.heroCardText}>{slide.body}</p>
    </>
  );

  return (
    <div
      className={styles.heroCard}
      aria-label="Carrusel de servicios"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowLeft}`} aria-label="Anterior" onClick={goPrev}>
        <Image src={activeSlide.arrows.left} alt="" width={30} height={18} />
      </button>

      <div className={styles.heroCardStage} aria-live="polite">
        {previousSlide ? (
          <div
            className={`${styles.heroCardBox} ${direction === 'next' ? styles.heroCardExitLeft : styles.heroCardExitRight}`}
            style={{
              '--hero-card-content-width': `${previousSlide.contentWidth}px`,
              '--hero-card-pad-top': `${previousSlide.padding.top}px`,
              '--hero-card-pad-right': `${previousSlide.padding.right}px`,
              '--hero-card-pad-bottom': `${previousSlide.padding.bottom}px`,
              '--hero-card-pad-left': `${previousSlide.padding.left}px`
            }}
          >
            {renderSlide(previousSlide)}
          </div>
        ) : null}

        <div
          className={`${styles.heroCardBox} ${
            previousSlide ? (direction === 'next' ? styles.heroCardEnterRight : styles.heroCardEnterLeft) : ''
          }`}
          style={{
            '--hero-card-content-width': `${activeSlide.contentWidth}px`,
            '--hero-card-pad-top': `${activeSlide.padding.top}px`,
            '--hero-card-pad-right': `${activeSlide.padding.right}px`,
            '--hero-card-pad-bottom': `${activeSlide.padding.bottom}px`,
            '--hero-card-pad-left': `${activeSlide.padding.left}px`
          }}
        >
          {renderSlide(activeSlide)}
        </div>
      </div>

      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowRight}`} aria-label="Siguiente" onClick={goNext}>
        <Image src={activeSlide.arrows.right} alt="" width={30} height={17} />
      </button>
    </div>
  );
}
