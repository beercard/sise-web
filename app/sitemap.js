import { seoRoutes, siteConfig } from './lib/seo';

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
