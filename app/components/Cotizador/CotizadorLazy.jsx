'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Cotizador = dynamic(() => import('./Cotizador'), { ssr: false });

export default function CotizadorLazy(props) {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [isReady]);

  return <div ref={containerRef}>{isReady ? <Cotizador {...props} /> : null}</div>;
}

