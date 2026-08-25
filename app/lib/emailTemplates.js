import fs from 'node:fs';
import path from 'node:path';

import { siteConfig } from './seo';

/*
 * Paleta calcada de globals.scss (--sise-blue / --sise-white / --sise-gray)
 * más los tonos de apoyo que ya usaban los módulos del sitio.
 */
const BRAND = {
  blue: '#00408c',
  blueDark: '#06234c',
  blueSoft: '#e8f1fb',
  gray: '#d9d9d9',
  bg: '#f3f7fc',
  card: '#ffffff',
  text: '#11243c',
  muted: '#617184',
  border: '#d8e3f0'
};

/* Equivalentes para modo oscuro. El azul de marca sube a un tono más claro
   (#4c9bea) porque #00408c sobre fondo oscuro no llega al contraste mínimo
   para texto. La cabecera, en cambio, conserva el azul original: el logo es
   blanco y necesita ese fondo para leerse en ambos modos. */
const DARK = {
  bg: '#0d1826',
  card: '#152437',
  text: '#e9eff7',
  muted: '#9db0c6',
  border: '#26394f',
  accent: '#4c9bea'
};

/* League Spartan es una webfont y los clientes de correo no la cargan; se
   declara igual para los pocos que sí (Apple Mail) y el resto cae en la
   pila de sistema, que mantiene un gris visual parecido. */
const FONT_STACK =
  "'League Spartan', 'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif";

/* El logo viaja adjunto y se referencia por CID, no por URL. Un <svg> inline
   lo descartan Gmail, Outlook y Yahoo; y una URL remota depende de que el
   sitio responda y de que el cliente no bloquee imágenes externas (Outlook
   de escritorio las bloquea por defecto). Adjunto rinde en los dos casos. */
const EMAIL_LOGO_CID = 'sise-logo';
const LOGO_SRC = `cid:${EMAIL_LOGO_CID}`;
const LOGO_FILE = 'email-logo-sise.png';

let cachedLogo = null;

/* Se adjunta a cada envío desde las rutas de API. `inline` + `cid` hace que
   el cliente lo pinte dentro del cuerpo y no como archivo suelto. */
export function getEmailLogoAttachment() {
  if (cachedLogo === null) {
    try {
      cachedLogo = fs.readFileSync(path.join(process.cwd(), 'public', 'image', LOGO_FILE));
    } catch {
      cachedLogo = false;
    }
  }

  if (!cachedLogo) return null;

  return {
    filename: LOGO_FILE,
    content: cachedLogo,
    cid: EMAIL_LOGO_CID,
    contentDisposition: 'inline'
  };
}

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsapp}`;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPhoneHref(phone) {
  const normalized = String(phone ?? '').replace(/[^\d+]/g, '');
  return normalized || null;
}

function formatMultilineHtml(value) {
  if (!value) return `<span class="em-muted" style="color:${BRAND.muted};">No informado</span>`;
  return escapeHtml(value).replace(/\n/g, '<br />');
}

/* Ficha de datos en dos columnas. En mobile las clases em-lbl/em-val pasan a
   display:block (ver el <style> del shell) y la etiqueta queda arriba del
   valor, que en 320px de ancho es la única forma de que respire. */
function renderFieldTable(fields) {
  const rows = fields
    .filter((field) => field?.value)
    .map(
      (field) => `
        <tr>
          <td width="38%" valign="top" class="em-lbl em-brd" style="padding:10px 12px 10px 0;border-bottom:1px solid ${BRAND.border};font-family:${FONT_STACK};font-size:12px;line-height:16px;font-weight:700;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.06em;">
            ${escapeHtml(field.label)}
          </td>
          <td valign="top" class="em-val em-brd em-text" style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-family:${FONT_STACK};font-size:15px;line-height:22px;color:${BRAND.text};font-weight:600;">
            ${field.multiline ? formatMultilineHtml(field.value) : escapeHtml(field.value)}
          </td>
        </tr>
      `
    )
    .join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

function renderSection(title, bodyHtml) {
  return `
    <tr>
      <td style="padding:0 0 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="em-card em-brd" style="background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:14px;">
          <tr>
            <td class="em-pad em-accent" style="padding:20px 22px 4px;font-family:${FONT_STACK};font-size:12px;line-height:16px;font-weight:700;color:${BRAND.blue};text-transform:uppercase;letter-spacing:0.1em;">
              ${escapeHtml(title)}
            </td>
          </tr>
          <tr>
            <td class="em-pad" style="padding:0 22px 8px;">${bodyHtml}</td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

