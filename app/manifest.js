import { siteConfig } from './lib/seo';

/* La exportación estática necesita saber que esta ruta se resuelve en
   tiempo de compilación; sin esto el build se detiene. */
export const dynamic = 'force-static';

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
      /* app/icon.png (512×512 real): declarar tamaños que no coinciden con el
         archivo hace que Chrome descarte el ícono y la PWA no sea instalable. */
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
