'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '../../page.module.scss';

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const STORAGE_KEY = 'sise-edificios-tech-editor-v1';
const POINT_SIZE = 28;
const HOUSE_BASE_WIDTH = 735;
const HOUSE_BASE_HEIGHT = 511;
const CARD_ANIMATION_MS = 420;

const DEFAULT_EDITOR_CONFIG = {
  positions: {
    perimetral: {
      camaras: { top: 253, left: 42 },
      sirena: { top: 312, left: 176 },
      cartel: { top: 347, left: 179 },
      cerco: { top: 224, left: 599 },
      guardia: { top: 393, left: 291 },
      magneticos: { top: 388, left: 242 }
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
  },
  mapping: {}
};

const mergePositions = (base, override) => {
  const output = { ...base };
  if (!override) return output;

  Object.keys(override).forEach((tabId) => {
    output[tabId] = {
      ...(base[tabId] ?? {}),
      ...(override[tabId] ?? {})
    };
  });

  return output;
};

const mergeMapping = (base, override) => {
  const output = { ...base };
  if (!override) return output;

  Object.keys(override).forEach((tabId) => {
    output[tabId] = {
      ...(base[tabId] ?? {}),
      ...(override[tabId] ?? {})
    };
  });

  return output;
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [direction, setDirection] = useState('next');

  const [pointPositions, setPointPositions] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_EDITOR_CONFIG.positions;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_EDITOR_CONFIG.positions;
      const parsed = JSON.parse(raw);
      return mergePositions(DEFAULT_EDITOR_CONFIG.positions, parsed?.positions);
    } catch {
      return DEFAULT_EDITOR_CONFIG.positions;
    }
  });

  const [pointToSlide, setPointToSlide] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_EDITOR_CONFIG.mapping;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_EDITOR_CONFIG.mapping;
      const parsed = JSON.parse(raw);
      return mergeMapping(DEFAULT_EDITOR_CONFIG.mapping, parsed?.mapping);
    } catch {
      return DEFAULT_EDITOR_CONFIG.mapping;
    }
  });

  const [isEditMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('edit') === '1';
  });

  const [viewportWidth, setViewportWidth] = useState(0);
  const [houseScale, setHouseScale] = useState({ x: 1, y: 1 });

  const houseRef = useRef(null);
  const viewportRef = useRef(null);
  const pointRefs = useRef({});
  const dragRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);
  const animTimeoutRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!isEditMode) return;
    const payload = { positions: pointPositions, mapping: pointToSlide };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      return;
    }
  }, [isEditMode, pointPositions, pointToSlide]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => setViewportWidth(el.getBoundingClientRect().width);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
          art: { type: 'image', src: '/image/mq09axh2-e65lf39.png', width: 192, height: 117 }
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
            '--tech-card-text-margin': '9px 0 0',
            '--tech-card-image-width': '170px',
            '--tech-card-image-height': '222px',
            '--tech-card-image-margin-top': '14px',
            '--tech-card-image-margin-left': '0px'
          },
          art: { type: 'image', src: '/image/mq09ahxs-unrgqg3.png', width: 1792, height: 2344 }
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
            '--tech-card-text-width': '276px',
            '--tech-card-text-margin': '12px 0 0',
            '--tech-card-image-width': '139px',
            '--tech-card-image-height': '147px',
            '--tech-card-image-margin-top': '9px',
            '--tech-card-image-margin-left': '68px'
          },
          art: { type: 'image', src: '/image/mq09ahvp-5d8eibi.png', width: 139, height: 147 }
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
            '--tech-card-image-margin-top': '0px'
          },
          art: { type: 'image', src: '/image/mq09ahw1-cbrpavb.png', width: 215, height: 154 }
        },
        {
          id: 'guardia',
          title: 'Guardia Virtual',
          text: 'Supervisión remota 24/7 de accesos y espacios comunes, con intervención ante eventos y asistencia en tiempo real.',
          styleVars: {
            '--tech-card-padding': '51px 51px 25px 52px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '36px',
            '--tech-card-title-min-height': '36px',
            '--tech-card-text-width': '339px',
            '--tech-card-text-margin': '4px 0 0',
            '--tech-card-image-width': '198px',
            '--tech-card-image-height': '174px',
            '--tech-card-image-margin-top': '8px'
          },
          art: { type: 'image', src: '/image/mq09ajcr-z6zrehs.png', width: 198, height: 174 }
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
            '--tech-card-text-width': '265px',
            '--tech-card-text-margin': '12px 0 0 7px',
            '--tech-card-image-width': '160px',
            '--tech-card-image-height': '160px',
            '--tech-card-image-margin-top': '14px',
            '--tech-card-image-margin-left': '60px'
          },
          art: { type: 'image', src: '/image/mq09ahu0-cab0z2u.png', width: 160, height: 160 }
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
          art: { type: 'image', src: '/image/mq09axh2-e65lf39.png', width: 192, height: 117 }
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
            '--tech-card-title-min-height': '63px',
            '--tech-card-text-width': '273px',
            '--tech-card-text-margin': '0',
            '--tech-card-text-align': 'center',
            '--tech-card-title-align': 'center'
          },
          art: {
            type: 'overlay',
            wrapperWidth: 193,
            wrapperHeight: 180,
            wrapperMarginTop: 66,
            text: { top: -55, right: -40, width: 273 },
            image: { src: '/image/mq09axhz-nt3qf7b.png', width: 193, height: 180 }
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
            '--tech-card-text-margin': '11px 0 0',
            '--tech-card-image-width': '201px',
            '--tech-card-image-height': '188px'
          },
          art: { type: 'absolute', src: '/image/mq09axid-v1t0aln.png', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
        },
        {
          id: 'mando',
          title: 'Mando a distancia',
          text: 'Activá o desactivá tu sistema con comodidad.',
          styleVars: {
            '--tech-card-padding': '48px 83px 227px',
            '--tech-card-align-items': 'center',
            '--tech-card-title-width': '276px',
            '--tech-card-title-height': '31px',
            '--tech-card-title-min-height': '31px',
            '--tech-card-text-width': '216px',
            '--tech-card-text-margin': '12px 0 0',
            '--tech-card-image-width': '182px',
            '--tech-card-image-height': '171px'
          },
          art: { type: 'absolute', src: '/image/mq09axi1-1audbxc.png', width: 182, height: 171, top: 151, left: 129, rotate: 16 }
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
            '--tech-card-title-margin': '0 0 0 15px',
            '--tech-card-text-width': '246px',
            '--tech-card-text-margin': '13px 0 0 15px',
            '--tech-card-image-width': '219px',
            '--tech-card-image-height': '156px',
            '--tech-card-image-margin-top': '9px',
            '--tech-card-image-margin-left': '27px'
          },
          art: { type: 'image', src: '/image/mq09axgw-cxhoysf.png', width: 219, height: 156 }
        },
        {
          id: 'acceso',
          title: 'Control de acceso',
          text: 'Gestión de ingresos del personal mediante tarjetas, biometría o reconocimiento facial, con control de horarios y presencia.',
          styleVars: {
            '--tech-card-padding': '48px 36px 19px 52px',
            '--tech-card-align-items': 'flex-start',
            '--tech-card-title-width': '354px',
            '--tech-card-title-height': '32px',
            '--tech-card-title-min-height': '32px',
            '--tech-card-title-margin': '0 0 0 49px',
            '--tech-card-text-width': '354px',
            '--tech-card-text-margin': '11px 0 0',
            '--tech-card-image-width': '80px',
            '--tech-card-image-height': '150px',
            '--tech-card-image-margin-top': '12px',
            '--tech-card-image-margin-left': '122px'
          },
          art: { type: 'image', src: '/image/mq09axhx-kxafozd.png', width: 50, height: 150 }
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
          '--tech-card-text-margin': '0',
          '--tech-card-title-align': 'center'
        },
        art: {
          type: 'connectivity',
          backgroundSrc: '/image/mq09bjsp-72d3sht.png',
          wrapperWidth: 183,
          wrapperHeight: 158,
          wrapperMarginTop: 74,
          text: { top: -57, right: -55, width: 292 }
        }
      }
    ];
  }, [activeTabId]);

  const getHouseScale = useCallback((tabId, houseEl) => {
    if (!houseEl) return { x: 1, y: 1 };
    const rect = houseEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 1, y: 1 };
    return { x: rect.width / HOUSE_BASE_WIDTH, y: rect.height / HOUSE_BASE_HEIGHT };
  }, []);

  useEffect(() => {
    const houseEl = houseRef.current;
    if (!houseEl) return;

    const update = () => setHouseScale(getHouseScale(activeTabId, houseEl));
    update();

    const ro = new ResizeObserver(update);
    ro.observe(houseEl);
    return () => ro.disconnect();
  }, [activeTabId, getHouseScale]);

  const positionsForTab = useMemo(() => {
    return mergePositions(DEFAULT_EDITOR_CONFIG.positions, pointPositions)[activeTabId] ?? {};
  }, [activeTabId, pointPositions]);

  const mappingForTab = useMemo(() => {
    const defaults = points.reduce((acc, point) => {
      const idx = slides.findIndex((slide) => slide.id === point.id);
      acc[point.id] = idx >= 0 ? idx : 0;
      return acc;
    }, {});

    const overrides = mergeMapping(DEFAULT_EDITOR_CONFIG.mapping, pointToSlide)[activeTabId] ?? {};
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

  const startTransition = useCallback(
    (nextIndex, nextDirection) => {
      const currentIndex = activeIndexRef.current;
      if (nextIndex === currentIndex) return;

      if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);

      setDirection(nextDirection);
      setPreviousIndex(currentIndex);
      setActiveIndex(nextIndex);

      animTimeoutRef.current = window.setTimeout(() => {
        setPreviousIndex(null);
        animTimeoutRef.current = null;
      }, CARD_ANIMATION_MS);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!activePointId) return;
    const mapped = mappingForTab[activePointId];
    if (mapped == null) return;
    if (mapped === activeIndexRef.current) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  }, [activePointId, getDirection, mappingForTab, startTransition]);

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
  const isAnimating = previousIndex !== null;

  const getCardClassName = (phase) => {
    if (phase === 'active') {
      if (!isAnimating) return styles.techCardStatic;
      return direction === 'next' ? styles.techCardEnterNext : styles.techCardEnterPrev;
    }

    return direction === 'next' ? styles.techCardExitNext : styles.techCardExitPrev;
  };

  const renderSlideContent = (slide, extraClassName) => {
    if (!slide) return null;

    const isMobile = viewportWidth > 0 && viewportWidth <= 480;
    const isNarrowMobile = viewportWidth > 0 && viewportWidth <= 360;
    const style = slide.styleVars ? { ...slide.styleVars } : {};

    if (isMobile) {
      const mobileImageWidth =
        slide.id === 'acceso'
          ? isNarrowMobile
            ? '90px'
            : '100px'
          : slide.id === 'sirena'
            ? isNarrowMobile
              ? '140px'
              : '150px'
            : isNarrowMobile
              ? '180px'
              : '200px';

      style['--tech-card-padding'] = '26px 24px 22px';
      style['--tech-card-align-items'] = 'center';
      style['--tech-card-title-width'] = '100%';
      style['--tech-card-title-height'] = 'auto';
      style['--tech-card-title-min-height'] = '0px';
      style['--tech-card-title-margin'] = '0';
      style['--tech-card-text-width'] = '100%';
      style['--tech-card-text-margin'] = '16px 0 0';
      style['--tech-card-image-width'] = mobileImageWidth;
      style['--tech-card-image-height'] = 'auto';
      style['--tech-card-image-margin-top'] = '18px';
      style['--tech-card-image-margin-left'] = '0px';
      style['--tech-card-text-align'] = 'center';
      style['--tech-card-title-align'] = 'center';
      style['--tech-card-image-scale'] = '0.95';
    }

    const shouldRenderMainText = isMobile ? slide.art?.type !== 'overlay' : slide.art?.type !== 'overlay' && slide.art?.type !== 'connectivity';
    const artScale = isNarrowMobile ? 0.74 : isMobile ? 0.82 : 1;

    return (
      <div className={`${styles.techCard} ${extraClassName}`} style={style}>
        <p className={styles.techCardTitle}>{slide.title}</p>
        {shouldRenderMainText ? <p className={styles.techCardText}>{slide.text}</p> : null}
        {slide.art?.type === 'image' ? (
          <div className={styles.techCardImageWrap}>
            <Image src={slide.art.src} alt="" className={styles.techCardImage} width={slide.art.width} height={slide.art.height} />
          </div>
        ) : null}
        {slide.art?.type === 'absolute' ? (
          isMobile ? (
            <div className={styles.techCardImageWrap}>
              <Image
                src={slide.art.src}
                alt=""
                className={styles.techCardImage}
                width={slide.art.width}
                height={slide.art.height}
                style={{ transform: `rotate(${slide.art.rotate}deg) scale(var(--tech-card-image-scale, 0.92))` }}
              />
            </div>
          ) : (
            <Image
              src={slide.art.src}
              alt=""
              className={styles.techCardAbsoluteImage}
              width={slide.art.width}
              height={slide.art.height}
              style={{
                top: `${slide.art.top}px`,
                left: `${slide.art.left}px`,
                transform: `rotate(${slide.art.rotate}deg)`
              }}
            />
          )
        ) : null}
        {slide.art?.type === 'overlay' ? (
          <div
            className={styles.techCardOverlay}
            style={{
              width: `${slide.art.wrapperWidth}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined,
              transform: isMobile ? `scale(${artScale})` : undefined,
              transformOrigin: isMobile ? 'top center' : undefined
            }}
          >
            <p
              className={styles.techCardOverlayText}
              style={{
                top: `${slide.art.text.top}px`,
                right: `${slide.art.text.right}px`,
                width: `${slide.art.text.width}px`
              }}
            >
              {slide.text}
            </p>
            <Image src={slide.art.image.src} alt="" className={styles.techCardOverlayImage} width={slide.art.image.width} height={slide.art.image.height} />
          </div>
        ) : null}
        {slide.art?.type === 'connectivity' ? (
          <div
            className={styles.techCardConnectivityWrap}
            style={{
              width: `${slide.art.wrapperWidth}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: isMobile ? '32px' : slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined,
              transform: isMobile ? `scale(${artScale})` : undefined,
              transformOrigin: isMobile ? 'top center' : undefined
            }}
          >
            {!isMobile ? (
              <p
                className={styles.techCardConnectivityText}
                style={{
                  top: `${slide.art.text.top}px`,
                  right: `${slide.art.text.right}px`,
                  width: `${slide.art.text.width}px`
                }}
              >
                {slide.text}
              </p>
            ) : null}
            <div className={styles.techCardConnectivityImage} style={{ '--connectivity-bg': `url('${slide.art.backgroundSrc}')` }} aria-hidden="true">
              <div className={styles.techCardConnectivityBar} />
            </div>
          </div>
        ) : null}
        {slide.art?.type === 'sirena' ? (
          <div
            className={styles.techCardSirena}
            style={{
              '--sirena-bg': `url('${slide.art.backgroundSrc}')`,
              '--sirena-pad-top': `${slide.art.wrapperPadding.top}px`,
              '--sirena-pad-right': `${slide.art.wrapperPadding.right}px`,
              '--sirena-pad-bottom': `${slide.art.wrapperPadding.bottom}px`,
              '--sirena-pad-left': `${slide.art.wrapperPadding.left}px`,
              '--sirena-margin-x': `${slide.art.wrapperMarginX}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined,
              transform: isMobile ? `scale(${artScale})` : undefined,
              transformOrigin: isMobile ? 'top center' : undefined
            }}
          >
            <Image src={slide.art.iconSrc} alt="" className={styles.techCardSirenaIcon} width={slide.art.iconWidth} height={slide.art.iconHeight} />
          </div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    if (!isEditMode) return;
    const houseEl = houseRef.current;
    if (!houseEl) return;

    const missing = points.filter((point) => !(pointPositions[activeTabId] ?? {})[point.id]);
    if (missing.length === 0) return;

    const raf = window.requestAnimationFrame(() => {
      const houseRect = houseEl.getBoundingClientRect();
      const scale = getHouseScale(activeTabId, houseEl);
      const measured = missing.reduce((acc, point) => {
        const el = pointRefs.current[point.id];
        if (!el) return acc;
        const rect = el.getBoundingClientRect();
        acc[point.id] = {
          top: Math.round((rect.top - houseRect.top) / scale.y),
          left: Math.round((rect.left - houseRect.left) / scale.x)
        };
        return acc;
      }, {});

      setPointPositions((prev) => ({
        ...prev,
        [activeTabId]: {
          ...(prev[activeTabId] ?? {}),
          ...measured
        }
      }));
    });

    return () => window.cancelAnimationFrame(raf);
  }, [activeTabId, getHouseScale, isEditMode, pointPositions, points]);

  const handlePointPointerDown = (pointId, event) => {
    if (!isEditMode) return;
    const houseEl = houseRef.current;
    if (!houseEl) return;
    const current = positionsForTab[pointId];
    if (!current) return;

    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTop: current.top,
      startLeft: current.left
    };
    setActivePointId(pointId);
  };

  const handlePointPointerMove = (event) => {
    if (!isEditMode) return;
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.pointerId !== event.pointerId) return;
    const houseEl = houseRef.current;
    if (!houseEl) return;

    const scale = getHouseScale(activeTabId, houseEl);
    const nextTop = drag.startTop + (event.clientY - drag.startY) / scale.y;
    const nextLeft = drag.startLeft + (event.clientX - drag.startX) / scale.x;

    const maxTop = HOUSE_BASE_HEIGHT - POINT_SIZE;
    const maxLeft = HOUSE_BASE_WIDTH - POINT_SIZE;

    const clampedTop = Math.min(Math.max(0, nextTop), maxTop);
    const clampedLeft = Math.min(Math.max(0, nextLeft), maxLeft);

    setPointPositions((prev) => ({
      ...prev,
      [activeTabId]: {
        ...(prev[activeTabId] ?? {}),
        [drag.pointId]: {
          top: Math.round(clampedTop),
          left: Math.round(clampedLeft)
        }
      }
    }));
  };

  const handlePointPointerUp = (event) => {
    if (!isEditMode) return;
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
  };

  const handlePointClick = (pointId) => {
    setActivePointId(pointId);
    const mapped = mappingForTab[pointId];
    if (mapped == null) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  };

  const handleTabClick = (tabId) => {
    if (tabId === activeTabId) return;
    setActiveTabId(tabId);
    setPreviousIndex(null);
    setActiveIndex(0);
    setDirection('next');
    setActivePointId(tabId === TAB_IDS.CONECTIVIDAD ? 'app' : 'camaras');
  };

  const handleCopyJson = async () => {
    const payload = {
      positions: mergePositions(DEFAULT_EDITOR_CONFIG.positions, pointPositions),
      mapping: mergeMapping(DEFAULT_EDITOR_CONFIG.mapping, pointToSlide)
    };
    const json = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      return;
    }
  };

  const handleReset = () => {
    setPointPositions(DEFAULT_EDITOR_CONFIG.positions);
    setPointToSlide(DEFAULT_EDITOR_CONFIG.mapping);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      return;
    }
  };

  return (
    <section className={styles.technology} aria-label="Seguridad total para tu edificio">
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

          <div className={styles.techCardViewport} ref={viewportRef} aria-live="polite">
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
