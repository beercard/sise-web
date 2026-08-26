'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  getPointPercentPosition,
  getDirection,
  useAreaScale,
  useSlideTransition,
  useTechEditor,
  useWarmSlideImages
} from '../../../lib/hooks';

import TechCard from '../../../components/TechCard/TechCard';

import styles from '../../page.module.scss';

/*
 * Rediseño Figma 5001:339 (mapa único, sin tabs) + 5001:340 (fichas desktop) +
 * 5001:341/344 (mobile). Un solo corte del edificio (643×439) con 9 puntos:
 * guardia virtual (activo al entrar), videoportero, acceso vehicular,
 * ascensor, amenities, cerraduras, terminal de unidad, alarma y
 * videovigilancia. Las fichas que comparten dibujo con otras verticales
 * reutilizan sus webp.
 */
const STORAGE_KEY = 'sise-edificios-tech-editor-v4';
const AREA_ID = 'mapa';

const DEFAULT_POSITIONS = {
  [AREA_ID]: {
    guardia: { top: 358, left: 265 },
    videoportero: { top: 333, left: 177 },
    vehicular: { top: 271, left: 603 },
    ascensor: { top: 271, left: 318 },
    amenities: { top: 68, left: 527 },
    cerraduras: { top: 145, left: 254 },
    terminal: { top: 139, left: 53 },
    alarma: { top: 272, left: 373 },
    videovigilancia: { top: 256, left: 19 }
  }
};

const HOUSE_BASE_SIZES = {
  [AREA_ID]: { width: 643, height: 439 }
};

