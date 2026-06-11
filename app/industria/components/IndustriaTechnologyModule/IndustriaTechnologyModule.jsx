'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  getDirection,
  useAreaScale,
  useSlideTransition,
  useTechEditor
} from '../../../lib/hooks';

import TechCard from '../../../components/TechCard/TechCard';

import styles from '../../page.module.scss';

const STORAGE_KEY_V1 = 'sise-industria-tech-editor-v1';
const STORAGE_KEY = 'sise-industria-tech-editor-v2';

const DEFAULT_POSITIONS = {
  perimetral: {
    sirena: { top: 216, left: 653 },
    cartel: { top: 253, left: 652 },
    cerco: { top: 217, left: 604 },
    camara: { top: 180, left: 654 },
    magneticos: { top: 329, left: 519 }
  },
  interior: {
    camaras: { top: 35, left: 348 },
    sensor: { top: 217, left: 286 },
    teclado: { top: 256, left: 402 },
    mando: { top: 167, left: 136 },
    central: { top: 223, left: 403 },
    humo: { top: 125, left: 547 },
    acceso: { top: 244, left: 234 }
  },
  conectividad: {
    app: { top: 185, left: 560 }
  }
};

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const HOUSE_BASE_SIZES = {
  perimetral: { width: 735, height: 511 },
  interior: { width: 735, height: 511 },
  conectividad: { width: 735, height: 511 }
};

