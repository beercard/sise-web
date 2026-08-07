import { siteConfig } from './seo';

const BRAND = {
  primary: '#00408C',
  accent: '#0857B5',
  accentSoft: '#E8F1FB',
  bg: '#F3F7FC',
  card: '#FFFFFF',
  text: '#11243C',
  muted: '#617184',
  border: '#D8E3F0'
};

const LOGO_MARKUP = `
  <svg width="86" height="50" viewBox="0 0 86 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SISE Argentina">
    <g>
      <path d="M79.0423 7.96251H6.95773V34.3422H79.0423V7.96251Z" fill="white"/>
      <g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8642 48.9587C29.1786 48.9587 15.3467 46.6366 1.7551 42.0618L1.0447 41.8223V6.75113L1.82127 6.54634C15.6462 2.89483 29.5651 1.04131 43.188 1.04131C56.811 1.04131 70.5941 2.89483 84.1822 6.54634L84.9553 6.7546V41.8258L84.2414 42.0618C70.4687 46.6366 56.5463 48.9587 42.8642 48.9587ZM11.6972 26.6053C10.6386 26.6053 9.77494 27.4662 9.77494 28.5213C9.77494 29.5765 10.6386 30.4373 11.6972 30.4373C12.1046 30.4373 12.4947 30.3124 12.822 30.0729L13.0971 29.875H24.9545C25.2644 29.875 25.5848 29.8646 25.9052 29.8507C26.1733 29.8369 26.4414 29.7917 26.7096 29.7188C26.9464 29.6564 27.1727 29.5522 27.3956 29.4099C27.6045 29.2746 27.81 29.0732 28.012 28.806C28.3463 28.3617 28.5448 27.8896 28.6144 27.369C28.7015 26.7199 28.7433 26.1263 28.7433 25.6057C28.7433 25.3037 28.7293 24.967 28.705 24.606C28.6806 24.2693 28.6318 23.9222 28.5587 23.5751C28.4925 23.2662 28.3881 22.9573 28.2418 22.6623C28.106 22.3881 27.9389 22.152 27.7229 21.9368C27.4687 21.6834 27.1449 21.4682 26.7583 21.3016C26.3022 21.1038 25.8843 20.9545 25.5186 20.8608L18.9927 19.1253C18.5922 19.0246 18.1778 18.8893 17.7739 18.7261C17.0182 18.4172 16.5864 17.8167 16.5864 17.0739C16.5864 16.4665 16.8824 15.9528 17.4013 15.6543C17.5824 15.5432 17.7948 15.4738 18.0629 15.4356C18.1883 15.4183 18.4007 15.3974 18.9544 15.3974H32.7619V27.8584C32.7619 28.2402 32.7932 28.6012 32.8559 28.9275C32.8838 29.0698 33.0335 29.2641 33.2703 29.462C33.4967 29.6529 33.7126 29.764 33.9146 29.7987C34.2523 29.8542 34.6006 29.882 34.9488 29.882H53.346C53.656 29.882 53.9763 29.8716 54.2967 29.8577C54.5649 29.8438 54.833 29.7987 55.1011 29.7258C55.3379 29.6633 55.5643 29.5592 55.7872 29.4169C55.9961 29.2815 56.2016 29.0802 56.4035 28.8129C56.7378 28.3686 56.9363 27.8966 57.006 27.3759C57.093 26.7268 57.1348 26.1333 57.1348 25.6126C57.1348 25.3072 57.1209 24.9705 57.0965 24.613C57.0722 24.2763 57.0234 23.9292 56.9503 23.5821C56.8841 23.2732 56.7796 22.9642 56.6334 22.6692C56.4976 22.395 56.3304 22.159 56.1145 21.9438C55.8603 21.6904 55.533 21.4752 55.1499 21.3086C54.6937 21.1107 54.2758 20.9615 53.9102 20.8678L47.3843 19.1322C46.9838 19.0316 46.5694 18.8962 46.1655 18.7331C45.4098 18.4242 44.978 17.8237 44.978 17.0809C44.978 16.4734 45.274 15.9597 45.7928 15.6612C45.9739 15.5502 46.1863 15.4807 46.4545 15.4426C46.5798 15.4252 46.7958 15.4044 47.3494 15.4044H61.1569V27.8445C61.1569 28.2367 61.1883 28.6047 61.251 28.9344C61.2788 29.0767 61.4286 29.2711 61.6654 29.4655C61.8917 29.6598 62.1076 29.7709 62.3096 29.8022C62.6474 29.8577 62.9956 29.8855 63.3439 29.8855H76.2216V27.2891H67.8187C67.6028 27.2891 67.3764 27.2857 67.1396 27.2753C66.6799 27.2544 66.2655 27.0878 65.9417 26.7824C65.7676 26.6366 65.6213 26.4457 65.5064 26.2201C65.3741 25.9597 65.3114 25.6543 65.3114 25.2864V22.3638H75.8629V20.2603H65.3114V17.5495C65.3114 17.369 65.3288 17.1642 65.3636 16.9281C65.4263 16.5012 65.6387 16.1229 65.973 15.8313C66.1646 15.6716 66.3665 15.5571 66.5964 15.4738L66.7705 15.4113H76.0544V15.3002H76.138V12.7039H44.4243C43.7522 12.7039 43.2124 12.7976 42.8224 12.9781C42.401 13.1725 42.0737 13.3842 41.8508 13.6099C41.4329 14.0264 41.1892 14.4637 41.1056 14.9497C40.9976 15.5849 40.9419 16.1854 40.9419 16.7303C40.9419 17.3898 40.9976 18.0875 41.1091 18.8025C41.2031 19.4065 41.4225 19.9271 41.7777 20.3992C41.9205 20.5797 42.1468 20.7983 42.4324 21.0344C42.6622 21.2218 42.993 21.3711 43.4144 21.4787L50.9223 23.5751C51.2949 23.6862 51.6327 23.8112 51.9357 23.95C52.566 24.2416 52.9282 24.8212 52.9282 25.5432C52.9282 25.8417 52.8411 26.2825 52.4302 26.6921C51.9879 27.1329 51.3298 27.1885 50.8074 27.1885H36.9198V14.7484C36.9198 14.3561 36.8885 13.9882 36.8258 13.6585C36.7979 13.5161 36.6482 13.3218 36.4114 13.1274C36.185 12.933 35.9691 12.8219 35.7672 12.7907C35.4329 12.7352 35.0916 12.7074 34.7503 12.7074H16.0327C15.3606 12.7074 14.8209 12.8011 14.4308 12.9816C14.0095 13.176 13.6821 13.3877 13.4593 13.6133C13.0414 14.0299 12.7976 14.4672 12.714 14.9531C12.6061 15.5883 12.5504 16.1888 12.5504 16.7338C12.5504 17.3933 12.6061 18.0909 12.7175 18.806C12.8115 19.4099 13.0309 19.9306 13.3861 20.4026C13.5289 20.5831 13.7553 20.8018 14.0408 21.0378C14.2706 21.2253 14.6015 21.3745 15.0228 21.4821L22.5308 23.5786C22.9069 23.6897 23.2412 23.8146 23.5441 23.9535C24.1744 24.2451 24.5366 24.8247 24.5366 25.5467C24.5366 25.8452 24.4495 26.286 24.0386 26.6956C23.5964 27.1364 22.9382 27.1919 22.4159 27.1919H13.0971L12.822 26.9941C12.4947 26.7581 12.1046 26.6296 11.6972 26.6296V26.6053Z" fill="#00408C"/>
        <path d="M43.188 2.08261C57.3124 2.08261 70.8657 4.04373 83.9106 7.55293V41.076C70.2285 45.623 56.5428 47.9174 42.8607 47.9174C29.1786 47.9174 15.6775 45.6508 2.08592 41.076V7.55293C16.3183 3.79382 30.0004 2.08261 43.188 2.08261Z" fill="white"/>
      </g>
    </g>
  </svg>
`;

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
  if (!value) return '<span style="color: #617184;">No informado</span>';
  return escapeHtml(value).replace(/\n/g, '<br />');
}

