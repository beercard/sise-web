'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const ANIMATION_MS = 420;
const AUTOPLAY_MS = 6000;

export default function ComercioMonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'alarmas',
        title: 'Monitoreo de alarmas',
        body:
          'Respuesta inmediata ante intentos de robo o emergencias, con intervención activa desde el centro de monitoreo.',
        padding: { top: 68, right: 54, bottom: 64, left: 54 },
        contentWidth: 334,
        arrows: { left: '/image/mpvuunz9-n1vmngd.png', right: '/image/mpvuunz9-l51ejtw.png' }
      },
      {
        key: 'cctv',
        title: 'CCTV / Videovigilancia',
        body:
          'Supervisión constante de áreas\ncríticas del negocio, con registro de\neventos para control y análisis.',
        padding: { top: 68, right: 54, bottom: 69, left: 53 },
        contentWidth: 335,
        arrows: { left: '/image/mpvwnmv0-l7o0kmn.png', right: '/image/mpvwnmv1-d4ubt6o.png' }
      },
      {
        key: 'humo',
        title: 'Cortina de humo',
        body:
          'Sistema que libera una niebla\ndensa ante intrusiones, reduciendo\nla visibilidad y neutralizando el\naccionar del delincuente.',
        padding: { top: 58, right: 76, bottom: 59, left: 75 },
        contentWidth: 291,
        arrows: { left: '/image/mpvwnmvr-3vqtlpc.png', right: '/image/mpvwnmvr-kh583r0.png' }
      },
      {
        key: 'acceso',
        title: 'Control de acceso\ny fichaje',
        body:
          'Gestión de ingresos del personal mediante\ntarjetas, biometría o reconocimiento facial,\ncon control de horarios y presencia.',
        padding: { top: 52, right: 34, bottom: 53, left: 33 },
        contentWidth: 375,
        arrows: { left: '/image/mpvwnmvo-u2kaetu.png', right: '/image/mpvwnmvo-m3pvp58.png' }
      },
      {
        key: 'rastreo',
        title: 'Rastreo satelital',
        body:
          'Seguimiento en tiempo real de\nvehículos, permitiendo detectar\ndesvíos, optimizar recorridos y\nmejorar la logística.',
        padding: { top: 58, right: 72, bottom: 59, left: 71 },
        contentWidth: 299,
        arrows: { left: '/image/mpvwnmvv-1jxvr8x.png', right: '/image/mpvwnmvv-vm4jzhl.png' }
      }
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [direction, setDirection] = useState('next');
  const [isPaused, setIsPaused] = useState(false);

  const activeIndexRef = useRef(activeIndex);
  const animTimeoutRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const startTransition = useCallback((nextIndex, nextDirection) => {
    const currentIndex = activeIndexRef.current;
    if (nextIndex === currentIndex) return;

    if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);

    setDirection(nextDirection);
    setPreviousIndex(currentIndex);
    setActiveIndex(nextIndex);

    animTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      animTimeoutRef.current = null;
    }, ANIMATION_MS);
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isPaused || slides.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      const currentIndex = activeIndexRef.current;
      startTransition((currentIndex + 1) % slides.length, 'next');
    }, AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slides.length, startTransition]);

  const goPrev = () => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex - 1 + slides.length) % slides.length, 'prev');
  };

  const goNext = () => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex + 1) % slides.length, 'next');
  };

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
    };
  }, []);

  const activeSlide = slides[activeIndex];
  const previousSlide = previousIndex === null ? null : slides[previousIndex];

  const renderSlide = (slide) => (
    <>
      <p className={styles.heroCardTitle}>
        {slide.title.split('\n').map((line, index) => (
          <span key={`${slide.key}-t-${index}`}>
            {line}
            {index < slide.title.split('\n').length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
      <p className={styles.heroCardText}>
        {slide.body.split('\n').map((line, index) => (
          <span key={`${slide.key}-b-${index}`}>
            {line}
            {index < slide.body.split('\n').length - 1 ? <br /> : null}
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
          className={`${styles.heroCardBox} ${previousSlide ? (direction === 'next' ? styles.heroCardEnterRight : styles.heroCardEnterLeft) : ''}`}
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
