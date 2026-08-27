<?php
/*
 * Formulario de contacto. Reemplaza a la ruta /api/contacto que corría en
 * Node: mismas validaciones, mismos correos y mismas respuestas JSON, para
 * que el front no note la diferencia.
 */

require_once __DIR__ . '/lib/arranque.php';

$datos = verificar_pedido($CONFIG, 'contacto');

$campos = [
    'name' => texto_seguro($datos['name'] ?? '', 120),
    'phone' => texto_seguro($datos['phone'] ?? '', 40),
    'email' => texto_seguro($datos['email'] ?? '', 120),
    'solution' => texto_seguro($datos['solution'] ?? '', 160),
    'details' => texto_multilinea_seguro($datos['details'] ?? '')
];

if ($campos['name'] === '') {
    responder_json(['error' => 'Ingresá tu nombre y apellido.'], 400);
}

if ($campos['phone'] === '') {
    responder_json(['error' => 'Ingresá tu teléfono o WhatsApp.'], 400);
}

if ($campos['email'] === '') {
    responder_json(['error' => 'Ingresá tu correo electrónico.'], 400);
}

if (!email_valido($campos['email'])) {
    responder_json(['error' => 'Ingresá un email válido.'], 400);
}

if ($campos['solution'] === '') {
    responder_json(['error' => 'Contanos qué solución estás buscando.'], 400);
}

$para = $CONFIG['CONTACTO_TO'] ?: $CONFIG['VENTAS_TO'];
$logo = logo_adjunto();

$mensajes = [
    /* 1. Aviso interno. Es el que no puede fallar. */
    [
        'de' => $CONFIG['MAIL_FROM'],
        'de_nombre' => $CONFIG['MAIL_FROM_NOMBRE'],
        'para' => $para,
        'asunto' => 'Contacto web - ' . $campos['name'],
        'texto' => texto_correo_contacto($campos),
        'html' => html_correo_contacto($campos),
        'responder_a' => $campos['email'],
        'adjunto_inline' => $logo
    ],
    /* 2. Acuse al visitante. Si este falla, la consulta ya llegó igual. */
    [
        'de' => $CONFIG['MAIL_FROM'],
        'de_nombre' => $CONFIG['MAIL_FROM_NOMBRE'],
        'para' => $campos['email'],
        'asunto' => 'Recibimos tu consulta | SISE Argentina',
        'texto' => texto_acuse($campos['name'], 'consulta'),
        'html' => html_acuse_contacto($campos),
        'responder_a' => $para,
        'adjunto_inline' => $logo
    ]
];

try {
    $errores = enviar_correos($CONFIG, $mensajes);
} catch (Exception $e) {
    error_log('[contacto] No se pudo enviar: ' . $e->getMessage());
    responder_json(['error' => 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.'], 500);
}

if (isset($errores[0])) {
    error_log('[contacto] Falló el aviso interno: ' . $errores[0]);
    responder_json(['error' => 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.'], 500);
}

if (isset($errores[1])) {
    error_log('[contacto] No se pudo enviar el acuse al visitante: ' . $errores[1]);
}

responder_json(['ok' => true]);