function renderFieldTable(fields) {
  const rows = fields
    .filter((field) => field?.value)
    .map(
      (field) => `
        <tr>
          <td style="padding: 0 0 8px; font-size: 13px; line-height: 16px; font-weight: 700; color: ${BRAND.primary}; text-transform: uppercase; letter-spacing: 0.08em;">
            ${escapeHtml(field.label)}
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 18px; font-size: 16px; line-height: 24px; color: ${BRAND.text};">
            ${field.multiline ? formatMultilineHtml(field.value) : escapeHtml(field.value)}
          </td>
        </tr>
      `
    )
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${rows}
    </table>
  `;
}

function renderSection(title, bodyHtml) {
  return `
    <tr>
      <td style="padding: 0 0 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: ${BRAND.card}; border: 1px solid ${BRAND.border}; border-radius: 18px;">
          <tr>
            <td style="padding: 24px 24px 6px; font-size: 18px; line-height: 22px; font-weight: 700; color: ${BRAND.primary};">
              ${escapeHtml(title)}
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 8px;">
              ${bodyHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function renderActionButton({ href, label, secondary = false }) {
  const background = secondary ? BRAND.accentSoft : BRAND.accent;
  const color = secondary ? BRAND.primary : '#FFFFFF';
  const border = secondary ? `1px solid ${BRAND.border}` : `1px solid ${BRAND.accent}`;

  return `
    <a
      href="${escapeHtml(href)}"
      style="display: inline-block; padding: 12px 18px; border-radius: 10px; background: ${background}; color: ${color}; border: ${border}; text-decoration: none; font-size: 14px; line-height: 18px; font-weight: 700;"
    >
      ${escapeHtml(label)}
    </a>
  `;
}

function buildEmailShell({ preheader, eyebrow, title, intro, sections, actions = [] }) {
  const actionsHtml = actions.length
    ? `
      <tr>
        <td style="padding: 0 32px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${actions
                .map(
                  (action, index) => `
                    <td style="padding-right: ${index === actions.length - 1 ? 0 : 10}px;">
                      ${renderActionButton(action)}
                    </td>
                  `
                )
                .join('')}
            </tr>
          </table>
        </td>
      </tr>
    `
    : '';

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin: 0; padding: 0; background: ${BRAND.bg}; font-family: Arial, Helvetica, sans-serif; color: ${BRAND.text};">
        <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
          ${escapeHtml(preheader)}
        </div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: ${BRAND.bg};">
          <tr>
            <td align="center" style="padding: 32px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 680px;">
                <tr>
                  <td style="padding: 0 0 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%); border-radius: 22px; overflow: hidden;">
                      <tr>
                        <td style="padding: 28px 32px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-bottom: 18px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background: #FFFFFF; border-radius: 14px;">
                                  <tr>
                                    <td style="padding: 12px 14px 10px;">
                                      ${LOGO_MARKUP}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 10px; font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.75);">
                                ${escapeHtml(eyebrow)}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 12px; font-size: 30px; line-height: 34px; font-weight: 700; color: #FFFFFF;">
                                ${escapeHtml(title)}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 16px; line-height: 24px; color: rgba(255,255,255,0.92);">
                                ${escapeHtml(intro)}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${actionsHtml}
                ${sections.join('')}
                <tr>
                  <td style="padding: 8px 8px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size: 13px; line-height: 20px; color: ${BRAND.muted}; text-align: center;">
                          Este mensaje fue generado automáticamente desde
                          <a href="${siteConfig.siteUrl}" style="color: ${BRAND.primary}; text-decoration: none; font-weight: 700;">${siteConfig.siteUrl.replace('https://', '')}</a>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 10px; font-size: 13px; line-height: 20px; color: ${BRAND.muted}; text-align: center;">
                          ${escapeHtml(siteConfig.legalName)} | ${escapeHtml(siteConfig.phone)} | ${escapeHtml(siteConfig.email)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export function buildContactEmailHtml({ name, phone, email, solution, details }) {
  const telHref = formatPhoneHref(phone);

  return buildEmailShell({
    preheader: `Nueva solicitud de contacto de ${name}.`,
    eyebrow: 'Formulario de contacto',
    title: 'Nueva consulta recibida',
    intro: 'Un potencial cliente completó el formulario de contacto desde el sitio web de SISE.',
    actions: [
      { href: `mailto:${email}`, label: 'Responder por email' },
      ...(telHref ? [{ href: `tel:${telHref}`, label: 'Llamar al contacto', secondary: true }] : [])
    ],
    sections: [
      renderSection(
        'Datos del contacto',
        renderFieldTable([
          { label: 'Nombre', value: name },
          { label: 'Telefono / WhatsApp', value: phone },
          { label: 'Correo electronico', value: email }
        ])
      ),
      renderSection(
        'Consulta',
        renderFieldTable([
          { label: 'Solucion buscada', value: solution },
          { label: 'Detalles', value: details, multiline: true }
        ])
      )
    ]
  });
}

export function buildQuoteEmailHtml({ answers, summary }) {
  const email = answers?.email || '';
  const phone = answers?.phone || '';
  const telHref = formatPhoneHref(phone);

  const configurationFields = [
    { label: 'Tipo de propiedad', value: answers?.propertyType },
    { label: 'Paso 2', value: answers?.step2 },
    { label: 'Paso 3', value: answers?.step3 },
    { label: 'Paso 4', value: answers?.step4 },
    { label: 'Paso 5', value: answers?.step5 },
    { label: 'Paso 6', value: answers?.step6 },
    { label: 'Paso 7', value: answers?.step7 },
    { label: 'Resumen enviado', value: summary, multiline: true }
  ];

  return buildEmailShell({
    preheader: `Nuevo cotizador online enviado por ${answers?.name || 'un usuario'}.`,
    eyebrow: 'Cotizador online',
    title: 'Nueva solicitud de cotizacion',
    intro: 'Se recibió una nueva configuración desde el cotizador online del sitio web de SISE.',
    actions: [
      ...(email ? [{ href: `mailto:${email}`, label: 'Responder por email' }] : []),
      ...(telHref ? [{ href: `tel:${telHref}`, label: 'Llamar al contacto', secondary: true }] : [])
    ],
    sections: [
      renderSection(
        'Datos del contacto',
        renderFieldTable([
          { label: 'Nombre', value: answers?.name },
          { label: 'Telefono', value: answers?.phone },
          { label: 'Email', value: answers?.email },
          { label: 'Ciudad', value: answers?.city },
          { label: 'Tipo de contacto', value: answers?.contactType }
        ])
      ),
      renderSection('Configuracion solicitada', renderFieldTable(configurationFields))
    ]
  });
}
