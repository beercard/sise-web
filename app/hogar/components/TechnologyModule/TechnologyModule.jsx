'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '../../page.module.scss';

const ANIMATION_MS = 420;
const STORAGE_KEY = 'sise-tech-editor-v1';
const POINT_SIZE = 28;

const DEFAULT_EDITOR_CONFIG = {
  positions: {
    perimetral: {
      cerco: { top: 245, left: 53 },
      camaras: { top: 215, left: 150 },
      magneticos: { top: 289, left: 195 },
      cartel: { top: 238, left: 618 },
      sirena: { top: 259, left: 222 }
    },
    interior: {
      sensor: { top: 121, left: 408 },
      teclado: { top: 255, left: 485 },
      mando: { top: 350, left: 406 },
      central: { top: 251, left: 518 },
      camara: { top: 61, left: 467 }
    },
    conectividad: {
      app: { top: 303, left: 354 }
    }
  },
  mapping: {}
};

const TAB_IDS = {
  PERIMETRAL: 'perimetral',
  INTERIOR: 'interior',
  CONECTIVIDAD: 'conectividad'
};

const HOUSE_BASE_SIZES = {
  perimetral: { width: 735, height: 527 },
  interior: { width: 735, height: 505 },
  conectividad: { width: 735, height: 505 }
};

const getHouseScale = (tabId, houseEl) => {
  const base = HOUSE_BASE_SIZES[tabId];
  if (!base || !houseEl) return { x: 1, y: 1 };
  const scaleX = houseEl.clientWidth / base.width;
  const scaleY = houseEl.clientHeight / base.height;
  return {
    x: Number.isFinite(scaleX) && scaleX > 0 ? scaleX : 1,
    y: Number.isFinite(scaleY) && scaleY > 0 ? scaleY : 1
  };
};

const getDirection = (currentIndex, nextIndex) => {
  if (nextIndex === currentIndex) return 'next';
  return nextIndex > currentIndex ? 'next' : 'prev';
};

