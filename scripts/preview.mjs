import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Servidor local para revisar el sitio compilado (carpeta out/) antes de
 * subirlo al hosting: `npm run build` y después `npm run preview`.
 *
 * Imita lo justo del .htaccess: /hogar sirve hogar.html. NO ejecuta PHP ni
 * aplica las redirecciones, así que los formularios no envían nada acá; eso
 * solo se puede probar en el hosting.
 */
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const PUERTO = Number(process.env.PORT) || 4300;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4'
};

if (!fs.existsSync(path.join(RAIZ, 'index.html'))) {
  console.error('No hay compilación: corré `npm run build` primero.');
  process.exit(1);
}

http
  .createServer((req, res) => {
    let ruta = decodeURIComponent(req.url.split('?')[0]);
    if (ruta.endsWith('/')) ruta += 'index.html';

    let archivo = path.join(RAIZ, ruta);
    if (!archivo.startsWith(RAIZ)) {
      res.writeHead(403).end('Prohibido');
      return;
    }

    if (!fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) archivo += '.html';

    if (!fs.existsSync(archivo)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(path.join(RAIZ, '404.html')));
      return;
    }

    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    fs.createReadStream(archivo).pipe(res);
  })
  .listen(PUERTO, () => console.log(`Sitio compilado en http://localhost:${PUERTO}  (Ctrl+C para cortar)`));
