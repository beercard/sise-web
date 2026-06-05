'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '../../page.module.scss';

const ANIMATION_MS = 420;
const STORAGE_KEY_V1 = 'sise-industria-tech-editor-v1';
const STORAGE_KEY = 'sise-industria-tech-editor-v2';
const POINT_SIZE = 28;

const DEFAULT_EDITOR_CONFIG = {
  positions: {
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
  },
  mapping: {}
};

const mergePositions = (base, override) => {
  const next = { ...base };
  if (!override) return next;
  Object.keys(override).forEach((tabId) => {
    next[tabId] = { ...(base?.[tabId] ?? {}), ...(override?.[tabId] ?? {}) };
  });
  return next;
};

const mergeMapping = (base, override) => {
  const next = { ...base };
  if (!override) return next;
  Object.keys(override).forEach((tabId) => {
    next[tabId] = { ...(base?.[tabId] ?? {}), ...(override?.[tabId] ?? {}) };
  });
  return next;
};

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const getStoredEditorPayload = () => {
  if (typeof window === 'undefined') return null;
  const candidates = [STORAGE_KEY, STORAGE_KEY_V1];
  for (let i = 0; i < candidates.length; i += 1) {
    const key = candidates[i];
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') continue;
      return { key, parsed };
    } catch {
      continue;
    }
  }
  return null;
};

