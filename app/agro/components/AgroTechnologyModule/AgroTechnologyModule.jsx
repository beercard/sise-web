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

const STORAGE_KEY = 'sise-agro-tech-editor-v2';
const HOUSE_BASE_WIDTH = 2486;
const HOUSE_BASE_HEIGHT = 1728;
const FIRST_POINT_BY_TAB = {
  perimetral: 'camaraCampo',
  interior: 'camaras',
  conectividad: 'app'
};

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
      { id: TAB_IDS.PERIMETRAL, label: 'PROTECCIÓN PERIMETRAL', underlineClassName: styles.tabUnderlinePerimetral },
      { id: TAB_IDS.INTERIOR, label: 'PROTECCIÓN INTERIOR', underlineClassName: styles.tabUnderlineInterior },
      { id: TAB_IDS.CONECTIVIDAD, label: 'CONECTIVIDAD', underlineClassName: styles.tabUnderlineConectividad }
    ],
    []
  );

  const [activeTabId, setActiveTabId] = useState(TAB_IDS.PERIMETRAL);
  const [activePointId, setActivePointId] = useState('camaraCampo');

  const houseRef = useRef(null);

  const points = useMemo(() => {
    if (activeTabId === TAB_IDS.PERIMETRAL) {
      return [
        { id: 'camaraCampo', label: 'Cámara Campo' },
        { id: 'cartel', label: 'Cartel disuasivo' },
        { id: 'gps', label: 'GPS para maquinarias y vehículos' },
        { id: 'sirena', label: 'Sirena exterior' }
      ];
    }

    if (activeTabId === TAB_IDS.INTERIOR) {
      return [
        { id: 'camaras', label: 'Cámaras de vigilancia' },
        { id: 'sensor', label: 'Sensor de movimiento' },
        { id: 'teclado', label: 'Teclado de configuración' },
        { id: 'mando', label: 'Mando a distancia' }
      ];
    }

    return [{ id: 'app', label: 'Control desde el celular' }];
  }, [activeTabId]);

  const slides = useMemo(() => {
    const camaraCampoSlide = {
      id: 'camaraCampo',
      title: 'Cámara Campo',
      text: 'Sistema autónomo con energía solar y conectividad integrada, ideal para campos sin internet ni electricidad.',
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
        '--tech-card-image-margin-top': '14px',
        '--tech-card-image-margin-left': '0px'
      },
      art: { type: 'image', src: '/image/mq1fh69q-ch04lu8.webp', width: 214, height: 160 }
    };

    if (activeTabId === TAB_IDS.PERIMETRAL) {
      return [
        camaraCampoSlide,
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
          art: { type: 'image', src: '/image/mq1gm7ls-z6pi85x.png', width: 139, height: 147 }
        },
        {
          id: 'gps',
          title: 'GPS para maquinarias y vehículos',
          text: 'Seguimiento y control de flota para optimizar recursos y prevenir pérdidas.',
          styleVars: {
            '--tech-card-padding': '43px 61px 203px 60px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '313px',
            '--tech-card-title-height': '63px',
            '--tech-card-title-min-height': '63px',
            '--tech-card-text-width': '321px',
            '--tech-card-text-margin': '9px 0 0'
          },
          art: { type: 'gps', backgroundSrc: '/image/mq1gm8sq-6kvccdt.webp', wrapperWidth: 221, wrapperHeight: 187, wrapperMarginTop: 32 }
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
            backgroundSrc: '/image/mq1gm7lv-xdsoke2.webp',
            wrapperHeight: 149,
            wrapperMarginX: 93,
            wrapperPadding: { top: 123, right: 4, bottom: 2, left: 18 },
            wrapperMarginTop: 14,
            iconSrc: '/image/mq1gm7lu-2zhcm9y.svg',
            iconWidth: 69,
            iconHeight: 24
          }
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
          art: { type: 'image', src: '/image/mq1gmtu2-xhnipxz.png', width: 192, height: 117 }
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
            image: { src: '/image/mq1gmtvw-yhlqlci.png', width: 193, height: 180 }
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
          art: { type: 'absolute', src: '/image/mq1gmu17-f1qjeh4.webp', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
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
          art: { type: 'absolute', src: '/image/mq1gmu3k-q9hvwgd.png', width: 168, height: 157, top: 150, left: 136, rotate: 16 }
        }
      ];
    }

    if (activeTabId === TAB_IDS.CONECTIVIDAD) {
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
            backgroundSrc: '/image/mq1gn9bk-jxd0t66.webp',
            wrapperWidth: 183,
            wrapperHeight: 158,
            wrapperMarginTop: 74,
            text: { top: -57, right: -55, width: 292 }
          }
        }
      ];
    }

    return [camaraCampoSlide];
  }, [activeTabId]);

  const {
    activeIndex,
    previousIndex,
    direction,
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
  const getDirection = useCallback(
    (fromIndex, toIndex) => {
      if (slides.length <= 1) return 'next';
      const forward = (toIndex - fromIndex + slides.length) % slides.length;
      const backward = (fromIndex - toIndex + slides.length) % slides.length;
      return forward <= backward ? 'next' : 'prev';
    },
    [slides.length]
  );

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

  const currentSlide = slides[activeIndex] ?? slides[0];
  const previousSlide = previousIndex == null ? null : slides[previousIndex];
  const allowNav = slides.length > 1;

  const effectiveMapSrc =
    activeTabId === TAB_IDS.PERIMETRAL ? '/image/mq1fh69q-v0j7c7r.webp' : '/image/mq1fh69q-v0j7c7r.webp';

  const renderCard = (slide, state) => (
    <TechCard
      key={`${slide.id ?? slide.key}-${state}`}
      slide={slide}
      className={
        state === 'enter'
          ? direction === 'next'
            ? styles.techCardEnterRight
            : styles.techCardEnterLeft
          : state === 'exit'
            ? direction === 'next'
              ? styles.techCardExitLeft
              : styles.techCardExitRight
            : ''
      }
    />
  );

  return (
    <section className={styles.technology} aria-label="Tecnologías">
      <div className={styles.technologyInner}>
        <h2 className={styles.technologyTitle}>
          <span className={styles.technologyTitleStrong}>Seguridad total </span>
          <span className={styles.technologyTitleLight}>para tu negocio,</span>
          <br />
          <span className={styles.technologyTitleLight}>en todo momento</span>
        </h2>

        <div className={styles.tabs} role="tablist" aria-label="Categorías de protección">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  resetTo(0);
                  setActiveTabId(tab.id);
                  setActivePointId(FIRST_POINT_BY_TAB[tab.id] ?? points[0]?.id ?? '');
                }}
              >
                {tab.label}
                {isActive ? <span className={`${styles.tabUnderline} ${tab.underlineClassName ?? ''}`} /> : null}
              </button>
            );
          })}
        </div>

        <div className={styles.techBody}>
          <div className={styles.techHouseColumn}>
            <div className={styles.houseViewport}>
              <div className={styles.house} ref={houseRef}>
                <Image
                  src={effectiveMapSrc}
                  alt="Plano interactivo de seguridad para el campo con cámaras y sensores"
                  className={styles.houseImage}
                  width={HOUSE_BASE_WIDTH}
                  height={HOUSE_BASE_HEIGHT}
                  sizes="(max-width: 960px) 100vw, 735px"
                  style={{ width: '100%', height: 'auto' }}
                  priority={activeTabId === TAB_IDS.PERIMETRAL}
                />

                {(points ?? []).map((point) => {
                  const pos = positionsForTab?.[point.id];
                  if (!pos) return null;
                  const left = pos.left * houseScale.x;
                  const top = pos.top * houseScale.y;

                  return (
                    <button
                      key={point.id}
                      type="button"
                      className={`${styles.pointButton} ${activePointId === point.id ? styles.pointActive : ''} ${
                        isEditMode ? styles.pointEdit : ''
                      }`}
                      style={{ left: `${left}px`, top: `${top}px` }}
                      aria-label={point.label}
                      onClick={() => setActivePointId(point.id)}
                      onPointerDown={(event) => handlePointPointerDown(point.id, event)}
                      onPointerMove={handlePointPointerMove}
                      onPointerUp={handlePointPointerUp}
                      onPointerCancel={handlePointPointerUp}
                      ref={(node) => {
                        if (node) pointRefs.current[point.id] = node;
                      }}
                    >
                      <span className={styles.ellipse2} aria-hidden="true">
                        <span className={styles.ellipse3} aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
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
          </div>

          <div className={styles.techCardGroup} aria-label="Detalle de tecnología">
            <button
              type="button"
              className={`${styles.techCardArrow} ${styles.techCardArrowLeft}`}
              aria-label="Anterior"
              onClick={goPrev}
              disabled={!allowNav}
            >
              <span aria-hidden="true" />
            </button>

            <div className={styles.techCardViewport}>
              {previousSlide ? renderCard(previousSlide, 'exit') : null}
              {currentSlide ? renderCard(currentSlide, 'enter') : null}
            </div>

            <button
              type="button"
              className={`${styles.techCardArrow} ${styles.techCardArrowRight}`}
              aria-label="Siguiente"
              onClick={goNext}
              disabled={!allowNav}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
