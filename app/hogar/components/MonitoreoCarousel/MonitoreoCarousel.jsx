'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const ANIMATION_MS = 420;
const AUTOPLAY_MS = 6000;

export default function MonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'alarmas',
        titleLines: ['Monitoreo de alarmas'],
        body:
          'Supervisión permanente las 24 horas desde nuestro centro de monitoreo.\nAnte cualquier evento, activamos protocolos de respuesta inmediata para asistir y dar aviso.',
        contentWidth: 334,
        padding: { top: 46, right: 54, bottom: 46, left: 54 }
      },
      {
        key: 'cctv',
        titleLines: ['CCTV / Videovigilancia'],
        body:
          'Cámaras con acceso remoto que permiten ver en tiempo real lo que sucede en tu hogar y contar con grabaciones ante cualquier incidente.',
        contentWidth: 334,
        padding: { top: 58, right: 54, bottom: 59, left: 54 }
      },
      {
        key: 'cerco',
        titleLines: ['Cerco eléctrico /', 'Cerco monitoreado'],
        body:
          'Protección perimetral que disuade y detecta intrusiones antes de que ocurran. Puede integrarse al monitoreo de alarmas para alertas inmediatas.',
        contentWidth: 334,
        padding: { top: 42, right: 54, bottom: 43, left: 54 }
      },
      {
        key: 'barrio',
        titleLines: ['Sistema de barrio seguro'],
        body:
          'Solución colaborativa que integra cámaras conectadas a un monitoreo centralizado para mayor cobertura y prevención.',
        contentWidth: 353,
        padding: { top: 68, right: 45, bottom: 69, left: 44 }
      },
      {
        key: 'desocupadas',
        titleLines: ['Monitoreo de', 'propiedades desocupadas'],
        body: 'Protección para casas en venta, alquiler o terrenos, evitando intrusiones, vandalismo u ocupaciones.',
        contentWidth: 359,
        padding: { top: 52, right: 42, bottom: 53, left: 41 }
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

  const startTransition = (nextIndex, nextDirection) => {
    const currentIndex = activeIndexRef.current;
    if (nextIndex === currentIndex) return;

    if (animTimeoutRef.current) {
      window.clearTimeout(animTimeoutRef.current);
    }

    setDirection(nextDirection);
    setPreviousIndex(currentIndex);
    setActiveIndex(nextIndex);

    animTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      animTimeoutRef.current = null;
    }, ANIMATION_MS);
  };

  const goPrev = () => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex - 1 + slides.length) % slides.length, 'prev');
  };

  const goNext = () => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex + 1) % slides.length, 'next');
  };

  useEffect(() => {
    if (isPaused) return undefined;
    const intervalId = window.setInterval(() => {
      const currentIndex = activeIndexRef.current;
      startTransition((currentIndex + 1) % slides.length, 'next');
    }, AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slides.length]);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) {
        window.clearTimeout(animTimeoutRef.current);
      }
    };
  }, []);

  const activeSlide = slides[activeIndex];
  const previousSlide = previousIndex === null ? null : slides[previousIndex];

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
        <Image src="/image/mpuj812y-eh599fn.png" alt="" width={30} height={18} />
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
            <p className={styles.heroCardTitle}>
              {previousSlide.titleLines.map((line, index) => (
                <span key={`${previousSlide.key}-t-${index}`}>
                  {line}
                  {index < previousSlide.titleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <p className={styles.heroCardText}>
              {previousSlide.body.split('\n').map((line, index) => (
                <span key={`${previousSlide.key}-b-${index}`}>
                  {line}
                  {index < previousSlide.body.split('\n').length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
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
          <p className={styles.heroCardTitle}>
            {activeSlide.titleLines.map((line, index) => (
              <span key={`${activeSlide.key}-t-${index}`}>
                {line}
                {index < activeSlide.titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          <p className={styles.heroCardText}>
            {activeSlide.body.split('\n').map((line, index) => (
              <span key={`${activeSlide.key}-b-${index}`}>
                {line}
                {index < activeSlide.body.split('\n').length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
      </div>

      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowRight}`} aria-label="Siguiente" onClick={goNext}>
        <Image src="/image/mpuj812y-rbp1er3.png" alt="" width={30} height={17} />
      </button>
    </div>
  );
}