export default function IndustriaTechnologyModule() {
  const [isEditMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('edit') === '1';
    } catch {
      return false;
    }
  });

  const [viewportWidth, setViewportWidth] = useState(() => (typeof window === 'undefined' ? 0 : window.innerWidth));

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
            art: { type: 'absolute', src: '/image/mq03yfq4-1tlcwks.png', width: 201, height: 188, top: 157, left: 121, rotate: 0 }
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
              backgroundSrc: '/image/mq03yufq-43ve40h.png',
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

  const HOUSE_BASE_SIZES = useMemo(
    () => ({
      perimetral: { width: 735, height: 511 },
      interior: { width: 735, height: 511 },
      conectividad: { width: 735, height: 511 }
    }),
    []
  );

  const getHouseScale = useCallback(
    (tabId, houseEl) => {
      const base = HOUSE_BASE_SIZES[tabId];
      if (!base || !houseEl) return { x: 1, y: 1 };
      const scaleX = houseEl.clientWidth / base.width;
      const scaleY = houseEl.clientHeight / base.height;
      return {
        x: Number.isFinite(scaleX) && scaleX > 0 ? scaleX : 1,
        y: Number.isFinite(scaleY) && scaleY > 0 ? scaleY : 1
      };
    },
    [HOUSE_BASE_SIZES]
  );

  const getDirection = (currentIndex, nextIndex) => {
    if (nextIndex === currentIndex) return 'next';
    return nextIndex > currentIndex ? 'next' : 'prev';
  };

  const [activeTabId, setActiveTabId] = useState(TAB_IDS.PERIMETRAL);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePointId, setActivePointId] = useState(() => tabs[0]?.points?.[0]?.id ?? null);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [direction, setDirection] = useState('next');
  const [tabNonce, setTabNonce] = useState(0);
  const [pointPositions, setPointPositions] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_EDITOR_CONFIG.positions;
    if (!isEditMode) return DEFAULT_EDITOR_CONFIG.positions;
    try {
      const payload = getStoredEditorPayload();
      if (!payload) return DEFAULT_EDITOR_CONFIG.positions;
      return mergePositions(DEFAULT_EDITOR_CONFIG.positions, payload.parsed?.positions);
    } catch {
      return DEFAULT_EDITOR_CONFIG.positions;
    }
  });
  const [pointToSlide, setPointToSlide] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_EDITOR_CONFIG.mapping;
    if (!isEditMode) return DEFAULT_EDITOR_CONFIG.mapping;
    try {
      const payload = getStoredEditorPayload();
      if (!payload) return DEFAULT_EDITOR_CONFIG.mapping;
      return mergeMapping(DEFAULT_EDITOR_CONFIG.mapping, payload.parsed?.mapping);
    } catch {
      return DEFAULT_EDITOR_CONFIG.mapping;
    }
  });
  const [houseScale, setHouseScale] = useState({ x: 1, y: 1 });

  const activeIndexRef = useRef(activeIndex);
  const animTimeoutRef = useRef(null);
  const houseRef = useRef(null);
  const pointRefs = useRef({});
  const dragRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    try {
      const rawV2 = window.localStorage.getItem(STORAGE_KEY);
      if (rawV2) return;
      const rawV1 = window.localStorage.getItem(STORAGE_KEY_V1);
      if (!rawV1) return;
      window.localStorage.setItem(STORAGE_KEY, rawV1);
    } catch {
      return;
    }
  }, [isEditMode]);

  useEffect(() => {
    const houseEl = houseRef.current;
    if (!houseEl) return;

    const update = () => setHouseScale(getHouseScale(activeTabId, houseEl));
    const raf = window.requestAnimationFrame(update);

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(houseEl);
    }

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      window.cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeTabId, getHouseScale]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
    };
  }, []);

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs]
  );

  const slides = activeTab.slides;
  const points = activeTab.points;

  const defaultPointToSlide = useMemo(() => {
    return tabs.reduce((acc, tab) => {
      acc[tab.id] = tab.points.reduce((map, point, idx) => {
        map[point.id] = Math.min(idx, tab.slides.length - 1);
        return map;
      }, {});
      return acc;
    }, {});
  }, [tabs]);

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
    }, ANIMATION_MS);
  }, []);

  useEffect(() => {
    if (!activePointId) return;
    const mapped = mappingForTab[activePointId];
    if (mapped == null) return;
    if (mapped === activeIndexRef.current) return;
    startTransition(mapped, getDirection(activeIndexRef.current, mapped));
  }, [activePointId, mappingForTab, startTransition]);

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
    if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);

    setActiveTabId(tabId);
    setPreviousIndex(null);
    setActiveIndex(0);
    setDirection('next');
    setTabNonce((nonce) => nonce + 1);
    const firstPoint = tabs.find((tab) => tab.id === tabId)?.points?.[0];
    setActivePointId(firstPoint?.id ?? null);
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
      style['--tech-card-padding'] = '26px 24px 22px';
      style['--tech-card-align-items'] = 'center';
      style['--tech-card-title-width'] = '100%';
      style['--tech-card-title-height'] = 'auto';
      style['--tech-card-title-min-height'] = '0px';
      style['--tech-card-text-width'] = '100%';
      style['--tech-card-text-margin'] = '16px 0 0';
      style['--tech-card-image-width'] = isNarrowMobile ? '180px' : '200px';
      style['--tech-card-image-height'] = 'auto';
      style['--tech-card-image-margin-top'] = '18px';
      style['--tech-card-text-align'] = 'center';
      style['--tech-card-title-align'] = 'center';
      style['--tech-card-image-scale'] = '0.95';
      style['--tech-card-title-margin'] = '0';
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
      </div>
    );
  };

  const positionsForTab = useMemo(() => {
    return mergePositions(DEFAULT_EDITOR_CONFIG.positions, pointPositions)[activeTabId] ?? {};
  }, [activeTabId, pointPositions]);

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

  useEffect(() => {
    if (!isEditMode) return;
    const payload = {
      positions: pointPositions,
      mapping: pointToSlide
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      return;
    }
  }, [isEditMode, pointPositions, pointToSlide]);

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

    const maxTop = (houseEl.clientHeight - POINT_SIZE) / scale.y;
    const maxLeft = (houseEl.clientWidth - POINT_SIZE) / scale.x;

    const clampedTop = Math.round(Math.max(0, Math.min(maxTop, nextTop)));
    const clampedLeft = Math.round(Math.max(0, Math.min(maxLeft, nextLeft)));

    setPointPositions((prev) => ({
      ...prev,
      [activeTabId]: {
        ...(prev[activeTabId] ?? {}),
        [drag.pointId]: { top: clampedTop, left: clampedLeft }
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

  const handleMappingChange = (pointId, slideIndex) => {
    setPointToSlide((prev) => ({
      ...prev,
      [activeTabId]: {
        ...(prev[activeTabId] ?? defaultPointToSlide[activeTabId] ?? {}),
        [pointId]: slideIndex
      }
    }));
  };

  const handleCopyEditorConfig = async () => {
    const payload = {
      positions: pointPositions,
      mapping: pointToSlide
    };
    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
  };

  const handleResetEditorConfig = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY_V1);
    } catch {
      return;
    }
    setPointPositions(DEFAULT_EDITOR_CONFIG.positions);
    setPointToSlide(DEFAULT_EDITOR_CONFIG.mapping);
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
              <button type="button" className={styles.techEditorBtn} onClick={handleResetEditorConfig}>
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
