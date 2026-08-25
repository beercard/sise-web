'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  getPointPercentPosition,
  getDirection,
  useAreaScale,
  useSlideTransition,
  useTechEditor
} from '../../../lib/hooks';

import TechCard from '../../../components/TechCard/TechCard';

import styles from '../../page.module.scss';

/*
 * Rediseño Figma 5001:326 (mapa único, sin tabs) + 5001:329 (fichas desktop) +
 * 5001:327/328 (mobile). Un solo plano de la planta industrial (736×545) con
 * 7 puntos: cerco (activo al entrar), monitoreo, cctv, cortina de humo,
 * control de acceso, rastreo satelital y acceso vehicular autónomo. Las
 * fichas que comparten dibujo con /comercio reutilizan sus webp.
 */
const STORAGE_KEY = 'sise-industria-tech-editor-v4';
const AREA_ID = 'mapa';

const DEFAULT_POSITIONS = {
  [AREA_ID]: {
    cerco: { top: 193, left: 678 },
    monitoreo: { top: 188, left: 368 },
    cctv: { top: 107, left: 183 },
    cortina: { top: 75, left: 417 },
    acceso: { top: 207, left: 328 },
    rastreo: { top: 239, left: 581 },
    vehicular: { top: 350, left: 518 }
  }
};

const HOUSE_BASE_SIZES = {
  [AREA_ID]: { width: 736, height: 545 }
};

const POINTS = [
  { id: 'cerco', label: 'Cerco eléctrico perimetral', pointClassName: styles.ellipse1 },
  { id: 'monitoreo', label: 'Monitoreo de Alarmas', pointClassName: styles.ellipse12 },
  { id: 'cctv', label: 'CCTV / Videovigilancia', pointClassName: styles.ellipse13 },
  { id: 'cortina', label: 'Cortina de Humo', pointClassName: styles.ellipse14 },
  { id: 'acceso', label: 'Control de Acceso y Fichaje', pointClassName: styles.ellipse15 },
  { id: 'rastreo', label: 'Rastreo Satelital y Dashcams', pointClassName: styles.ellipse15 },
  { id: 'vehicular', label: 'Acceso Vehicular Autónomo', pointClassName: styles.ellipse15 }
];

const MOBILE_SHELL = {
  width: '201px',
  height: '300px',
  top: '0px',
  left: '0px',
  background: '#D9D9D9',
  borderRadius: '22px'
};

