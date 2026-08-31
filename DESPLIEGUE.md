# Publicar el sitio en Ferozo (DonWeb)

El sitio se compila a archivos estáticos y se sube al hosting. No hace falta
Node en el servidor: lo único que corre allá es PHP, y sólo para los dos
formularios.

**Atajo:** si ya tenés el `sise-web-ferozo.zip` generado, salteá el paso 1 y
andá directo al paso 2.

---

## 1. Compilar y empaquetar

```bash
npm install
npm run build
```

Queda todo en la carpeta **`out/`**: HTML, CSS, JS, imágenes, `sitemap.xml`,
`robots.txt`, el `.htaccess` con las redirecciones y la carpeta `api/` con los
formularios en PHP.

Para armar el ZIP que se sube al panel:

```bash
powershell -Command "[System.IO.Compression.ZipFile]::CreateFromDirectory('out', 'sise-web-ferozo.zip')"
```

(Ese método incluye el `.htaccess`; el clic derecho → "Comprimir" de Windows a
veces lo deja afuera por empezar con punto.)

---

## 2. Subir al hosting — paso a paso en el panel Ferozo

1. Entrá al panel en **ferozo.com** con el usuario del hosting (los datos los
   manda DonWeb al contratar).
2. Abrí el **Administrador de Archivos** y entrá a la carpeta raíz web
   (**`public_html/`**; en algunos planes se llama `httpdocs/`).
3. **Limpiá lo que haya del sitio viejo** (el WordPress): seleccioná todo lo
   que está dentro de `public_html/` y eliminalo. Si preferís conservar una
   copia, antes comprimilo y descargalo.
4. **Subí `sise-web-ferozo.zip`** con el botón de subir archivos.
5. Clic derecho sobre el ZIP → **Descomprimir / Extraer** en esa misma
   carpeta. Al terminar, borrá el ZIP.
6. Verificá que en la raíz hayan quedado, entre otros: `index.html`,
   `.htaccess`, las carpetas `_next/`, `image/` y `api/`. Si el administrador
   no muestra el `.htaccess`, activá "mostrar archivos ocultos".

**Alternativa por FTP:** con FileZilla, conectás con los datos FTP del panel y
subís el **contenido** de `out/` (no la carpeta en sí) a `public_html/`. En
FileZilla activá *Servidor → Forzar mostrar archivos ocultos* para que suba el
`.htaccess`.

---

## 3. Configurar el correo de los formularios (una sola vez)

Los formularios envían por SMTP autenticado. Las credenciales **no viajan en
el ZIP**: el archivo se crea a mano en el servidor.

1. En el Administrador de Archivos, entrá a **`public_html/api/`**.
2. Copiá `config.example.php` y renombrá la copia como **`config.php`**.
3. Editá `config.php` y completá los datos según la opción elegida:

### Opción A — casilla de Google Workspace (recomendada si el correo del dominio está en Google)

Primero hay que generar una **contraseña de aplicación** en la casilla que va
a enviar (por ejemplo `web@siseargentina.com`):

1. Entrar a **myaccount.google.com** con esa casilla.
2. *Seguridad* → activar la **Verificación en dos pasos** (si no está activa,
   Google no ofrece contraseñas de aplicación). Si la opción no aparece, el
   administrador de Workspace debe permitirla en admin.google.com →
   *Seguridad → Verificación en dos pasos*.
3. *Seguridad* → **Contraseñas de aplicaciones** → crear una llamada
   "Formularios web SISE". Google muestra 16 letras **una sola vez**.

Y en `config.php`:

```php
'SMTP_HOST'    => 'smtp.gmail.com',
'SMTP_PORT'    => 465,
'SMTP_CIFRADO' => 'ssl',
'SMTP_USER'    => 'web@siseargentina.com',
'SMTP_PASS'    => 'las16letras',          // sin espacios
'MAIL_FROM'    => 'web@siseargentina.com', // igual a SMTP_USER
```

Detalles de Google:

- **La contraseña normal de la cuenta NO funciona**; sólo la de aplicación.
- `MAIL_FROM` tiene que ser la misma casilla que autentica (o un alias
  configurado en Gmail): Google reescribe cualquier otro remitente.
- El SPF del dominio debe incluir a Google. Si el correo del dominio ya
  funciona en Workspace, esto ya está; el registro TXT esperado es
  `v=spf1 include:_spf.google.com ~all`.
- Los enviados quedan guardados en la carpeta **Enviados** de esa casilla,
  lo que sirve de auditoría de todos los leads.

### Opción B — casilla del propio hosting Ferozo

Con una casilla creada en el panel (Correo → Cuentas):

```php
'SMTP_HOST'    => 'c0000000.ferozo.com',   // el que muestre Correo → Configuración
'SMTP_PORT'    => 465,
'SMTP_CIFRADO' => 'ssl',
'SMTP_USER'    => 'web@siseargentina.com',
'SMTP_PASS'    => 'la clave de esa casilla',
```

**Ojo si el correo del dominio está en Google:** las casillas de Ferozo sólo
sirven para *enviar* en ese caso; las respuestas y los acuses llegan a
Workspace porque los MX apuntan a Google. Por eso, con Workspace conviene la
opción A.

### Destinatarios (en las dos opciones)

```php
'VENTAS_TO'   => 'ventas@siseargentina.com',   // leads del cotizador
'CONTACTO_TO' => 'contacto@siseargentina.com', // formulario de contacto
```

4. Guardá y **probá los dos formularios en el sitio publicado**: el de
   /contacto y el cotizador de cualquier vertical. Confirmá que llega el aviso
   interno y el acuse a quien completó. **Es el único paso que no se puede
   verificar antes de subir.**

Si algo falla, el detalle queda en el log de errores de PHP del panel; el
sitio nunca le muestra el error al visitante.

---

## 4. Apuntar el dominio (si el sitio viejo estaba en otro servidor)

Si `siseargentina.com` todavía resuelve al hosting anterior, hay que apuntar
el registro **A** del dominio a la IP del nuevo hosting Ferozo (figura en el
panel). **No toques los registros MX**: son los que llevan el correo a Google
Workspace y no tienen relación con la web.

---

## 5. Qué revisar después de subir

| Qué | Cómo |
|---|---|
| Las páginas abren sin `.html` | `siseargentina.com/hogar` |
| Redirecciones del sitio viejo | `siseargentina.com/projects/guardia-virtual` tiene que llevar a `/edificios` |
| Con y sin www van al mismo lado | probar las dos formas |
| Formularios | enviar uno de prueba de cada uno y confirmar que llegan |
| Sitemap y robots | `/sitemap.xml` y `/robots.txt` |
| Certificado SSL | el panel de Ferozo lo emite (Let's Encrypt); activarlo si no está |

---

## Actualizaciones siguientes

```bash
npm run build
```

y volver a subir el contenido de `out/` (o un ZIP nuevo). **No borres
`api/config.php`** del servidor: no se regenera, porque no está en el
repositorio.

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
