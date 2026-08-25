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
 * Rediseño Figma 5011:238 (mapa único, sin tabs) + 5011:241 (fichas desktop) +
 * 5011:239/240 (mobile). Un solo plano de la obra (735×511) con 5 puntos:
 * alarma monitoreada (activo al entrar), cctv, cerco eléctrico, control de
 * acceso y timelapse de obra. Las fichas que comparten dibujo con otras
 * verticales reutilizan sus webp.
 */
const STORAGE_KEY = 'sise-construccion-tech-editor-v4';
const AREA_ID = 'mapa';

const DEFAULT_POSITIONS = {
  [AREA_ID]: {
    alarma: { top: 321, left: 256 },
    cctv: { top: 189, left: 506 },
    cerco: { top: 278, left: 605 },
    acceso: { top: 379, left: 486 },
    timelapse: { top: 151, left: 557 }
  }
};

const HOUSE_BASE_SIZES = {
  [AREA_ID]: { width: 735, height: 511 }
};

const POINTS = [
  { id: 'alarma', label: 'Alarma Monitoreada', pointClassName: styles.ellipse1 },
  { id: 'cctv', label: 'CCTV / Videovigilancia', pointClassName: styles.ellipse12 },
  { id: 'cerco', label: 'Cerco Eléctrico Perimetral', pointClassName: styles.ellipse13 },
  { id: 'acceso', label: 'Control de Acceso', pointClassName: styles.ellipse14 },
  { id: 'timelapse', label: 'Timelapse de Obra', pointClassName: styles.ellipse15 }
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
    id: 'alarma',
    title: 'Alarma Monitoreada',
    titleLines: ['Alarma', 'Monitoreada'],
    text: 'Respuesta inmediata 24/7. Resguardo absoluto de maquinaria y materiales fuera del horario de trabajo.',
    desktopTextLines: [
      'Respuesta inmediata 24/7.',
      'Resguardo absoluto de maquinaria y materiales fuera del horario de trabajo.'
    ],
    /* Mobile (Figma 3550:872): arranca "Respuesta 24/7." sin "inmediata". */
    mobileText:
      'Respuesta 24/7. Resguardo absoluto de maquinaria y materiales fuera del horario de trabajo.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '35px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '358px',
      '--tech-card-text-width': '358px',
      '--tech-card-text-margin': '11px 0 0',
      '--tech-card-art-margin-top': '-9px',
      '--tech-card-image-width': '201px',
      '--tech-card-image-height': '188px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '188px',
      '--tech-card-mobile-text-top': '83px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '193px',
      '--tech-card-mobile-art-width': '116px',
      '--tech-card-mobile-art-height': '89px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-construccion-alarma.webp',
      width: 201,
      height: 188,
      mobileSrc: '/image/tech-comercio-monitoreo-mobile.webp',
      mobileWidth: 116,
      mobileHeight: 89
    }
  },
  {
    id: 'cctv',
    title: 'CCTV / Videovigilancia',
    text: 'Monitoreo activo 24/7. Auditoría remota en tiempo real para prevenir robos y proteger el patrimonio de la empresa.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '35px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '358px',
      '--tech-card-text-width': '358px',
      '--tech-card-text-margin': '16px 0 0',
      '--tech-card-art-margin-top': '-15px',
      '--tech-card-image-width': '192px',
      '--tech-card-image-height': '117px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '82px',
      '--tech-card-mobile-text-width': '201px',
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
    id: 'cerco',
    title: 'Cerco Eléctrico Perimetral',
    text: 'Primera línea de defensa. Barrera de alta tensión para blindar el predio desde el día cero.',
    desktopTextLines: [
      'Primera línea de defensa.',
      'Barrera de alta tensión para blindar el predio desde el día cero.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 25px',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-width': '345px',
      '--tech-card-text-margin': '18px 0 0',
      '--tech-card-image-width': '215px',
      '--tech-card-image-height': '107px',
      '--tech-card-mobile-title-top': '36px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '88px',
      '--tech-card-mobile-text-width': '201px',
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
    id: 'acceso',
    title: 'Control de Acceso',
    text: 'Gestión estricta de contratistas. Auditoría exacta de ingresos y egresos de personal y proveedores.',
    desktopTextLines: [
      'Gestión estricta de contratistas.',
      'Auditoría exacta de ingresos y egresos de personal y proveedores.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '25px',
      '--tech-card-title-min-height': '25px',
      '--tech-card-text-max-width': '358px',
      '--tech-card-text-width': '358px',
      '--tech-card-text-margin': '23px 0 0',
      '--tech-card-image-width': '95px',
      '--tech-card-image-height': '173px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '63px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '161px',
      '--tech-card-mobile-art-width': '68px',
      '--tech-card-mobile-art-height': '125px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-comercio-acceso.webp', width: 95, height: 173 }
  },
  {
    id: 'timelapse',
    title: 'Timelapse de Obra',
    text: 'Registro estratégico. Captura audiovisual del avance del proyecto para reportes a inversores, control y marketing.',
    desktopTextLines: [
      'Registro estratégico.',
      'Captura audiovisual del avance del proyecto para reportes a inversores, control y marketing.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '25px',
      '--tech-card-title-min-height': '25px',
      '--tech-card-text-max-width': '400px',
      '--tech-card-text-width': '400px',
      '--tech-card-text-margin': '26px 0 0',
      '--tech-card-image-width': '228px',
      '--tech-card-image-height': '154px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '80px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '181px',
      '--tech-card-mobile-art-width': '120px',
      '--tech-card-mobile-art-height': '105px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-construccion-timelapse.webp',
      width: 228,
      height: 154,
      mobileSrc: '/image/tech-construccion-timelapse-mobile.webp',
      mobileWidth: 120,
      mobileHeight: 105
    }
  }
];

export default function ConstruccionTechnologyModule() {
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
    <section className={styles.technology} aria-label="Tecnología para obras">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleLight}>Seguridad total</span>
        <br />
        <span className={styles.technologyTitleStrong}>para tu desarrollo.</span>
      </h2>

      <div className={styles.technologyRow}>
        <div
          ref={houseRef}
          className={`${styles.house} ${styles.housePerimetral} ${isEditMode ? styles.houseEdit : ''}`}
          aria-label="Plano de la obra"
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
