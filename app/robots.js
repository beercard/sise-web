import { siteConfig } from './lib/seo';

/* La exportación estática necesita saber que esta ruta se resuelve en
   tiempo de compilación; sin esto el build se detiene. */
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*?edit=1', '/*&edit=1']
      }
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: new URL(siteConfig.siteUrl).host
  };
}
