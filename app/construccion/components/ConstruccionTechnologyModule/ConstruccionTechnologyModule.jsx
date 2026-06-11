'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAreaScale, useSlideTransition, useTechEditor } from '../../../lib/hooks';

import TechCard from '../../../components/TechCard/TechCard';

import styles from '../../page.module.scss';

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const STORAGE_KEY = 'sise-construccion-tech-editor-v1';
const HOUSE_BASE_WIDTH = 2486;
const HOUSE_BASE_HEIGHT = 1728;

const DEFAULT_POSITIONS = {
  perimetral: {
    camaras: { top: 539, left: 1901 },
    sirena: { top: 782, left: 1791 },
    cartel: { top: 1387, left: 1081 },
    cerco: { top: 938, left: 2039 },
    magneticos: { top: 1359, left: 1379 }
  },
  interior: {
    camaras: { top: 512, left: 1729 },
    sensor: { top: 717, left: 1193 },
    teclado: { top: 1153, left: 879 },
    mando: { top: 487, left: 958 },
    central: { top: 1088, left: 789 }
  },
  conectividad: {
    app: { top: 989, left: 1019 }
  }
};

const HOUSE_BASE_SIZES = {
  perimetral: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT },
  interior: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT },
  conectividad: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT }
};

export default function ConstruccionTechnologyModule() {
  const tabs = useMemo(
    () => [
      { id: TAB_IDS.PERIMETRAL, label: 'PROTECCIÓN PERIMETRAL', underlineClassName: styles.tabUnderlinePerimetral },
      { id: TAB_IDS.INTERIOR, label: 'PROTECCIÓN INTERIOR', underlineClassName: styles.tabUnderlineInterior },
      { id: TAB_IDS.CONECTIVIDAD, label: 'CONECTIVIDAD', underlineClassName: styles.tabUnderlineConectividad }
    ],
    []
  );

  const [activeTabId, setActiveTabId] = useState(TAB_IDS.PERIMETRAL);
  const [activePointId, setActivePointId] = useState('camaras');

  const houseRef = useRef(null);

  const points = useMemo(() => {
    if (activeTabId === TAB_IDS.PERIMETRAL) {
      return [
        { id: 'camaras', label: 'Cámaras de vigilancia' },
        { id: 'magneticos', label: 'Magnéticos' },
        { id: 'cartel', label: 'Cartel disuasivo' },
        { id: 'sirena', label: 'Sirena exterior' },
        { id: 'cerco', label: 'Cerco eléctrico perimetral' }
      ];
    }

    if (activeTabId === TAB_IDS.INTERIOR) {
      return [
        { id: 'camaras', label: 'Cámaras de vigilancia' },
        { id: 'sensor', label: 'Sensor de movimiento' },
        { id: 'teclado', label: 'Teclado de configuración' },
        { id: 'mando', label: 'Mando a distancia' },
        { id: 'central', label: 'Central con comunicador' }
      ];
    }

    return [{ id: 'app', label: 'Control desde el celular' }];
  }, [activeTabId]);

  const slides = useMemo(() => {
    if (activeTabId === TAB_IDS.PERIMETRAL) {
      return [
        {
          id: 'camaras',
          title: 'Cámaras de vigilancia',
          text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
          styleVars: {
            '--tech-card-padding': '42px 83px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '63px',
            '--tech-card-title-min-height': '63px',
            '--tech-card-text-width': '276px',
            '--tech-card-text-margin': '17px 0 0',
            '--tech-card-image-width': '192px',
            '--tech-card-image-height': '117px',
            '--tech-card-image-margin-top': '17px',
            '--tech-card-image-margin-left': '0px'
          },
          art: { type: 'image', src: '/image/mq1driuo-mdt8itt.png', width: 192, height: 117 }
        },
        {
          id: 'magneticos',
          title: 'Magnéticos',
          text: 'Protección inteligente en puertas y ventanas con alerta inmediata ante aperturas.',
          styleVars: {
            '--tech-card-padding': '48px 84px 33px 82px',
            '--tech-card-align-items': 'flex-start',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '31px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-title-align': 'center',
            '--tech-card-text-width': '265px',
            '--tech-card-text-margin': '12px 0 0 7px',
            '--tech-card-image-width': '160px',
            '--tech-card-image-height': '160px',
            '--tech-card-image-margin-top': '14px',
            '--tech-card-image-margin-left': '60px'
          },
          art: { type: 'image', src: '/image/mq1dqza1-fsdhqjv.png', width: 160, height: 160 }
        },
        {
          id: 'cartel',
          title: 'Cartel disuasivo',
          text: 'Refuerza visualmente la seguridad del lugar e informa protección monitoreada.',
          styleVars: {
            '--tech-card-padding': '48px 82px 51px 84px',
            '--tech-card-align-items': 'flex-start',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '31px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-title-align': 'center',
            '--tech-card-text-width': '276px',
            '--tech-card-text-margin': '12px 0 0',
            '--tech-card-image-width': '139px',
            '--tech-card-image-height': '147px',
            '--tech-card-image-margin-top': '9px',
            '--tech-card-image-margin-left': '68px'
          },
          art: { type: 'image', src: '/image/mq1dqzf0-mv5n48y.png', width: 139, height: 147 }
        },
        {
          id: 'sirena',
          title: 'Sirena exterior',
          text: 'Alerta sonora de alto alcance que ahuyenta intrusos y activa la atención del entorno.',
          styleVars: {
            '--tech-card-padding': '51px 83px 44px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '31px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-text-width': '273px',
            '--tech-card-text-margin': '9px 0 0'
          },
          art: {
            type: 'sirena',
            backgroundSrc: '/image/mq1dqzd1-o05u1lj.webp',
            wrapperHeight: 149,
            wrapperMarginX: 93,
            wrapperPadding: { top: 123, right: 4, bottom: 2, left: 18 },
            wrapperMarginTop: 14,
            iconSrc: '/image/mq1dqzcz-lidi66k.svg',
            iconWidth: 69,
            iconHeight: 24
          }
        },
        {
          id: 'cerco',
          title: 'Cerco eléctrico perimetral',
          text: 'Primera barrera de seguridad que protege tu propiedad y disuade ingresos no autorizados.',
          styleVars: {
            '--tech-card-padding': '42px 83px 22px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '63px',
            '--tech-card-title-min-height': '63px',
            '--tech-card-text-width': '276px',
            '--tech-card-text-margin': '17px 0 0',
            '--tech-card-image-width': '215px',
            '--tech-card-image-height': '154px',
            '--tech-card-image-margin-top': '0px',
            '--tech-card-image-margin-left': '0px'
          },
          art: { type: 'image', src: '/image/mq1dqz72-657hfaz.png', width: 215, height: 154 }
        }
      ];
    }

    if (activeTabId === TAB_IDS.INTERIOR) {
      return [
        {
          id: 'camaras',
          title: 'Cámaras de vigilancia',
          text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
          styleVars: {
            '--tech-card-padding': '42px 83px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '63px',
            '--tech-card-title-min-height': '63px',
            '--tech-card-text-width': '276px',
            '--tech-card-text-margin': '17px 0 0',
            '--tech-card-image-width': '192px',
            '--tech-card-image-height': '117px',
            '--tech-card-image-margin-top': '17px',
            '--tech-card-image-margin-left': '0px'
          },
          art: { type: 'image', src: '/image/mq1driuo-mdt8itt.png', width: 192, height: 117 }
        },
        {
          id: 'sensor',
          title: 'Sensor de movimiento',
          text: 'Detecta movimientos sospechosos y activa el sistema de alerta automáticamente.',
          styleVars: {
            '--tech-card-padding': '35px 83px 13px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '63px',
            '--tech-card-title-min-height': '63px'
          },
          art: {
            type: 'overlay',
            wrapperWidth: 193,
            wrapperHeight: 180,
            wrapperMarginTop: 66,
            text: { top: -55, right: -40, width: 273 },
            image: { src: '/image/mq1driz4-hstdnwi.png', width: 193, height: 180 }
          }
        },
        {
          id: 'teclado',
          title: 'Teclado de configuración',
          text: 'Gestión simple y rápida para controlar tu alarma en todo momento.',
          styleVars: {
            '--tech-card-padding': '35px 83px 189px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '63px',
            '--tech-card-title-min-height': '63px',
            '--tech-card-text-width': '216px',
            '--tech-card-text-margin': '11px 0 0'
          },
          art: { type: 'absolute', src: '/image/mq1drj2l-9aihuby.webp', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
        },
        {
          id: 'mando',
          title: 'Mando a distancia',
          text: 'Activá o desactivá tu sistema con comodidad.',
          styleVars: {
            '--tech-card-padding': '48px 83px 225px',
            '--tech-card-align-items': 'flex-start',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '31px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-title-align': 'center',
            '--tech-card-text-width': '216px',
            '--tech-card-text-margin': '14px 0 0 29px'
          },
          art: { type: 'absolute', src: '/image/mq1drizh-fn9qlh1.png', width: 186, height: 174, top: 150, left: 127, rotate: 16 }
        },
        {
          id: 'central',
          title: 'Central con comunicador',
          text: 'Tecnología centralizada que conecta, procesa y reporta cada evento de seguridad.',
          styleVars: {
            '--tech-card-padding': '35px 83px 22px',
            '--tech-card-align-items': 'flex-start',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '63px',
            '--tech-card-title-min-height': '63px',
            '--tech-card-title-align': 'center',
            '--tech-card-text-width': '246px',
            '--tech-card-text-margin': '13px 0 0 15px',
            '--tech-card-image-width': '219px',
            '--tech-card-image-height': '156px',
            '--tech-card-image-margin-top': '9px',
            '--tech-card-image-margin-left': '27px'
          },
          art: { type: 'image', src: '/image/mq1drixh-479vyth.png', width: 219, height: 156 }
        }
      ];
    }

    return [
      {
        id: 'app',
        title: 'Control desde el celular',
        text: 'Administrá tu sistema, recibí notificaciones y monitoreá tu hogar o negocio estés donde estés.',
        styleVars: {
          '--tech-card-padding': '42px 120px 20px 121px',
          '--tech-card-align-items': 'center',
          '--tech-card-title-width': '201px',
          '--tech-card-title-height': '63px',
          '--tech-card-title-min-height': '63px',
          '--tech-card-text-width': '292px',
          '--tech-card-text-margin': '17px 0 0'
        },
        art: {
          type: 'connectivity',
          backgroundSrc: '/image/mq1dsdck-ao77h8o.webp',
          wrapperWidth: 183,
          wrapperHeight: 158,
          wrapperMarginTop: 74,
          text: { top: -57, right: -55, width: 292 }
        }
      }
    ];
  }, [activeTabId]);

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

  const {
    isEditMode,
    pointToSlide,
    setPointToSlide,
    positionsForArea: positionsForTab,
    pointRefs,
    handlePointPointerDown,
    handlePointPointerMove,
    handlePointPointerUp,
    handleCopyEditorConfig: handleCopyJson,
    handleResetEditorConfig: handleReset
  } = useTechEditor({
    storageKey: STORAGE_KEY,
    defaultPositions: DEFAULT_POSITIONS,
    activeAreaId: activeTabId,
    points,
    areaRef: houseRef,
    getScale,
    onPointGrabbed: setActivePointId
  });

  const mappingForTab = useMemo(() => {
    const defaults = points.reduce((acc, point) => {
      const idx = slides.findIndex((slide) => slide.id === point.id);
      acc[point.id] = idx >= 0 ? idx : 0;
      return acc;
    }, {});

    const overrides = pointToSlide[activeTabId] ?? {};
    return { ...defaults, ...overrides };
  }, [activeTabId, pointToSlide, points, slides]);

  const reverseMappingForTab = useMemo(() => {
    const reverse = {};
    Object.keys(mappingForTab).forEach((pointId) => {
      const index = mappingForTab[pointId];
      if (typeof index !== 'number') return;
      reverse[index] = pointId;
    });
    return reverse;
  }, [mappingForTab]);

  // Dirección por camino más corto dentro del anillo de slides.
  const getDirection = useCallback((fromIndex, toIndex) => {
    if (slides.length <= 1) return 'next';
    const forward = (toIndex - fromIndex + slides.length) % slides.length;
    const backward = (fromIndex - toIndex + slides.length) % slides.length;
    return forward <= backward ? 'next' : 'prev';
  }, [slides.length]);

  useEffect(() => {
    if (!activePointId) return;
    const mapped = mappingForTab[activePointId];
    if (mapped == null) return;
    if (mapped === activeIndexRef.current) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  }, [activePointId, activeIndexRef, getDirection, mappingForTab, startTransition]);

  const goPrev = () => {
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    startTransition(nextIndex, 'prev');
    const nextPointId = reverseMappingForTab[nextIndex];
    if (nextPointId) setActivePointId(nextPointId);
  };

  const goNext = () => {
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex + 1) % slides.length;
    startTransition(nextIndex, 'next');
    const nextPointId = reverseMappingForTab[nextIndex];
    if (nextPointId) setActivePointId(nextPointId);
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

  const handlePointClick = (pointId) => {
    setActivePointId(pointId);
    const mapped = mappingForTab[pointId];
    if (mapped == null) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  };

  const handleTabClick = (tabId) => {
    if (tabId === activeTabId) return;
    setActiveTabId(tabId);
    resetTo(0);
    setActivePointId(tabId === TAB_IDS.CONECTIVIDAD ? 'app' : tabId === TAB_IDS.INTERIOR ? 'sensor' : 'camaras');
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
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${isActive ? styles.tabActive : ''} ${isActive ? tab.underlineClassName : ''}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.technologyRow}>
        <div
          className={`${styles.house} ${
            activeTabId === TAB_IDS.PERIMETRAL ? styles.housePerimetral : activeTabId === TAB_IDS.INTERIOR ? styles.houseInterior : styles.houseConectividad
          } ${isEditMode ? styles.houseEdit : ''}`}
          ref={houseRef}
          onPointerMove={handlePointPointerMove}
          onPointerUp={handlePointPointerUp}
          onPointerCancel={handlePointPointerUp}
          aria-label="Mapa interactivo"
        >
          {points.map((point) => {
            const pos = positionsForTab[point.id];
            if (!pos) return null;

            const isActive = point.id === activePointId;
            const scaledPosition = {
              top: Math.round(pos.top * houseScale.y),
              left: Math.round(pos.left * houseScale.x)
            };

            return (
              <button
                key={point.id}
                ref={(node) => {
                  if (node) pointRefs.current[point.id] = node;
                }}
                type="button"
                className={`${styles.pointButton} ${isActive ? styles.pointActive : ''} ${isEditMode ? styles.pointEdit : ''}`}
                style={{
                  top: `${scaledPosition.top}px`,
                  left: `${scaledPosition.left}px`
                }}
                onClick={() => handlePointClick(point.id)}
                onPointerDown={(event) => handlePointPointerDown(point.id, event)}
                aria-label={point.label}
              >
                <span className={styles.ellipse2} aria-hidden="true">
                  <span className={styles.ellipse3} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.techCardGroup} aria-label="Detalle de tecnología">
          <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={goPrev} disabled={slides.length <= 1}>
            <Image src="/image/mq09ahtz-s5clq9f.png" alt="" width={30} height={18} />
          </button>

          <div className={styles.techCardViewport} aria-live="polite">
            {previousSlide ? renderSlideContent(previousSlide, getCardClassName('previous')) : null}
            {renderSlideContent(currentSlide, getCardClassName('active'))}
          </div>

          <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={goNext} disabled={slides.length <= 1}>
            <Image src="/image/mq09ahtz-nh24f3r.png" alt="" width={30} height={17} />
          </button>
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
          <div className={styles.techEditorGrid}>
            {points.map((point) => (
              <label key={point.id} className={styles.techEditorLabel}>
                <span className={styles.techEditorLabelText}>{point.label}</span>
                <select
                  className={styles.techEditorSelect}
                  value={mappingForTab[point.id] ?? 0}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setPointToSlide((prev) => ({
                      ...prev,
                      [activeTabId]: {
                        ...(prev[activeTabId] ?? {}),
                        [point.id]: value
                      }
                    }));
                    if (point.id === activePointId) {
                      startTransition(value, getDirection(activeIndexRef.current, value));
                    }
                  }}
                >
                  {slides.map((slide, index) => (
                    <option key={slide.id} value={index}>
                      {slide.title}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
