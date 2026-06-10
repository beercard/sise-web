import { siteConfig } from './lib/seo';

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: 'SISE',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: siteConfig.themeColor,
    lang: 'es-AR',
    icons: [
      {
        src: siteConfig.icon,
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: siteConfig.icon,
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
