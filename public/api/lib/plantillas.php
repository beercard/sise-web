<?php
/*
 * Plantillas de los correos. Port fiel de app/lib/emailTemplates.js: mismos
 * colores, misma grilla de 620px, mismo modo oscuro y mismo botón
 * "bulletproof" con VML para que Outlook de escritorio dibuje el fondo.
 *
 * El logo viaja adjunto y se referencia por CID, no por URL: un <svg> inline
 * lo descartan Gmail, Outlook y Yahoo, y una imagen remota depende de que el
 * cliente no bloquee externas (Outlook las bloquea por defecto).
 */

const MARCA = [
    'blue' => '#00408c',
    'blueSoft' => '#e8f1fb',
    'gray' => '#d9d9d9',
    'bg' => '#f3f7fc',
    'card' => '#ffffff',
    'text' => '#11243c',
    'muted' => '#617184',
    'border' => '#d8e3f0'
];

/* El azul de marca sube a #4c9bea sobre fondo oscuro: #00408c no llega al
   contraste mínimo. La cabecera sí conserva el azul original, porque el logo
   es blanco y necesita ese fondo en ambos modos. */
const OSCURO = [
    'bg' => '#0d1826',
    'card' => '#152437',
    'text' => '#e9eff7',
    'muted' => '#9db0c6',
    'border' => '#26394f',
    'accent' => '#4c9bea'
];

const TIPOGRAFIA = "'League Spartan', 'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif";
const LOGO_CID = 'sise-logo';
const LOGO_ARCHIVO = 'email-logo-sise.png';

function logo_adjunto()
{
    $ruta = __DIR__ . '/../../image/' . LOGO_ARCHIVO;

    if (!is_readable($ruta)) {
        return null;
    }

    return [
        'ruta' => $ruta,
        'cid' => LOGO_CID,
        'nombre' => LOGO_ARCHIVO,
        'tipo' => 'image/png'
    ];
}

