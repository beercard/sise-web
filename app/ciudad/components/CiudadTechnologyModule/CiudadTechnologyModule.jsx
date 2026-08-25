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
 * Rediseño Figma 5001:253 (mapa único, sin tabs) + 5001:256 (fichas desktop) +
 * 5001:254/255 (mobile). Un solo plano de la manzana urbana (800×532) con 9
 * puntos, uno por ficha: puntos seguros (activo al entrar), paradas seguras,
 * videovigilancia con IA, semaforización, smart parking, auditoría de flotas,
 * control de dependencias, tótems y mobiliario sustentable.
 */
const STORAGE_KEY = 'sise-ciudad-tech-editor-v4';
const AREA_ID = 'mapa';

const DEFAULT_POSITIONS = {
  [AREA_ID]: {
    puntos: { top: 283, left: 399 },
    paradas: { top: 287, left: 315 },
    videovigilancia: { top: 182, left: 559 },
    semaforo: { top: 190, left: 152 },
    parking: { top: 271, left: 253 },
    flotas: { top: 265, left: 488 },
    dependencias: { top: 245, left: 537 },
    totems: { top: 251, left: 271 },
    mobiliario: { top: 196, left: 92 }
  }
};

const HOUSE_BASE_SIZES = {
  [AREA_ID]: { width: 800, height: 532 }
};

