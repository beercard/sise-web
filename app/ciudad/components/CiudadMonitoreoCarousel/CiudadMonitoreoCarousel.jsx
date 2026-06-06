'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const ANIMATION_MS = 420;
const AUTOPLAY_MS = 6000;

export default function CiudadMonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'puntos-seguros',
        title: 'Puntos seguros',
        body: 'Espacios equipados y monitoreados que permiten a los ciudadanos\nsolicitar asistencia ante emergencias, conectados al centro de\nmonitoreo.',
        padding: { top: 58, right: 68, bottom: 59, left: 68 },
        contentWidth: 306,
        arrows: { left: '/image/mq1jm0cs-j2xc75j.png', right: '/image/mq1jm0cs-a08qtzg.png' }
      },
      {
        key: 'paradas-seguras',
        title: 'Paradas seguras',
        body: 'Infraestructura de seguridad en transporte público que mejora la\nprotección de los usuarios.',
        padding: { top: 68, right: 80, bottom: 69, left: 79 },
        contentWidth: 283,
        arrows: { left: '/image/mq1iojha-4q79y4a.png', right: '/image/mq1iojha-9bfgbik.png' }
      },
      {
        key: 'cctv-urbano',
        title: 'CCTV urbano',
        body: 'Cámaras de Vigilancia para monitoreo de espacio públicos.',
        padding: { top: 78, right: 79, bottom: 79, left: 80 },
        contentWidth: 283,
        arrows: { left: '/image/mq1iojhs-8jjsyd6.png', right: '/image/mq1iojhs-ewrpfx8.png' }
      },
      {
        key: 'videovigilancia-urbana',
        title: 'Videovigilancia urbana',
        body: 'Red de cámaras para monitoreo de espacios públicos, prevención del\ndelito y respuesta en tiempo real.',
        padding: { top: 73, right: 54, bottom: 64, left: 53 },
        contentWidth: 335,
        arrows: { left: '/image/mq1iojiq-2k1yc1u.png', right: '/image/mq1iojiq-3uaxnb2.png' }
      },
      {
        key: 'gps-institucional',
        title: 'GPS institucional',
        body: 'Control y seguimiento de flota pública, optimizando recursos y\ndetectando desvíos.',
        padding: { top: 73, right: 96, bottom: 64, left: 95 },
        contentWidth: 251,
        arrows: { left: '/image/mq1iojl5-xdh1f8r.png', right: '/image/mq1iojl5-fv4tqbk.png' }
      },
      {
        key: 'guardia-virtual',
        title: 'Guardia virtual',
        body: 'Supervisión remota de edificios públicos con intervención ante eventos.',
        padding: { top: 73, right: 96, bottom: 64, left: 95 },
        contentWidth: 251,
        arrows: { left: '/image/mq1iojl2-s0keaal.png', right: '/image/mq1iojl2-etidnjn.png' }
      },
      {
        key: 'control-de-accesos',
        title: 'Control de accesos',
        body: 'Gestión de ingresos en dependencias oficiales, mejorando el control y la\nseguridad.',
        padding: { top: 73, right: 77, bottom: 64, left: 76 },
        contentWidth: 289,
        arrows: { left: '/image/mq1iojlb-umogs8l.png', right: '/image/mq1iojlb-7cz2d5d.png' }
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
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

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
          '--hero-card-padding': `${slide.padding.top}px ${slide.padding.right}px ${slide.padding.bottom}px ${slide.padding.left}px`,
          '--hero-card-width': `${slide.contentWidth}px`
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
  const arrowLeftSrc = activeSlide?.arrows?.left ?? '/image/mq1invct-hmeelp9.png';
  const arrowRightSrc = activeSlide?.arrows?.right ?? '/image/mq1invct-le88ayo.png';

  return (
    <div
      className={styles.heroCarousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowLeft}`} aria-label="Anterior" onClick={goPrev} disabled={slides.length <= 1}>
        <Image src={arrowLeftSrc} alt="" width={30} height={18} />
      </button>

      <div className={styles.heroCardViewport} aria-label="Carrusel de ciudad">
        {previousSlide ? renderCard(previousSlide, 'exit') : null}
        {activeSlide ? renderCard(activeSlide, 'enter') : null}
      </div>

      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowRight}`} aria-label="Siguiente" onClick={goNext} disabled={slides.length <= 1}>
        <Image src={arrowRightSrc} alt="" width={30} height={18} />
      </button>
    </div>
  );
}