const SLIDES = [
  {
    id: 'cerco',
    title: 'Cerco eléctrico perimetral',
    text: 'Defensa perimetral activa. Barrera física de alta tensión, 100% legal, para instalaciones de gran superficie.',
    desktopTextLines: [
      'Defensa perimetral activa.',
      'Barrera física de alta tensión, 100% legal, para instalaciones de gran superficie.'
    ],
    /* Mobile (Figma 3512:1351): arranca "Defensa perimetral." sin "activa". */
    mobileText:
      'Defensa perimetral. Barrera física de alta tensión, 100% legal, para instalaciones de gran superficie.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 0 25px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-width': '442px',
      '--tech-card-text-margin': '18px 0 0',
      '--tech-card-image-width': '215px',
      '--tech-card-image-height': '107px',
      '--tech-card-mobile-title-top': '36px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '88px',
      '--tech-card-mobile-text-width': '198px',
      '--tech-card-mobile-art-top': '165px',
      '--tech-card-mobile-art-width': '155px',
      '--tech-card-mobile-art-height': '111px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-comercio-cerco.webp',
      width: 215,
      height: 107,
      mobileSrc: '/image/tech-comercio-cerco-mobile.webp',
      mobileWidth: 155,
      mobileHeight: 111
    }
  },
  {
    id: 'monitoreo',
    title: 'Monitoreo de Alarmas',
    titleLines: ['Monitoreo', 'de Alarmas'],
    text: 'Seguridad estratégica con respuesta local inmediata. Protegemos tus activos críticos para garantizar tu continuidad operativa.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 24px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '381px',
      '--tech-card-text-width': '381px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-image-width': '175px',
      '--tech-card-image-height': '128px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '188px',
      '--tech-card-mobile-text-top': '77px',
      '--tech-card-mobile-text-width': '186px',
      '--tech-card-mobile-art-top': '193px',
      '--tech-card-mobile-art-width': '116px',
      '--tech-card-mobile-art-height': '89px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-comercio-monitoreo.webp',
      width: 175,
      height: 128,
      mobileSrc: '/image/tech-comercio-monitoreo-mobile.webp',
      mobileWidth: 116,
      mobileHeight: 89
    }
  },
  {
    id: 'cctv',
    title: 'CCTV / Videovigilancia',
    text: 'Monitoreo activo 24/7 bajo protocolos industriales, con infraestructura propia y respaldo 100% local.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 22px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-width': '317px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-image-width': '192px',
      '--tech-card-image-height': '117px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '84px',
      '--tech-card-mobile-text-width': '191px',
      '--tech-card-mobile-art-top': '194px',
      '--tech-card-mobile-art-width': '129px',
      '--tech-card-mobile-art-height': '73px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-comercio-cctv.webp',
      width: 192,
      height: 117,
      mobileSrc: '/image/tech-comercio-cctv-mobile.webp',
      mobileWidth: 129,
      mobileHeight: 73
    }
  },
  {
    id: 'cortina',
    title: 'Cortina de Humo',
    titleLines: ['Cortina', 'de Humo'],
    text: 'Protección de activos críticos. Sistema de niebla que bloquea la visión y neutraliza intrusiones en segundos.',
    desktopTextLines: [
      'Protección de activos críticos.',
      'Sistema de niebla que bloquea la visión y neutraliza intrusiones en segundos.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 20px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-width': '336px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-image-width': '205px',
      '--tech-card-image-height': '142px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '77px',
      '--tech-card-mobile-text-width': '185px',
      '--tech-card-mobile-art-top': '174px',
      '--tech-card-mobile-art-width': '160px',
      '--tech-card-mobile-art-height': '111px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-comercio-cortina.webp', width: 205, height: 142 }
  },
  {
    id: 'acceso',
    title: 'Control de Acceso y Fichaje',
    titleLines: ['Control de Acceso', 'y Fichaje'],
    text: 'Gestión operativa de RRHH. Control estricto de turnos, contratistas y acceso a zonas restringidas mediante biometría.',
    desktopTextLines: [
      'Gestión operativa de RRHH.',
      'Control estricto de turnos, contratistas y acceso a zonas restringidas mediante biometría.'
    ],
    /* Mobile (Figma 3512:1372): "Gestión de RRHH." sin "operativa". */
    mobileText:
      'Gestión de RRHH. Control estricto de turnos, contratistas y acceso a zonas restringidas mediante biometría.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 10px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '391px',
      '--tech-card-text-width': '391px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-image-width': '84px',
      '--tech-card-image-height': '153px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '77px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '174px',
      '--tech-card-mobile-art-width': '61px',
      '--tech-card-mobile-art-height': '112px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-comercio-acceso.webp', width: 84, height: 153 }
  },
  {
    id: 'rastreo',
    title: 'Rastreo Satelital y Dashcams',
    titleLines: ['Rastreo Satelital', 'y Dashcams'],
    text: 'Auditoría logística. Monitoreo GPS y video en vivo para optimizar rutas y proteger tu flota comercial.',
    desktopTextLines: [
      'Auditoría logística.',
      'Monitoreo GPS y video en vivo para optimizar rutas y proteger tu flota comercial.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 10px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '374px',
      '--tech-card-text-width': '374px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-image-width': '207px',
      '--tech-card-image-height': '122px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '77px',
      '--tech-card-mobile-text-width': '169px',
      '--tech-card-mobile-art-top': '185px',
      '--tech-card-mobile-art-width': '148px',
      '--tech-card-mobile-art-height': '87px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-industria-rastreo.webp', width: 207, height: 122 }
  },
  {
    id: 'vehicular',
    title: 'Acceso Vehicular Autónomo',
    text: 'Lectura de patentes para automatizar y auditar el flujo de camiones, flotas y visitas en tiempo real.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 3px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-width': '321px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-image-width': '220px',
      '--tech-card-image-height': '91px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '77px',
      '--tech-card-mobile-text-width': '169px',
      '--tech-card-mobile-art-top': '196px',
      '--tech-card-mobile-art-width': '158px',
      '--tech-card-mobile-art-height': '65px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-industria-vehicular.webp', width: 220, height: 91 }
  }
];

