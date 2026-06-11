import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RHYTHM_MARKER = '/* Ritmo del bloque de texto del hero igual a /hogar (desktop). */';

// Texto a ancho completo en la banda de columna (961-1200), como hogar.
const COLUMN_TEXT_RULES = `  .heroText {
    align-items: flex-start;
    width: min(760px, 100%);
  }

  .heroLead,
  .heroBody,
  .heroPunch {
    width: 100%;
    height: auto;
    text-align: left;
  }

`;

const PAGES = ['comercio', 'industria', 'edificios', 'construccion', 'agro', 'ciudad'];

for (const p of PAGES) {
  const file = path.join(ROOT, `app/${p}/page.module.scss`);
  let text = await fs.readFile(file, 'utf8');

  // 1. Scope del bloque de ritmo a desktop (si la página lo tiene).
  const idx = text.indexOf(RHYTHM_MARKER);
  if (idx !== -1) {
    const after = text.slice(idx + RHYTHM_MARKER.length);
    const body = after.replace(/\s+$/, '');
    const indented = body
      .split('\n')
      .map((l) => (l.trim() ? '  ' + l : l))
      .join('\n');
    text = text.slice(0, idx) + RHYTHM_MARKER + '\n@media (min-width: 1201px) {' + indented + '\n}\n';
  }

  // 2. Reglas de texto a ancho completo dentro de la seccion @1200 del bloque v2.
  const anchor1200 = '  .heroBottomInner {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 28px;\n    padding-top: 48px;\n    padding-bottom: 56px;\n';
  if (text.includes(anchor1200) && !text.includes('width: min(760px, 100%);')) {
    text = text.replace(anchor1200, COLUMN_TEXT_RULES + anchor1200);
  }

  await fs.writeFile(file, text);
  console.log(`${p}: ok`);
}
