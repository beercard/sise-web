/**
 * Optimiza los assets de public/image sin alterar el diseño:
 *  1. Elimina imágenes no referenciadas por el código.
 *  2. Convierte los PNG pesados (>100 KB) a WebP (calidad 85) y reescribe
 *     las referencias en app/ (.jsx, .js, .scss).
 *  3. Redimensiona a un máximo de 2560 px de ancho (los exports de Figma
 *     vienen a 2x/3x, muy por encima de lo que se renderiza).
 *
 * Excepciones: el ícono del sitio y la imagen Open Graph se mantienen en PNG
 * (compatibilidad con manifest y previews de redes sociales).
 *
 * Uso: node scripts/optimize-images.mjs [--dry-run]
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGE_DIR = path.join(ROOT, 'public', 'image');
const APP_DIR = path.join(ROOT, 'app');

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_WIDTH = 2560;
const CONVERT_THRESHOLD = 100 * 1024;
const WEBP_QUALITY = 85;

// No convertir: ícono (manifest exige PNG) y OG dedicada.
const KEEP_AS_PNG = new Set(['mpr0za9r-avr9t9i.png', 'og-home.jpg']);

async function collectCodeFiles(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectCodeFiles(full)));
    } else if (/\.(jsx?|scss)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const codeFiles = await collectCodeFiles(APP_DIR);
  const contents = new Map();
  for (const file of codeFiles) {
    contents.set(file, await fs.readFile(file, 'utf8'));
  }

  const referenced = new Set();
  for (const text of contents.values()) {
    for (const match of text.matchAll(/\/image\/([a-zA-Z0-9._-]+)/g)) {
      referenced.add(match[1]);
    }
  }

  const diskFiles = await fs.readdir(IMAGE_DIR);

  // 1. Huérfanas
  let orphanBytes = 0;
  let orphanCount = 0;
  for (const file of diskFiles) {
    if (referenced.has(file) || KEEP_AS_PNG.has(file)) continue;
    const stat = await fs.stat(path.join(IMAGE_DIR, file));
    orphanBytes += stat.size;
    orphanCount += 1;
    if (!DRY_RUN) await fs.unlink(path.join(IMAGE_DIR, file));
  }
  console.log(`Huérfanas eliminadas: ${orphanCount} (${(orphanBytes / 1024 / 1024).toFixed(1)} MB)`);

  // 2. Conversión a WebP
  const renames = new Map();
  let savedBytes = 0;

  for (const file of [...referenced].sort()) {
    if (!file.endsWith('.png') || KEEP_AS_PNG.has(file)) continue;
    const fullPath = path.join(IMAGE_DIR, file);
    let stat;
    try {
      stat = await fs.stat(fullPath);
    } catch {
      console.warn(`  AVISO: ${file} referenciado pero no existe en disco.`);
      continue;
    }
    if (stat.size < CONVERT_THRESHOLD) continue;

    const image = sharp(fullPath);
    const meta = await image.metadata();
    let pipeline = image;
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    const webpBuffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
    if (webpBuffer.length >= stat.size) continue;

    const webpName = file.replace(/\.png$/, '.webp');
    if (!DRY_RUN) {
      await fs.writeFile(path.join(IMAGE_DIR, webpName), webpBuffer);
      await fs.unlink(fullPath);
    }
    renames.set(`/image/${file}`, `/image/${webpName}`);
    savedBytes += stat.size - webpBuffer.length;
  }

  console.log(`Convertidas a WebP: ${renames.size} (ahorro ${(savedBytes / 1024 / 1024).toFixed(1)} MB)`);

  // 3. Reescritura de referencias
  let touchedFiles = 0;
  for (const [file, original] of contents.entries()) {
    let updated = original;
    for (const [from, to] of renames.entries()) {
      updated = updated.split(from).join(to);
    }
    if (updated !== original) {
      touchedFiles += 1;
      if (!DRY_RUN) await fs.writeFile(file, updated);
    }
  }
  console.log(`Archivos de código actualizados: ${touchedFiles}`);

  if (DRY_RUN) console.log('(dry-run: no se modificó nada)');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