const POINTS = [
  { id: 'puntos', label: 'Puntos Seguros', pointClassName: styles.ellipse1 },
  { id: 'paradas', label: 'Paradas Seguras', pointClassName: styles.ellipse12 },
  { id: 'videovigilancia', label: 'Videovigilancia Urbana con IA', pointClassName: styles.ellipse13 },
  { id: 'semaforo', label: 'Semaforización Inteligente', pointClassName: styles.ellipse14 },
  { id: 'parking', label: 'Smart Parking (LPR)', pointClassName: styles.ellipse15 },
  { id: 'flotas', label: 'Auditoría de Flotas y Personal', pointClassName: styles.ellipse1 },
  { id: 'dependencias', label: 'Control de Dependencias', pointClassName: styles.ellipse12 },
  { id: 'totems', label: 'Tótems de Comunicación', pointClassName: styles.ellipse13 },
  { id: 'mobiliario', label: 'Mobiliario Urbano Sustentable', pointClassName: styles.ellipse14 }
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
    id: 'puntos',
    title: 'Puntos Seguros',
    text: 'Asistencia ciudadana inmediata. Postes de pánico en la vía pública, monitoreados 24/7 para emergencias.',
    desktopTextLines: [
      'Asistencia ciudadana inmediata.',
      'Postes de pánico en la vía pública, monitoreados 24/7 para emergencias.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '298px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-max-width': '357px',
      '--tech-card-text-width': '357px',
      '--tech-card-text-margin': '11px 0 0',
      '--tech-card-art-margin-top': '2px',
      '--tech-card-image-width': '101px',
      '--tech-card-image-height': '172px',
      '--tech-card-mobile-title-top': '26px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '56px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '156px',
      '--tech-card-mobile-art-width': '32px',
      '--tech-card-mobile-art-height': '133px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-ciudad-puntos.webp',
      width: 101,
      height: 172,
      /* El mobile usa un recorte más angosto del poste (Figma 3151:2524). */
      mobileSrc: '/image/tech-ciudad-puntos-mobile.webp',
      mobileWidth: 32,
      mobileHeight: 133
    }
  },
  {
    id: 'paradas',
    title: 'Paradas Seguras',
    text: 'Protección al pasajero. Refugios de transporte público con monitoreo activo para prevenir el delito.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '298px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-width': '308px',
      '--tech-card-text-margin': '11px 0 0',
      '--tech-card-art-margin-top': '-11px',
      '--tech-card-image-width': '100px',
      '--tech-card-image-height': '181px',
      '--tech-card-mobile-title-top': '26px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '56px',
      '--tech-card-mobile-text-width': '167px',
      '--tech-card-mobile-art-top': '161px',
      '--tech-card-mobile-art-width': '63px',
      '--tech-card-mobile-art-height': '113px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-ciudad-paradas.webp', width: 100, height: 181 }
  },
  {
    id: 'videovigilancia',
    title: 'Videovigilancia Urbana con IA',
    titleLines: ['Videovigilancia', 'Urbana con IA'],
    text: 'Prevención en tiempo real. Red de cámaras con reconocimiento facial y patentes (LPR) para respuesta inmediata.',
    desktopTextLines: [
      'Prevención en tiempo real.',
      'Red de cámaras con reconocimiento facial y patentes (LPR) para respuesta inmediata.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '35px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '365px',
      '--tech-card-text-width': '365px',
      '--tech-card-text-margin': '11px 0 0',
      '--tech-card-art-margin-top': '-2px',
      '--tech-card-image-width': '149px',
      '--tech-card-image-height': '149px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '81px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '180px',
      '--tech-card-mobile-art-width': '102px',
      '--tech-card-mobile-art-height': '102px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-ciudad-videovigilancia.webp', width: 149, height: 149 }
  },
  {
    id: 'semaforo',
    title: 'Semaforización Inteligente',
    mobileTitleLines: ['Semaforización', 'Inteligente'],
    text: 'Gestión del tráfico urbano. Sistema adaptativo que agiliza la circulación y otorga prioridad a vehículos de emergencia.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      /* 25px de padding lateral: el título de una línea mide 391 y no entra
         en el área de 346 que deja el padding estándar de 48. */
      '--tech-card-padding': '42px 25px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '391px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-max-width': '382px',
      '--tech-card-text-width': '382px',
      '--tech-card-text-margin': '15px 0 0',
      '--tech-card-art-margin-top': '-7px',
      '--tech-card-image-width': '39px',
      '--tech-card-image-height': '173px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '201px',
      '--tech-card-mobile-text-top': '81px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '175px',
      '--tech-card-mobile-art-width': '25px',
      '--tech-card-mobile-art-height': '111px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-ciudad-semaforo.webp', width: 39, height: 173 }
  },
  {
    id: 'parking',
    title: 'Smart Parking (LPR)',
    text: 'Ordenamiento y recaudación. Control automatizado del estacionamiento medido para optimizar ingresos municipales.',
    desktopTextLines: [
      'Ordenamiento y recaudación.',
      'Control automatizado del estacionamiento medido para optimizar ingresos municipales.'
    ],
    /* El mobile acorta la primera frase (Figma 3562:263). */
    mobileText:
      'Orden y recaudación. Control automatizado del estacionamiento medido para optimizar ingresos municipales.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '408px',
      '--tech-card-text-width': '408px',
      '--tech-card-text-margin': '14px 0 0',
      '--tech-card-art-margin-top': '-2px',
      '--tech-card-image-width': '220px',
      '--tech-card-image-height': '91px',
      '--tech-card-mobile-title-top': '29px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '77px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '196px',
      '--tech-card-mobile-art-width': '168px',
      '--tech-card-mobile-art-height': '69px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-ciudad-parking.webp', width: 220, height: 91 }
  },
  {
    id: 'flotas',
    title: 'Auditoría de Flotas y Personal',
    titleLines: ['Auditoría de', 'Flotas y Personal'],
    text: 'Transparencia pública. Trazabilidad satelital de vehículos y cámaras corporales (bodycams) para respaldar el accionar oficial.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '35px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '276px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '385px',
      '--tech-card-text-width': '385px',
      '--tech-card-text-margin': '19px 0 0',
      '--tech-card-art-margin-top': '-5px',
      '--tech-card-image-width': '187px',
      '--tech-card-image-height': '122px',
      '--tech-card-mobile-title-top': '24px',
      '--tech-card-mobile-title-width': '201px',
      '--tech-card-mobile-text-top': '72px',
      '--tech-card-mobile-text-width': '174px',
      '--tech-card-mobile-art-top': '196px',
      '--tech-card-mobile-art-width': '125px',
      '--tech-card-mobile-art-height': '82px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-ciudad-flotas.webp', width: 187, height: 122 }
  },
  {
    id: 'dependencias',
    title: 'Control de Dependencias',
    text: 'Gestión de RRHH público. Auditoría estricta de ingresos y presentismo en edificios gubernamentales.',
    desktopTextLines: [
      'Gestión de RRHH público.',
      'Auditoría estricta de ingresos y presentismo en edificios gubernamentales.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '359px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-max-width': '363px',
      '--tech-card-text-width': '363px',
      '--tech-card-text-margin': '17px 0 0',
      '--tech-card-art-margin-top': '-1px',
      '--tech-card-image-width': '95px',
      '--tech-card-image-height': '173px',
      '--tech-card-mobile-title-top': '26px',
      '--tech-card-mobile-title-width': '201px',
      '--tech-card-mobile-text-top': '77px',
      '--tech-card-mobile-text-width': '193px',
      '--tech-card-mobile-art-top': '176px',
      '--tech-card-mobile-art-width': '61px',
      '--tech-card-mobile-art-height': '111px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-ciudad-dependencias.webp', width: 95, height: 173 }
  },
  {
    id: 'totems',
    title: 'Tótems de Comunicación',
    text: 'Canal de contacto ciudadano. Pantallas interactivas para alertas, información turística y monetización publicitaria.',
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '340px',
      '--tech-card-title-height': '31px',
      '--tech-card-title-min-height': '31px',
      '--tech-card-text-max-width': '352px',
      '--tech-card-text-width': '352px',
      '--tech-card-text-margin': '18px 0 0',
      '--tech-card-art-margin-top': '3px',
      '--tech-card-image-width': '198px',
      '--tech-card-image-height': '174px',
      '--tech-card-mobile-title-top': '26px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '74px',
      '--tech-card-mobile-text-width': '201px',
      '--tech-card-mobile-art-top': '170px',
      '--tech-card-mobile-art-width': '61px',
      '--tech-card-mobile-art-height': '119px'
    },
    mobileShell: MOBILE_SHELL,
    art: {
      type: 'image',
      src: '/image/tech-ciudad-totems.webp',
      width: 198,
      height: 174,
      /* El mobile recorta sólo el tótem, sin el aire lateral (Figma 3564:283). */
      mobileSrc: '/image/tech-ciudad-totems-mobile.webp',
      mobileWidth: 61,
      mobileHeight: 119
    }
  },
  {
    id: 'mobiliario',
    title: 'Mobiliario Urbano Sustentable',
    titleLines: ['Mobiliario Urbano', 'Sustentable'],
    text: 'Modernización eco-amigable. Espacios públicos con conectividad, carga solar e iluminación inteligente.',
    desktopTextLines: [
      'Modernización eco-amigable.',
      'Espacios públicos con conectividad, carga solar e iluminación inteligente.'
    ],
    mobileTall: true,
    mobileViewport: 'tall',
    styleVars: {
      '--tech-card-padding': '42px 48px 0',
      '--tech-card-align-items': 'center',
      '--tech-card-title-width': '391px',
      '--tech-card-title-height': '63px',
      '--tech-card-title-min-height': '63px',
      '--tech-card-text-max-width': '352px',
      '--tech-card-text-width': '352px',
      '--tech-card-text-margin': '12px 0 0',
      '--tech-card-art-margin-top': '-16px',
      '--tech-card-image-width': '258px',
      '--tech-card-image-height': '141px',
      '--tech-card-mobile-title-top': '26px',
      '--tech-card-mobile-title-width': '187px',
      '--tech-card-mobile-text-top': '80px',
      '--tech-card-mobile-text-width': '194px',
      '--tech-card-mobile-art-top': '188px',
      '--tech-card-mobile-art-width': '167px',
      '--tech-card-mobile-art-height': '91px'
    },
    mobileShell: MOBILE_SHELL,
    art: { type: 'image', src: '/image/tech-ciudad-mobiliario.webp', width: 258, height: 141 }
  }
];

export default function CiudadTechnologyModule() {
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
    <section className={styles.technology} aria-label="Tecnología para la ciudad">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleLight}>Tecnología avanzada para</span>
        <br className={styles.technologyTitleMobileBreak} />
        <span className={styles.technologyTitleLight}> la prevención y</span>
        <br />
        <span className={styles.technologyTitleStrong}>el control del espacio urbano.</span>
      </h2>

      <div className={styles.technologyRow}>
        <div
          ref={houseRef}
          className={`${styles.house} ${styles.housePerimetral} ${isEditMode ? styles.houseEdit : ''}`}
          aria-label="Plano de la manzana urbana"
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
