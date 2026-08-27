import { seoRoutes, siteConfig } from './lib/seo';

/* La exportación estática necesita saber que esta ruta se resuelve en
   tiempo de compilación; sin esto el build se detiene. */
export const dynamic = 'force-static';

export default function sitemap() {
  /* Fecha del último cambio real de contenido (no new Date(): con la fecha del
     build cada deploy marcaría el sitio entero como modificado y los crawlers
     terminan ignorando el campo). Actualizar al publicar cambios de contenido. */
  const lastModified = new Date('2026-08-25');

  return seoRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