const POINTS = [
  { id: 'guardia', label: 'Guardia Virtual', pointClassName: styles.ellipse1 },
  { id: 'videoportero', label: 'Videoportero', pointClassName: styles.ellipse12 },
  { id: 'vehicular', label: 'Acceso Vehicular Autónomo', pointClassName: styles.ellipse13 },
  { id: 'ascensor', label: 'Ascensor Sincronizado', pointClassName: styles.ellipse14 },
  { id: 'amenities', label: 'Gestión de Amenities', pointClassName: styles.ellipse15 },
  { id: 'cerraduras', label: 'Cerraduras Electrónicas', pointClassName: styles.ellipse15 },
  { id: 'terminal', label: 'Terminal de Unidad', pointClassName: styles.ellipse15 },
  { id: 'alarma', label: 'Alarma Monitoreada', pointClassName: styles.ellipse15 },
  { id: 'videovigilancia', label: 'Videovigilancia', pointClassName: styles.ellipse15 }
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
    id: 'guardia',
    title: 'Guardia Virtual',
    text: 'Seguridad remota 24/7 a una fracción del costo de un guardia físico.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '203px',
      '--tech-card-text-margin': '18px 0 0',
      '--tech-card-art-margin-top': '3px',
      '--tech-card-image-width': '198px',
      '--tech-card-image-height': '174px',
      '--tech-card-mobile-title-top': '36px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '66px',
      '--tech-card-mobile-text-width': '178px',
      '--tech-card-mobile-art-top': '139px',
      '--tech-card-mobile-art-width': '164px',
      '--tech-card-mobile-art-height': '146px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-edificios-guardia.webp', width: 198, height: 174 }
  },
  {
    id: 'videoportero',
    title: 'Videoportero',
    text: 'Atención a visitas y apertura de puertas directamente desde el celular.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '250px',
      '--tech-card-text-margin': '17px 0 0',
      '--tech-card-image-width': '95px',
      '--tech-card-image-height': '173px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '63px',
      '--tech-card-mobile-text-width': '158px',
      '--tech-card-mobile-art-top': '145px',
      '--tech-card-mobile-art-width': '77px',
      '--tech-card-mobile-art-height': '141px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-comercio-acceso.webp', width: 95, height: 173 }
  },
  {
    id: 'vehicular',
    title: 'Acceso Vehicular Autónomo',
    text: 'Ingreso a cocheras por lectura de patente, sin controles remotos.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-width': '189px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-art-margin-top': '-2px',
      '--tech-card-image-width': '220px',
      '--tech-card-image-height': '91px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '112px',
      '--tech-card-mobile-text-width': '167px',
      '--tech-card-mobile-art-top': '195px',
      '--tech-card-mobile-art-width': '158px',
      '--tech-card-mobile-art-height': '65px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-industria-vehicular.webp', width: 220, height: 91 }
  },
  {
    id: 'ascensor',
    title: 'Ascensor Sincronizado',
    text: 'Llamada automática del ascensor al ingresar al edificio.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '340px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '262px',
      '--tech-card-text-margin': '15px 0 0',
      '--tech-card-art-margin-top': '-18px',
      '--tech-card-image-width': '106px',
      '--tech-card-image-height': '193px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '85px',
      '--tech-card-mobile-text-width': '158px',
      '--tech-card-mobile-art-top': '150px',
      '--tech-card-mobile-art-width': '77px',
      '--tech-card-mobile-art-height': '140px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-edificios-ascensor.webp', width: 106, height: 193 }
  },
  {
    id: 'amenities',
    title: 'Gestión de Amenities',
    text: 'Reservas de espacios comunes 100% digitales y autogestionadas por el residente.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '340px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-max-width': '387px',
      '--tech-card-text-width': '387px',
      '--tech-card-text-margin': '15px 0 0',
      '--tech-card-art-margin-top': '-8px',
      '--tech-card-image-width': '104px',
      '--tech-card-image-height': '200px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '201px',
      '--tech-card-mobile-text-top': '63px',
      '--tech-card-mobile-text-width': '181px',
      '--tech-card-mobile-art-top': '146px',
      '--tech-card-mobile-art-width': '75px',
      '--tech-card-mobile-art-height': '144px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-edificios-amenities.webp', width: 104, height: 200 }
  },
  {
    id: 'cerraduras',
    title: 'Cerraduras Electrónicas',
    text: 'Departamentos sin llaves físicas (cerraduras de alta seguridad).',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 24px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '380px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '280px',
      '--tech-card-text-margin': '15px 0 0',
      '--tech-card-art-margin-top': '-15px',
      '--tech-card-image-width': '89px',
      '--tech-card-image-height': '191px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '85px',
      '--tech-card-mobile-text-width': '183px',
      '--tech-card-mobile-art-top': '150px',
      /* El diseño (3541:520) no centra la cerradura: va en x=79. */
      '--tech-card-mobile-art-left': '79px',
      '--tech-card-mobile-art-transform': 'none',
      '--tech-card-mobile-art-width': '65px',
      '--tech-card-mobile-art-height': '140px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-edificios-cerraduras.webp', width: 89, height: 191 }
  },
  {
    id: 'terminal',
    title: 'Terminal de Unidad',
    text: 'Pantalla de control central dentro de cada departamento.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '269px',
      '--tech-card-text-margin': '15px 0 0',
      '--tech-card-art-margin-top': '-24px',
      '--tech-card-image-width': '148px',
      '--tech-card-image-height': '166px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '201px',
      '--tech-card-mobile-text-top': '85px',
      '--tech-card-mobile-text-width': '181px',
      '--tech-card-mobile-art-top': '150px',
      '--tech-card-mobile-art-width': '115px',
      '--tech-card-mobile-art-height': '129px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-edificios-terminal.webp', width: 148, height: 166 }
  },
  {
    id: 'alarma',
    title: 'Alarma Monitoreada',
    text: 'Protección integral conectada a nuestra base operativa.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '340px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '267px',
      '--tech-card-text-margin': '15px 0 0',
      '--tech-card-art-margin-top': '-26px',
      '--tech-card-image-width': '221px',
      '--tech-card-image-height': '162px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '188px',
      '--tech-card-mobile-text-top': '83px',
      '--tech-card-mobile-text-width': '103px',
      '--tech-card-mobile-art-top': '193px',
      '--tech-card-mobile-art-width': '116px',
      '--tech-card-mobile-art-height': '89px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-comercio-monitoreo.webp',
      width: 221,
      height: 162,
      mobileSrc: '/image/tech-comercio-monitoreo-mobile.webp',
      mobileWidth: 116,
      mobileHeight: 89
    }
  },
  {
    id: 'videovigilancia',
    title: 'Videovigilancia',
    text: 'Monitoreo activo 24/7. Prevención de incidentes en áreas comunes sin costos de guardia física.',
    desktopTextLines: [
      'Monitoreo activo 24/7.',
      'Prevención de incidentes en áreas comunes sin costos de guardia física.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '303px',
      '--tech-card-text-margin': '24px 0 0',
      '--tech-card-image-width': '192px',
      '--tech-card-image-height': '117px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '73px',
      '--tech-card-mobile-text-width': '173px',
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
  }
];

export default function EdificiosTechnologyModule() {
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

  useWarmSlideImages(SLIDES);

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
    <section className={styles.technology} aria-label="Tecnología para consorcios">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Seguridad y eficiencia operativa</span>
        <br />
        <span className={styles.technologyTitleLight}>para tu consorcio.</span>
      </h2>

      <div className={styles.technologyRow}>
        <div
          ref={houseRef}
          className={`${styles.house} ${styles.housePerimetral} ${isEditMode ? styles.houseEdit : ''}`}
          aria-label="Corte del edificio"
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
