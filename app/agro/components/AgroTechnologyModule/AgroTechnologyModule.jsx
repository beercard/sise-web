'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '../../page.module.scss';

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const STORAGE_KEY = 'sise-agro-tech-editor-v2';
const POINT_SIZE = 28;
const HOUSE_BASE_WIDTH = 2486;
const HOUSE_BASE_HEIGHT = 1728;
const CARD_ANIMATION_MS = 420;
const FIRST_POINT_BY_TAB = {
  perimetral: 'camaraCampo',
  interior: 'camaras',
  conectividad: 'app'
};

const DEFAULT_EDITOR_CONFIG = {
  positions: {
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [direction, setDirection] = useState('next');

  const [pointPositions, setPointPositions] = useState(DEFAULT_EDITOR_CONFIG.positions);
  const [pointToSlide, setPointToSlide] = useState(DEFAULT_EDITOR_CONFIG.mapping);
  const [isEditMode, setIsEditMode] = useState(false);

  const [viewportWidth, setViewportWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
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
    const params = new URLSearchParams(window.location.search);
    const nextIsEditMode = params.get('edit') === '1';
    queueMicrotask(() => setIsEditMode(nextIsEditMode));

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const nextPositions = mergePositions(DEFAULT_EDITOR_CONFIG.positions, parsed?.positions);
      const nextMapping = mergeMapping(DEFAULT_EDITOR_CONFIG.mapping, parsed?.mapping);
      queueMicrotask(() => {
        setPointPositions(nextPositions);
        setPointToSlide(nextMapping);
      });
    } catch {
      return;
    }
  }, []);

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

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

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
      art: { type: 'image', src: '/image/mq1fh69q-ch04lu8.png', width: 214, height: 160 }
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
          art: { type: 'gps', backgroundSrc: '/image/mq1gm8sq-6kvccdt.png', wrapperWidth: 221, wrapperHeight: 187, wrapperMarginTop: 32 }
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
            backgroundSrc: '/image/mq1gm7lv-xdsoke2.png',
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
          art: { type: 'absolute', src: '/image/mq1gmu17-f1qjeh4.png', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
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
            backgroundSrc: '/image/mq1gn9bk-jxd0t66.png',
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

  useEffect(() => {
    const el = houseRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setHouseScale({ x: rect.width / HOUSE_BASE_WIDTH, y: rect.height / HOUSE_BASE_HEIGHT });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  const getDirection = useCallback(
    (fromIndex, toIndex) => {
      if (slides.length <= 1) return 'next';
      const forward = (toIndex - fromIndex + slides.length) % slides.length;
      const backward = (fromIndex - toIndex + slides.length) % slides.length;
      return forward <= backward ? 'next' : 'prev';
    },
    [slides.length]
  );

  const startTransition = useCallback((nextIndex, nextDirection) => {
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
  }, []);

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

  const handlePointPointerDown = (pointId, event) => {
    if (!isEditMode) return;
    if (!event.currentTarget) return;
    if (event.button !== 0) return;

    const house = houseRef.current;
    if (!house) return;

    const tabPositions = positionsForTab ?? {};
    const position = tabPositions[pointId];
    if (!position) return;

    const rect = house.getBoundingClientRect();
    const baseX = (event.clientX - rect.left) / houseScale.x;
    const baseY = (event.clientY - rect.top) / houseScale.y;

    dragRef.current = {
      pointId,
      startX: baseX,
      startY: baseY,
      originLeft: position.left,
      originTop: position.top
    };

    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const handlePointPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || !isEditMode) return;

    const house = houseRef.current;
    if (!house) return;

    const rect = house.getBoundingClientRect();
    const baseX = (event.clientX - rect.left) / houseScale.x;
    const baseY = (event.clientY - rect.top) / houseScale.y;

    const dx = baseX - drag.startX;
    const dy = baseY - drag.startY;

    const nextLeft = Math.round(drag.originLeft + dx);
    const nextTop = Math.round(drag.originTop + dy);

    setPointPositions((current) => ({
      ...current,
      [activeTabId]: {
        ...(current[activeTabId] ?? {}),
        [drag.pointId]: {
          top: Math.max(0, Math.min(HOUSE_BASE_HEIGHT, nextTop)),
          left: Math.max(0, Math.min(HOUSE_BASE_WIDTH, nextLeft))
        }
      }
    }));
  };

  const handlePointPointerUp = () => {
    dragRef.current = null;
  };

  const handleCopyJson = async () => {
    const payload = { positions: pointPositions, mapping: pointToSlide };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
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

  const currentSlide = slides[activeIndex] ?? slides[0];
  const previousSlide = previousIndex == null ? null : slides[previousIndex];
  const allowNav = slides.length > 1;

  const effectiveMapSrc =
    activeTabId === TAB_IDS.PERIMETRAL ? '/image/mq1fh69q-v0j7c7r.png' : '/image/mq1fh69q-v0j7c7r.png';

  const renderCard = (slide, state) => {
    if (!slide) return null;

    const isMobile = windowWidth > 0 && windowWidth <= 480;
    const isNarrowMobile = windowWidth > 0 && windowWidth <= 360;
    const style = slide.styleVars ? { ...slide.styleVars } : {};

    if (isMobile) {
      const mobileImageWidth =
        slide.id === 'sirena'
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
      style['--tech-card-title-align'] = 'center';
      style['--tech-card-text-width'] = '100%';
      style['--tech-card-text-margin'] = '16px 0 0';
      style['--tech-card-text-align'] = 'center';
      style['--tech-card-image-width'] = mobileImageWidth;
      style['--tech-card-image-height'] = 'auto';
      style['--tech-card-image-margin-top'] = '18px';
      style['--tech-card-image-margin-left'] = '0px';
      style['--tech-card-image-margin-right'] = '0px';
      style['--tech-card-image-scale'] = '0.95';
    }

    const shouldRenderMainText = isMobile
      ? slide.art?.type !== 'overlay'
      : slide.art?.type !== 'overlay' && slide.art?.type !== 'connectivity';
    const artScale = isNarrowMobile ? 0.74 : isMobile ? 0.82 : 1;

    return (
      <div
        key={`${slide.id}-${state}`}
        className={`${styles.techCard} ${
          state === 'enter'
            ? direction === 'next'
              ? styles.techCardEnterRight
              : styles.techCardEnterLeft
            : state === 'exit'
              ? direction === 'next'
                ? styles.techCardExitLeft
                : styles.techCardExitRight
              : ''
        }`}
        style={style}
      >
        <h3 className={styles.techCardTitle}>{slide.title}</h3>
        {shouldRenderMainText ? <p className={styles.techCardText}>{slide.text}</p> : null}
        {slide.art?.type === 'image' ? (
          <div className={styles.techCardImageWrap}>
            <Image
              src={slide.art.src}
              alt=""
              className={styles.techCardImage}
              width={slide.art.width}
              height={slide.art.height}
              priority={false}
            />
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
                priority={false}
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
              priority={false}
              style={{
                top: `${slide.art.top}px`,
                left: `${slide.art.left}px`,
                transform: `rotate(${slide.art.rotate}deg)`
              }}
            />
          )
        ) : null}
        {slide.art?.type === 'gps' ? (
          <div
            className={styles.techCardGpsWrap}
            style={{
              width: `${slide.art.wrapperWidth}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined,
              transform: isMobile ? `scale(${artScale})` : undefined,
              transformOrigin: isMobile ? 'top center' : undefined
            }}
          >
            <div className={styles.techCardGpsImage} style={{ '--gps-bg': `url('${slide.art.backgroundSrc}')` }} aria-hidden="true">
              <div className={styles.techCardGpsBar} />
            </div>
          </div>
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
            <Image
              src={slide.art.image.src}
              alt=""
              className={styles.techCardOverlayImage}
              width={slide.art.image.width}
              height={slide.art.image.height}
              priority={false}
            />
          </div>
        ) : null}
        {slide.art?.type === 'connectivity' ? (
          <div
            className={styles.techCardConnectivityWrap}
            style={{
              width: `${slide.art.wrapperWidth}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: isMobile ? '52px' : slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined,
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
            <div
              className={styles.techCardConnectivityImage}
              style={{ '--connectivity-bg': `url('${slide.art.backgroundSrc}')` }}
              aria-hidden="true"
            >
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
            <Image
              src={slide.art.iconSrc}
              alt=""
              className={styles.techCardSirenaIcon}
              width={slide.art.iconWidth}
              height={slide.art.iconHeight}
              priority={false}
            />
          </div>
        ) : null}
      </div>
    );
  };

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
                  if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
                  animTimeoutRef.current = null;
                  activeIndexRef.current = 0;
                  setPreviousIndex(null);
                  setDirection('next');
                  setActiveIndex(0);
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
            <div className={styles.houseViewport} ref={viewportRef}>
              <div className={styles.house} ref={houseRef}>
                <Image
                  src={effectiveMapSrc}
                  alt=""
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
