import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

import { legacyRedirects } from '../app/lib/legacyRedirects.js';

/*
 * Genera public/.htaccess para el hosting Apache de Ferozo.
 *
 * En Vercel estas reglas vivían en next.config.mjs (redirects y headers), pero
 * la exportación estática no las incluye: sin servidor Node, quien las tiene
 * que aplicar es Apache. Este script las traduce desde la MISMA fuente
 * (app/lib/legacyRedirects.js) para que no se desincronicen.
 *
 * Se ejecuta antes de `next build`, así el archivo ya está en public/ cuando
 * Next copia esa carpeta a out/.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DESTINO = path.join(ROOT, 'public', '.htaccess');

/* Reglas previas del hosting (seguridad + enrutamiento de latoma.com.ar,
   que convive en /latoma del mismo public_html). Se anteponen tal cual: si
   se pierden, latoma.com.ar deja de funcionar. */
const COMPARTIDO = fs.readFileSync(path.join(__dirname, 'htaccess-compartido.txt'), 'utf8');

const HOST = 'siseargentina.com';

/* De "/tag/:slug" al patrón de Apache. Next usa :param; acá se traduce a un
   grupo que captura cualquier segmento. */
function aPatronApache(source) {
  const escapado = source
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:path\*/g, '.*')
    .replace(/:[a-zA-Z]+/g, '[^/]+');

  return '^' + escapado.replace(/^\//, '') + '/?$';
}

function bloqueRedirects() {
  const lineas = [];
  const vistos = new Set();

  for (const regla of legacyRedirects) {
    const patron = aPatronApache(regla.source);
    if (vistos.has(patron)) continue;
    vistos.add(patron);

    /* La condición de REDIRECT_STATUS limita cada 301 al pedido original del
       navegador: sin ella, la reescritura interna de /contacto a contacto.html
       volvía a caer en la redirección histórica de contacto.html (una página
       que existía en el sitio viejo) y quedaba en bucle. NE evita que Apache
       reescriba los caracteres ya codificados de las URLs viejas de Joomla
       (las que llevan tilde). */
    lineas.push('RewriteCond %{ENV:REDIRECT_STATUS} ^$');
    lineas.push(`RewriteRule ${patron} ${regla.destination} [R=301,L,NE]`);
  }

  return lineas.join('\n');
}