/* Botón "bulletproof": el VML del comentario condicional es lo que hace que
   Outlook de escritorio dibuje el fondo, que si no ignora el border-radius. */
function renderActionButton({ href, label, secondary = false }) {
  const bg = secondary ? BRAND.card : BRAND.blue;
  const fg = secondary ? BRAND.blue : '#ffffff';
  const border = secondary ? BRAND.blue : BRAND.blue;

  return `
    <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${escapeHtml(href)}" style="height:42px;v-text-anchor:middle;width:220px;" arcsize="24%" strokecolor="${border}" fillcolor="${bg}">
        <w:anchorlock/>
        <center style="color:${fg};font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">${escapeHtml(label)}</center>
      </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <a href="${escapeHtml(href)}" class="em-btn${secondary ? ' em-btn-sec' : ''}" style="display:inline-block;padding:12px 22px;border-radius:10px;background:${bg};color:${fg};border:1px solid ${border};text-decoration:none;font-family:${FONT_STACK};font-size:14px;line-height:18px;font-weight:700;">
      ${escapeHtml(label)}
    </a>
    <!--<![endif]-->
  `;
}

function buildEmailShell({ preheader, eyebrow, title, intro, sections, actions = [], footerNote }) {
  /* Cada botón en su propia fila de tabla y no en columnas: así en mobile
     caen uno debajo del otro sin depender de que el cliente soporte los
     media queries (Gmail para Android los ignora en varios casos). */
  const actionsHtml = actions.length
    ? `
      <tr>
        <td style="padding:0 0 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="em-full">
            ${actions
              .map(
                (action) =>
                  `<tr><td class="em-btn-cell" style="padding:0 0 10px;">${renderActionButton(action)}</td></tr>`
              )
              .join('')}
          </table>
        </td>
      </tr>
    `
    : '';

  return `<!doctype html>
<html lang="es-AR" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>${escapeHtml(title)}</title>
    <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
    <style>
      /* Responsive. Los estilos críticos van inline; esto sólo ajusta el
         tamaño en pantallas chicas, donde 620px no entra. */
      @media only screen and (max-width: 620px) {
        .em-wrap { width: 100% !important; }
        .em-outer-pad { padding: 14px 10px !important; }
        .em-head { padding: 20px 18px 18px !important; }
        .em-body-pad { padding: 18px 14px 6px !important; }
        .em-pad { padding-left: 16px !important; padding-right: 16px !important; }
        .em-title { font-size: 22px !important; line-height: 27px !important; }
        .em-intro { font-size: 14px !important; line-height: 21px !important; }
        .em-logo { width: 124px !important; max-width: 124px !important; }
        /* La ficha pasa a una sola columna: etiqueta arriba, valor abajo. */
        .em-lbl, .em-val {
          display: block !important;
          width: 100% !important;
          padding-right: 0 !important;
        }
        .em-lbl { padding-bottom: 2px !important; border-bottom: 0 !important; }
        .em-val { padding-top: 0 !important; }
        /* Botones a ancho completo, más cómodos de tocar. */
        .em-full, .em-btn-cell { width: 100% !important; }
        .em-btn { display: block !important; text-align: center !important; }
      }

      /* Modo oscuro. Apple Mail y Outlook respetan prefers-color-scheme;
         Outlook.com reescribe las clases con el prefijo data-ogsc. */
      @media (prefers-color-scheme: dark) {
        .em-bg { background: ${DARK.bg} !important; }
        .em-card { background: ${DARK.card} !important; }
        .em-text, .em-val { color: ${DARK.text} !important; }
        .em-muted, .em-lbl { color: ${DARK.muted} !important; }
        .em-brd { border-color: ${DARK.border} !important; }
        .em-accent { color: ${DARK.accent} !important; }
        .em-btn-sec {
          background: ${DARK.card} !important;
          color: ${DARK.accent} !important;
          border-color: ${DARK.accent} !important;
        }
        .em-link { color: ${DARK.accent} !important; }
      }
      [data-ogsc] .em-bg { background: ${DARK.bg} !important; }
      [data-ogsc] .em-card { background: ${DARK.card} !important; }
      [data-ogsc] .em-text, [data-ogsc] .em-val { color: ${DARK.text} !important; }
      [data-ogsc] .em-muted, [data-ogsc] .em-lbl { color: ${DARK.muted} !important; }
      [data-ogsc] .em-brd { border-color: ${DARK.border} !important; }
      [data-ogsc] .em-accent { color: ${DARK.accent} !important; }
      [data-ogsc] .em-btn-sec {
        background: ${DARK.card} !important;
        color: ${DARK.accent} !important;
        border-color: ${DARK.accent} !important;
      }
      [data-ogsc] .em-link { color: ${DARK.accent} !important; }
    </style>
  </head>
  <body class="em-bg" style="margin:0;padding:0;background:${BRAND.bg};font-family:${FONT_STACK};color:${BRAND.text};-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(preheader)}</div>
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">&#8203;&#8204;&#8205;&nbsp;&#8203;&#8204;&#8205;&nbsp;&#8203;&#8204;&#8205;&nbsp;</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="em-bg" bgcolor="${BRAND.bg}" style="background:${BRAND.bg};">
      <tr>
        <td align="center" class="em-outer-pad" style="padding:28px 14px;">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" class="em-wrap" style="width:100%;max-width:620px;">

            <!-- Cabecera: conserva el azul de marca en ambos modos, porque el
                 logo es blanco y sólo se lee sobre ese fondo. El bgcolor va
                 como atributo para que los clientes que invierten colores no
                 lo pisen. -->
            <tr>
              <td class="em-head" bgcolor="${BRAND.blue}" style="background:${BRAND.blue};border-radius:16px 16px 0 0;padding:26px 28px 22px;">
                <img src="${LOGO_SRC}" width="150" alt="${escapeHtml(siteConfig.name)}" class="em-logo" style="display:block;border:0;width:150px;max-width:150px;height:auto;" />
                <div style="height:18px;line-height:18px;">&nbsp;</div>
                <div style="font-family:${FONT_STACK};font-size:11px;line-height:15px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9dc0e8;">
                  ${escapeHtml(eyebrow)}
                </div>
                <div style="height:8px;line-height:8px;">&nbsp;</div>
                <div class="em-title" style="font-family:${FONT_STACK};font-size:26px;line-height:30px;font-weight:700;color:#ffffff;">
                  ${escapeHtml(title)}
                </div>
                <div style="height:10px;line-height:10px;">&nbsp;</div>
                <div class="em-intro" style="font-family:${FONT_STACK};font-size:15px;line-height:23px;color:#d6e5f6;">
                  ${escapeHtml(intro)}
                </div>
              </td>
            </tr>

            <!-- Cuerpo -->
            <tr>
              <td class="em-card em-brd em-body-pad" bgcolor="${BRAND.card}" style="background:${BRAND.card};border-radius:0 0 16px 16px;padding:24px 22px 10px;border:1px solid ${BRAND.border};border-top:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${actionsHtml}
                  ${sections.join('')}
                </table>
              </td>
            </tr>

            <!-- Pie -->
            <tr>
              <td style="padding:20px 14px 0;">
                ${
                  footerNote
                    ? `<div class="em-muted" style="font-family:${FONT_STACK};font-size:13px;line-height:20px;color:${BRAND.muted};text-align:center;padding-bottom:12px;">${escapeHtml(footerNote)}</div>`
                    : ''
                }
                <div class="em-muted" style="font-family:${FONT_STACK};font-size:13px;line-height:20px;color:${BRAND.muted};text-align:center;">
                  <a href="${siteConfig.siteUrl}" class="em-link" style="color:${BRAND.blue};text-decoration:none;font-weight:700;">${siteConfig.siteUrl.replace('https://', '')}</a>
                  &nbsp;&middot;&nbsp;
                  <a href="tel:${escapeHtml(formatPhoneHref(siteConfig.phone) ?? '')}" class="em-muted" style="color:${BRAND.muted};text-decoration:none;">${escapeHtml(siteConfig.phone)}</a>
                  &nbsp;&middot;&nbsp;
                  <a href="mailto:${escapeHtml(siteConfig.email)}" class="em-muted" style="color:${BRAND.muted};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
                </div>
                <div style="height:8px;line-height:8px;">&nbsp;</div>
                <div class="em-muted" style="font-family:${FONT_STACK};font-size:12px;line-height:18px;color:${BRAND.muted};text-align:center;">
                  ${escapeHtml(siteConfig.legalName)} &middot; ${escapeHtml(siteConfig.address.streetAddress)}, ${escapeHtml(siteConfig.address.addressLocality)}, ${escapeHtml(siteConfig.address.addressRegion)}
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* ── Correos internos (llegan a SISE) ─────────────────────────────────── */

export function buildContactEmailHtml({ name, phone, email, solution, details }) {
  const telHref = formatPhoneHref(phone);

  return buildEmailShell({
    preheader: `${name} pidió que lo contacten por ${solution || 'seguridad electrónica'}.`,
    eyebrow: 'Formulario de contacto',
    title: 'Nueva consulta recibida',
    intro: `${name} dejó sus datos en el sitio y espera una respuesta.`,
    actions: [
      ...(telHref ? [{ href: `https://wa.me/${telHref.replace('+', '')}`, label: 'Escribir por WhatsApp' }] : []),
      { href: `mailto:${email}`, label: 'Responder por email', secondary: true }
    ],
    sections: [
      renderSection(
        'Datos del contacto',
        renderFieldTable([
          { label: 'Nombre', value: name },
          { label: 'Teléfono / WhatsApp', value: phone },
          { label: 'Correo electrónico', value: email }
        ])
      ),
      renderSection(
        'Consulta',
        renderFieldTable([
          { label: 'Solución buscada', value: solution },
          { label: 'Detalles', value: details, multiline: true }
        ])
      )
    ],
    footerNote: 'Respondé este correo y le llega directo a la persona que consultó.'
  });
}

