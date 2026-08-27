import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

/*
 * Tarjetas de Open Graph: la foto del hero de cada página con el velo azul de
 * la marca, el águila y el título. Se generan dos recortes por página:
 *
 *   og-<clave>.jpg       1200×1200 — el que ve WhatsApp (vista previa grande
 *                        y cuadrada en el chat).
 *   og-<clave>-wide.jpg  1200×630  — el que piden X/Twitter y LinkedIn.
 *
 * El cuadrado sale del hero mobile (ya encuadrado en vertical) y el apaisado
 * del hero desktop, en ambos casos anclando el recorte arriba, que es donde
 * vive el motivo.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'image');
const EAGLE = path.join(OUT_DIR, 'mpr0za9r-avr9t9i.png');

const PAGES = [
  {
    key: 'home',
    title: 'Alarmas monitoreadas y seguridad electrónica 24/7',
    photo: 'hero-historia-equipo-desktop.webp'
  },
  { key: 'hogar', title: 'Seguridad para el hogar', photo: 'hero-hogar-casa-desktop.webp' },
  { key: 'comercio', title: 'Seguridad para comercios', photo: 'hero-comercio-local-desktop.webp' },
  {
    key: 'industria',
    title: 'Seguridad para industrias y empresas',
    photo: 'hero-industria-planta-desktop.webp'
  },
  {
    key: 'edificios',
    title: 'Seguridad para edificios y consorcios',
    photo: 'hero-edificios-edificio-desktop.webp'
  },
  {
    key: 'construccion',
    title: 'Seguridad para obras y construcción',
    photo: 'hero-construccion-obra-desktop.webp'
  },
  { key: 'agro', title: 'Seguridad para el campo', photo: 'hero-agro-campo-desktop.webp' },
  { key: 'ciudad', title: 'Seguridad para ciudades', photo: 'hero-ciudad-poste-desktop.webp' },
  {
    key: 'historia',
    title: 'Historia y trayectoria',
    photo: 'hero-historia-equipo-desktop.webp'
  },
  {
    key: 'rse',
    title: 'Responsabilidad social empresarial',
    photo: 'hero-rse-comunidad-desktop.webp'
  },
  {
    key: 'contacto',
    title: 'Contacto y atención 24 horas',
    photo: 'hero-contacto-desktop.webp'
  }
];

const SUBTITLE = 'Seguridad electrónica y monitoreo 24/7 — Resistencia · Chaco · NEA';

/* Cuadrado para WhatsApp y apaisado para el resto. */
const FORMATOS = [
  {
    sufijo: '',
    variante: 'mobile',
    width: 1200,
    height: 1200,
    margin: 90,
    eagleHeight: 130,
    brandSize: 42,
    titleSize: 78,
    titleWrap: 20,
    lineHeight: 88,
    subtitleSize: 32
  },
  {
    sufijo: '-wide',
    variante: 'desktop',
    width: 1200,
    height: 630,
    margin: 80,
    eagleHeight: 104,
    brandSize: 36,
    titleSize: 62,
    titleWrap: 26,
    lineHeight: 70,
    subtitleSize: 28
  }
];

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}

function wrap(text, maxChars, maxLines = 3) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

/* Velo azul de marca: parejo sobre la foto y más denso abajo, donde va el
   texto, para que el título se lea sobre cualquier hero. */
function buildOverlay(title, f, anchoAguila) {
  const lines = wrap(title, f.titleWrap, 3);
  const subtitleY = f.height - f.margin;
  const ruleY = subtitleY - f.subtitleSize - 42;
  const lastTitleY = ruleY - 46;
  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="${f.margin}" y="${lastTitleY - (lines.length - 1 - i) * f.lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('');

  return Buffer.from(`<svg width="${f.width}" height="${f.height}" viewBox="0 0 ${f.width} ${f.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="velo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#00408c" stop-opacity="0.62"/>
      <stop offset="0.45" stop-color="#00346f" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#00274f" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="${f.width}" height="${f.height}" fill="url(#velo)"/>
  <text x="${f.margin + anchoAguila + 30}" y="${f.margin + f.eagleHeight * 0.66}" font-family="Arial, Helvetica, sans-serif" font-size="${f.brandSize}" font-weight="700" letter-spacing="2" fill="#ffffff">SISE ARGENTINA</text>
  <text font-family="Arial, Helvetica, sans-serif" font-size="${f.titleSize}" font-weight="700" fill="#ffffff">${titleTspans}</text>
  <rect x="${f.margin}" y="${ruleY}" width="120" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
  <text x="${f.margin}" y="${subtitleY}" font-family="Arial, Helvetica, sans-serif" font-size="${f.subtitleSize}" font-weight="400" fill="#ffffff" opacity="0.92">${escapeXml(SUBTITLE)}</text>
</svg>`);
}

async function main() {
  for (const page of PAGES) {
    for (const f of FORMATOS) {
      const eagle = await sharp(EAGLE).resize({ height: f.eagleHeight }).png().toBuffer();
      const anchoAguila = (await sharp(eagle).metadata()).width;
      const foto = page.photo.replace('-desktop.webp', `-${f.variante}.webp`);
      const fondo = await sharp(path.join(OUT_DIR, foto))
        .resize(f.width, f.height, { fit: 'cover', position: 'top' })
        .toBuffer();

      const salida = path.join(OUT_DIR, `og-${page.key}${f.sufijo}.jpg`);
      await sharp(fondo)
        .composite([
          { input: buildOverlay(page.title, f, anchoAguila), top: 0, left: 0 },
          { input: eagle, top: f.margin, left: f.margin }
        ])
        .jpeg({ quality: 86 })
        .toFile(salida);
      console.log(`✓ og-${page.key}${f.sufijo}.jpg (${f.width}×${f.height})`);
    }
  }
  console.log('Listo: imágenes OG generadas en public/image/');
}

main().catch((error) => {
  console.error('Error generando OG images:', error);
  process.exit(1);
});
