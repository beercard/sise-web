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

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const STORAGE_KEY = 'sise-agro-tech-editor-v2';
const HOUSE_BASE_WIDTH = 2486;
const HOUSE_BASE_HEIGHT = 1728;

const DEFAULT_POSITIONS = {
  perimetral: {
    camaraCampo: { top: 862, left: 1254 },
    cartel: { top: 1124, left: 720 },
    gps: { top: 1085, left: 1574 },
    sirena: { top: 1180, left: 1258 }
  },
  interior: {
    camaras: { top: 425, left: 2028 },
    sensor: { top: 400, left: 1682 },
    teclado: { top: 451, left: 1794 },
    mando: { top: 527, left: 1890 }
  },
  conectividad: {
    app: { top: 460, left: 1668 }
  }
};

const HOUSE_BASE_SIZES = {
  perimetral: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT },
  interior: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT },
  conectividad: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT }
};

export default function AgroTechnologyModule() {
  const tabs = useMemo(
    () => [
      {
        id: TAB_IDS.PERIMETRAL,
        label: 'PROTECCIÓN PERIMETRAL',
        houseClassName: styles.housePerimetral,
        points: [
          { id: 'camaraCampo', label: 'Cámara Campo', pointClassName: styles.ellipse1 },
          { id: 'cartel', label: 'Cartel disuasivo', pointClassName: styles.ellipse12 },
          { id: 'gps', label: 'GPS para maquinarias y vehículos', pointClassName: styles.ellipse13 },
          { id: 'sirena', label: 'Sirena exterior', pointClassName: styles.ellipse14 }
        ],
        slides: [
          {
            id: 'camaraCampo',
            title: 'Cámara Campo',
            /* Mobile (Figma 3182:489): título en 38, texto de 5 renglones en 68
               y la cámara solar de 128×96 en y=174. */
            text: 'Sistema autónomo con energía solar y conectividad integrada, ideal para campos sin internet ni electricidad.',
            mobileTextLines: [
              'Sistema autónomo con',
              'energía solar y',
              'conectividad integrada,',
              'ideal para campos sin',
              'internet ni electricidad.'
            ],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-padding': '48px 68px 33px 67px',
              '--tech-card-align-items': 'center',
              '--tech-card-title-width': '219px',
              '--tech-card-title-height': '31px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-width': '307px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-image-width': '214px',
              '--tech-card-image-height': '160px',
              '--tech-card-art-margin-top': '14px',
              '--tech-card-mobile-title-top': '38px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '68px',
              '--tech-card-mobile-text-width': '175px',
              '--tech-card-mobile-art-top': '174px',
              '--tech-card-mobile-art-width': '128px',
              '--tech-card-mobile-art-height': '96px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'image', src: '/image/mq1fh69q-ch04lu8.webp', width: 214, height: 160 }
          },
          {
            id: 'cartel',
            title: 'Cartel disuasivo',
            text: 'Refuerza visualmente la seguridad del lugar e informa protección monitoreada.',
            mobileTitleLines: ['Cartel', 'disuasivo'],
            mobileTextLines: [
              'Refuerza visualmente',
              'la seguridad del lugar',
              'e informa protección',
              'monitoreada.'
            ],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-padding': '48px 82px 51px 84px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-text-width': '276px',
              '--tech-card-image-width': '139px',
              '--tech-card-image-height': '147px',
              '--tech-card-art-margin-top': '9px',
              '--tech-card-mobile-title-top': '37px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '84px',
              '--tech-card-mobile-text-width': '164px',
              '--tech-card-mobile-art-top': '163px',
              '--tech-card-mobile-art-width': '108px',
              '--tech-card-mobile-art-height': '115px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'image', src: '/image/mpvxvwmp-fq0hs19.png', width: 139, height: 147 }
          },
          {
            id: 'gps',
            title: 'GPS para maquinarias y vehículos',
            text: 'Seguimiento y control de flota para optimizar recursos y prevenir pérdidas.',
            /* Mobile (Figma 3182:479): título de 3 renglones en y=26, texto de
               4 renglones en y=97 y el teléfono de 137×116 en y=171. */
            mobileTitleLines: ['GPS para', 'maquinarias y', 'vehículos'],
            mobileTextLines: [
              'Seguimiento y control',
              'de flota para',
              'optimizar recursos y',
              'prevenir pérdidas.'
            ],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-mobile-title-top': '26px',
              '--tech-card-mobile-title-width': '168px',
              '--tech-card-mobile-text-top': '97px',
              '--tech-card-mobile-text-width': '164px',
              '--tech-card-mobile-art-top': '171px',
              '--tech-card-mobile-art-width': '137px',
              '--tech-card-mobile-art-height': '116px',
              '--tech-card-padding': '43px 61px 20px 60px',
              '--tech-card-align-items': 'center',
              '--tech-card-title-width': '313px',
              '--tech-card-title-height': '63px',
              '--tech-card-title-min-height': '63px',
              '--tech-card-text-width': '321px',
              '--tech-card-text-margin': '9px 0 0',
              '--tech-card-art-justify-content': 'center',
              '--tech-card-frame-width': '221px',
              '--tech-card-frame-height': '187px',
              '--tech-card-frame-max-width': '221px',
              '--tech-card-frame-bg-size': '100% 148%',
              '--tech-card-frame-bg-position': 'center top'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'gps', backgroundSrc: '/image/mq1gm8sq-6kvccdt.webp', wrapperWidth: 221, wrapperHeight: 187, wrapperMarginTop: 32 }
          },
          {
            id: 'sirena',
            title: 'Sirena exterior',
            text: 'Alerta sonora de alto alcance que ahuyenta intrusos y activa la atención del entorno.',
            mobileTitleLines: ['Sirena', 'exterior'],
            mobileTextLines: [
              'Alerta sonora de alto',
              'alcance que ahuyenta',
              'intrusos y activa la',
              'atención del entorno.'
            ],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-padding': '48px 83px 44px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-text-width': '273px',
              '--tech-card-image-width': '91px',
              '--tech-card-image-height': '149px',
              '--tech-card-image-fixed-width': '91px',
              '--tech-card-image-fixed-height': '149px',
              '--tech-card-image-fit': 'cover',
              '--tech-card-image-position': 'bottom',
              '--tech-card-art-margin-top': '14px',
              '--tech-card-mobile-title-top': '37px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '84px',
              '--tech-card-mobile-text-width': '164px',
              '--tech-card-mobile-art-top': '172px',
              '--tech-card-mobile-art-width': '60px',
              '--tech-card-mobile-art-height': '98px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'image', src: '/image/sirena-exterior.webp', width: 91, height: 149 }
          }
        ]
      },
      {
        id: TAB_IDS.INTERIOR,
        label: 'PROTECCIÓN INTERIOR',
        houseClassName: styles.houseInterior,
        points: [
          { id: 'camaras', label: 'Cámaras de vigilancia', pointClassName: styles.ellipse1 },
          { id: 'sensor', label: 'Sensor de movimiento', pointClassName: styles.ellipse12 },
          { id: 'teclado', label: 'Teclado de configuración', pointClassName: styles.ellipse13 },
          { id: 'mando', label: 'Mando a distancia', pointClassName: styles.ellipse14 }
        ],
        slides: [
          {
            id: 'camaras',
            title: 'Cámaras de vigilancia',
            text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
            mobileTitleLines: ['Cámaras', 'de vigilancia'],
            mobileTextLines: [
              'Supervisión en tiempo', 'real y grabación', 'continua para mayor', 'control y tranquilidad.'
            ],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-title-line-height': '32px',
              '--tech-card-text-line-height': '20px',
              '--tech-card-image-width': '192px',
              '--tech-card-image-height': '117px',
              '--tech-card-art-margin-top': '-6px',
              '--tech-card-mobile-title-top': '36px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '88px',
              '--tech-card-mobile-text-width': '167px',
              '--tech-card-mobile-art-top': '186px',
              '--tech-card-mobile-art-width': '129px',
              '--tech-card-mobile-art-height': '78px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'image', src: '/image/mpvuunzj-551nhie.png', width: 192, height: 117 }
          },
          {
            id: 'sensor',
            title: 'Sensor de movimiento',
            text: 'Detecta movimientos sospechosos y activa el sistema de alerta automáticamente.',
            mobileTitleLines: ['Sensor de', 'movimiento'],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-padding': '35px 83px 13px',
              '--tech-card-text-margin': '11px 0 0',
              '--tech-card-text-width': '273px',
              '--tech-card-image-width': '193px',
              '--tech-card-image-height': '180px',
              '--tech-card-mobile-title-top': '37px',
              '--tech-card-mobile-title-width': '186.83px',
              '--tech-card-mobile-text-top': '85px',
              '--tech-card-mobile-text-width': '167px',
              '--tech-card-mobile-art-top': '163px',
              '--tech-card-mobile-art-width': '133px',
              '--tech-card-mobile-art-height': '124px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: {
              type: 'overlay',
              wrapperWidth: 193,
              wrapperHeight: 180,
              wrapperMarginTop: 66,
              text: { top: -55, right: -40, width: 273 },
              image: { src: '/image/mpvxxnnb-wpq90tr.png', width: 193, height: 180 }
            }
          },
          {
            id: 'teclado',
            title: 'Teclado de configuración',
            text: 'Gestión simple y rápida para controlar tu alarma en todo momento.',
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-padding': '35px 83px 12px',
              '--tech-card-text-margin': '11px 0 0',
              '--tech-card-text-width': '216px',
              '--tech-card-image-width': '201px',
              '--tech-card-image-height': '188px',
              '--tech-card-art-margin-top': '-12px',
              '--tech-card-mobile-title-top': '37px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '84px',
              '--tech-card-mobile-text-width': '147px',
              '--tech-card-mobile-art-top': '163px',
              '--tech-card-mobile-art-width': '123px',
              '--tech-card-mobile-art-height': '119px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'absolute', src: '/image/mpvxxyfe-psjzek1.webp', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
          },
          {
            id: 'mando',
            title: 'Mando a distancia',
            text: 'Activá o desactivá tu sistema con comodidad.',
            mobileTitleLines: ['Mando a', 'distancia'],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-padding': '48px 83px 13px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-width': '216px',
              '--tech-card-text-margin': '21px 0 0',
              '--tech-card-image-width': '174px',
              '--tech-card-image-height': '163px',
              '--tech-card-art-margin-top': '-22px',
              '--tech-card-mobile-title-top': '36px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '88px',
              '--tech-card-mobile-text-width': '145px',
              '--tech-card-mobile-art-top': '150px',
              '--tech-card-mobile-art-width': '115.34px',
              '--tech-card-mobile-art-height': '107.94px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'absolute', src: '/image/mpvxy7bq-mohx126.png', width: 174, height: 163, top: 159, left: 131, rotate: 16 }
          }
        ]
      },
      {
        id: TAB_IDS.CONECTIVIDAD,
        label: 'CONECTIVIDAD',
        houseClassName: styles.houseConectividad,
        points: [{ id: 'app', label: 'Control desde el celular', pointClassName: styles.ellipse13 }],
        slides: [
          {
            id: 'app',
            title: 'Control desde el celular',
            text: 'Administrá tu sistema, recibí notificaciones y monitoreá tu hogar o negocio estés donde estés.',
            mobileTitleLines: ['Control desde', 'el celular'],
            mobileTextLines: [
              'Administrá tu sistema,',
              'recibí notificaciones y',
              'monitoreá tu obra',
              'estés donde estés.'
            ],
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-mobile-title-top': '36px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '88px',
              '--tech-card-mobile-text-width': '167px',
              '--tech-card-mobile-art-top': '167px',
              '--tech-card-mobile-art-left': '34px',
              '--tech-card-mobile-art-transform': 'none',
              '--tech-card-mobile-art-width': '133.87px',
              '--tech-card-mobile-art-height': '115.58px',
              '--tech-card-padding': '42px 74px 20px',
              '--tech-card-align-items': 'center',
              '--tech-card-title-width': '201px',
              '--tech-card-title-height': '63px',
              '--tech-card-title-min-height': '63px',
              '--tech-card-text-width': '299px',
              '--tech-card-text-max-width': '299px',
              '--tech-card-text-margin': '17px 0 0',
              '--tech-card-frame-width': '183px',
              '--tech-card-frame-height': '158px',
              '--tech-card-frame-max-width': '183px',
              '--tech-card-frame-bg-position': '0 -1px',
              '--tech-card-frame-bg-size': '100% 151.77%',
              '--tech-card-frame-filter': 'grayscale(1)',
              '--tech-card-frame-bar-color': '#065558'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: {
              type: 'connectivity',
              bar: true,
              backgroundSrc: '/image/mq1gn9bk-jxd0t66.webp',
              wrapperWidth: 183,
              wrapperHeight: 158,
              wrapperMarginTop: 74,
              text: { top: -57, right: -55, width: 292 }
            }
          }
        ]
      }
    ],
    []
  );

  const [activeTabId, setActiveTabId] = useState(TAB_IDS.PERIMETRAL);
  const [activePointId, setActivePointId] = useState(() => tabs[0]?.points?.[0]?.id ?? null);
  const [tabNonce, setTabNonce] = useState(0);

  const houseRef = useRef(null);

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs]
  );

  const slides = activeTab.slides;
  const points = activeTab.points;

  const {
    activeIndex,
    previousIndex,
    direction,
    isAnimating,
    activeIndexRef,
    startTransition,
    resetTo
  } = useSlideTransition({ length: slides.length });

  const { getScale } = useAreaScale({
    baseSizes: HOUSE_BASE_SIZES,
    activeAreaId: activeTabId,
    areaRef: houseRef
  });

  const defaultPointToSlide = useMemo(() => {
    return tabs.reduce((acc, tab) => {
      acc[tab.id] = tab.points.reduce((map, point, idx) => {
        map[point.id] = Math.min(idx, tab.slides.length - 1);
        return map;
      }, {});
      return acc;
    }, {});
  }, [tabs]);

  const {
    isEditMode,
    pointToSlide,
    positionsForArea: positionsForTab,
    pointRefs,
    handlePointPointerDown,
    handlePointPointerMove,
    handlePointPointerUp,
    handleMappingChange,
    handleCopyEditorConfig: handleCopyJson,
    handleResetEditorConfig: handleReset
  } = useTechEditor({
    storageKey: STORAGE_KEY,
    defaultPositions: DEFAULT_POSITIONS,
    defaultMapping: defaultPointToSlide,
    activeAreaId: activeTabId,
    points,
    areaRef: houseRef,
    pointSize: 30,
    getScale,
    onPointGrabbed: setActivePointId
  });

  const mappingForTab = useMemo(
    () => pointToSlide[activeTabId] ?? defaultPointToSlide[activeTabId] ?? {},
    [activeTabId, defaultPointToSlide, pointToSlide]
  );

  const reverseMappingForTab = useMemo(() => {
    const reverse = {};
    Object.entries(mappingForTab).forEach(([pointId, slideIndex]) => {
      if (reverse[slideIndex] == null) reverse[slideIndex] = pointId;
    });
    return reverse;
  }, [mappingForTab]);

  useEffect(() => {
    if (!activePointId) return;
    const mapped = mappingForTab[activePointId];
    if (mapped == null) return;
    if (mapped === activeIndexRef.current) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  }, [activePointId, activeIndexRef, mappingForTab, startTransition]);

  const handleSelectPoint = (pointId) => {
    setActivePointId(pointId);
    const mapped = mappingForTab[pointId];
    if (mapped == null) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  };

  const handlePrev = () => {
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    startTransition(nextIndex, 'prev');
    const nextPointId = reverseMappingForTab[nextIndex];
    if (nextPointId) setActivePointId(nextPointId);
  };

  const handleNext = () => {
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex + 1) % slides.length;
    startTransition(nextIndex, 'next');
    const nextPointId = reverseMappingForTab[nextIndex];
    if (nextPointId) setActivePointId(nextPointId);
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeTabId) return;
    setActiveTabId(tabId);
    resetTo(0);
    setTabNonce((nonce) => nonce + 1);
    const firstPoint = tabs.find((tab) => tab.id === tabId)?.points?.[0];
    setActivePointId(firstPoint?.id ?? null);
  };

  const currentSlide = slides[activeIndex];
  const previousSlide = previousIndex === null ? null : slides[previousIndex];

  const getCardClassName = (phase) => {
    if (phase === 'active') {
      if (!isAnimating) return styles.techCardStatic;
      return direction === 'next' ? styles.techCardEnterNext : styles.techCardEnterPrev;
    }

    return direction === 'next' ? styles.techCardExitNext : styles.techCardExitPrev;
  };

  const renderSlideContent = (slide, extraClassName) => <TechCard slide={slide} className={extraClassName} />;

  return (
    <section className={styles.technology} aria-label="Tecnologías">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Seguridad autónoma y sin límites</span>
        <br />
        <span className={styles.technologyTitleLight}>para proteger todo tu campo.</span>
      </h2>

      <div className={styles.tabs} role="tablist" aria-label="Categorías de protección">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const underlineClassName =
            tab.id === TAB_IDS.PERIMETRAL
              ? styles.tabUnderlinePerimetral
              : tab.id === TAB_IDS.INTERIOR
                ? styles.tabUnderlineInterior
                : styles.tabUnderlineConectividad;
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${isActive ? styles.tabActive : ''} ${isActive ? underlineClassName : ''}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.technologyRow} data-anim={tabNonce}>
        <div
          ref={houseRef}
          className={`${styles.house} ${activeTab.houseClassName} ${isEditMode ? styles.houseEdit : ''}`}
          aria-label="Plano agro"
          onPointerMove={handlePointPointerMove}
          onPointerUp={handlePointPointerUp}
          onPointerCancel={handlePointPointerUp}
        >
          {points.map((point) => {
            const isActive = point.id === activePointId;
            const position = positionsForTab[point.id];
            const pointStyle = getPointPercentPosition(position, HOUSE_BASE_SIZES[activeTabId]);
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
          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={handlePrev}>
              <Image src="/image/mpudc5hg-jng7cpc.png" alt="" width={30} height={18} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}

          <div
            className={`${styles.techCardViewport} ${styles.tabFadeIn}`}
            key={`${activeTabId}-${tabNonce}`}
            data-mobile-card-size={currentSlide.mobileViewport ?? 'default'}
          >
            {previousSlide ? renderSlideContent(previousSlide, getCardClassName('previous')) : null}
            {renderSlideContent(currentSlide, getCardClassName('active'))}
          </div>

          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={handleNext}>
              <Image src="/image/mpudc5hg-5099gqg.png" alt="" width={30} height={17} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}
        </div>
      </div>

      {isEditMode ? (
        <div className={styles.techEditor} aria-label="Editor de puntos">
          <div className={styles.techEditorRow}>
            <button type="button" className={styles.techEditorButton} onClick={handleCopyJson}>
              Copiar JSON
            </button>
            <button type="button" className={styles.techEditorButtonSecondary} onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className={styles.techEditorRow}>
            <span className={styles.techEditorHint}>Tab actual:</span>
            <span className={styles.techEditorHintStrong}>{activeTabId}</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
