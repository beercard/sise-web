import { siteConfig } from './lib/seo';

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
    host: 'siseargentina.com'
  };
}
