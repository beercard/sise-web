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

const DEFAULT_POINT_TO_SLIDE = {
  perimetral: { camaras: 0, magneticos: 1, cartel: 2, sirena: 3, cerco: 4 },
  interior: { camaras: 0, sensor: 1, teclado: 2, mando: 3, central: 4 },
  conectividad: { app: 0 }
};

export default function ConstruccionTechnologyModule() {
  const tabs = useMemo(
    () => [
      { id: TAB_IDS.PERIMETRAL, label: 'PROTECCIÓN PERIMETRAL' },
      { id: TAB_IDS.INTERIOR, label: 'PROTECCIÓN INTERIOR' },
      { id: TAB_IDS.CONECTIVIDAD, label: 'CONECTIVIDAD' }
    ],
    []
  );

  const [activeTabId, setActiveTabId] = useState(TAB_IDS.PERIMETRAL);
  const [activePointId, setActivePointId] = useState('camaras');
  const [tabNonce, setTabNonce] = useState(0);

  const houseRef = useRef(null);

  const points = useMemo(() => {
    if (activeTabId === TAB_IDS.PERIMETRAL) {
      return [
        { id: 'camaras', label: 'Cámaras de vigilancia', pointClassName: styles.ellipse1 },
        { id: 'magneticos', label: 'Magnéticos', pointClassName: styles.ellipse12 },
        { id: 'cartel', label: 'Cartel disuasivo', pointClassName: styles.ellipse13 },
        { id: 'sirena', label: 'Sirena exterior', pointClassName: styles.ellipse14 },
        { id: 'cerco', label: 'Cerco eléctrico perimetral', pointClassName: styles.ellipse15 }
      ];
    }

    if (activeTabId === TAB_IDS.INTERIOR) {
      return [
        { id: 'camaras', label: 'Cámaras de vigilancia', pointClassName: styles.ellipse1 },
        { id: 'sensor', label: 'Sensor de movimiento', pointClassName: styles.ellipse12 },
        { id: 'teclado', label: 'Teclado de configuración', pointClassName: styles.ellipse13 },
        { id: 'mando', label: 'Mando a distancia', pointClassName: styles.ellipse14 },
        { id: 'central', label: 'Central con comunicador', pointClassName: styles.ellipse15 }
      ];
    }

    return [{ id: 'app', label: 'Control desde el celular', pointClassName: styles.ellipse13 }];
  }, [activeTabId]);

  const slides = useMemo(() => {
    if (activeTabId === TAB_IDS.PERIMETRAL) {
      return [
        {
          id: 'camaras',
          title: 'Cámaras de vigilancia',
          text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
          mobileTitleLines: ['Cámaras', 'de vigilancia'],
          mobileTextLines: ['Supervisión en tiempo', 'real y grabación', 'continua para mayor', 'control y tranquilidad.'],
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
          id: 'magneticos',
          title: 'Magnéticos',
          text: 'Protección inteligente en puertas y ventanas con alerta inmediata ante aperturas.',
          mobileTextLines: ['Protección inteligente', 'en puertas y ventanas', 'con alerta inmediata', 'ante aperturas.'],
          mobileTall: true,
          mobileViewport: 'tall',
          styleVars: {
            '--tech-card-padding': '48px 84px 33px 82px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-text-margin': '12px 0 0 7px',
            '--tech-card-text-width': '265px',
            '--tech-card-image-width': '160px',
            '--tech-card-image-height': '160px',
            '--tech-card-art-margin-top': '14px',
            '--tech-card-mobile-title-top': '44px',
            '--tech-card-mobile-title-width': '168px',
            '--tech-card-mobile-text-top': '81px',
            '--tech-card-mobile-text-width': '171px',
            '--tech-card-mobile-art-top': '173px',
            '--tech-card-mobile-art-width': '111px',
            '--tech-card-mobile-art-height': '111px'
          },
          mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
          art: { type: 'image', src: '/image/mpvxvi4u-1mah6ht.png', width: 160, height: 160 }
        },
        {
          id: 'cartel',
          title: 'Cartel disuasivo',
          text: 'Refuerza visualmente la seguridad del lugar e informa protección monitoreada.',
          mobileTitleLines: ['Cartel', 'disuasivo'],
          mobileTextLines: ['Refuerza visualmente', 'la seguridad del lugar', 'e informa protección', 'monitoreada.'],
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
          id: 'sirena',
          title: 'Sirena exterior',
          text: 'Alerta sonora de alto alcance que ahuyenta intrusos y activa la atención del entorno.',
          mobileTitleLines: ['Sirena', 'exterior'],
          mobileTextLines: ['Alerta sonora de alto', 'alcance que ahuyenta', 'intrusos y activa la', 'atención del entorno.'],
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
        },
        {
          id: 'cerco',
          title: 'Cerco eléctrico perimetral',
          text: 'Primera barrera de seguridad que protege tu propiedad y disuade ingresos no autorizados.',
          mobileTitleLines: ['Cerco eléctrico', 'perimetral'],
          mobileTextLines: [
            'Primera barrera de',
            'seguridad que protege tu',
            'propiedad y disuade',
            'ingresos no autorizados.'
          ],
          mobileTall: true,
          mobileViewport: 'tall',
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
            '--tech-card-art-margin-top': '0px',
            '--tech-card-mobile-title-top': '36px',
            '--tech-card-mobile-title-width': '187px',
            '--tech-card-mobile-text-top': '88px',
            '--tech-card-mobile-text-width': '201px',
            '--tech-card-mobile-art-top': '165px',
            '--tech-card-mobile-art-width': '155px',
            '--tech-card-mobile-art-height': '111px'
          },
          mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
          art: { type: 'image', src: '/image/mpudc5hr-kxw5icp.png', width: 215, height: 154 }
        }
      ];
    }

    if (activeTabId === TAB_IDS.INTERIOR) {
      return [
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
          mobileShell: {
            width: '201px',
            height: '300px',
            top: '0px',
            left: '0px',
            background: '#D9D9D9',
            borderRadius: '22px'
          },
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
        },
        {
          id: 'central',
          title: 'Central con comunicador',
          text: 'Tecnología centralizada que conecta, procesa y reporta cada evento de seguridad.',
          mobileTextLines: ['Tecnología centralizada', 'que conecta, procesa y', 'reporta cada evento de', 'seguridad.'],
          mobileTall: true,
          mobileViewport: 'tall',
          styleVars: {
            '--tech-card-padding': '35px 83px 22px',
            '--tech-card-align-items': 'flex-start',
            '--tech-card-text-width': '246px',
            '--tech-card-text-margin': '13px 0 0 15px',
            '--tech-card-image-width': '219px',
            '--tech-card-image-height': '156px',
            '--tech-card-mobile-title-top': '36px',
            '--tech-card-mobile-title-width': '187px',
            '--tech-card-mobile-text-top': '84px',
            '--tech-card-mobile-text-width': '174px',
            '--tech-card-mobile-art-top': '175px',
            '--tech-card-mobile-art-width': '150px',
            '--tech-card-mobile-art-height': '107px'
          },
          mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
          art: { type: 'image', src: '/image/mpvxygrd-lio0o1u.png', width: 219, height: 156 }
        }
      ];
    }

    return [
      {
        id: 'app',
        title: 'Control desde el celular',
        text: 'Administrá tu sistema, recibí notificaciones y monitoreá tu hogar o negocio estés donde estés.',
        mobileTitleLines: ['Control desde', 'el celular'],
        mobileTextLines: ['Administrá tu sistema,', 'recibí notificaciones y', 'monitoreá tu obra', 'estés donde estés.'],
        mobileTall: true,
        mobileViewport: 'tall',
        styleVars: {
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
          '--tech-card-frame-bar-color': '#250f7f',
          '--tech-card-mobile-title-top': '36px',
          '--tech-card-mobile-title-width': '187px',
          '--tech-card-mobile-text-top': '88px',
          '--tech-card-mobile-text-width': '167px',
          '--tech-card-mobile-art-top': '167px',
          '--tech-card-mobile-art-left': '34px',
          '--tech-card-mobile-art-transform': 'none',
          '--tech-card-mobile-art-width': '133.87px',
          '--tech-card-mobile-art-height': '115.58px'
        },
        mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
        art: {
          type: 'connectivity',
          bar: true,
          backgroundSrc: '/image/mq1dsdck-ao77h8o.webp',
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
    defaultMapping: DEFAULT_POINT_TO_SLIDE,
    activeAreaId: activeTabId,
    points,
    areaRef: houseRef,
    pointSize: 30,
    getScale,
    onPointGrabbed: setActivePointId
  });

  const mappingForTab = useMemo(
    () => pointToSlide[activeTabId] ?? DEFAULT_POINT_TO_SLIDE[activeTabId] ?? {},
    [activeTabId, pointToSlide]
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

  const handleSelectPoint = (pointId) => {
    setActivePointId(pointId);
    const mapped = mappingForTab[pointId];
    if (mapped == null) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeTabId) return;
    setActiveTabId(tabId);
    resetTo(0);
    setTabNonce((nonce) => nonce + 1);
    const firstPoint =
      tabId === TAB_IDS.CONECTIVIDAD ? 'app' : tabId === TAB_IDS.INTERIOR ? 'camaras' : 'camaras';
    setActivePointId(firstPoint);
  };

  return (
    <section className={styles.technology} aria-label="Seguridad total para tu desarrollo">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleLight}>Seguridad total</span>
        <br />
        <span className={styles.technologyTitleStrong}>para tu desarrollo.</span>
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
                className={`${styles.pointButton} ${point.pointClassName} ${isActive ? styles.pointActive : ''} ${
                  isEditMode ? styles.pointEdit : ''
                } ${pos ? styles.pointAbsolute : ''}`}
                style={pointStyle ?? undefined}
                onClick={() => handleSelectPoint(point.id)}
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

        <div className={styles.techCardGroup} aria-label="Detalle de tecnología" data-mobile-card-size={currentSlide.mobileViewport ?? 'default'}>
          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Anterior" onClick={handlePrev}>
              <Image src="/image/mq09ahtz-s5clq9f.png" alt="" width={30} height={18} />
            </button>
          ) : (
            <span className={styles.techArrowSpacer} aria-hidden="true" />
          )}

          <div
            className={`${styles.techCardViewport} ${styles.tabFadeIn}`}
            key={`${activeTabId}-${tabNonce}`}
            aria-live="polite"
            data-mobile-card-size={currentSlide.mobileViewport ?? 'default'}
          >
            {previousSlide ? renderSlideContent(previousSlide, getCardClassName('previous')) : null}
            {renderSlideContent(currentSlide, getCardClassName('active'))}
          </div>

          {slides.length > 1 ? (
            <button type="button" className={styles.techArrow} aria-label="Siguiente" onClick={handleNext}>
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
                  onChange={(event) => handleMappingChange(point.id, Number(event.target.value))}
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