const CONTENIDO = `# ==========================================================================
# SISE Argentina — configuración de Apache (hosting Ferozo / DonWeb)
#
# GENERADO POR scripts/generate-htaccess.mjs — no editar a mano.
# Los 301 del sitio anterior salen de app/lib/legacyRedirects.js; para
# cambiarlos, editar ese archivo y volver a compilar.
# ==========================================================================

Options -Indexes
# index.php incluido porque estas directivas se heredan en /latoma (WordPress).
DirectoryIndex index.html index.php

<IfModule mod_rewrite.c>
RewriteEngine On

# --- 1. Un solo host y siempre por HTTPS ----------------------------------
# Sin esto el mismo contenido queda accesible en cuatro direcciones (con y
# sin www, con y sin TLS) y Google las trata como sitios distintos.
RewriteCond %{HTTP_HOST} ^(www\\.)?${HOST.replace(/\./g, '\\.')}$ [NC]
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://${HOST}/$1 [R=301,L]

RewriteCond %{HTTP_HOST} ^www\\.${HOST.replace(/\./g, '\\.')}$ [NC]
RewriteRule ^(.*)$ https://${HOST}/$1 [R=301,L]

# --- 2. Redirecciones del sitio anterior ----------------------------------
${bloqueRedirects()}

# --- 3. URLs sin extensión ------------------------------------------------
# La exportación deja hogar.html, contacto.html, etc. y, al lado, un directorio
# hogar/ con los payloads que usa Next para navegar sin recargar. Por eso acá
# NO se puede condicionar con !-d como es habitual: /hogar existe como
# directorio y la regla nunca se aplicaría; se pregunta directamente si existe
# el .html.
#
# DirectorySlash Off es imprescindible en LiteSpeed (el servidor de Ferozo):
# a diferencia de Apache, LiteSpeed agrega la barra a los directorios ANTES
# de evaluar estas reglas, así que /hogar terminaba en /hogar/ y la regla de
# quitar la barra lo devolvía: bucle infinito. Como la directiva se hereda
# en /latoma (WordPress) y le rompería /wp-admin sin barra, el .htaccess de
# /latoma debe llevar una línea "DirectorySlash On" al principio (fuera de
# los marcadores de WordPress, se agrega una sola vez a mano).
<IfModule mod_dir.c>
DirectorySlash Off
</IfModule>

# Los payloads de prefetch de Next: el router los pide como
# /contacto/__next.contacto.__PAGE__.txt, pero la exportación los escribe en
# /contacto/__next.contacto/__PAGE__.txt (punto contra barra). Sin esta regla
# cada página dispara varios 404 y la navegación pierde el prefetch: sigue
# funcionando, pero recargando la página entera.
RewriteRule ^(.*)__next\\.([^/]+)\\.__PAGE__\\.txt$ /$1__next.$2/__PAGE__.txt [L]

# La barra final sobra: /hogar/ va a /hogar. Sólo para el host de SISE
# (latoma es WordPress y sus permalinks llevan barra final) y sólo si
# existe la página: sin la condición del archivo, /image/ (directorio
# sin .html) entraba en bucle con la barra que agrega mod_dir.
RewriteCond %{HTTP_HOST} ^(www\\.)?${HOST.replace(/\./g, '\\.')}$ [NC]
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^(.+)/$ /$1 [R=301,L,NE]

# /hogar sirve hogar.html sin redirigir, para que la URL publicada sea
# exactamente la que declara el canonical.
# Se comprueba contra DOCUMENT_ROOT y no contra REQUEST_FILENAME: cuando
# la URL coincide con un directorio (hogar/ existe junto a hogar.html),
# LiteSpeed resuelve REQUEST_FILENAME como el directorio y la condición
# no daba; el pedido caía en mod_dir, que agregaba la barra, y la regla
# de arriba la sacaba: bucle infinito de redirecciones.
RewriteCond %{HTTP_HOST} ^(www\\.)?${HOST.replace(/\./g, '\\.')}$ [NC]
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^(.+)$ /$1.html [L]

# Y /hogar.html manda a /hogar, para no tener la misma página en dos URLs.
# THE_REQUEST conserva el pedido original, así que la reescritura interna de
# arriba no dispara esta regla ni genera un bucle.
RewriteCond %{HTTP_HOST} ^(www\\.)?${HOST.replace(/\./g, '\\.')}$ [NC]
RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?] [NC]
RewriteRule ^ /%1 [R=301,L,NE]
</IfModule>

# --- 4. Página de error ---------------------------------------------------
ErrorDocument 404 /404.html

# --- 5. Cabeceras de seguridad -------------------------------------------
# Son las mismas que servía Vercel desde next.config.mjs.
<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"

# Los archivos de /_next/static llevan un hash en el nombre: cuando cambia el
# contenido cambia la URL, así que se pueden cachear para siempre.
<FilesMatch "\\.(js|css|woff2)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# El HTML no: tiene que revalidar para que un deploy se vea enseguida.
<FilesMatch "\\.html$">
  Header set Cache-Control "public, max-age=0, must-revalidate"
</FilesMatch>

<FilesMatch "\\.(webp|jpg|jpeg|png|svg|ico|mp4)$">
  Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
</IfModule>

# --- 6. Compresión --------------------------------------------------------
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
AddOutputFilterByType DEFLATE application/javascript application/x-javascript
AddOutputFilterByType DEFLATE application/json application/xml image/svg+xml
</IfModule>

# --- 7. Protección de la configuración del backend ------------------------
# config.php lleva la clave del correo. Si algún día PHP quedara deshabilitado,
# sin esta regla el archivo se serviría como texto plano.
<Files "config.php">
  <IfModule mod_authz_core.c>
    Require all denied
  </IfModule>
  <IfModule !mod_authz_core.c>
    Order allow,deny
    Deny from all
  </IfModule>
</Files>

<FilesMatch "^\\.">
  <IfModule mod_authz_core.c>
    Require all denied
  </IfModule>
</FilesMatch>
`;

fs.writeFileSync(DESTINO, COMPARTIDO + '\n' + CONTENIDO, 'utf8');

const cantidad = CONTENIDO.split('\n').filter((l) => l.startsWith('RewriteRule') && l.includes('R=301')).length;
console.log(`✓ public/.htaccess generado (${cantidad} redirecciones 301)`);
