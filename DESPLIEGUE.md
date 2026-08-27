# Publicar el sitio en Ferozo (DonWeb)

El sitio se compila a archivos estáticos y se sube por FTP. No hace falta Node
en el servidor: lo único que corre allá es PHP, y sólo para los dos
formularios.

---

## 1. Compilar

```bash
npm install
npm run build
```

Queda todo en la carpeta **`out/`**. Ese es el sitio completo: HTML, CSS, JS,
imágenes, `sitemap.xml`, `robots.txt`, el `.htaccess` y la carpeta `api/` con
los formularios en PHP.

El build corre antes `scripts/generate-htaccess.mjs`, que arma el `.htaccess`
con las 149 redirecciones del sitio anterior. No hay que tocarlo a mano: si
hace falta cambiar una redirección se edita `app/lib/legacyRedirects.js` y se
vuelve a compilar.

---

## 2. Subir por FTP

Subí **el contenido de `out/`** (no la carpeta en sí) a la raíz web del
hosting, que en Ferozo suele ser `public_html/` o `httpdocs/`.

Dos detalles que se pasan por alto:

- **El `.htaccess` empieza con punto**, así que muchos clientes FTP lo ocultan.
  En FileZilla: *Servidor → Forzar mostrar archivos ocultos*. Sin ese archivo
  las URLs quedan como `/hogar.html`, se pierden las redirecciones del sitio
  viejo y no se aplican las cabeceras de seguridad.
- Subí también las carpetas que empiezan con guión bajo (`_next`): ahí viven
  el CSS, el JavaScript y las tipografías.

En la primera subida conviene borrar antes lo que haya del WordPress viejo,
para no dejar archivos sueltos mezclados.

---

## 3. Configurar los formularios (una sola vez)

Los formularios envían el correo por SMTP autenticado, con la casilla del
propio dominio. Las credenciales **no viajan en el repositorio**: hay que
crear el archivo directamente en el servidor.

1. En el hosting, copiá `api/config.example.php` como **`api/config.php`**.
2. Completalo con los datos que da el panel de Ferozo en *Correo →
   Configuración de la cuenta*:

```php
'SMTP_HOST'   => 'c0000000.ferozo.com',   // el que figure en el panel
'SMTP_PORT'   => 465,                      // 465 con SSL, o 587 con TLS
'SMTP_CIFRADO'=> 'ssl',                    // 'ssl' para 465, 'tls' para 587
'SMTP_USER'   => 'web@siseargentina.com',  // la casilla completa
'SMTP_PASS'   => '...',                    // su clave
'VENTAS_TO'   => 'ventas@siseargentina.com',
'CONTACTO_TO' => 'contacto@siseargentina.com',
'MAIL_FROM'   => 'web@siseargentina.com',
'HOST_SITIO'  => 'siseargentina.com'
```

**El remitente tiene que ser una casilla del dominio.** Si se pone un Gmail,
el servidor lo rechaza o el correo cae en spam, porque no valida el SPF.

3. Probá los dos formularios en el sitio ya publicado y confirmá que llegan
   los correos: uno al buzón de ventas y el acuse a quien completó el
   formulario. **Es el único paso que no se puede verificar antes de subir.**

Si algo falla, el detalle queda en el log de errores de PHP del panel: el
sitio nunca muestra el error al visitante.

---

## 4. Qué revisar después de subir

| Qué | Cómo |
|---|---|
| Las páginas abren sin `.html` | `siseargentina.com/hogar` |
| Redirecciones del sitio viejo | `siseargentina.com/projects/guardia-virtual` tiene que llevar a `/edificios` |
| Con y sin www van al mismo lado | probar las dos formas |
| Formularios | enviar uno de prueba y confirmar que llega |
| Sitemap y robots | `/sitemap.xml` y `/robots.txt` |

---

## Actualizaciones siguientes

```bash
npm run build
```

y volver a subir el contenido de `out/`. **No borres `api/config.php`** del
servidor: no se regenera, porque no está en el repositorio.

Como el HTML se sirve sin caché y los archivos de `_next/` llevan un hash en
el nombre, los cambios se ven apenas termina la subida, sin vaciar nada.

---

## Notas técnicas

- **Por qué estático:** el sitio no necesita servidor para renderizarse; sólo
  los dos formularios lo necesitaban, y quedaron resueltos en PHP
  (`public/api/`). Así funciona en cualquier hosting compartido.
- **Las imágenes** no pasan por el optimizador de Next (no hay proceso que lo
  haga). No es una pérdida: ya se exportan pre-dimensionadas desde Figma y
  pasan por `npm run optimize:images`.
- **El dominio** está fijado en `scripts/generate-htaccess.mjs` (constante
  `HOST`) y en `app/lib/seo.js` (`FALLBACK_SITE_URL`). Si alguna vez cambia,
  hay que tocarlo en los dos lados.
- **Medición:** Google Analytics ya está integrado. Meta Pixel y Google Ads se
  encienden definiendo `NEXT_PUBLIC_META_PIXEL_ID` y `NEXT_PUBLIC_GOOGLE_ADS_ID`
  en un archivo `.env.local` **antes de compilar** (en un hosting estático las
  variables se resuelven en el build, no en el servidor).
