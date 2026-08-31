# Después de publicar — Search Console, redirecciones y conversiones

Todo lo de este documento se hace **una vez que el sitio ya está arriba en
Ferozo y el dominio apunta al hosting nuevo**. Antes de eso, Google seguiría
viendo el sitio viejo.

---

## 1. Google Search Console — verificar la propiedad

Es el panel donde Google informa cómo indexa el sitio. Imprescindible en una
migración, porque es donde se ve si las redirecciones están funcionando.

1. Entrá a **search.google.com/search-console** con la cuenta de Google que
   vaya a administrar el sitio (idealmente una casilla del Workspace de SISE,
   así queda en manos de la empresa).
2. **Agregar propiedad** → elegí el tipo **Dominio** y escribí
   `siseargentina.com` (cubre con y sin www, http y https, todo junto).
3. Google pide **verificar por DNS**: te muestra un registro **TXT** del tipo
   `google-site-verification=xxxx...`.
4. Ese registro se carga **donde estén los DNS del dominio** (si el dominio se
   administra en DonWeb: panel de DonWeb → el dominio → Zona DNS → agregar
   registro TXT, nombre `@`, y pegar el valor).
5. Volvé a Search Console y tocá **Verificar**. La propagación puede demorar
   de minutos a unas horas; si falla, esperá y reintentá.

> Alternativa si no podés tocar los DNS: creá la propiedad como *Prefijo de
> URL* (`https://siseargentina.com`) y verificá subiendo el archivo HTML que
> te da Google a `public_html/`. La de tipo Dominio es mejor, pero esta sirve.

### Apenas verifiques

- **Sitemaps** (menú izquierdo) → agregá `sitemap.xml` → Enviar.
- **Inspección de URLs** (barra superior): pegá `https://siseargentina.com/` y
  tocá **Solicitar indexación**. Repetilo con `/hogar`, `/comercio` y un par
  más; al resto Google llega solo por el sitemap.

---

## 2. Seguimiento de las redirecciones del sitio viejo

Las 149 redirecciones ya están en el `.htaccess`; acá lo que se controla es
que Google las esté digiriendo bien.

**El mismo día del lanzamiento**, probá a mano en el navegador (o pedímelo y
lo corro yo):

| URL vieja | Debe llevar a |
|---|---|
| `siseargentina.com/projects/guardia-virtual` | `/edificios` |
| `siseargentina.com/servicios/monitoreo-de-alarmas` | `/` |
| `siseargentina.com/quienes-somos` | `/historia` |
| `siseargentina.com/contacto.html` | `/contacto` |
| `www.siseargentina.com` | `siseargentina.com` (sin www) |
| `http://siseargentina.com` | `https://...` |

**Las primeras 4–6 semanas**, una vez por semana en Search Console:

- **Indexación → Páginas**: al principio van a aparecer muchas URLs viejas
  como "Página con redirección". **Eso es lo esperado y es bueno**: significa
  que Google encontró el 301 y está traspasando el posicionamiento. Ese número
  debe bajar con las semanas mientras suben las páginas nuevas indexadas.
- Lo que **no** debería crecer: "Not found (404)" en URLs que tenían tráfico.
  Si aparece una URL vieja importante en 404, avisame y le agrego su
  redirección (se edita `app/lib/legacyRedirects.js` y se recompila).
- **Rendimiento**: la curva de clics puede aflojar un poco las primeras dos
  semanas de una migración; es normal. Si a las 4–6 semanas no se recuperó,
  lo revisamos.

---

## 3. Google Analytics 4 — marcar las conversiones

La medición ya está integrada en el sitio (ID `G-G1WY55DRWQ`) y emite estos
eventos solos; lo único que falta es decirle a GA4 cuáles cuentan como
conversión (Google los llama **eventos clave**).

1. Entrá a **analytics.google.com** → la propiedad de SISE.
2. **Administrar** (engranaje abajo a la izquierda) → **Eventos**.
3. Esperá 24–48 hs de tráfico real para que aparezcan en la lista, y activá
   la llave **"Marcar como evento clave"** en:

| Evento | Qué significa |
|---|---|
| `generate_lead` | **La conversión principal**: alguien envió el cotizador o el formulario de contacto con éxito |
| `whatsapp_click` | Tocó el botón de WhatsApp |
| `phone_click` | Tocó el número de teléfono |

   (Si no querés esperar, en *Administrar → Eventos clave → Nuevo evento
   clave* podés escribir el nombre a mano.)

4. Los demás eventos quedan como diagnóstico, no como conversión:
   `form_start` y `form_submit` (embudo de los formularios), `quote_step`
   (en qué paso del cotizador abandonan), `solution_info_open` (qué solución
   despierta interés), `page_view` y `section_view`.

### Enlazar Analytics con Search Console

En GA4: **Administrar → Enlaces con Search Console** → vincular la propiedad.
Con eso ves en Analytics con qué búsquedas de Google llega la gente.

### Verificar que mide (el día del lanzamiento)

En GA4 → **Informes → Tiempo real**, navegá el sitio desde tu celular:
tenés que verte aparecer, y al mandar un formulario de prueba tiene que
figurar el evento `generate_lead`.

---

## 4. Si arrancan campañas pagas (opcional, ya cableado)

El código ya trae Meta Pixel y Google Ads **apagados**. Se encienden así:

1. Crear en la raíz del proyecto un archivo `.env.local` con los IDs reales:

```
NEXT_PUBLIC_META_PIXEL_ID=000000000000000
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-000000000
```

2. Recompilar (`npm run build`) y volver a subir `out/` — en un sitio
   estático las variables entran en la compilación, no en el servidor.
3. En **Google Ads**: importar las conversiones desde GA4 (*Objetivos →
   Conversiones → Importar → de GA4*) usando `generate_lead`; así no hace
   falta etiqueta propia.
4. En **Meta**: con el pixel activo ya registra `PageView`; los eventos de
   lead se pueden configurar desde el Administrador de eventos de Meta.

---

## Resumen del orden

1. Subir el sitio a Ferozo y configurar `api/config.php` (guía en
   `DESPLIEGUE.md`).
2. Apuntar el dominio y activar el SSL en el panel.
3. Probar formularios y redirecciones a mano.
4. Verificar Search Console por DNS → enviar `sitemap.xml`.
5. Marcar los eventos clave en GA4 y enlazar con Search Console.
6. Revisión semanal de *Indexación → Páginas* durante el primer mes.