function esc($valor)
{
    return htmlspecialchars((string) $valor, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function href_telefono($telefono)
{
    $normalizado = preg_replace('/[^\d+]/', '', (string) $telefono);

    return $normalizado ?: '';
}

function html_multilinea($valor)
{
    if (!$valor) {
        return '<span class="em-muted" style="color:' . MARCA['muted'] . ';">No informado</span>';
    }

    return nl2br(esc($valor), false);
}

/* Ficha de datos en dos columnas. En mobile em-lbl/em-val pasan a block (ver
   el <style> del shell) y la etiqueta queda arriba del valor, que en 320px es
   la única forma de que respire. */
function tabla_campos(array $campos)
{
    $filas = '';

    foreach ($campos as $campo) {
        if (empty($campo['value'])) {
            continue;
        }

        $valor = !empty($campo['multiline'])
            ? html_multilinea($campo['value'])
            : esc($campo['value']);

        $filas .= '
        <tr>
          <td width="38%" valign="top" class="em-lbl em-brd" style="padding:10px 12px 10px 0;border-bottom:1px solid ' . MARCA['border'] . ';font-family:' . TIPOGRAFIA . ';font-size:12px;line-height:16px;font-weight:700;color:' . MARCA['muted'] . ';text-transform:uppercase;letter-spacing:0.06em;">
            ' . esc($campo['label']) . '
          </td>
          <td valign="top" class="em-val em-brd em-text" style="padding:10px 0;border-bottom:1px solid ' . MARCA['border'] . ';font-family:' . TIPOGRAFIA . ';font-size:15px;line-height:22px;color:' . MARCA['text'] . ';font-weight:600;">
            ' . $valor . '
          </td>
        </tr>';
    }

    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' . $filas . '</table>';
}

function seccion($titulo, $cuerpoHtml)
{
    return '
    <tr>
      <td style="padding:0 0 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="em-card em-brd" style="background:' . MARCA['card'] . ';border:1px solid ' . MARCA['border'] . ';border-radius:14px;">
          <tr>
            <td class="em-pad em-accent" style="padding:20px 22px 4px;font-family:' . TIPOGRAFIA . ';font-size:12px;line-height:16px;font-weight:700;color:' . MARCA['blue'] . ';text-transform:uppercase;letter-spacing:0.1em;">
              ' . esc($titulo) . '
            </td>
          </tr>
          <tr>
            <td class="em-pad" style="padding:0 22px 8px;">' . $cuerpoHtml . '</td>
          </tr>
        </table>
      </td>
    </tr>';
}

/* El VML del comentario condicional es lo que hace que Outlook de escritorio
   pinte el fondo; sin eso ignora el border-radius y el color. */
function boton_accion($href, $etiqueta, $secundario = false)
{
    $fondo = $secundario ? MARCA['card'] : MARCA['blue'];
    $texto = $secundario ? MARCA['blue'] : '#ffffff';
    $borde = MARCA['blue'];

    return '
    <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="' . esc($href) . '" style="height:42px;v-text-anchor:middle;width:220px;" arcsize="24%" strokecolor="' . $borde . '" fillcolor="' . $fondo . '">
        <w:anchorlock/>
        <center style="color:' . $texto . ';font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">' . esc($etiqueta) . '</center>
      </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <a href="' . esc($href) . '" class="em-btn' . ($secundario ? ' em-btn-sec' : '') . '" style="display:inline-block;padding:12px 22px;border-radius:10px;background:' . $fondo . ';color:' . $texto . ';border:1px solid ' . $borde . ';text-decoration:none;font-family:' . TIPOGRAFIA . ';font-size:14px;line-height:18px;font-weight:700;">
      ' . esc($etiqueta) . '
    </a>
    <!--<![endif]-->';
}

function armar_correo(array $opciones)
{
    $sitio = $GLOBALS['SITIO'];

    $preheader = $opciones['preheader'] ?? '';
    $eyebrow = $opciones['eyebrow'] ?? '';
    $titulo = $opciones['titulo'] ?? '';
    $intro = $opciones['intro'] ?? '';
    $secciones = $opciones['secciones'] ?? [];
    $acciones = $opciones['acciones'] ?? [];
    $notaPie = $opciones['notaPie'] ?? '';

    /* Cada botón en su propia fila y no en columnas: así en mobile caen uno
       debajo del otro sin depender de los media queries, que Gmail para
       Android ignora en varios casos. */
    $accionesHtml = '';
    if ($acciones) {
        $filas = '';
        foreach ($acciones as $accion) {
            $filas .= '<tr><td class="em-btn-cell" style="padding:0 0 10px;">'
                . boton_accion($accion['href'], $accion['etiqueta'], !empty($accion['secundario']))
                . '</td></tr>';
        }
        $accionesHtml = '
      <tr>
        <td style="padding:0 0 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="em-full">' . $filas . '</table>
        </td>
      </tr>';
    }

    $urlLimpia = preg_replace('#^https://#', '', $sitio['siteUrl']);

    return '<!doctype html>
<html lang="es-AR" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>' . esc($titulo) . '</title>
    <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
    <style>
      /* Los estilos críticos van inline; esto sólo ajusta el tamaño en
         pantallas chicas, donde 620px no entra. */
      @media only screen and (max-width: 620px) {
        .em-wrap { width: 100% !important; }
        .em-outer-pad { padding: 14px 10px !important; }
        .em-head { padding: 20px 18px 18px !important; }
        .em-body-pad { padding: 18px 14px 6px !important; }
        .em-pad { padding-left: 16px !important; padding-right: 16px !important; }
        .em-title { font-size: 22px !important; line-height: 27px !important; }
        .em-intro { font-size: 14px !important; line-height: 21px !important; }
        .em-logo { width: 124px !important; max-width: 124px !important; }
        .em-lbl, .em-val {
          display: block !important;
          width: 100% !important;
          padding-right: 0 !important;
        }
        .em-lbl { padding-bottom: 2px !important; border-bottom: 0 !important; }
        .em-val { padding-top: 0 !important; }
        .em-full, .em-btn-cell { width: 100% !important; }
        .em-btn { display: block !important; text-align: center !important; }
      }

      /* Apple Mail y Outlook respetan prefers-color-scheme; Outlook.com
         reescribe las clases con el prefijo data-ogsc. */
      @media (prefers-color-scheme: dark) {
        .em-bg { background: ' . OSCURO['bg'] . ' !important; }
        .em-card { background: ' . OSCURO['card'] . ' !important; }
        .em-text, .em-val { color: ' . OSCURO['text'] . ' !important; }
        .em-muted, .em-lbl { color: ' . OSCURO['muted'] . ' !important; }
        .em-brd { border-color: ' . OSCURO['border'] . ' !important; }
        .em-accent { color: ' . OSCURO['accent'] . ' !important; }
        .em-btn-sec {
          background: ' . OSCURO['card'] . ' !important;
          color: ' . OSCURO['accent'] . ' !important;
          border-color: ' . OSCURO['accent'] . ' !important;
        }
        .em-link { color: ' . OSCURO['accent'] . ' !important; }
      }
      [data-ogsc] .em-bg { background: ' . OSCURO['bg'] . ' !important; }
      [data-ogsc] .em-card { background: ' . OSCURO['card'] . ' !important; }
      [data-ogsc] .em-text, [data-ogsc] .em-val { color: ' . OSCURO['text'] . ' !important; }
      [data-ogsc] .em-muted, [data-ogsc] .em-lbl { color: ' . OSCURO['muted'] . ' !important; }
      [data-ogsc] .em-brd { border-color: ' . OSCURO['border'] . ' !important; }
      [data-ogsc] .em-accent { color: ' . OSCURO['accent'] . ' !important; }
      [data-ogsc] .em-btn-sec {
        background: ' . OSCURO['card'] . ' !important;
        color: ' . OSCURO['accent'] . ' !important;
        border-color: ' . OSCURO['accent'] . ' !important;
      }
      [data-ogsc] .em-link { color: ' . OSCURO['accent'] . ' !important; }
    </style>
  </head>
  <body class="em-bg" style="margin:0;padding:0;background:' . MARCA['bg'] . ';font-family:' . TIPOGRAFIA . ';color:' . MARCA['text'] . ';-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">' . esc($preheader) . '</div>
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">&#8203;&#8204;&#8205;&nbsp;&#8203;&#8204;&#8205;&nbsp;&#8203;&#8204;&#8205;&nbsp;</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="em-bg" bgcolor="' . MARCA['bg'] . '" style="background:' . MARCA['bg'] . ';">
      <tr>
        <td align="center" class="em-outer-pad" style="padding:28px 14px;">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" class="em-wrap" style="width:100%;max-width:620px;">

            <tr>
              <td class="em-head" bgcolor="' . MARCA['blue'] . '" style="background:' . MARCA['blue'] . ';border-radius:16px 16px 0 0;padding:26px 28px 22px;">
                <img src="cid:' . LOGO_CID . '" width="150" alt="' . esc($sitio['name']) . '" class="em-logo" style="display:block;border:0;width:150px;max-width:150px;height:auto;" />
                <div style="height:18px;line-height:18px;">&nbsp;</div>
                <div style="font-family:' . TIPOGRAFIA . ';font-size:11px;line-height:15px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9dc0e8;">
                  ' . esc($eyebrow) . '
                </div>
                <div style="height:8px;line-height:8px;">&nbsp;</div>
                <div class="em-title" style="font-family:' . TIPOGRAFIA . ';font-size:26px;line-height:30px;font-weight:700;color:#ffffff;">
                  ' . esc($titulo) . '
                </div>
                <div style="height:10px;line-height:10px;">&nbsp;</div>
                <div class="em-intro" style="font-family:' . TIPOGRAFIA . ';font-size:15px;line-height:23px;color:#d6e5f6;">
                  ' . esc($intro) . '
                </div>
              </td>
            </tr>

            <tr>
              <td class="em-card em-brd em-body-pad" bgcolor="' . MARCA['card'] . '" style="background:' . MARCA['card'] . ';border-radius:0 0 16px 16px;padding:24px 22px 10px;border:1px solid ' . MARCA['border'] . ';border-top:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ' . $accionesHtml . '
                  ' . implode('', $secciones) . '
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 14px 0;">
                ' . ($notaPie
                    ? '<div class="em-muted" style="font-family:' . TIPOGRAFIA . ';font-size:13px;line-height:20px;color:' . MARCA['muted'] . ';text-align:center;padding-bottom:12px;">' . esc($notaPie) . '</div>'
                    : '') . '
                <div class="em-muted" style="font-family:' . TIPOGRAFIA . ';font-size:13px;line-height:20px;color:' . MARCA['muted'] . ';text-align:center;">
                  <a href="' . esc($sitio['siteUrl']) . '" class="em-link" style="color:' . MARCA['blue'] . ';text-decoration:none;font-weight:700;">' . esc($urlLimpia) . '</a>
                  &nbsp;&middot;&nbsp;
                  <a href="tel:' . esc(href_telefono($sitio['phone'])) . '" class="em-muted" style="color:' . MARCA['muted'] . ';text-decoration:none;">' . esc($sitio['phone']) . '</a>
                  &nbsp;&middot;&nbsp;
                  <a href="mailto:' . esc($sitio['email']) . '" class="em-muted" style="color:' . MARCA['muted'] . ';text-decoration:none;">' . esc($sitio['email']) . '</a>
                </div>
                <div style="height:8px;line-height:8px;">&nbsp;</div>
                <div class="em-muted" style="font-family:' . TIPOGRAFIA . ';font-size:12px;line-height:18px;color:' . MARCA['muted'] . ';text-align:center;">
                  ' . esc($sitio['legalName']) . ' &middot; ' . esc($sitio['street']) . ', ' . esc($sitio['city']) . ', ' . esc($sitio['region']) . '
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>';
}

/* ── Correos internos (llegan a SISE) ─────────────────────────────────── */

function html_correo_contacto($datos)
{
    $tel = href_telefono($datos['phone']);
    $acciones = [];

    if ($tel) {
        $acciones[] = ['href' => 'https://wa.me/' . ltrim($tel, '+'), 'etiqueta' => 'Escribir por WhatsApp'];
    }
    $acciones[] = ['href' => 'mailto:' . $datos['email'], 'etiqueta' => 'Responder por email', 'secundario' => true];

    return armar_correo([
        'preheader' => $datos['name'] . ' pidió que lo contacten por ' . ($datos['solution'] ?: 'seguridad electrónica') . '.',
        'eyebrow' => 'Formulario de contacto',
        'titulo' => 'Nueva consulta recibida',
        'intro' => $datos['name'] . ' dejó sus datos en el sitio y espera una respuesta.',
        'acciones' => $acciones,
        'secciones' => [
            seccion('Datos del contacto', tabla_campos([
                ['label' => 'Nombre', 'value' => $datos['name']],
                ['label' => 'Teléfono / WhatsApp', 'value' => $datos['phone']],
                ['label' => 'Correo electrónico', 'value' => $datos['email']]
            ])),
            seccion('Consulta', tabla_campos([
                ['label' => 'Solución buscada', 'value' => $datos['solution']],
                ['label' => 'Detalles', 'value' => $datos['details'], 'multiline' => true]
            ]))
        ],
        'notaPie' => 'Respondé este correo y le llega directo a la persona que consultó.'
    ]);
}

function html_correo_cotizador($respuestas, $resumen)
{
    $tel = href_telefono($respuestas['phone'] ?? '');
    $email = $respuestas['email'] ?? '';
    $nombre = $respuestas['name'] ?: 'Un visitante';
    $acciones = [];

    if ($tel) {
        $acciones[] = ['href' => 'https://wa.me/' . ltrim($tel, '+'), 'etiqueta' => 'Escribir por WhatsApp'];
    }
    if ($email) {
        $acciones[] = ['href' => 'mailto:' . $email, 'etiqueta' => 'Responder por email', 'secundario' => true];
    }

    return armar_correo([
        'preheader' => $nombre . ' completó el cotizador online.',
        'eyebrow' => 'Cotizador online',
        'titulo' => 'Nueva solicitud de cotización',
        'intro' => $nombre . ' configuró una solución en el cotizador y pidió un presupuesto.',
        'acciones' => $acciones,
        'secciones' => [
            seccion('Datos del contacto', tabla_campos([
                ['label' => 'Nombre', 'value' => $respuestas['name'] ?? ''],
                ['label' => 'Teléfono', 'value' => $respuestas['phone'] ?? ''],
                ['label' => 'Email', 'value' => $respuestas['email'] ?? ''],
                ['label' => 'Ciudad', 'value' => $respuestas['city'] ?? ''],
                ['label' => 'Tipo de contacto', 'value' => $respuestas['contactType'] ?? '']
            ])),
            seccion('Configuración solicitada', tabla_campos([
                ['label' => 'Tipo de propiedad', 'value' => $respuestas['propertyType'] ?? ''],
                ['label' => 'Paso 2', 'value' => $respuestas['step2'] ?? ''],
                ['label' => 'Paso 3', 'value' => $respuestas['step3'] ?? ''],
                ['label' => 'Paso 4', 'value' => $respuestas['step4'] ?? ''],
                ['label' => 'Paso 5', 'value' => $respuestas['step5'] ?? ''],
                ['label' => 'Paso 6', 'value' => $respuestas['step6'] ?? ''],
                ['label' => 'Paso 7', 'value' => $respuestas['step7'] ?? ''],
                ['label' => 'Resumen enviado', 'value' => $resumen, 'multiline' => true]
            ]))
        ],
        'notaPie' => 'Respondé este correo y le llega directo a la persona que cotizó.'
    ]);
}

/* ── Acuse de recibo (llega al cliente potencial) ─────────────────────── */

function cuerpo_para_el_cliente(array $recap)
{
    $secciones = [
        seccion(
            'Qué sigue ahora',
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="em-text" style="padding:8px 0;font-family:' . TIPOGRAFIA . ';font-size:15px;line-height:23px;color:' . MARCA['text'] . ';">
            Un asesor de SISE se va a comunicar con vos <strong>a la brevedad</strong> para
            entender qué necesitás y armarte una propuesta a medida, sin cargo.
          </td>
        </tr>
        <tr>
          <td class="em-text" style="padding:2px 0 10px;font-family:' . TIPOGRAFIA . ';font-size:15px;line-height:23px;color:' . MARCA['text'] . ';">
            Si preferís no esperar, escribinos por WhatsApp y te atendemos al momento.
          </td>
        </tr>
      </table>'
        )
    ];

    $conValor = array_filter($recap, function ($campo) {
        return !empty($campo['value']);
    });

    if ($conValor) {
        $secciones[] = seccion('Lo que nos contaste', tabla_campos($recap));
    }

    return $secciones;
}

function html_acuse_contacto($datos)
{
    $sitio = $GLOBALS['SITIO'];
    $nombre = trim((string) $datos['name']);
    $primero = $nombre ? preg_split('/\s+/', $nombre)[0] : '';

    return armar_correo([
        'preheader' => 'Recibimos tu consulta. Un asesor se comunica con vos a la brevedad.',
        'eyebrow' => 'Recibimos tu consulta',
        'titulo' => $primero ? '¡Gracias, ' . $primero . '!' : '¡Gracias por escribirnos!',
        'intro' => 'Tu mensaje ya llegó a nuestro equipo. Te respondemos a la brevedad.',
        'acciones' => [['href' => 'https://wa.me/' . $sitio['whatsapp'], 'etiqueta' => 'Escribinos por WhatsApp']],
        'secciones' => cuerpo_para_el_cliente([
            ['label' => 'Solución que buscás', 'value' => $datos['solution']],
            ['label' => 'Tu mensaje', 'value' => $datos['details'], 'multiline' => true]
        ]),
        'notaPie' => 'Recibís este correo porque completaste el formulario de contacto en nuestro sitio.'
    ]);
}

function html_acuse_cotizador($respuestas, $resumen)
{
    $sitio = $GLOBALS['SITIO'];
    $nombre = trim((string) ($respuestas['name'] ?? ''));
    $primero = $nombre ? preg_split('/\s+/', $nombre)[0] : '';

    return armar_correo([
        'preheader' => 'Recibimos tu cotización. Un asesor se comunica con vos a la brevedad.',
        'eyebrow' => 'Recibimos tu cotización',
        'titulo' => $primero ? '¡Gracias, ' . $primero . '!' : '¡Gracias por cotizar con nosotros!',
        'intro' => 'Ya tenemos tu configuración. Te preparamos un presupuesto a medida.',
        'acciones' => [['href' => 'https://wa.me/' . $sitio['whatsapp'], 'etiqueta' => 'Escribinos por WhatsApp']],
        'secciones' => cuerpo_para_el_cliente([
            ['label' => 'Tipo de propiedad', 'value' => $respuestas['propertyType'] ?? ''],
            ['label' => 'Ciudad', 'value' => $respuestas['city'] ?? ''],
            ['label' => 'Resumen', 'value' => $resumen, 'multiline' => true]
        ]),
        'notaPie' => 'Recibís este correo porque usaste el cotizador online en nuestro sitio.'
    ]);
}

/* ── Versiones en texto plano ─────────────────────────────────────────── */

function texto_correo_contacto($datos)
{
    return implode("\n", [
        'Nueva solicitud de contacto',
        '',
        'Nombre: ' . $datos['name'],
        'Telefono / WhatsApp: ' . $datos['phone'],
        'Correo electronico: ' . $datos['email'],
        'Solucion buscada: ' . $datos['solution'],
        'Detalles: ' . ($datos['details'] ?: 'No informados')
    ]);
}

function texto_correo_cotizador($respuestas, $resumen)
{
    return implode("\n", [
        'Nueva solicitud del cotizador online',
        '',
        'Nombre: ' . ($respuestas['name'] ?? ''),
        'Telefono: ' . ($respuestas['phone'] ?? ''),
        'Email: ' . ($respuestas['email'] ?? ''),
        'Ciudad: ' . ($respuestas['city'] ?? ''),
        'Tipo de contacto: ' . ($respuestas['contactType'] ?? ''),
        '',
        'Resumen:',
        (string) $resumen
    ]);
}

function texto_acuse($nombre, $que)
{
    $sitio = $GLOBALS['SITIO'];
    $nombre = trim((string) $nombre);
    $primero = $nombre ? preg_split('/\s+/', $nombre)[0] : '';

    return implode("\n", [
        $primero ? 'Hola ' . $primero . ',' : 'Hola,',
        '',
        'Recibimos tu ' . $que . ' en siseargentina.com.',
        'Un asesor de SISE se va a comunicar con vos a la brevedad para armarte una propuesta a medida, sin cargo.',
        '',
        'Si preferís no esperar, escribinos por WhatsApp: https://wa.me/' . $sitio['whatsapp'],
        '',
        $sitio['legalName'] . ' | ' . $sitio['phone'] . ' | ' . $sitio['email'],
        $sitio['siteUrl']
    ]);
}
