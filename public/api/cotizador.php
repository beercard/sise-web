<?php
/*
 * Cotizador online. Reemplaza a la ruta /api/cotizador que corría en Node:
 * mismas validaciones, mismos correos y mismas respuestas JSON.
 */

require_once __DIR__ . '/lib/arranque.php';

$datos = verificar_pedido($CONFIG, 'cotizador');

$respuestasCrudas = $datos['answers'] ?? null;
$variante = texto_seguro($datos['variant'] ?? '');
$resumen = texto_multilinea_seguro($datos['summary'] ?? '');

if (!is_array($respuestasCrudas)) {
    responder_json(['error' => 'Solicitud inválida.'], 400);
}

$respuestas = [
    'propertyType' => texto_seguro($respuestasCrudas['propertyType'] ?? ''),
    'step2' => texto_seguro($respuestasCrudas['step2'] ?? ''),
    'step3' => texto_seguro($respuestasCrudas['step3'] ?? ''),
    'step4' => texto_seguro($respuestasCrudas['step4'] ?? ''),
    'step5' => texto_seguro($respuestasCrudas['step5'] ?? ''),
    'step6' => lista_segura($respuestasCrudas['step6'] ?? ''),
    'step7' => lista_segura($respuestasCrudas['step7'] ?? ''),
    'contactType' => texto_seguro($respuestasCrudas['contactType'] ?? ''),
    'name' => texto_seguro($respuestasCrudas['name'] ?? ''),
    'phone' => texto_seguro($respuestasCrudas['phone'] ?? ''),
    'email' => texto_seguro($respuestasCrudas['email'] ?? ''),
    'city' => texto_seguro($respuestasCrudas['city'] ?? '')
];

if ($respuestas['name'] === '' || $respuestas['phone'] === '' || $respuestas['email'] === '') {
    responder_json(['error' => 'Faltan datos de contacto (nombre, teléfono o email).'], 400);
}

if (!email_valido($respuestas['email'])) {
    responder_json(['error' => 'Ingresá un email válido.'], 400);
}

if (in_array($variante, ['enterprise', 'spaces', 'agro'], true) && $respuestas['city'] === '') {
    responder_json(['error' => 'Falta la ciudad.'], 400);
}

$para = $CONFIG['VENTAS_TO'];
$logo = logo_adjunto();

$mensajes = [
    [
        'de' => $CONFIG['MAIL_FROM'],
        'de_nombre' => $CONFIG['MAIL_FROM_NOMBRE'],
        'para' => $para,
        'asunto' => 'Cotizador online - ' . $respuestas['name'],
        'texto' => texto_correo_cotizador($respuestas, $resumen),
        'html' => html_correo_cotizador($respuestas, $resumen),
        'responder_a' => $respuestas['email'],
        'adjunto_inline' => $logo
    ],
    [
        'de' => $CONFIG['MAIL_FROM'],
        'de_nombre' => $CONFIG['MAIL_FROM_NOMBRE'],
        'para' => $respuestas['email'],
        'asunto' => 'Recibimos tu cotización | SISE Argentina',
        'texto' => texto_acuse($respuestas['name'], 'solicitud de cotización'),
        'html' => html_acuse_cotizador($respuestas, $resumen),
        'responder_a' => $para,
        'adjunto_inline' => $logo
    ]
];

try {
    $errores = enviar_correos($CONFIG, $mensajes);
} catch (Exception $e) {
    error_log('[cotizador] No se pudo enviar: ' . $e->getMessage());
    responder_json(['error' => 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.'], 500);
}

if (isset($errores[0])) {
    error_log('[cotizador] Falló el aviso interno: ' . $errores[0]);
    responder_json(['error' => 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.'], 500);
}

if (isset($errores[1])) {
    error_log('[cotizador] No se pudo enviar el acuse al visitante: ' . $errores[1]);
}

responder_json(['ok' => true]);