export function buildQuoteEmailHtml({ answers, summary }) {
  const email = answers?.email || '';
  const phone = answers?.phone || '';
  const telHref = formatPhoneHref(phone);
  const name = answers?.name || 'Un visitante';

  return buildEmailShell({
    preheader: `${name} completó el cotizador online.`,
    eyebrow: 'Cotizador online',
    title: 'Nueva solicitud de cotización',
    intro: `${name} configuró una solución en el cotizador y pidió un presupuesto.`,
    actions: [
      ...(telHref ? [{ href: `https://wa.me/${telHref.replace('+', '')}`, label: 'Escribir por WhatsApp' }] : []),
      ...(email ? [{ href: `mailto:${email}`, label: 'Responder por email', secondary: true }] : [])
    ],
    sections: [
      renderSection(
        'Datos del contacto',
        renderFieldTable([
          { label: 'Nombre', value: answers?.name },
          { label: 'Teléfono', value: answers?.phone },
          { label: 'Email', value: answers?.email },
          { label: 'Ciudad', value: answers?.city },
          { label: 'Tipo de contacto', value: answers?.contactType }
        ])
      ),
      renderSection(
        'Configuración solicitada',
        renderFieldTable([
          { label: 'Tipo de propiedad', value: answers?.propertyType },
          { label: 'Paso 2', value: answers?.step2 },
          { label: 'Paso 3', value: answers?.step3 },
          { label: 'Paso 4', value: answers?.step4 },
          { label: 'Paso 5', value: answers?.step5 },
          { label: 'Paso 6', value: answers?.step6 },
          { label: 'Paso 7', value: answers?.step7 },
          { label: 'Resumen enviado', value: summary, multiline: true }
        ])
      )
    ],
    footerNote: 'Respondé este correo y le llega directo a la persona que cotizó.'
  });
}

