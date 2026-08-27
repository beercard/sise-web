'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { HogarHeroBrand } from '../../../hogar/components/HeroModule/HeroModule';
import { ComercioHeroBrand } from '../../../comercio/components/ComercioHero/ComercioHero';
import { IndustriaHeroBrand } from '../../../industria/components/IndustriaHero/IndustriaHero';
import { EdificiosHeroBrand } from '../../../edificios/components/EdificiosHero/EdificiosHero';
import { ConstruccionHeroBrand } from '../../../construccion/components/ConstruccionHero/ConstruccionHero';
import { AgroHeroBrand } from '../../../agro/components/AgroHero/AgroHero';
import { CiudadHeroBrand } from '../../../ciudad/components/CiudadHero/CiudadHero';

import styles from './HeroCarousel.module.scss';

/*
 * El slide principal lleva la foto del hero de /historia con la frase
 * institucional; los siete siguientes replican tal cual el hero de cada
 * página de negocio (kicker "SISE X", título en dos líneas y categoría) y al
 * clickearlos navegan a esa página. Fotos ya exportadas al tamaño final
 * (desktop 1920, mobile 804 @2x), servidas sin el optimizador de Next.
 */
const HERO_SLIDES = [
  {
    id: 'hero-slide-historia',
    desktopImage: '/image/hero-historia-equipo-desktop.webp',
    mobileImage: '/image/hero-historia-equipo-mobile.webp',
    /* Mismo overlay que el hero de /historia: foto al 50% sobre el azul. */
    dimmed: true,
    titleLineOne: 'Soluciones en seguridad electrónica',
    titleBold: 'accesible, moderna y humana',
    titleRegularEnd: '.'
  },
  {
    id: 'hero-slide-hogar',
    href: '/hogar',
    Brand: HogarHeroBrand,
    /* Único hero con encuadre propio. */
    encuadre: 'hogar',
    desktopImage: '/image/hero-hogar-casa-desktop.webp',
    mobileImage: '/image/hero-hogar-casa-mobile.webp',
    kicker: 'HOGAR',
    titleLight: 'Protección integral para ',
    titleStrong: 'vivir con tranquilidad',
    mobilePeriod: true
  },
  {
    id: 'hero-slide-comercio',
    href: '/comercio',
    Brand: ComercioHeroBrand,
    desktopImage: '/image/hero-comercio-local-desktop.webp',
    mobileImage: '/image/hero-comercio-local-mobile.webp',
    kicker: 'EMPRESAS',
    titleLight: 'Seguridad que protege ',
    titleStrong: 'tu rentabilidad',
    category: 'COMERCIOS',
    mobilePeriod: true
  },
  {
    id: 'hero-slide-industria',
    href: '/industria',
    Brand: IndustriaHeroBrand,
    desktopImage: '/image/hero-industria-planta-desktop.webp',
    mobileImage: '/image/hero-industria-planta-mobile.webp',
    kicker: 'EMPRESAS',
    titleLight: 'Protección para ',
    titleStrong: 'operaciones críticas',
    category: 'EMPRESAS E INDUSTRIAS',
    mobilePeriod: true
  },
  {
    id: 'hero-slide-edificios',
    href: '/edificios',
    Brand: EdificiosHeroBrand,
    /* Su hero muestra la foto al 80%. */
    encuadre: 'edificios',
    desktopImage: '/image/hero-edificios-edificio-desktop.webp',
    mobileImage: '/image/hero-edificios-edificio-mobile.webp',
    kicker: 'URBANO',
    titleLight: 'Más seguridad, ',
    titleStrong: 'menor costo operativo.',
    category: 'Edificios y Consorcios'
  },
  {
    id: 'hero-slide-construccion',
    href: '/construccion',
    Brand: ConstruccionHeroBrand,
    desktopImage: '/image/hero-construccion-obra-desktop.webp',
    mobileImage: '/image/hero-construccion-obra-mobile.webp',
    kicker: 'URBANO',
    titleLight: 'Protección desde ',
    titleStrong: 'el primer día',
    category: 'Construcción y Obras',
    mobilePeriod: true
  },
  {
    id: 'hero-slide-agro',
    href: '/agro',
    Brand: AgroHeroBrand,
    desktopImage: '/image/hero-agro-campo-desktop.webp',
    mobileImage: '/image/hero-agro-campo-mobile.webp',
    kicker: 'AGRO',
    titleLight: 'El control de tu campo, ',
    titleStrong: 'estés donde estés.'
  },
  {
    id: 'hero-slide-ciudad',
    href: '/ciudad',
    Brand: CiudadHeroBrand,
    /* Su hero baja la foto al 80% en mobile. */
    encuadre: 'ciudad',
    desktopImage: '/image/hero-ciudad-poste-desktop.webp',
    mobileImage: '/image/hero-ciudad-poste-mobile.webp',
    kicker: 'CIUDAD',
    titleLight: 'Tecnología aplicada a ',
    titleStrong: 'la seguridad urbana.'
  }
];

