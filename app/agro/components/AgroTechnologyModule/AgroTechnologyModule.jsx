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
 * Rediseño Figma 5011:246 (mapa único, sin tabs) + 5014:328 (fichas desktop) +
 * 5011:247/248 (mobile). Un solo plano del campo (735×511) con 4 puntos:
 * videovigilancia rural (activo al entrar), cámara campo, alarma monitoreada
 * rural y rastreo satelital. Las fichas que comparten dibujo con otras
 * verticales reutilizan sus webp.
 */
const STORAGE_KEY = 'sise-agro-tech-editor-v4';
const AREA_ID = 'mapa';

const DEFAULT_POSITIONS = {
  [AREA_ID]: {
    videovigilancia: { top: 299, left: 351 },
    camara: { top: 241, left: 347 },
    alarma: { top: 119, left: 510 },
    rastreo: { top: 314, left: 447 }
  }
};

const HOUSE_BASE_SIZES = {
  [AREA_ID]: { width: 735, height: 511 }
};

const POINTS = [
  { id: 'videovigilancia', label: 'Videovigilancia Rural', pointClassName: styles.ellipse1 },
  { id: 'camara', label: 'Cámara Campo', pointClassName: styles.ellipse12 },
  { id: 'alarma', label: 'Alarma Monitoreada Rural', pointClassName: styles.ellipse13 },
  { id: 'rastreo', label: 'Rastreo Satelital y Dashcams', pointClassName: styles.ellipse14 }
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
    id: 'videovigilancia',
    title: 'Videovigilancia Rural',
    text: 'Control absoluto a distancia. Supervisión remota en tiempo real para auditar tranqueras, galpones y accesos críticos.',
    desktopTextLines: [
      'Control absoluto a distancia.',
      'Supervisión remota en tiempo real para auditar tranqueras, galpones y accesos críticos.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '298px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-max-width': '400px',
      '--tech-card-text-width': '400px',
      '--tech-card-text-margin': '20px 0 0',
      '--tech-card-art-margin-top': '-7px',
      '--tech-card-image-width': '205px',
      '--tech-card-image-height': '125px',
      '--tech-card-mobile-title-top': '33px',
      '--tech-card-mobile-title-width': '194px',
      '--tech-card-mobile-text-top': '81px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '198px',
      '--tech-card-mobile-art-width': '129px',
      '--tech-card-mobile-art-height': '78px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-comercio-cctv.webp', width: 205, height: 125 }
  },
  {
    id: 'camara',
    title: 'Cámara Campo',
    text: 'Independencia total. Vigilancia autónoma con energía solar y enlace satelital (4G/Starlink) para zonas sin infraestructura.',
    desktopTextLines: [
      'Independencia total.',
      'Vigilancia autónoma con energía solar y enlace satelital (4G/Starlink) para zonas sin infraestructura.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '298px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '308px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-art-margin-top': '-5px',
      '--tech-card-image-width': '214px',
      '--tech-card-image-height': '160px',
      '--tech-card-mobile-title-top': '36px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '66px',
      /* 190 y no los 167 del diseño: League Spartan mide más en el navegador
         y con 167 el texto caía en 7 renglones pisando el panel solar. */
      '--tech-card-mobile-text-width': '190px',
      '--tech-card-mobile-art-top': '181px',
      '--tech-card-mobile-art-width': '128px',
      '--tech-card-mobile-art-height': '96px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-agro-camara.webp', width: 214, height: 160 }
  },
  {
    id: 'alarma',
    title: 'Alarma Monitoreada Rural',
    text: 'Respuesta inmediata en aislamiento. Alertas de intrusión para proteger acopio e instalaciones alejadas.',
    desktopTextLines: [
      'Respuesta inmediata en aislamiento.',
      'Alertas de intrusión para proteger acopio e instalaciones alejadas.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '35px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-width': '331px',
      '--tech-card-text-margin': '11px 0 0',
      '--tech-card-art-margin-top': '-9px',
      '--tech-card-image-width': '201px',
      '--tech-card-image-height': '188px',
      '--tech-card-mobile-title-top': '31px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '81px',
      '--tech-card-mobile-text-width': '174px',
      '--tech-card-mobile-art-top': '172px',
      '--tech-card-mobile-art-width': '123px',
      '--tech-card-mobile-art-height': '119px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-construccion-alarma.webp', width: 201, height: 188 }
  },
  {
    id: 'rastreo',
    title: 'Rastreo Satelital y Dashcams',
    titleLines: ['Rastreo Satelital', 'y Dashcams'],
    text: 'Auditoría de flota agrícola. Ubicación y registro continuo para proteger maquinarias incluso sin señal celular.',
    desktopTextLines: [
      'Auditoría de flota agrícola.',
      'Ubicación y registro continuo para proteger maquinarias incluso sin señal celular.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '35px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '367px',
      '--tech-card-text-width': '367px',
      '--tech-card-text-margin': '19px 0 0',
      '--tech-card-art-margin-top': '-5px',
      '--tech-card-image-width': '187px',
      '--tech-card-image-height': '122px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '83px',
      '--tech-card-mobile-text-width': '188px',
      '--tech-card-mobile-art-top': '207px',
      '--tech-card-mobile-art-width': '113px',
      '--tech-card-mobile-art-height': '74px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-agro-rastreo.webp', width: 187, height: 122 }
  }
];

export default function AgroTechnologyModule() {
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
    <section className={styles.technology} aria-label="Tecnología para el campo">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Seguridad autónoma y sin límites</span>
        <br />
        <span className={styles.technologyTitleLight}>para proteger todo tu campo.</span>
      </h2>

      <div className={styles.technologyRow}>
        <div
          ref={houseRef}
          className={`${styles.house} ${styles.housePerimetral} ${isEditMode ? styles.houseEdit : ''}`}
          aria-label="Plano del campo"
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
