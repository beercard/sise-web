'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { trackPageView } from '../../lib/analytics';

/*
 * Reporta una vista por cada navegación del App Router. Sin esto GA sólo
 * registraba la primera carga: `gtag('config', ...)` corre una vez y los
 * cambios de ruta del router no lo vuelven a ejecutar.
 *
 * El título se lee después de un frame porque React actualiza `document.title`
 * recién al terminar de pintar la ruta nueva; leerlo antes reportaba la vista
 * con el título de la página anterior.
 */
export default function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    const id = window.requestAnimationFrame(() => {
      trackPageView({ pagePath, pageTitle: document.title });
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname, searchParams]);

  return null;
}
