import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*
 * El sitio se publica como archivos estáticos en el hosting Ferozo (Apache +
 * PHP, sin Node), así que `next build` exporta todo a out/.
 *
 * Dos consecuencias que hay que tener presentes:
 *
 *  - `redirects()` y `headers()` no viajan en la exportación: los aplica
 *    Apache desde public/.htaccess, que genera scripts/generate-htaccess.mjs
 *    a partir de app/lib/legacyRedirects.js antes de cada build.
 *
 *  - No hay optimizador de imágenes en tiempo real, así que next/image sirve
 *    los archivos tal cual. No es una pérdida: las fotos ya se exportan
 *    pre-dimensionadas desde Figma y pasan por scripts/optimize-images.mjs.
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    deviceSizes: [384, 640, 750, 828, 960, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }]
  },
  turbopack: {
    root: __dirname
  }
};

export default nextConfig;
