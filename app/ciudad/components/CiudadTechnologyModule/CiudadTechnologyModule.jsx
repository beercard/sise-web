'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  getDirection,
  getPointPercentPosition,
  useAreaScale,
  useSlideTransition,
  useTechEditor
} from '../../../lib/hooks';

import TechCard from '../../../components/TechCard/TechCard';

import styles from '../../page.module.scss';

const STORAGE_KEY = 'sise-ciudad-tech-editor-v2';
const HOUSE_BASE_WIDTH = 2528;
const HOUSE_BASE_HEIGHT = 1682;

const TAB_IDS = {
  PERIMETRAL: 'perimetral'
};

const DEFAULT_POSITIONS = {
  perimetral: {
    camarasVigilancia: { top: 609, left: 691 },
    puntosSeguros: { top: 934, left: 1311 },
    paradasSeguras: { top: 895, left: 1577 },
    gpsInstitucional: { top: 916, left: 852 }
  }
};

const HOUSE_BASE_SIZES = {
  perimetral: { width: HOUSE_BASE_WIDTH, height: HOUSE_BASE_HEIGHT }
};

export default function CiudadTechnologyModule() {
  const tabs = useMemo(
    () => [
      {
        id: TAB_IDS.PERIMETRAL,
        label: 'PROTECCIÓN PERIMETRAL',
        houseClassName: styles.housePerimetral,
        points: [
          { id: 'camarasVigilancia', label: 'Cámaras de vigilancia', pointClassName: styles.ellipse1 },
          { id: 'puntosSeguros', label: 'Puntos Seguros', pointClassName: styles.ellipse12 },
          { id: 'paradasSeguras', label: 'Paradas Seguras', pointClassName: styles.ellipse13 },
          { id: 'gpsInstitucional', label: 'GPS institucional', pointClassName: styles.ellipse14 }
        ],
        slides: [
          {
            id: 'camarasVigilancia',
            title: 'Cámaras de vigilancia',
            text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
            mobileTall: true,
            /* Mobile (Figma 3151:2492): salto de línea manual "Cámaras" / "de vigilancia". */
            mobileTitleLines: ['Cámaras', 'de vigilancia'],
            styleVars: {
              '--tech-card-padding': '42px 83px 27px',
              '--tech-card-align-items': 'center',
              '--tech-card-title-width': '276px',
              '--tech-card-title-height': '63px',
              '--tech-card-title-min-height': '63px',
              '--tech-card-text-width': '276px',
              '--tech-card-text-margin': '17px 0 0',
              '--tech-card-image-width': '143px',
              '--tech-card-image-height': '143px',
              '--tech-card-art-margin-top': '6px',
              /* Mobile (Figma 3151:2505): geometría propia de esta card. */
              '--tech-card-mobile-title-top': '39px',
              '--tech-card-mobile-text-top': '94px',
              '--tech-card-mobile-text-width': '181px',
              '--tech-card-mobile-art-top': '180px',
              '--tech-card-mobile-art-width': '102px',
              '--tech-card-mobile-art-height': '102px'
            },
            art: { type: 'image', src: '/image/mq1kcwk1-m8n3v94.png', width: 143, height: 143 }
          },
          {
            id: 'puntosSeguros',
            title: 'Puntos Seguros',
            text: 'Espacios equipados y monitoreados que permiten solicitar asistencia ante emergencias, conectados al centro de monitoreo.',
            mobileTall: true,
            /* Mobile (Figma 3182:469): texto más corto que el de escritorio, con el mismo
               corte de línea de Figma (mobileTextLines fija el salto para que el navegador
               no agregue una línea extra por diferencias de métricas de fuente). */
            mobileText: 'Permiten solicitar asistencia ante emergencias, conectados al centro de monitoreo.',
            mobileTextLines: [
              'Permiten solicitar',
              'asistencia ante',
              'emergencias, conectados',
              'al centro de monitoreo.'
            ],
            styleVars: {
              '--tech-card-padding': '42px 83px 18px',
              '--tech-card-align-items': 'center',
              '--tech-card-title-width': '276px',
              '--tech-card-title-height': '31px',
              '--tech-card-title-min-height': '31px',
              /* Desktop (Figma 2215:1039): el cuerpo es más ancho que el título,
                 no queda acotado a los mismos 276px. Figma mide la caja en
                 387px, pero la línea más larga necesita 392.3px con League
                 Spartan a 20px en el navegador, así que se ensancha un poco
                 más para no meter una línea de más. */
              '--tech-card-text-width': '395px',
              '--tech-card-text-max-width': '395px',
              '--tech-card-text-margin': '8px 0 0',
              '--tech-card-art-justify-content': 'center',
              '--tech-card-image-width': '126px',
              '--tech-card-image-height': '188px',
              '--tech-card-image-fixed-width': '126px',
              '--tech-card-image-fixed-height': '188px',
              '--tech-card-art-margin-top': '11px',
              '--tech-card-mobile-title-top': '38px',
              '--tech-card-mobile-text-top': '72px',
              '--tech-card-mobile-text-width': '190px',
              '--tech-card-mobile-art-top': '152px',
              '--tech-card-mobile-art-width': '89px',
              '--tech-card-mobile-art-height': '133px'
            },
            art: { type: 'image', src: '/image/mq1ip4u2-z1dsbza.png', width: 126, height: 188 }
          },
          {
            id: 'paradasSeguras',
            title: 'Paradas Seguras',
            text: 'Infraestructura de seguridad en transporte público que mejora la protección de los usuarios.',
            mobileTall: true,
            /* Mobile (Figma 3182:470): texto más corto que el de escritorio, con el mismo
               corte de línea de Figma (mobileTextLines fija el salto para que el navegador
               no agregue una línea extra por diferencias de métricas de fuente). */
            mobileText: 'Infraestructura en transporte público que mejora la protección de los usuarios.',
            mobileTextLines: [
              'Infraestructura en',
              'transporte público que',
              'mejora la protección',
              'de los usuarios.'
            ],
            styleVars: {
              '--tech-card-padding': '42px 83px 19px',
              '--tech-card-align-items': 'center',
              '--tech-card-title-width': '276px',
              '--tech-card-title-height': '31px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-width': '276px',
              '--tech-card-text-margin': '8px 0 0',
              '--tech-card-art-justify-content': 'center',
              '--tech-card-image-width': '103px',
              '--tech-card-image-height': '187px',
              '--tech-card-image-fixed-width': '103px',
              '--tech-card-image-fixed-height': '187px',
              '--tech-card-art-margin-top': '11px',
              '--tech-card-mobile-title-top': '38px',
              '--tech-card-mobile-text-top': '72px',
              '--tech-card-mobile-text-width': '172px',
              '--tech-card-mobile-art-top': '166px',
              '--tech-card-mobile-art-width': '63px',
              '--tech-card-mobile-art-height': '113px'
            },
            art: { type: 'image', src: '/image/mq1ip4zv-p0t8sua.png', width: 103, height: 187 }
          },
          {
            id: 'gpsInstitucional',
            title: 'GPS institucional',
            text: 'Control y seguimiento de flota pública, optimizando recursos y detectando desvíos.',
            mobileTall: true,
            styleVars: {
              '--tech-card-padding': '42px 83px 19px',
              '--tech-card-align-items': 'center',
              '--tech-card-title-width': '276px',
              '--tech-card-title-height': '31px',
              '--tech-card-title-min-height': '31px',
              /* Desktop (Figma 2217:1049): el cuerpo es más ancho que el título,
                 no queda acotado a los mismos 276px. Figma mide la caja en
                 359px, pero la línea más larga necesita 364px con League
                 Spartan a 20px en el navegador, así que se ensancha un poco
                 más para no meter una línea de más. */
              '--tech-card-text-width': '368px',
              '--tech-card-text-max-width': '368px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-frame-width': '244px',
              '--tech-card-frame-height': '212px',
              '--tech-card-frame-max-width': '244px',
              '--tech-card-frame-bg-size': '100% 148%',
              '--tech-card-frame-bg-position': 'center top',
              /* Mobile (Figma 3182:471): la captura se ve en blanco y negro. */
              '--tech-card-mobile-frame-filter': 'grayscale(1)',
              '--tech-card-mobile-title-top': '38px',
              '--tech-card-mobile-text-top': '76px',
              '--tech-card-mobile-text-width': '167px',
              '--tech-card-mobile-art-top': '150px',
              '--tech-card-mobile-art-width': '153px',
              '--tech-card-mobile-art-height': '133px'
            },
            art: {
              type: 'gps',
              overlaySrc: '/image/mq1ip585-5gdqo05.png',
              overlayWidth: 143,
              overlayHeight: 143,
              overlayTop: '46%',
              overlayLeft: '50%',
              overlayTransform: 'translate(-50%, -50%)',
              backgroundSrc: '/image/mq1ip585-5mj0wb5.webp',
              cornerSrc: '/image/mq1ip584-5xtsqf8.svg',
              cornerWidth: 18,
              cornerHeight: 11
            }
          }
        ]
      }
    ],
    []
  );

  const [activeTabId, setActiveTabId] = useState(TAB_IDS.PERIMETRAL);
  const [activePointId, setActivePointId] = useState('camarasVigilancia');
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
    Object.keys(mappingForTab).forEach((pointId) => {
      const index = mappingForTab[pointId];
      if (typeof index !== 'number') return;
      reverse[index] = pointId;
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
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleDesktop}>
          <span className={styles.technologyTitleLight}>Tecnología avanzada para la prevención y</span>
          <br />
          <span className={styles.technologyTitleStrong}>el control del espacio urbano.</span>
        </span>
        <span className={styles.technologyTitleMobile}>
          <span className={styles.technologyTitleLight}>Tecnología avanzada para</span>
          <br />
          <span className={styles.technologyTitleLight}>la prevención y</span>
          <br />
          <span className={styles.technologyTitleStrong}>el control del espacio urbano.</span>
        </span>
      </h2>

      <div className={styles.tabs} role="tablist" aria-label="Categorías de protección">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const underlineClassName = styles.tabUnderlinePerimetral;

          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${isActive ? styles.tabActive : ''} ${isActive ? underlineClassName : ''}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                if (tab.id === activeTabId) return;
                resetTo(0);
                setActiveTabId(tab.id);
                setTabNonce((nonce) => nonce + 1);
                const firstPoint = tabs.find((item) => item.id === tab.id)?.points?.[0];
                setActivePointId(firstPoint?.id ?? null);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.technologyRow} data-anim={tabNonce}>
        <div
          className={`${styles.house} ${activeTab.houseClassName} ${isEditMode ? styles.houseEdit : ''}`}
          ref={houseRef}
          aria-label="Mapa interactivo"
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
                style={pointStyle ?? undefined}
                aria-label={point.label}
                aria-pressed={isActive}
                onClick={() => setActivePointId(point.id)}
                onPointerDown={(event) => handlePointPointerDown(point.id, event)}
              >
                <span className={styles.ellipse2} aria-hidden="true">
                  <span className={styles.ellipse3} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.techCardGroup} aria-label="Detalle de tecnología">
          {allowNav ? (
            <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={goPrev}>
              <Image src="/image/mpudc5hg-jng7cpc.png" alt="" width={30} height={18} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}

          <div className={`${styles.techCardViewport} ${styles.tabFadeIn}`} key={`${activeTabId}-${tabNonce}`}>
            {previousSlide ? renderCard(previousSlide, 'exit') : null}
            {currentSlide ? renderCard(currentSlide, 'enter') : null}
          </div>

          {allowNav ? (
            <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={goNext}>
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
