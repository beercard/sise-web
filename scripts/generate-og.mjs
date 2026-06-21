/*
 * Genera imágenes Open Graph (1200x630) por página con la identidad de SISE:
 * fondo azul institucional, águila, marca y el título de la sección. Salida
 * en public/image/og-<key>.jpg. Reejecutable: `node scripts/generate-og.mjs`.
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'image');
const EAGLE = path.join(OUT_DIR, 'mpr0za9r-avr9t9i.png');

const BLUE = '#00408c';
const W = 1200;
const H = 630;

const PAGES = [
  { key: 'home', title: 'Alarmas monitoreadas y seguridad electrónica 24/7' },
  { key: 'hogar', title: 'Seguridad para el hogar' },
  { key: 'comercio', title: 'Seguridad para comercios' },
  { key: 'industria', title: 'Seguridad para industrias y empresas' },
  { key: 'edificios', title: 'Seguridad para edificios y consorcios' },
  { key: 'construccion', title: 'Seguridad para obras y construcción' },
  { key: 'agro', title: 'Seguridad para el campo' },
  { key: 'ciudad', title: 'Seguridad para ciudades' },
  { key: 'historia', title: 'Historia y trayectoria' },
  { key: 'rse', title: 'Responsabilidad social empresarial' },
  { key: 'contacto', title: 'Contacto y atención 24 horas' }
];

const SUBTITLE = 'Seguridad electrónica y monitoreo 24/7 — Resistencia · Chaco · NEA';

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}

// Word-wrap simple por cantidad de caracteres, máximo 3 líneas.
function wrap(text, maxChars = 22, maxLines = 3) {
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

function buildSvg(title) {
  const lines = wrap(title, 22, 3);
  const lineHeight = 78;
  const startY = 340 - (lines.length - 1) * (lineHeight / 2);
  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="90" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('');

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a4ea0"/>
      <stop offset="1" stop-color="#00346f"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${BLUE}"/>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="90" y="${H - 150}" width="120" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
  <text x="330" y="150" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" letter-spacing="2" fill="#ffffff">SISE ARGENTINA</text>
  <text font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#ffffff">${titleTspans}</text>
  <text x="90" y="${H - 100}" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400" fill="#ffffff" opacity="0.9">${escapeXml(SUBTITLE)}</text>
  <text x="${W - 90}" y="150" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="500" fill="#ffffff" opacity="0.75">siseargentina.com</text>
</svg>`;
}

async function main() {
  const eagle = await sharp(EAGLE).resize({ height: 120 }).png().toBuffer();

  for (const page of PAGES) {
    const svg = Buffer.from(buildSvg(page.title));
    const out = path.join(OUT_DIR, `og-${page.key}.jpg`);
    await sharp(svg)
      .composite([{ input: eagle, top: 70, left: 90 }])
      .jpeg({ quality: 86 })
      .toFile(out);
    console.log(`✓ og-${page.key}.jpg`);
  }
  console.log('Listo: imágenes OG generadas en public/image/');
}

main().catch((error) => {
  console.error('Error generando OG images:', error);
  process.exit(1);
});