export default function TechnologyModule() {
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
          { id: 'cerco', label: 'Cerco eléctrico perimetral', pointClassName: styles.ellipse1 },
          { id: 'camaras', label: 'Cámaras de vigilancia', pointClassName: styles.ellipse12 },
          { id: 'magneticos', label: 'Magnéticos', pointClassName: styles.ellipse13 },
          { id: 'cartel', label: 'Cartel disuasivo', pointClassName: styles.ellipse14 },
          { id: 'sirena', label: 'Sirena exterior', pointClassName: styles.ellipse15 }
        ],
        slides: [
          {
            title: 'Cerco eléctrico perimetral',
            text: 'Primera barrera de seguridad que protege tu propiedad y disuade ingresos no autorizados.',
            styleVars: {
              '--tech-card-padding': '42px 83px 22px',
              '--tech-card-image-width': '215px',
              '--tech-card-image-height': '154px',
              '--tech-card-image-margin': '24px 0 0'
            },
            art: { type: 'image', src: '/image/mpudc5hr-kxw5icp.png', width: 215, height: 154 }
          },
          {
            title: 'Cámaras de vigilancia',
            text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
            styleVars: {
              '--tech-card-padding': '42px 83px',
              '--tech-card-image-width': '192px',
              '--tech-card-image-height': '117px',
              '--tech-card-image-margin': '17px 0 0'
            },
            art: { type: 'image', src: '/image/mpuk8l58-7ujlops.png', width: 192, height: 117 }
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
              '--tech-card-image-margin': '14px 0 0 60px'
            },
            art: { type: 'image', src: '/image/mpuk98wo-z2d321o.png', width: 160, height: 160 }
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
              '--tech-card-image-margin': '9px 0 0 68px'
            },
            art: { type: 'image', src: '/image/mpul2hzn-fvb6ziy.png', width: 139, height: 147 }
          },
          {
            title: 'Sirena exterior',
            text: 'Alerta sonora de alto alcance que ahuyenta intrusos y activa la atención del entorno.',
            styleVars: {
              '--tech-card-padding': '48px 83px 44px',
              '--tech-card-title-min-height': '31px',
              '--tech-card-text-margin': '12px 0 0',
              '--tech-card-sirena-margin-top': '14px'
            },
            art: {
              type: 'sirena',
              backgroundSrc: '/image/mpul3d3a-hllgx9l.png',
              svgSrc: '/image/mpul3d39-q38k68v.svg'
            }
          }
        ]
      },
      {
        id: TAB_IDS.INTERIOR,
        label: 'PROTECCIÓN INTERIOR',
        houseClassName: styles.houseInterior,
        points: [
          { id: 'sensor', label: 'Sensor de movimiento', pointClassName: styles.ellipse1 },
          { id: 'teclado', label: 'Teclado de configuración', pointClassName: styles.ellipse12 },
          { id: 'mando', label: 'Mando a distancia', pointClassName: styles.ellipse13 },
          { id: 'central', label: 'Central con comunicador', pointClassName: styles.ellipse14 },
          { id: 'camara', label: 'Cámara inteligente interior', pointClassName: styles.ellipse15 }
        ],
        slides: [
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
              image: { src: '/image/mpul6mkt-g5lny44.png', width: 193, height: 180, top: 0, left: 0 },
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
            art: {
              type: 'absolute',
              src: '/image/mpul7gfa-5619l3v.png',
              width: 201,
              height: 188,
              top: 157,
              left: 121,
              rotate: 0
            }
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
            art: {
              type: 'absolute',
              src: '/image/mpul934z-n4p35pf.png',
              width: 175,
              height: 164,
              top: 154,
              left: 132,
              rotate: 16
            }
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
              '--tech-card-image-margin': '9px 0 0 27px'
            },
            art: { type: 'image', src: '/image/mpul9o4z-m9vtkfc.png', width: 219, height: 156 }
          },
          {
            title: 'Cámara inteligente interior',
            text: 'Monitoreo interno en vivo con alertas inteligentes desde tu celular.',
            styleVars: {
              '--tech-card-padding': '35px 83px 46px',
              '--tech-card-text-margin': '16px 0 0',
              '--tech-card-text-width': '211px',
              '--tech-card-image-width': '192px',
              '--tech-card-image-height': '117px',
              '--tech-card-image-margin': '21px 0 0'
            },
            art: { type: 'image', src: '/image/mpula57w-bujdbk3.png', width: 192, height: 117 }
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
              backgroundSrc: '/image/mpulc23z-ua6f137.png',
              wrapperWidth: 183,
              wrapperHeight: 172,
              wrapperMarginTop: 74,
              imageTop: 14,
              text: { top: -57, right: -55, width: 292 }
            }
          }
        ]
      }
    ],
    []
  );

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
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_EDITOR_CONFIG.positions;
      const parsed = JSON.parse(raw);
      return parsed?.positions ?? DEFAULT_EDITOR_CONFIG.positions;
    } catch {
      return DEFAULT_EDITOR_CONFIG.positions;
    }
  });
  const [pointToSlide, setPointToSlide] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_EDITOR_CONFIG.mapping;
    if (!isEditMode) return DEFAULT_EDITOR_CONFIG.mapping;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_EDITOR_CONFIG.mapping;
      const parsed = JSON.parse(raw);
      return parsed?.mapping ?? DEFAULT_EDITOR_CONFIG.mapping;
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
  }, [activeTabId]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) {
        window.clearTimeout(animTimeoutRef.current);
      }
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
      style['--tech-card-image-margin'] = '14px 0 0';
      style['--tech-card-sirena-margin-top'] = '12px';
    }

    const shouldRenderMainText = isMobile ? slide.art?.type !== 'overlay' : slide.art?.type !== 'overlay' && slide.art?.type !== 'connectivity';
    const artScale = isNarrowMobile ? 0.72 : isMobile ? 0.8 : 1;

    return (
      <div className={`${styles.techCard} ${extraClassName}`} style={style}>
        <p className={styles.techCardTitle}>{slide.title}</p>
        {shouldRenderMainText ? <p className={styles.techCardText}>{slide.text}</p> : null}
        {slide.art?.type === 'image' ? (
          <Image
            src={slide.art.src}
            alt=""
            className={styles.techCardImage}
            width={slide.art.width}
            height={slide.art.height}
          />
        ) : null}
        {slide.art?.type === 'absolute' ? (
          isMobile ? (
            <Image
              src={slide.art.src}
              alt=""
              className={styles.techCardImage}
              width={slide.art.width}
              height={slide.art.height}
              style={{ transform: `rotate(${slide.art.rotate}deg)` }}
            />
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
            <Image
              src={slide.art.image.src}
              alt=""
              className={styles.techCardOverlayImage}
              width={slide.art.image.width}
              height={slide.art.image.height}
            />
          </div>
        ) : null}
        {slide.art?.type === 'sirena' ? (
          <div className={styles.techCardSirenaFrame} style={{ '--sirena-bg': `url('${slide.art.backgroundSrc}')` }}>
            <Image src={slide.art.svgSrc} alt="" width={69} height={24} className={styles.techCardSirenaSvg} />
          </div>
        ) : null}
        {slide.art?.type === 'connectivity' ? (
          <div
            className={styles.techCardConnectivityWrap}
            style={{
              width: `${slide.art.wrapperWidth}px`,
              height: `${slide.art.wrapperHeight}px`,
              marginTop: slide.art.wrapperMarginTop ? `${slide.art.wrapperMarginTop}px` : undefined,
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
              style={{
                '--connectivity-bg': `url('${slide.art.backgroundSrc}')`,
                top: isMobile ? '8px' : slide.art.imageTop ? `${slide.art.imageTop}px` : undefined
              }}
              aria-hidden="true"
            >
              <div className={styles.techCardConnectivityBar} />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const positionsForTab = pointPositions[activeTabId] ?? {};

  useEffect(() => {
    if (!isEditMode) return;
    if (pointPositions[activeTabId]) return;
    const houseEl = houseRef.current;
    if (!houseEl) return;

    const raf = window.requestAnimationFrame(() => {
      const houseRect = houseEl.getBoundingClientRect();
      const scale = getHouseScale(activeTabId, houseEl);
      const measured = points.reduce((acc, point) => {
        const el = pointRefs.current[point.id];
        if (!el) return acc;
        const rect = el.getBoundingClientRect();
        acc[point.id] = {
          top: Math.round((rect.top - houseRect.top) / scale.y),
          left: Math.round((rect.left - houseRect.left) / scale.x)
        };
        return acc;
      }, {});

      setPointPositions((prev) => ({ ...prev, [activeTabId]: measured }));
    });

    return () => window.cancelAnimationFrame(raf);
  }, [activeTabId, isEditMode, pointPositions, points]);

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
    const current = (pointPositions[activeTabId] ?? {})[pointId];
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
    } catch {
      return;
    }
    setPointPositions(DEFAULT_EDITOR_CONFIG.positions);
    setPointToSlide(DEFAULT_EDITOR_CONFIG.mapping);
  };

  return (
    <section className={styles.technology} aria-label="Tecnología inteligente">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Tu hogar seguro en cada rincón</span>
        <br />
        <span className={styles.technologyTitleLight}>con tecnología inteligente</span>
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
          aria-label="Plano hogar"
          onPointerMove={handlePointPointerMove}
          onPointerUp={handlePointPointerUp}
          onPointerCancel={handlePointPointerUp}
        >
          {points.map((point, index) => {
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
                className={`${styles.pointButton} ${point.pointClassName} ${isActive ? styles.pointActive : ''} ${
                  isEditMode ? styles.pointEdit : ''
                } ${position ? styles.pointAbsolute : ''}`}
                aria-label={point.label}
                aria-pressed={isActive}
                style={
                  scaledPosition ? { top: `${scaledPosition.top}px`, left: `${scaledPosition.left}px` } : undefined
                }
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
              <Image src="/image/mpudc5hg-jng7cpc.png" alt="" width={30} height={18} />
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
              <Image src="/image/mpudc5hg-5099gqg.png" alt="" width={30} height={17} />
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
                  <select
                    className={styles.techEditorSelect}
                    value={value}
                    onChange={(e) => handleMappingChange(point.id, Number(e.target.value))}
                  >
                    {slides.map((slide, idx) => (
                      <option key={`${slide.title}-${idx}`} value={idx}>
                        {slide.title}
                      </option>
                    ))}
                  </select>
                  <p className={styles.techEditorPos}>
                    {position ? `x:${position.left} y:${position.top}` : 'x:- y:-'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