export default function IndustriaTechnologyModule() {
  const [activePointId, setActivePointId] = useState(POINTS[0].id);

  const houseRef = useRef(null);

  const {
    activeIndex,
    previousIndex,
    direction,
    isAnimating,
    activeIndexRef,
    startTransition
  } = useSlideTransition({ length: SLIDES.length });

  const { getScale } = useAreaScale({
    baseSizes: HOUSE_BASE_SIZES,
    activeAreaId: AREA_ID,
    areaRef: houseRef
  });

  const defaultPointToSlide = useMemo(
    () => ({
      [AREA_ID]: POINTS.reduce((map, point, idx) => {
        map[point.id] = Math.min(idx, SLIDES.length - 1);
        return map;
      }, {})
    }),
    []
  );

  const {
    isEditMode,
    pointToSlide,
    positionsForArea,
    pointRefs,
    handlePointPointerDown,
    handlePointPointerMove,
    handlePointPointerUp,
    handleMappingChange,
    handleCopyEditorConfig,
    handleResetEditorConfig
  } = useTechEditor({
    storageKey: STORAGE_KEY,
    defaultPositions: DEFAULT_POSITIONS,
    defaultMapping: defaultPointToSlide,
    activeAreaId: AREA_ID,
    points: POINTS,
    areaRef: houseRef,
    pointSize: 30,
    getScale,
    onPointGrabbed: setActivePointId
  });

  const mapping = useMemo(
    () => pointToSlide[AREA_ID] ?? defaultPointToSlide[AREA_ID] ?? {},
    [defaultPointToSlide, pointToSlide]
  );

  const reverseMapping = useMemo(() => {
    const reverse = {};
    Object.entries(mapping).forEach(([pointId, slideIndex]) => {
      if (reverse[slideIndex] == null) reverse[slideIndex] = pointId;
    });
    return reverse;
  }, [mapping]);

  useEffect(() => {
    if (!activePointId) return;
    const mapped = mapping[activePointId];
    if (mapped == null) return;
    if (mapped === activeIndexRef.current) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  }, [activePointId, activeIndexRef, mapping, startTransition]);

  const handleSelectPoint = (pointId) => {
    setActivePointId(pointId);
    const mapped = mapping[pointId];
    if (mapped == null) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  };

  const handlePrev = () => {
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
    startTransition(nextIndex, 'prev');
    const nextPointId = reverseMapping[nextIndex];
    if (nextPointId) setActivePointId(nextPointId);
  };

  const handleNext = () => {
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex + 1) % SLIDES.length;
    startTransition(nextIndex, 'next');
    const nextPointId = reverseMapping[nextIndex];
    if (nextPointId) setActivePointId(nextPointId);
  };

  const currentSlide = SLIDES[activeIndex];
  const previousSlide = previousIndex === null ? null : SLIDES[previousIndex];

  const getCardClassName = (phase) => {
    if (phase === 'active') {
      if (!isAnimating) return styles.techCardStatic;
      return direction === 'next' ? styles.techCardEnterNext : styles.techCardEnterPrev;
    }

    return direction === 'next' ? styles.techCardExitNext : styles.techCardExitPrev;
  };

  return (
    <section className={styles.technology} aria-label="Tecnología para industrias">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Seguridad a gran escala y</span>
        <br />
        <span className={styles.technologyTitleLight}>continuidad sin interrupciones.</span>
      </h2>

      <div className={styles.technologyRow}>
        <div
          ref={houseRef}
          className={`${styles.house} ${styles.housePerimetral} ${isEditMode ? styles.houseEdit : ''}`}
          aria-label="Plano de la planta"
          onPointerMove={handlePointPointerMove}
          onPointerUp={handlePointPointerUp}
          onPointerCancel={handlePointPointerUp}
        >
          {POINTS.map((point) => {
            const isActive = point.id === activePointId;
            const position = positionsForArea[point.id];
            const pointStyle = getPointPercentPosition(position, HOUSE_BASE_SIZES[AREA_ID]);
            return (
              <button
                key={point.id}
                type="button"
                ref={(el) => {
                  if (!el) return;
                  pointRefs.current[point.id] = el;
                }}
                className={`${styles.pointButton} ${point.pointClassName} ${isActive ? styles.pointActive : ''} ${
                  isEditMode ? styles.pointEdit : ''
                } ${position ? styles.pointAbsolute : ''}`}
                aria-label={point.label}
                aria-pressed={isActive}
                style={pointStyle ?? undefined}
                onClick={() => handleSelectPoint(point.id)}
                onPointerDown={(event) => handlePointPointerDown(point.id, event)}
              >
                <span className={styles.ellipse2} aria-hidden="true">
                  <span className={styles.ellipse3} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.techCardGroup} aria-label="Detalle" data-mobile-card-size={currentSlide.mobileViewport ?? 'default'}>
          <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={handlePrev}>
            <Image src="/image/mpudc5hg-jng7cpc.png" alt="" width={30} height={18} />
          </button>

          <div
            className={styles.techCardViewport}
            data-mobile-card-size={currentSlide.mobileViewport ?? 'default'}
          >
            {previousSlide ? (
              <TechCard slide={previousSlide} className={getCardClassName('previous')} />
            ) : null}
            <TechCard slide={currentSlide} className={getCardClassName('active')} />
          </div>

          <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={handleNext}>
            <Image src="/image/mpudc5hg-5099gqg.png" alt="" width={30} height={17} />
          </button>
        </div>
      </div>

      {isEditMode ? (
        <div className={styles.techEditor} aria-label="Editor de puntos">
          <div className={styles.techEditorHeader}>
            <p className={styles.techEditorTitle}>Editor (solo dev)</p>
            <div className={styles.techEditorActions}>
              <button type="button" className={styles.techEditorBtn} onClick={handleCopyEditorConfig}>
                Copiar JSON
              </button>
              <button type="button" className={styles.techEditorBtn} onClick={handleResetEditorConfig}>
                Reset
              </button>
            </div>
          </div>

          <div className={styles.techEditorRows}>
            {POINTS.map((point) => {
              const position = positionsForArea[point.id];
              const value = mapping[point.id] ?? 0;
              const isSelected = point.id === activePointId;
              return (
                <div key={point.id} className={styles.techEditorRow}>
                  <button
                    type="button"
                    className={`${styles.techEditorPick} ${isSelected ? styles.techEditorPickActive : ''}`}
                    onClick={() => setActivePointId(point.id)}
                  >
                    {point.label}
                  </button>
                  <select
                    className={styles.techEditorSelect}
                    value={value}
                    onChange={(e) => handleMappingChange(point.id, Number(e.target.value))}
                  >
                    {SLIDES.map((slide, idx) => (
                      <option key={slide.id} value={idx}>
                        {slide.title}
                      </option>
                    ))}
                  </select>
                  <p className={styles.techEditorPos}>
                    {position ? `x:${position.left} y:${position.top}` : 'x:- y:-'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