const AUTOPLAY_DELAY = 5000;
const TRANSITION_MS = 720;

export default function HeroCarousel() {
  const slides = useMemo(() => HERO_SLIDES, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add(styles.heroReady);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const setSlide = useCallback((nextIndex) => {
    if (nextIndex === activeIndex) return;
    if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);
    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimeoutRef.current = null;
    }, TRANSITION_MS);
  }, [activeIndex]);

  const advanceSlide = () => {
    if (slides.length <= 1) return;
    setSlide((activeIndex + 1) % slides.length);
  };

  const goToSlide = (event, index) => {
    event.stopPropagation();
    setSlide(index);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncReducedMotionPreference();
    mediaQuery.addEventListener('change', syncReducedMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', syncReducedMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || isAutoplayPaused || prefersReducedMotion) return undefined;

    const intervalId = window.setInterval(() => {
      setSlide((activeIndex + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isAutoplayPaused, prefersReducedMotion, setSlide, slides.length]);

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];
    if (!nextSlide) return undefined;

    const preload = () => {
      const desktopPreload = new Image();
      desktopPreload.decoding = 'async';
      desktopPreload.src = nextSlide.desktopImage;

      const mobilePreload = new Image();
      mobilePreload.decoding = 'async';
      mobilePreload.src = nextSlide.mobileImage;
    };

    if (typeof window === 'undefined') return undefined;

    if (window.requestIdleCallback) {
      const idleId = window.requestIdleCallback(preload, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(preload, 900);
    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, slides]);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-label="Hero principal"
      onClick={advanceSlide}
      onMouseEnter={() => setIsAutoplayPaused(true)}
      onMouseLeave={() => setIsAutoplayPaused(false)}
      onFocusCapture={() => setIsAutoplayPaused(true)}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setIsAutoplayPaused(false);
      }}
    >
      <div className={styles.heroViewport}>
        {slides.map((slide, index) => {
          const TitleTag = index === activeIndex ? 'h1' : 'p';
          const shouldRenderMedia = index === activeIndex || index === previousIndex;
          const isPriority = index === 0 && activeIndex === 0;

          return (
            <article
              key={slide.id}
              className={`${styles.heroSlide} ${index === activeIndex ? styles.heroSlideActive : ''}`}
              aria-hidden={index !== activeIndex}
            >
              {shouldRenderMedia ? (
                <picture className={styles.heroMedia}>
                  {/* Mismo punto de cambio que los heros de las páginas: hasta 600
                      va la foto mobile, arriba la de escritorio. */}
                  <source srcSet={slide.mobileImage} media="(max-width: 600px)" />
                  <img
                    className={`${styles.heroImage} ${slide.dimmed ? styles.heroImageDimmed : ''} ${
                      slide.encuadre === 'hogar' ? styles.heroImageHogar : ''
                    } ${
                      slide.encuadre === 'ciudad' ? styles.heroImageCiudad : ''
                    } ${
                      slide.encuadre === 'edificios' ? styles.heroImageEdificios : ''
                    }`}
                    src={slide.desktopImage}
                    alt=""
                    decoding="async"
                    loading={isPriority ? 'eager' : 'lazy'}
                    fetchPriority={isPriority ? 'high' : 'auto'}
                  />
                </picture>
              ) : (
                <div className={styles.heroMedia} aria-hidden="true" />
              )}
              <div className={styles.heroContent}>
                {slide.Brand ? (
                  /* El mismo bloque que usa el hero de esa página: comparten
                     hoja de estilos, así que quedan calcados. */
                  <slide.Brand TitleTag={TitleTag} />
                ) : (
                  <TitleTag className={styles.heroTitle}>
                    <span className={styles.heroTitleLine}>
                      <span className={styles.heroTitleRegular}>
                        {slide.titleLineOne}{' '}
                      </span>
                    </span>
                    <span className={styles.heroTitleLine}>
                      <span className={styles.heroTitleBold}>{slide.titleBold}</span>
                      <span className={styles.heroTitleRegular}>{slide.titleRegularEnd}</span>
                    </span>
                  </TitleTag>
                )}
              </div>
              {slide.href && index === activeIndex ? (
                /* El slide activo de una vertical navega a su página. */
                <Link
                  href={slide.href}
                  className={styles.heroSlideLink}
                  aria-label={`Ir a SISE ${slide.kicker}`}
                  onClick={(event) => event.stopPropagation()}
                />
              ) : null}
            </article>
          );
        })}
      </div>

      <div className={styles.heroDots} aria-label="Navegación del hero">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`${styles.heroDot} ${index === activeIndex ? styles.heroDotActive : ''}`}
            aria-label={`Ir al slide ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={(event) => goToSlide(event, index)}
          />
        ))}
      </div>
    </section>
  );
}
