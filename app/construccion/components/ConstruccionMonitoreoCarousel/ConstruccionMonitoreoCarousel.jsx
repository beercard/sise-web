'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import { useAutoplay, useSlideTransition } from '../../../lib/hooks';

import styles from '../../page.module.scss';

const AUTOPLAY_MS = 6000;

export default function ConstruccionMonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'alarmas',
        title: 'Alarmas y monitoreo',
        body: 'Protección fuera del horario laboral con\nsupervisión permanente.',
        padding: { top: 76, right: 63, bottom: 77, left: 62 },
        contentWidth: 317,
        arrows: { left: '/image/mq11fkm4-05t962w.png', right: '/image/mq11fkm4-6vtzgih.png' }
      },
      {
        key: 'cerco',
        title: 'Cerco eléctrico',
        body: 'Cierre perimetral temporal para\ndelimitar y proteger el predio.',
        padding: { top: 76, right: 84, bottom: 76, left: 83 },
        contentWidth: 275,
        arrows: { left: '/image/mq1da5u9-78xbxd4.png', right: '/image/mq1da5u9-rq59kca.png' }
      },
      {
        key: 'cctv',
        title: 'CCTV / Videovigilancia',
        body: 'Monitoreo de cámaras con enfoque\npreventivo y control remoto.',
        padding: { top: 76, right: 50, bottom: 77, left: 49 },
        contentWidth: 343,
        arrows: { left: '/image/mq1da5ud-henod59.png', right: '/image/mq1da5ud-a58reac.png' }
      },
      {
        key: 'acceso',
        title: 'Control de acceso',
        body: 'Registro y control de ingreso\nde personal y proveedores.',
        padding: { top: 76, right: 98, bottom: 77, left: 98 },
        contentWidth: 246,
        arrows: { left: '/image/mq1da5ty-oofr0go.png', right: '/image/mq1da5ty-z3i15b0.png' }
      },
      {
        key: 'timelapse',
        title: 'Timelapse de obra',
        body: 'Registro audiovisual del avance del\nproyecto para control y\ndocumentación.',
        padding: { top: 76, right: 57, bottom: 77, left: 56 },
        contentWidth: 329,
        arrows: { left: '/image/mq1da5uf-k8kgrj2.png', right: '/image/mq1da5uf-2k1izu4.png' }
      },
      {
        key: 'autonomos',
        title: 'Sistemas autónomos\nde videovigilancia',
        body: 'Equipos con energía solar y\nconectividad propia, ideales para\nzonas sin infraestructura.',
        padding: { top: 52, right: 68, bottom: 53, left: 67 },
        contentWidth: 307,
        arrows: { left: '/image/mq1da5v1-upy50vn.png', right: '/image/mq1da5v1-aefl5ts.png' }
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
      <p className={styles.heroCardTitle}>
        {slide.title.split('\n').map((line, index, lines) => (
          <span key={`${slide.key}-t-${index}`}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
      <p className={styles.heroCardText}>
        {slide.body.split('\n').map((line, index, lines) => (
          <span key={`${slide.key}-b-${index}`}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
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
      <button
        type="button"
        className={`${styles.heroArrow} ${styles.heroArrowLeft}`}
        aria-label="Anterior"
        onClick={goPrev}
        disabled={slides.length <= 1}
      >
        <Image src={activeSlide.arrows.left} alt="" width={30} height={18} />
      </button>

      <div className={styles.heroCardStage} aria-live="polite">
        {previousSlide ? (
          <div
            className={`${styles.heroCardBox} ${
              direction === 'next' ? styles.heroCardExitLeft : styles.heroCardExitRight
            }`}
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

      <button
        type="button"
        className={`${styles.heroArrow} ${styles.heroArrowRight}`}
        aria-label="Siguiente"
        onClick={goNext}
        disabled={slides.length <= 1}
      >
        <Image src={activeSlide.arrows.right} alt="" width={30} height={17} />
      </button>
    </div>
  );
}