/* ── Acuse de recibo (llega al cliente potencial) ─────────────────────── */

function renderClientBody({ intro, recap }) {
  return [
    renderSection(
      'Qué sigue ahora',
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="em-text" style="padding:8px 0;font-family:${FONT_STACK};font-size:15px;line-height:23px;color:${BRAND.text};">
            Un asesor de SISE se va a comunicar con vos <strong>a la brevedad</strong> para
            entender qué necesitás y armarte una propuesta a medida, sin cargo.
          </td>
        </tr>
        <tr>
          <td class="em-text" style="padding:2px 0 10px;font-family:${FONT_STACK};font-size:15px;line-height:23px;color:${BRAND.text};">
            Si preferís no esperar, escribinos por WhatsApp y te atendemos al momento.
          </td>
        </tr>
      </table>`
    ),
    ...(recap.length ? [renderSection('Lo que nos contaste', renderFieldTable(recap))] : [])
  ];
}

export function buildContactAckEmailHtml({ name, solution, details }) {
  const firstName = String(name ?? '').trim().split(/\s+/)[0] || '';

  return buildEmailShell({
    preheader: 'Recibimos tu consulta. Un asesor se comunica con vos a la brevedad.',
    eyebrow: 'Recibimos tu consulta',
    title: firstName ? `¡Gracias, ${firstName}!` : '¡Gracias por escribirnos!',
    intro: 'Tu mensaje ya llegó a nuestro equipo. Te respondemos a la brevedad.',
    actions: [{ href: WHATSAPP_URL, label: 'Escribinos por WhatsApp' }],
    sections: renderClientBody({
      recap: [
        { label: 'Solución que buscás', value: solution },
        { label: 'Tu mensaje', value: details, multiline: true }
      ]
    }),
    footerNote: 'Recibís este correo porque completaste el formulario de contacto en nuestro sitio.'
  });
}

export function buildQuoteAckEmailHtml({ answers, summary }) {
  const firstName = String(answers?.name ?? '').trim().split(/\s+/)[0] || '';

  return buildEmailShell({
    preheader: 'Recibimos tu cotización. Un asesor se comunica con vos a la brevedad.',
    eyebrow: 'Recibimos tu cotización',
    title: firstName ? `¡Gracias, ${firstName}!` : '¡Gracias por cotizar con nosotros!',
    intro: 'Ya tenemos tu configuración. Te preparamos un presupuesto a medida.',
    actions: [{ href: WHATSAPP_URL, label: 'Escribinos por WhatsApp' }],
    sections: renderClientBody({
      recap: [
        { label: 'Tipo de propiedad', value: answers?.propertyType },
        { label: 'Ciudad', value: answers?.city },
        { label: 'Resumen', value: summary, multiline: true }
      ]
    }),
    footerNote: 'Recibís este correo porque usaste el cotizador online en nuestro sitio.'
  });
}

/* ── Versiones en texto plano ─────────────────────────────────────────── */

export function buildContactAckEmailText({ name }) {
  const firstName = String(name ?? '').trim().split(/\s+/)[0] || '';
  return [
    firstName ? `Hola ${firstName},` : 'Hola,',
    '',
    'Recibimos tu consulta en siseargentina.com.',
    'Un asesor de SISE se va a comunicar con vos a la brevedad para armarte una propuesta a medida, sin cargo.',
    '',
    `Si preferís no esperar, escribinos por WhatsApp: ${WHATSAPP_URL}`,
    '',
    `${siteConfig.legalName} | ${siteConfig.phone} | ${siteConfig.email}`,
    siteConfig.siteUrl
  ].join('\n');
}

export function buildQuoteAckEmailText({ answers }) {
  const firstName = String(answers?.name ?? '').trim().split(/\s+/)[0] || '';
  return [
    firstName ? `Hola ${firstName},` : 'Hola,',
    '',
    'Recibimos tu solicitud de cotización en siseargentina.com.',
    'Ya tenemos tu configuración y te preparamos un presupuesto a medida. Un asesor se comunica con vos a la brevedad.',
    '',
    `Si preferís no esperar, escribinos por WhatsApp: ${WHATSAPP_URL}`,
    '',
    `${siteConfig.legalName} | ${siteConfig.phone} | ${siteConfig.email}`,
    siteConfig.siteUrl
  ].join('\n');
}
