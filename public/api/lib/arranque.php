<?php
/*
 * Arranque común de los dos endpoints: carga la configuración, publica los
 * datos del sitio y deja listas las funciones de seguridad y plantillas.
 */

require_once __DIR__ . '/seguridad.php';

/* Nada de mostrar errores de PHP en la respuesta: filtrarían rutas y
   credenciales. Van al log del hosting. */
ini_set('display_errors', '0');
error_reporting(E_ALL);

$rutaConfig = __DIR__ . '/../config.php';

if (!is_readable($rutaConfig)) {
    error_log('[sise] Falta public/api/config.php en el servidor.');
    responder_json(['error' => 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.'], 500);
}

$CONFIG = require $rutaConfig;

/* Datos de la empresa que usan las plantillas de correo. Son los mismos que
   viven en app/lib/seo.js; si cambia alguno, cambiarlo en los dos lados. */
$SITIO = [
    'name' => 'SISE Argentina',
    'legalName' => 'GRUPO SISE S.A.',
    'siteUrl' => 'https://' . $CONFIG['HOST_SITIO'],
    'phone' => '+54 800 222 5153',
    'email' => 'info@siseargentina.com',
    'whatsapp' => '5493624231144',
    'street' => 'Avenida 9 de julio 2514',
    'city' => 'Resistencia',
    'region' => 'Chaco'
];

require_once __DIR__ . '/plantillas.php';
require_once __DIR__ . '/smtp.php';

/* Puerta de entrada compartida: método, origen y límite por IP. */
function verificar_pedido($CONFIG, $formulario)
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        responder_json(['error' => 'Método no permitido.'], 405);
    }

    if (!origen_permitido($CONFIG['HOST_SITIO'])) {
        responder_json(['error' => 'Origen no permitido.'], 403);
    }

    if (supera_el_limite(ip_del_visitante(), $formulario)) {
        responder_json(['error' => 'Demasiados intentos. Probá de nuevo en unos minutos.'], 429);
    }

    $datos = cuerpo_json();

    if ($datos === null) {
        responder_json(['error' => 'Solicitud inválida.'], 400);
    }

    /* Honeypot y tiempo de llenado: al bot se le responde ok para que no
       reintente, pero no se manda ningún correo. */
    if (texto_seguro($datos['website'] ?? '') !== '') {
        responder_json(['ok' => true]);
    }

    if (!parece_humano($datos['formStartedAt'] ?? null)) {
        responder_json(['ok' => true]);
    }

    return $datos;
}
