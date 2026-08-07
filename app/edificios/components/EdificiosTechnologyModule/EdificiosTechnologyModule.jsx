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

const STORAGE_KEY = 'sise-edificios-tech-editor-v2';
const HOUSE_BASE_WIDTH = 735;
const HOUSE_BASE_HEIGHT = 511;

const DEFAULT_POSITIONS = {
  perimetral: {
    camaras: { top: 256, left: 39 },
    sirena: { top: 349, left: 180 },
    cartel: { top: 314, left: 179 },
    cerco: { top: 229, left: 633 },
    guardia: { top: 391, left: 294 },
    magneticos: { top: 396, left: 244 }
  },
  interior: {
    camaras: { top: 101, left: 456 },
    sensor: { top: 108, left: 520 },
    teclado: { top: 289, left: 371 },
    mando: { top: 378, left: 343 },
    central: { top: 245, left: 371 },
    acceso: { top: 321, left: 270 }
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
      {
        id: TAB_IDS.PERIMETRAL,
        label: 'PROTECCIÓN PERIMETRAL',
        houseClassName: styles.housePerimetral,
        points: [
          { id: 'camaras', label: 'Cámaras de vigilancia', pointClassName: styles.ellipse1 },
          { id: 'sirena', label: 'Sirena exterior', pointClassName: styles.ellipse12 },
          { id: 'cartel', label: 'Cartel disuasivo', pointClassName: styles.ellipse13 },
          { id: 'cerco', label: 'Cerco eléctrico perimetral', pointClassName: styles.ellipse14 },
          { id: 'guardia', label: 'Guardia virtual', pointClassName: styles.ellipse15 },
          { id: 'magneticos', label: 'Magnéticos', pointClassName: styles.ellipse1 }
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
            mobileShell: {
              width: '201px',
              height: '300px',
              top: '0px',
              left: '0px',
              background: '#D9D9D9',
              borderRadius: '22px'
            },
            art: { type: 'image', src: '/image/sirena-exterior.webp', width: 91, height: 149 }
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
            mobileShell: {
              width: '201px',
              height: '300px',
              top: '0px',
              left: '0px',
              background: '#D9D9D9',
              borderRadius: '22px'
            },
            art: { type: 'image', src: '/image/mpvxvwmp-fq0hs19.png', width: 139, height: 147 }
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
          },
          {
            id: 'guardia',
            title: 'Guardia Virtual',
            text: 'Supervisión remota 24/7 de accesos y espacios comunes, con intervención ante eventos y asistencia en tiempo real.',
            /* Mobile (Figma 3214:674): texto más corto (sin "ante eventos"),
               en 5 renglones, con la imagen del tótem en y=163. */
            mobileTextLines: [
              'Supervisión remota 24/7',
              'de accesos y espacios',
              'comunes, con',
              'intervención y asistencia',
              'en tiempo real.'
            ],
            mobileTall: true,
            mobileViewport: 'tall',
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
              '--tech-card-art-margin-top': '8px',
              '--tech-card-mobile-title-top': '37px',
              '--tech-card-mobile-title-width': '187px',
              '--tech-card-mobile-text-top': '65px',
              '--tech-card-mobile-text-width': '186px',
              '--tech-card-mobile-art-top': '163px',
              '--tech-card-mobile-art-width': '143px',
              '--tech-card-mobile-art-height': '125px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'image', src: '/image/mq09ajcr-z6zrehs.png', width: 198, height: 174 }
          },
          {
            id: 'magneticos',
            title: 'Magnéticos',
            text: 'Protección inteligente en puertas y ventanas con alerta inmediata ante aperturas.',
            mobileTextLines: [
              'Protección inteligente',
              'en puertas y ventanas',
              'con alerta inmediata',
              'ante aperturas.'
            ],
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
            mobileShell: {
              width: '201px',
              height: '300px',
              top: '0px',
              left: '0px',
              background: '#D9D9D9',
              borderRadius: '22px'
            },
            art: { type: 'image', src: '/image/mpvxvi4u-1mah6ht.png', width: 160, height: 160 }
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
          { id: 'mando', label: 'Mando a distancia', pointClassName: styles.ellipse14 },
          { id: 'central', label: 'Central con comunicador', pointClassName: styles.ellipse15 },
          { id: 'acceso', label: 'Control de acceso', pointClassName: styles.ellipse1 }
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
              '--tech-card-image-width': '201px',
              '--tech-card-image-height': '188px',
              '--tech-card-text-width': '216px',
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
              '--tech-card-text-margin': '13px 0 0',
              '--tech-card-text-width': '276px',
              '--tech-card-image-width': '219px',
              '--tech-card-image-height': '156px',
              '--tech-card-art-margin-top': '9px',
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
          },
          {
            id: 'acceso',
            title: 'Control de acceso',
            text: 'Gestión de ingresos del personal mediante tarjetas, biometría o reconocimiento facial, con control de horarios y presencia.',
            mobileTitleLines: ['Control', 'de acceso'],
            mobileText: 'Gestión de ingresos del personal con control de horarios y presencia.',
            mobileTall: true,
            mobileViewport: 'tall',
            styleVars: {
              '--tech-card-padding': '48px 83px 22px',
              '--tech-card-title-width': '276px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-width': '276px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-art-margin-top': '14px',
              '--tech-card-mobile-art-height': '88px',
              '--tech-card-image-width': '94px',
              '--tech-card-image-height': '176px',
              '--tech-card-mobile-title-top': '36px',
              '--tech-card-mobile-title-width': '186.83px',
              '--tech-card-mobile-text-top': '88px',
              '--tech-card-mobile-text-width': '167px',
              '--tech-card-mobile-art-top': '168px',
              '--tech-card-mobile-art-width': '61px',
              '--tech-card-mobile-art-height': '114px'
            },
            mobileShell: { width: '201px', height: '300px', top: '0px', left: '0px', background: '#D9D9D9', borderRadius: '22px' },
            art: { type: 'image', src: '/image/mpvxz539-e73c1z1.png', width: 94, height: 176 }
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
            mobileTextLines: ['Administrá tu sistema,', 'recibí notificaciones y', 'monitoreá tu obra', 'estés donde estés.'],
            mobileTall: true,
            mobileViewport: 'tall',
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
              '--tech-card-frame-bar-color': '#06234c',
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
              backgroundSrc: '/image/mq09bjsp-72d3sht.webp',
              wrapperWidth: 133.87,
              wrapperHeight: 115.58,
              badgeBlock: { width: 73.88, height: 10.24, top: 28.53, left: 31.46, background: '#000000', mixBlendMode: 'hue' },
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

  const renderSlideContent = (slide, extraClassName) => (
    <TechCard slide={slide} className={extraClassName} />
  );

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
          className={`${styles.house} ${activeTab.houseClassName} ${isEditMode ? styles.houseEdit : ''}`}
          ref={houseRef}
          onPointerMove={handlePointPointerMove}
          onPointerUp={handlePointPointerUp}
          onPointerCancel={handlePointPointerUp}
          aria-label="Mapa interactivo"
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
