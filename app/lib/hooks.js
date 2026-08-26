'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const getDirection = (currentIndex, nextIndex) => {
  if (nextIndex === currentIndex) return 'next';
  return nextIndex > currentIndex ? 'next' : 'prev';
};

export function useSlideTransition({ length = 0, animationMs = 420 } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [direction, setDirection] = useState('next');

  const activeIndexRef = useRef(0);
  const animTimeoutRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
    };
  }, []);

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
      }, animationMs);
    },
    [animationMs]
  );

  const goPrev = useCallback(() => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex - 1 + length) % length, 'prev');
  }, [length, startTransition]);

  const goNext = useCallback(() => {
    const currentIndex = activeIndexRef.current;
    startTransition((currentIndex + 1) % length, 'next');
  }, [length, startTransition]);

  const resetTo = useCallback((index = 0) => {
    if (animTimeoutRef.current) window.clearTimeout(animTimeoutRef.current);
    setPreviousIndex(null);
    setActiveIndex(index);
    setDirection('next');
  }, []);

  return {
    activeIndex,
    previousIndex,
    direction,
    isAnimating: previousIndex !== null,
    activeIndexRef,
    startTransition,
    goPrev,
    goNext,
    resetTo
  };
}

const mergeSections = (base, override) => {
  const next = { ...base };
  if (!override) return next;
  Object.keys(override).forEach((areaId) => {
    next[areaId] = { ...(base?.[areaId] ?? {}), ...(override?.[areaId] ?? {}) };
  });
  return next;
};

export const getPointPercentPosition = (position, base) => {
  if (!position) return null;
  if (!base?.width || !base?.height) {
    return { top: `${position.top}px`, left: `${position.left}px` };
  }
  return {
    top: `${(position.top / base.height) * 100}%`,
    left: `${(position.left / base.width) * 100}%`
  };
};

export function useAreaScale({ baseSizes, activeAreaId, areaRef }) {
  const [scale, setScale] = useState({ x: 1, y: 1 });

  const getScale = useCallback(
    (areaId, areaEl) => {
      const base = baseSizes?.[areaId];
      if (!base || !areaEl) return { x: 1, y: 1 };
      const scaleX = areaEl.clientWidth / base.width;
      const scaleY = areaEl.clientHeight / base.height;
      return {
        x: Number.isFinite(scaleX) && scaleX > 0 ? scaleX : 1,
        y: Number.isFinite(scaleY) && scaleY > 0 ? scaleY : 1
      };
    },
    [baseSizes]
  );

  useEffect(() => {
    const areaEl = areaRef.current;
    if (!areaEl) return undefined;

    const update = () => setScale(getScale(activeAreaId, areaEl));
    const raf = window.requestAnimationFrame(update);

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(areaEl);
    }

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      window.cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeAreaId, areaRef, getScale, baseSizes]);

  return { scale, getScale };
}

const FALLBACK_SCALE = { x: 1, y: 1 };