export default function IndustriaTechnologyModule() {
  // Migración v1 -> v2 del storage del editor, antes de que el hook lo lea.
  useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        const rawV1 = window.localStorage.getItem(STORAGE_KEY_V1);
        if (rawV1) window.localStorage.setItem(STORAGE_KEY, rawV1);
      }
    } catch {
      return null;
    }
    return null;
  });

  const tabs = useMemo(
    () => [
      {
        id: TAB_IDS.PERIMETRAL,
        label: 'PROTECCIÓN PERIMETRAL',
        houseClassName: styles.housePerimetral,
        points: [
          { id: 'sirena', label: 'Sirena exterior' },
          { id: 'cartel', label: 'Cartel disuasivo' },
          { id: 'cerco', label: 'Cerco eléctrico perimetral' },
          { id: 'camara', label: 'Cámara de vigilancia' },
          { id: 'magneticos', label: 'Magnéticos' }
        ],
        slides: [
          {
            title: 'Sirena exterior',
            text: 'Alerta sonora de alto alcance que ahuyenta intrusos y activa la atención del entorno.',
            styleVars: {
              '--tech-card-padding': '48px 83px 44px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-image-width': '91px',
              '--tech-card-image-height': '149px',
              '--tech-card-image-margin-top': '14px'
            },
            art: { type: 'image', src: '/image/mq03xkl6-skhb6yd.png', width: 91, height: 149 }
          },
          {
            title: 'Cartel disuasivo',
            text: 'Refuerza visualmente la seguridad del lugar e informa protección monitoreada.',
            styleVars: {
              '--tech-card-padding': '48px 82px 51px 84px',
              '--tech-card-align-items': 'flex-start',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-image-width': '139px',
              '--tech-card-image-height': '147px',
              '--tech-card-image-margin-top': '9px'
            },
            art: { type: 'image', src: '/image/mq03xjh8-plelivg.png', width: 139, height: 147 }
          },
          {
            title: 'Cerco eléctrico perimetral',
            text: 'Primera barrera de seguridad que protege tu propiedad y disuade ingresos no autorizados.',
            styleVars: {
              '--tech-card-padding': '42px 83px 22px',
              '--tech-card-title-min-height': '63px',
              '--tech-card-text-margin': '17px 0 0',
              '--tech-card-text-width': '276px',
              '--tech-card-image-width': '215px',
              '--tech-card-image-height': '154px',
              '--tech-card-image-margin-top': '17px'
            },
            art: { type: 'image', src: '/image/mq03xjbb-002rji3.png', width: 215, height: 154 }
          },
          {
            title: 'Cámaras de vigilancia',
            text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
            styleVars: {
              '--tech-card-padding': '42px 83px',
              '--tech-card-title-min-height': '63px',
              '--tech-card-text-margin': '17px 0 0',
              '--tech-card-text-width': '276px',
              '--tech-card-image-width': '192px',
              '--tech-card-image-height': '117px',
              '--tech-card-image-margin-top': '17px'
            },
            art: { type: 'image', src: '/image/mq05hjl0-n277hkp.png', width: 192, height: 117 }
          },
          {
            title: 'Magnéticos',
            text: 'Protección inteligente en puertas y ventanas con alerta inmediata ante aperturas.',
            styleVars: {
              '--tech-card-padding': '48px 84px 33px 82px',
              '--tech-card-align-items': 'flex-start',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0 7px',
              '--tech-card-image-width': '160px',
              '--tech-card-image-height': '160px',
              '--tech-card-image-margin-top': '14px',
              '--tech-card-image-align-self': 'flex-start',
              '--tech-card-image-margin-left': '60px',
              '--tech-card-image-margin-right': '0px'
            },
            art: { type: 'image', src: '/image/mq05vpvq-v3g8fj6.png', width: 160, height: 160 }
          }
        ]
      },
      {
        id: TAB_IDS.INTERIOR,
        label: 'PROTECCIÓN INTERIOR',
        houseClassName: styles.houseInterior,
        points: [
          { id: 'camaras', label: 'Cámaras de vigilancia' },
          { id: 'sensor', label: 'Sensor de movimiento' },
          { id: 'teclado', label: 'Teclado de configuración' },
          { id: 'mando', label: 'Mando a distancia' },
          { id: 'central', label: 'Central con comunicador' },
          { id: 'humo', label: 'Cortina de Humo' },
          { id: 'acceso', label: 'Control de acceso' }
        ],
        slides: [
          {
            title: 'Cámaras de vigilancia',
            text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
            styleVars: {
              '--tech-card-padding': '42px 83px',
              '--tech-card-image-width': '192px',
              '--tech-card-image-height': '117px',
              '--tech-card-image-margin-top': '17px'
            },
            art: { type: 'image', src: '/image/mq03yfq7-j0avktf.png', width: 192, height: 117 }
          },
          {
            title: 'Sensor de movimiento',
            text: 'Detecta movimientos sospechosos y activa el sistema de alerta automáticamente.',
            styleVars: {
              '--tech-card-padding': '35px 83px 13px'
            },
            art: {
              type: 'overlay',
              wrapperWidth: 193,
              wrapperHeight: 180,
              wrapperMarginTop: 66,
              image: { src: '/image/mq03yfoc-45vkxv8.png', width: 193, height: 180, top: 0, left: 0 },
              text: { top: -55, right: -40, width: 273 }
            }
          },
          {
            title: 'Teclado de configuración',
            text: 'Gestión simple y rápida para controlar tu alarma en todo momento.',
            styleVars: {
              '--tech-card-padding': '35px 83px 189px',
              '--tech-card-text-margin': '11px 0 0'
            },
            art: { type: 'absolute', src: '/image/mq03yfq4-1tlcwks.webp', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
          },
          {
            title: 'Mando a distancia',
            text: 'Activá o desactivá tu sistema con comodidad.',
            styleVars: {
              '--tech-card-padding': '48px 83px 220px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '19px 0 0',
              '--tech-card-text-width': '216px'
            },
            art: { type: 'absolute', src: '/image/mq03yfq8-wjis0b0.png', width: 188, height: 176, top: 148, left: 127, rotate: 16 }
          },
          {
            title: 'Central con comunicador',
            text: 'Tecnología centralizada que conecta, procesa y reporta cada evento de seguridad.',
            styleVars: {
              '--tech-card-padding': '35px 83px 22px',
              '--tech-card-align-items': 'flex-start',
              '--tech-card-text-margin': '13px 0 0 15px',
              '--tech-card-text-width': '246px',
              '--tech-card-image-width': '219px',
              '--tech-card-image-height': '156px',
              '--tech-card-image-margin-top': '9px'
            },
            art: { type: 'image', src: '/image/mq03ygqw-3ws6cms.png', width: 219, height: 156 }
          },
          {
            title: 'Cortina de Humo',
            text: 'Sistema que libera una niebla densa ante intrusiones, reduciendo la visibilidad y neutralizando el accionar del delincuente.',
            styleVars: {
              '--tech-card-padding': '48px 83px 22px',
              '--tech-card-title-min-height': '39px',
              '--tech-card-image-width': '262px',
              '--tech-card-image-height': '187px',
              '--tech-card-image-margin-top': '34px',
              '--tech-card-image-align-self': 'center'
            },
            art: { type: 'image', src: '/image/mq03yfo9-10k9gi5.png', width: 262, height: 187 }
          },
          {
            title: 'Control de acceso',
            text: 'Gestión de ingresos del personal mediante tarjetas, biometría o reconocimiento facial, con control de horarios y presencia.',
            styleVars: {
              '--tech-card-padding': '48px 83px 22px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-title-margin': '0 0 0 49px',
              '--tech-card-text-margin': '14px 0 0',
              '--tech-card-text-width': '354px',
              '--tech-card-image-width': '94px',
              '--tech-card-image-height': '176px',
              '--tech-card-image-margin-top': '12px',
              '--tech-card-image-align-self': 'center'
            },
            art: { type: 'image', src: '/image/mq03ygqv-k75t2cf.png', width: 94, height: 176 }
          }
        ]
      },
      {
        id: TAB_IDS.CONECTIVIDAD,
        label: 'CONECTIVIDAD',
        houseClassName: styles.houseConectividad,
        points: [{ id: 'app', label: 'Control desde el celular' }],
        slides: [
          {
            title: 'Control desde el celular',
            text: 'Administrá tu sistema, recibí notificaciones y monitoreá tu hogar o negocio estés donde estés.',
            styleVars: {
              '--tech-card-padding': '42px 120px 20px 121px',
              '--tech-card-title-min-height': '63px',
              '--tech-card-title-width': '201px',
              '--tech-card-title-height': '63px'
            },
            art: {
              type: 'connectivity',
              backgroundSrc: '/image/mq03yufq-43ve40h.webp',
              wrapperWidth: 183,
              wrapperHeight: 158,
              wrapperMarginTop: 74,
              imageTop: 0,
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

  const { scale: houseScale, getScale } = useAreaScale({
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
    handleCopyEditorConfig,
    handleResetEditorConfig
  } = useTechEditor({
    storageKey: STORAGE_KEY,
    defaultPositions: DEFAULT_POSITIONS,
    defaultMapping: defaultPointToSlide,
    activeAreaId: activeTabId,
    points,
    areaRef: houseRef,
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

  const renderSlideContent = (slide, extraClassName) => (
    <TechCard slide={slide} className={extraClassName} />
  );

  // Al resetear, descarta también la versión vieja del storage del editor.
  const handleResetEditor = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY_V1);
    } catch {
      // continuar con el reset estándar
    }
    handleResetEditorConfig();
  };

  return (
    <section className={styles.technology} aria-label="Seguridad total para tu negocio">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Seguridad total para tu negocio,</span>
        <br />
        <span className={styles.technologyTitleLight}>en todo momento</span>
      </h2>

      <div className={styles.tabs} role="tablist" aria-label="Categorías">
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
          aria-label="Mapa industria"
          onPointerMove={handlePointPointerMove}
          onPointerUp={handlePointPointerUp}
          onPointerCancel={handlePointPointerUp}
        >
          {points.map((point) => {
            const isActive = point.id === activePointId;
            const position = positionsForTab[point.id];
            const scaledPosition = position
              ? {
                  top: Math.round(position.top * houseScale.y),
                  left: Math.round(position.left * houseScale.x)
                }
              : null;

            return (
              <button
                key={point.id}
                type="button"
                ref={(el) => {
                  if (!el) return;
                  pointRefs.current[point.id] = el;
                }}
                className={`${styles.pointButton} ${isActive ? styles.pointActive : ''} ${isEditMode ? styles.pointEdit : ''} ${
                  position ? styles.pointAbsolute : ''
                }`}
                aria-label={point.label}
                aria-pressed={isActive}
                style={scaledPosition ? { top: `${scaledPosition.top}px`, left: `${scaledPosition.left}px` } : undefined}
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

        <div className={styles.techCardGroup} aria-label="Detalle">
          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={handlePrev}>
              <Image src="/image/mpvuunz9-n1vmngd.png" alt="" width={30} height={18} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}

          <div className={`${styles.techCardViewport} ${styles.tabFadeIn}`} key={`${activeTabId}-${tabNonce}`}>
            {previousSlide ? renderSlideContent(previousSlide, getCardClassName('previous')) : null}
            {renderSlideContent(currentSlide, getCardClassName('active'))}
          </div>

          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={handleNext}>
              <Image src="/image/mpvuunz9-l51ejtw.png" alt="" width={30} height={17} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}
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
              <button type="button" className={styles.techEditorBtn} onClick={handleResetEditor}>
                Reset
              </button>
            </div>
          </div>

          <div className={styles.techEditorRows}>
            {points.map((point) => {
              const position = positionsForTab[point.id];
              const value = mappingForTab[point.id] ?? 0;
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
                  <select className={styles.techEditorSelect} value={value} onChange={(e) => handleMappingChange(point.id, Number(e.target.value))}>
                    {slides.map((slide, idx) => (
                      <option key={`${slide.title}-${idx}`} value={idx}>
                        {slide.title}
                      </option>
                    ))}
                  </select>
                  <p className={styles.techEditorPos}>{position ? `x:${position.left} y:${position.top}` : 'x:- y:-'}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
