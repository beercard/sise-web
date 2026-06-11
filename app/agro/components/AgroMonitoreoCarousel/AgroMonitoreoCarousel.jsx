'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import { useAutoplay, useSlideTransition } from '../../../lib/hooks';

import styles from '../../page.module.scss';

const AUTOPLAY_MS = 6000;

export default function AgroMonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'cctv-rural',
        title: 'CCTV rural',
        body: 'Vigilancia de accesos, galpones y\nzonas productivas con monitoreo\nremoto en tiempo real.',
        padding: { top: 68, right: 80, bottom: 69, left: 79 },
        contentWidth: 283,
        arrows: { left: '/image/mq1fh69i-yac5qnz.png', right: '/image/mq1fh69i-qi351t5.png' }
      },
      {
        key: 'camara-campo',
        title: 'Cámara Campo',
        body: 'Sistema autónomo con energía solar y conectividad integrada, ideal para\ncampos sin internet ni electricidad.',
        padding: { top: 68, right: 54, bottom: 69, left: 54 },
        contentWidth: 334,
        arrows: { left: '/image/mq1gbhkg-7d8b7o0.png', right: '/image/mq1gbhkg-uvbhez7.png' }
      },
      {
        key: 'alarmas-rurales',
        title: 'Alarmas rurales',
        body: 'Detección de intrusiones en instalaciones\naisladas con alertas inmediatas.',
        padding: { top: 73, right: 54, bottom: 80, left: 54 },
        contentWidth: 334,
        arrows: { left: '/image/mq1gbhkl-hu5w18r.png', right: '/image/mq1gbhkl-ev7215p.png' }
      },
      {
        key: 'gps',
        title: 'GPS para maquinarias\ny vehículos',
        body: 'Seguimiento y control de flota para\noptimizar recursos y prevenir pérdidas.',
        padding: { top: 60, right: 56, bottom: 61, left: 55 },
        contentWidth: 331,
        arrows: { left: '/image/mq1gbhkq-xbb8laj.png', right: '/image/mq1gbhkq-vh5n7wx.png' }
      }
    ],
    []
  );

  const [isPaused, setIsPaused] = useState(false);

  const { activeIndex, previousIndex, direction, goPrev, goNext } = useSlideTransition({
    length: slides.length
  });

  useAutoplay({ paused: isPaused, length: slides.length, intervalMs: AUTOPLAY_MS, advance: goNext });

  const renderCard = (slide, state) => {
    return (
      <div
        key={`${slide.key}-${state}`}
        className={`${styles.heroCard} ${
          state === 'enter'
            ? direction === 'next'
              ? styles.heroCardEnterRight
              : styles.heroCardEnterLeft
            : state === 'exit'
              ? direction === 'next'
                ? styles.heroCardExitLeft
                : styles.heroCardExitRight
              : ''
        }`}
        style={{
          '--hero-card-pad-top': `${slide.padding.top}px`,
          '--hero-card-pad-right': `${slide.padding.right}px`,
          '--hero-card-pad-bottom': `${slide.padding.bottom}px`,
          '--hero-card-pad-left': `${slide.padding.left}px`,
          '--hero-card-content-width': `${slide.contentWidth}px`
        }}
      >
        <div className={styles.heroCardBox}>
          <p className={styles.heroCardTitle}>{slide.title}</p>
          <p className={styles.heroCardText}>{slide.body}</p>
        </div>
      </div>
    );
  };

  const activeSlide = slides[activeIndex];
  const previousSlide = previousIndex == null ? null : slides[previousIndex];
  const arrowLeftSrc = activeSlide?.arrows?.left ?? '/image/mq1fh69i-yac5qnz.png';
  const arrowRightSrc = activeSlide?.arrows?.right ?? '/image/mq1fh69i-qi351t5.png';

  return (
    <div className={styles.heroCarousel} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <button
        type="button"
        className={`${styles.heroArrow} ${styles.heroArrowLeft}`}
        aria-label="Anterior"
        onClick={goPrev}
        disabled={slides.length <= 1}
      >
        <Image src={arrowLeftSrc} alt="" width={30} height={18} />
      </button>

      <div className={styles.heroCardViewport} aria-label="Carrusel de monitoreo">
        {previousSlide ? renderCard(previousSlide, 'exit') : null}
        {activeSlide ? renderCard(activeSlide, 'enter') : null}
      </div>

      <button
        type="button"
        className={`${styles.heroArrow} ${styles.heroArrowRight}`}
        aria-label="Siguiente"
        onClick={goNext}
        disabled={slides.length <= 1}
      >
        <Image src={arrowRightSrc} alt="" width={30} height={18} />
      </button>
    </div>
  );
}
