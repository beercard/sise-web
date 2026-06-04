import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const hooksPath = resolve(process.cwd(), '.githooks');

if (!existsSync(hooksPath)) {
  throw new Error('No se encontró la carpeta .githooks en el proyecto.');
}

execSync('git config core.hooksPath .githooks', { stdio: 'inherit' });
console.log('Git hooks habilitados: core.hooksPath=.githooks');