export function useTechEditor({
  storageKey,
  defaultPositions,
  defaultMapping = {},
  activeAreaId,
  points,
  areaRef,
  getScale,
  pointSize = 28,
  onPointGrabbed
}) {
  const [isEditMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('edit') === '1';
    } catch {
      return false;
    }
  });

  const readStored = (section, fallback, merge) => {
    if (typeof window === 'undefined' || !isEditMode) return fallback;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return merge(fallback, parsed?.[section]);
    } catch {
      return fallback;
    }
  };

  const [pointPositions, setPointPositions] = useState(() =>
    readStored('positions', defaultPositions, mergeSections)
  );
  const [pointToSlide, setPointToSlide] = useState(() =>
    readStored('mapping', defaultMapping, mergeSections)
  );

  const pointRefs = useRef({});
  const dragRef = useRef(null);

  const resolveScale = useCallback(
    (areaEl) => (getScale ? getScale(activeAreaId, areaEl) : FALLBACK_SCALE),
    [activeAreaId, getScale]
  );

  const positionsForArea = useMemo(
    () => mergeSections(defaultPositions, pointPositions)[activeAreaId] ?? {},
    [activeAreaId, defaultPositions, pointPositions]
  );

  useEffect(() => {
    if (!isEditMode) return undefined;
    const missing = points.filter((point) => !(pointPositions[activeAreaId] ?? {})[point.id]);
    if (missing.length === 0) return undefined;
    const areaEl = areaRef.current;
    if (!areaEl) return undefined;

    const raf = window.requestAnimationFrame(() => {
      const areaRect = areaEl.getBoundingClientRect();
      const scale = resolveScale(areaEl);
      const measured = missing.reduce((acc, point) => {
        const el = pointRefs.current[point.id];
        if (!el) return acc;
        const rect = el.getBoundingClientRect();
        acc[point.id] = {
          top: Math.round((rect.top - areaRect.top) / scale.y),
          left: Math.round((rect.left - areaRect.left) / scale.x)
        };
        return acc;
      }, {});

      setPointPositions((prev) => ({
        ...prev,
        [activeAreaId]: {
          ...(prev[activeAreaId] ?? {}),
          ...measured
        }
      }));
    });

    return () => window.cancelAnimationFrame(raf);
  }, [activeAreaId, areaRef, isEditMode, pointPositions, points, resolveScale]);

  useEffect(() => {
    if (!isEditMode) return;
    const payload = { positions: pointPositions, mapping: pointToSlide };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      return;
    }
  }, [isEditMode, pointPositions, pointToSlide, storageKey]);

  const handlePointPointerDown = (pointId, event) => {
    if (!isEditMode) return;
    const areaEl = areaRef.current;
    if (!areaEl) return;
    const current = positionsForArea[pointId];
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
    if (onPointGrabbed) onPointGrabbed(pointId);
  };

  const handlePointPointerMove = (event) => {
    if (!isEditMode) return;
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.pointerId !== event.pointerId) return;
    const areaEl = areaRef.current;
    if (!areaEl) return;

    const scale = resolveScale(areaEl);
    const nextTop = drag.startTop + (event.clientY - drag.startY) / scale.y;
    const nextLeft = drag.startLeft + (event.clientX - drag.startX) / scale.x;

    const maxTop = (areaEl.clientHeight - pointSize) / scale.y;
    const maxLeft = (areaEl.clientWidth - pointSize) / scale.x;

    const clampedTop = Math.round(Math.max(0, Math.min(maxTop, nextTop)));
    const clampedLeft = Math.round(Math.max(0, Math.min(maxLeft, nextLeft)));

    setPointPositions((prev) => ({
      ...prev,
      [activeAreaId]: {
        ...(prev[activeAreaId] ?? {}),
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
      [activeAreaId]: {
        ...(prev[activeAreaId] ?? defaultMapping[activeAreaId] ?? {}),
        [pointId]: slideIndex
      }
    }));
  };

  const handleCopyEditorConfig = async () => {
    const payload = { positions: pointPositions, mapping: pointToSlide };
    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
  };

  const handleResetEditorConfig = () => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      return;
    }
    setPointPositions(defaultPositions);
    setPointToSlide(defaultMapping);
  };

  return {
    isEditMode,
    pointPositions,
    pointToSlide,
    setPointToSlide,
    positionsForArea,
    pointRefs,
    handlePointPointerDown,
    handlePointPointerMove,
    handlePointPointerUp,
    handleMappingChange,
    handleCopyEditorConfig,
    handleResetEditorConfig
  };
}


/*
 * Precarga las ilustraciones de todas las fichas del módulo de tecnología en
 * cuanto el navegador queda ocioso: sin esto, cada card pide su imagen recién
 * al mostrarse por primera vez y el cambio de ficha se ve con retardo. Sirve
 * porque las cards renderizan los webp directo (unoptimized): la URL que se
 * calienta acá es la misma que va a pedir el <Image>.
 */
export function useWarmSlideImages(slides) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const urls = [];
    slides.forEach((slide) => {
      const art = slide.art;
      if (!art) return;
      [art.src, art.mobileSrc, art.backgroundSrc, art.overlaySrc, art.svgSrc, art.iconSrc, art.cornerSrc].forEach(
        (url) => {
          if (url) urls.push(url);
        }
      );
    });

    const warm = () => {
      urls.forEach((url) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      });
    };

    if (window.requestIdleCallback) {
      const idleId = window.requestIdleCallback(warm, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(warm, 900);
    return () => window.clearTimeout(timeoutId);
  }, [slides]);
}
