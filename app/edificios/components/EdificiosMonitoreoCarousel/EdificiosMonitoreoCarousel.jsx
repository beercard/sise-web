'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import { useAutoplay, useSlideTransition } from '../../../lib/hooks';

import styles from '../../page.module.scss';

const AUTOPLAY_MS = 6000;

export default function EdificiosMonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'acceso',
        title: 'Control de acceso',
        body: 'Ingreso digitalizado para residentes y visitas, con registro de movimientos.',
        padding: { top: 76, right: 63, bottom: 77, left: 62 },
        contentWidth: 317,
        arrows: { left: '/image/mq077jv6-qrtlw58.png', right: '/image/mq077jv6-4ip6bd7.png' }
      },
      {
        key: 'guardia',
        title: 'Guardia virtual',
        body: 'Supervisión remota 24/7 de accesos y espacios comunes, con intervención ante eventos y asistencia en tiempo real.',
        padding: { top: 68, right: 50, bottom: 69, left: 49 },
        contentWidth: 343,
        arrows: { left: '/image/mq08wca6-odsue43.png', right: '/image/mq08wca6-wxay7er.png' }
      },
      {
        key: 'alarmas',
        title: 'Alarmas y monitoreo',
        body: 'Protección de perímetros y áreas comunes con prevención y respuesta inmediata.',
        padding: { top: 76, right: 50, bottom: 77, left: 49 },
        contentWidth: 343,
        arrows: { left: '/image/mq08wcbh-tkuz88u.png', right: '/image/mq08wcbh-1oovgle.png' }
      },
      {
        key: 'cerco',
        title: 'Cerco eléctrico',
        body: 'Seguridad perimetral en espacios compartidos.',
        padding: { top: 76, right: 109, bottom: 77, left: 108 },
        contentWidth: 225,
        arrows: { left: '/image/mq08wcbd-7tao0p7.png', right: '/image/mq08wcbd-9ord9fg.png' }
      },
      {
        key: 'cctv',
        title: 'CCTV',
        body: 'Registro y control visual de áreas comunes para mayor seguridad y respaldo.',
        padding: { top: 76, right: 39, bottom: 77, left: 39 },
        contentWidth: 364,
        arrows: { left: '/image/mq08wcc1-o8t6yxl.png', right: '/image/mq08wcc1-wcdyk0z.png' }
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

  const slideStyle = (slide) => ({
    '--hero-card-content-width': `${slide.contentWidth}px`,
    '--hero-card-pad-top': `${slide.padding.top}px`,
    '--hero-card-pad-right': `${slide.padding.right}px`,
    '--hero-card-pad-bottom': `${slide.padding.bottom}px`,
    '--hero-card-pad-left': `${slide.padding.left}px`
  });

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
            style={slideStyle(previousSlide)}
          >
            {renderSlide(previousSlide)}
          </div>
        ) : null}

        <div
          className={`${styles.heroCardBox} ${
            previousSlide ? (direction === 'next' ? styles.heroCardEnterRight : styles.heroCardEnterLeft) : ''
          }`}
          style={slideStyle(activeSlide)}
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

