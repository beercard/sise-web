'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '../../page.module.scss';

const STORAGE_KEY = 'sise-ciudad-tech-editor-v2';
const HOUSE_BASE_WIDTH = 2528;
const HOUSE_BASE_HEIGHT = 1682;
const CARD_ANIMATION_MS = 420;

const DEFAULT_EDITOR_CONFIG = {
  positions: {
    perimetral: {
      camarasVigilancia: { top: 609, left: 691 },
      puntosSeguros: { top: 934, left: 1311 },
      paradasSeguras: { top: 895, left: 1577 },
      gpsInstitucional: { top: 916, left: 852 }
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

export default function CiudadTechnologyModule() {
  const tabs = useMemo(() => [{ id: 'perimetral', label: 'PROTECCIÓN PERIMETRAL' }], []);

  const [activeTabId, setActiveTabId] = useState('perimetral');
  const [activePointId, setActivePointId] = useState('camarasVigilancia');
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [direction, setDirection] = useState('next');

  const [pointPositions, setPointPositions] = useState(DEFAULT_EDITOR_CONFIG.positions);
  const [pointToSlide, setPointToSlide] = useState(DEFAULT_EDITOR_CONFIG.mapping);
  const [isEditMode, setIsEditMode] = useState(false);

  const [houseScale, setHouseScale] = useState({ x: 1, y: 1 });

  const houseRef = useRef(null);
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

  const points = useMemo(
    () => [
      { id: 'camarasVigilancia', label: 'Cámaras de vigilancia' },
      { id: 'puntosSeguros', label: 'Puntos seguros' },
      { id: 'paradasSeguras', label: 'Paradas Seguras' },
      { id: 'gpsInstitucional', label: 'GPS institucional' }
    ],
    []
  );

  const slides = useMemo(
    () => [
      {
        id: 'camarasVigilancia',
        title: 'Cámaras de vigilancia',
        text: 'Supervisión en tiempo real y grabación continua para mayor control y tranquilidad.',
        styleVars: {
          '--tech-card-padding': '42px 83px 27px',
          '--tech-card-align-items': 'flex-start',
          '--tech-card-title-width': '276px',
          '--tech-card-title-height': '63px',
          '--tech-card-title-min-height': '63px',
          '--tech-card-text-width': '276px',
          '--tech-card-text-margin': '17px 0 0',
          '--tech-card-image-width': '143px',
          '--tech-card-image-height': '143px',
          '--tech-card-image-margin-top': '6px',
          '--tech-card-image-margin-left': '65px'
        },
        art: { type: 'image', src: '/image/mq1kcwk1-m8n3v94.png', width: 143, height: 143 }
      },
      {
        id: 'puntosSeguros',
        title: 'Puntos Seguros',
        text: 'Espacios equipados y monitoreados que permiten solicitar asistencia ante emergencias, conectados al centro de monitoreo.',
        styleVars: {
          '--tech-card-padding': '42px 28px 18px 27px',
          '--tech-card-align-items': 'center',
          '--tech-card-title-width': '276px',
          '--tech-card-title-height': '31px',
          '--tech-card-title-min-height': '31px',
          '--tech-card-text-width': '387px',
          '--tech-card-text-margin': '8px 0 0',
          '--tech-card-image-width': '126px',
          '--tech-card-image-height': '188px',
          '--tech-card-image-margin-top': '11px'
        },
        art: { type: 'image', src: '/image/mq1ip4u2-z1dsbza.png', width: 126, height: 188 }
      },
      {
        id: 'paradasSeguras',
        title: 'Paradas Seguras',
        text: 'Infraestructura de seguridad en transporte público que mejora la protección de los usuarios.',
        styleVars: {
          '--tech-card-padding': '42px 83px 19px',
          '--tech-card-align-items': 'center',
          '--tech-card-title-width': '276px',
          '--tech-card-title-height': '31px',
          '--tech-card-title-min-height': '31px',
          '--tech-card-text-width': '276px',
          '--tech-card-text-margin': '8px 0 0',
          '--tech-card-image-width': '103px',
          '--tech-card-image-height': '187px',
          '--tech-card-image-margin-top': '11px'
        },
        art: { type: 'image', src: '/image/mq1ip4zv-p0t8sua.png', width: 103, height: 187 }
      },
      {
        id: 'gpsInstitucional',
        title: 'GPS institucional',
        text: 'Control y seguimiento de flota pública, optimizando recursos y detectando desvíos.',
        styleVars: {
          '--tech-card-padding': '42px 42px 19px 41px',
          '--tech-card-align-items': 'flex-start',
          '--tech-card-title-width': '276px',
          '--tech-card-title-height': '31px',
          '--tech-card-title-min-height': '31px',
          '--tech-card-title-align': 'center',
          '--tech-card-title-margin': '0 0 0 42px',
          '--tech-card-text-width': '359px',
          '--tech-card-text-margin': '12px 0 0',
          '--tech-card-text-align': 'center'
        },
        art: {
          type: 'gps',
          overlaySrc: '/image/mq1ip585-5gdqo05.png',
          overlayWidth: 143,
          overlayHeight: 143,
          backgroundSrc: '/image/mq1ip585-5mj0wb5.png',
          cornerSrc: '/image/mq1ip584-5xtsqf8.svg',
          cornerWidth: 18,
          cornerHeight: 11
        }
      }
    ],
    []
  );

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

    const position = positionsForTab[pointId];
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

  const renderCard = (slide, state) => {
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
        style={slide.styleVars}
      >
        <h3 className={styles.techCardTitle}>{slide.title}</h3>
        <p className={styles.techCardText}>{slide.text}</p>
        {slide.art?.type === 'image' ? (
          <div className={styles.techCardImageWrap}>
            <Image src={slide.art.src} alt="" className={styles.techCardImage} width={slide.art.width} height={slide.art.height} />
          </div>
        ) : null}
        {slide.art?.type === 'gps' ? (
          <div className={styles.techCardGpsAutoWrapper}>
            <Image
              src={slide.art.overlaySrc}
              alt=""
              className={styles.techCardGpsOverlay}
              width={slide.art.overlayWidth}
              height={slide.art.overlayHeight}
            />
            <div className={styles.techCardGpsBg} style={{ '--gps-bg': `url('${slide.art.backgroundSrc}')` }} aria-hidden="true">
              <div className={styles.techCardGpsBar} />
              <Image src={slide.art.cornerSrc} alt="" className={styles.techCardGpsCorner} width={slide.art.cornerWidth} height={slide.art.cornerHeight} />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <section className={styles.technology} aria-label="Tecnologías">
      <h2 className={styles.technologyTitle}>
        <span className={styles.technologyTitleStrong}>Tecnología aplicada </span>
        <span className={styles.technologyTitleLight}>a la seguridad urbana,</span>
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
              className={styles.tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                activeIndexRef.current = 0;
                setPreviousIndex(null);
                setDirection('next');
                setActiveIndex(0);
                setActiveTabId(tab.id);
                setActivePointId(points[0]?.id ?? '');
              }}
            >
              {tab.label}
              <span className={styles.tabUnderline} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className={styles.techBody}>
        <div className={styles.techHouseColumn}>
          <div className={styles.houseViewport}>
            <div className={styles.house} ref={houseRef} aria-label="Mapa interactivo">
              <Image
                src="/image/mq1invd0-czaywzp.png"
                alt=""
                className={styles.houseImage}
                width={HOUSE_BASE_WIDTH}
                height={HOUSE_BASE_HEIGHT}
                sizes="(max-width: 960px) 100vw, 980px"
                style={{ width: '100%', height: 'auto' }}
                priority
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
          <button type="button" className={`${styles.techCardArrow} ${styles.techCardArrowLeft}`} aria-label="Anterior" onClick={goPrev} disabled={!allowNav}>
            <span aria-hidden="true" />
          </button>

          <div className={styles.techCardViewport}>
            {previousSlide ? renderCard(previousSlide, 'exit') : null}
            {currentSlide ? renderCard(currentSlide, 'enter') : null}
          </div>

          <button type="button" className={`${styles.techCardArrow} ${styles.techCardArrowRight}`} aria-label="Siguiente" onClick={goNext} disabled={!allowNav}>
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
