'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  getPointPercentPosition,
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

const STORAGE_KEY = 'sise-edificios-tech-editor-v2';
const HOUSE_BASE_WIDTH = 735;
const HOUSE_BASE_HEIGHT = 511;

const DEFAULT_POSITIONS = {
  perimetral: {
    camaras: { top: 359, left: 178 },
    sirena: { top: 347, left: 179 },
    cartel: { top: 387, left: 293 },
    cerco: { top: 233, left: 631 },
    guardia: { top: 256, left: 38 },
    magneticos: { top: 397, left: 243 }
  },
  interior: {
    camaras: { top: 101, left: 456 },
    sensor: { top: 108, left: 520 },
    teclado: { top: 289, left: 371 },
    mando: { top: 378, left: 343 },
    central: { top: 257, left: 371 },
    acceso: { top: 327, left: 268 }
  },
  conectividad: {
    app: { top: 390, left: 333 }
  }
};

const HOUSE_BASE_SIZES = {
  perimetral: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT },
  interior: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT },
  conectividad: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT }
};

export default function EdificiosTechnologyModule() {
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
        { id: 'sirena', label: 'Sirena exterior' },
        { id: 'cartel', label: 'Cartel disuasivo' },
        { id: 'cerco', label: 'Cerco eléctrico perimetral' },
        { id: 'guardia', label: 'Guardia virtual' },
        { id: 'magneticos', label: 'Magnéticos' }
      ];
    }

    if (activeTabId === TAB_IDS.INTERIOR) {
      return [
        { id: 'camaras', label: 'Cámaras de vigilancia' },
        { id: 'sensor', label: 'Sensor de movimiento' },
        { id: 'teclado', label: 'Teclado de configuración' },
        { id: 'mando', label: 'Mando a distancia' },
        { id: 'central', label: 'Central con comunicador' },
        { id: 'acceso', label: 'Control de acceso' }
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
            '--tech-card-title-line-height': '32px',
            '--tech-card-text-line-height': '20px',
            '--tech-card-image-width': '192px',
            '--tech-card-image-height': '117px',
            '--tech-card-art-margin-top': '-6px'
          },
          art: { type: 'image', src: '/image/mpvuunzj-551nhie.png', width: 192, height: 117 }
        },
        {
          id: 'sirena',
          title: 'Sirena exterior',
          text: 'Alerta sonora de alto alcance que ahuyenta intrusos y activa la atención del entorno.',
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
            '--tech-card-art-margin-top': '14px'
          },
          art: { type: 'image', src: '/image/sirena-exterior.webp', width: 91, height: 149 }
        },
        {
          id: 'cartel',
          title: 'Cartel disuasivo',
          text: 'Refuerza visualmente la seguridad del lugar e informa protección monitoreada.',
          styleVars: {
            '--tech-card-padding': '48px 82px 51px 84px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-text-margin': '12px 0 0',
            '--tech-card-image-width': '139px',
            '--tech-card-image-height': '147px',
            '--tech-card-art-margin-top': '9px'
          },
          art: { type: 'image', src: '/image/mpvxvwmp-fq0hs19.png', width: 139, height: 147 }
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
            '--tech-card-art-margin-top': '0px'
          },
          art: { type: 'image', src: '/image/mpudc5hr-kxw5icp.png', width: 215, height: 154 }
        },
        {
          id: 'guardia',
          title: 'Guardia Virtual',
          text: 'Supervisión remota 24/7 de accesos y espacios comunes, con intervención ante eventos y asistencia en tiempo real.',
          styleVars: {
            '--tech-card-padding': '51px 51px 18px 52px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '36px',
            '--tech-card-title-min-height': '36px',
            '--tech-card-text-width': '339px',
            '--tech-card-text-margin': '4px 0 0',
            '--tech-card-image-width': '198px',
            '--tech-card-image-height': '174px',
            '--tech-card-art-margin-top': '8px'
          },
          art: { type: 'image', src: '/image/mq09ajcr-z6zrehs.png', width: 198, height: 174 }
        },
        {
          id: 'magneticos',
          title: 'Magnéticos',
          text: 'Protección inteligente en puertas y ventanas con alerta inmediata ante aperturas.',
          styleVars: {
            '--tech-card-padding': '48px 84px 33px 82px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-text-margin': '12px 0 0 7px',
            '--tech-card-text-width': '265px',
            '--tech-card-image-width': '160px',
            '--tech-card-image-height': '160px',
            '--tech-card-art-margin-top': '14px'
          },
          art: { type: 'image', src: '/image/mpvxvi4u-1mah6ht.png', width: 160, height: 160 }
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
            '--tech-card-title-line-height': '32px',
            '--tech-card-text-line-height': '20px',
            '--tech-card-image-width': '192px',
            '--tech-card-image-height': '117px',
            '--tech-card-art-margin-top': '-6px'
          },
          art: { type: 'image', src: '/image/mpvuunzj-551nhie.png', width: 192, height: 117 }
        },
        {
          id: 'sensor',
          title: 'Sensor de movimiento',
          text: 'Detecta movimientos sospechosos y activa el sistema de alerta automáticamente.',
          styleVars: {
            '--tech-card-padding': '35px 83px 13px',
            '--tech-card-text-margin': '11px 0 0',
            '--tech-card-text-width': '273px',
            '--tech-card-image-width': '193px',
            '--tech-card-image-height': '180px'
          },
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
          styleVars: {
            '--tech-card-padding': '35px 83px 12px',
            '--tech-card-text-margin': '11px 0 0',
            '--tech-card-image-width': '201px',
            '--tech-card-image-height': '188px',
            '--tech-card-text-width': '216px',
            '--tech-card-art-margin-top': '-12px'
          },
          art: { type: 'absolute', src: '/image/mpvxxyfe-psjzek1.webp', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
        },
        {
          id: 'mando',
          title: 'Mando a distancia',
          text: 'Activá o desactivá tu sistema con comodidad.',
          styleVars: {
            '--tech-card-padding': '48px 83px 13px',
            '--tech-card-text-width': '216px',
            '--tech-card-text-margin': '21px 0 0',
            '--tech-card-image-width': '174px',
            '--tech-card-image-height': '163px',
            '--tech-card-art-margin-top': '-22px'
          },
          art: { type: 'absolute', src: '/image/mpvxy7bq-mohx126.png', width: 174, height: 163, top: 159, left: 131, rotate: 16 }
        },
        {
          id: 'central',
          title: 'Central con comunicador',
          text: 'Tecnología centralizada que conecta, procesa y reporta cada evento de seguridad.',
          styleVars: {
            '--tech-card-padding': '35px 83px 22px',
            '--tech-card-align-items': 'flex-start',
            '--tech-card-text-width': '246px',
            '--tech-card-text-margin': '13px 0 0 15px',
            '--tech-card-image-width': '219px',
            '--tech-card-image-height': '156px'
          },
          art: { type: 'image', src: '/image/mpvxygrd-lio0o1u.png', width: 219, height: 156 }
        },
        {
          id: 'acceso',
          title: 'Control de acceso',
          text: 'Gestión de ingresos del personal mediante tarjetas, biometría o reconocimiento facial, con control de horarios y presencia.',
          styleVars: {
            '--tech-card-padding': '48px 43px 22px',
            '--tech-card-title-width': '241px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-text-width': '355px',
            '--tech-card-text-margin': '11px 0 0',
            '--tech-card-art-margin-top': '14px',
            '--tech-card-image-width': '94px',
            '--tech-card-image-height': '176px',
            '--tech-card-image-align-self': 'center'
          },
          art: { type: 'image', src: '/image/mpvxz539-e73c1z1.png', width: 94, height: 176 }
        }
      ];
    }

    return [
      {
        id: 'app',
        title: 'Control desde el celular',
        text: 'Administrá tu sistema, recibí notificaciones y monitoreá tu hogar o negocio estés donde estés.',
        styleVars: {
          '--tech-card-padding': '42px 74px 20px',
          '--tech-card-align-items': 'center',
          '--tech-card-title-width': '201px',
          '--tech-card-title-height': '63px',
          '--tech-card-title-min-height': '63px',
          '--tech-card-text-width': '293px',
          '--tech-card-text-margin': '17px 0 0',
          '--tech-card-frame-width': '183px',
          '--tech-card-frame-height': '158px',
          '--tech-card-frame-max-width': '183px',
          '--tech-card-frame-bg-position': '0 -1px',
          '--tech-card-frame-bg-size': '100% 151.77%',
          '--tech-card-frame-filter': 'grayscale(1)',
          '--tech-card-frame-bar-color': '#250f7f'
        },
        art: {
          type: 'connectivity',
          bar: true,
          backgroundSrc: '/image/mq09bjsp-72d3sht.webp',
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

  const { getScale } = useAreaScale({
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
    setActivePointId(tabId === TAB_IDS.CONECTIVIDAD ? 'app' : 'camaras');
  };

  return (
    <section className={styles.technology} aria-label="Seguridad y eficiencia operativa para tu consorcio">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Seguridad y eficiencia operativa</span>
        <br />
        <span className={styles.technologyTitleLight}>para tu consorcio.</span>
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
            const pointStyle = getPointPercentPosition(pos, HOUSE_BASE_SIZES[activeTabId]);

            return (
              <button
                key={point.id}
                ref={(node) => {
                  if (node) pointRefs.current[point.id] = node;
                }}
                type="button"
                className={`${styles.pointButton} ${isActive ? styles.pointActive : ''} ${isEditMode ? styles.pointEdit : ''}`}
                style={pointStyle ?? undefined}
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
          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={goPrev}>
              <Image src="/image/mq09ahtz-s5clq9f.png" alt="" width={30} height={18} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}

          <div className={styles.techCardViewport} aria-live="polite">
            {previousSlide ? renderSlideContent(previousSlide, getCardClassName('previous')) : null}
            {renderSlideContent(currentSlide, getCardClassName('active'))}
          </div>

          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={goNext}>
              <Image src="/image/mq09ahtz-nh24f3r.png" alt="" width={30} height={17} />
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
