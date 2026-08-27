<?php
/*
 * Controles previos al envío, portados de las rutas de API que corrían en
 * Node: origen permitido, límite por IP, honeypot, tiempo mínimo de llenado y
 * saneado de los campos. El orden importa: primero se descarta al bot y
 * recién después se toca el SMTP.
 */

const MAX_LARGO_CAMPO = 200;
const MAX_LARGO_DETALLE = 2000;
const PATRON_EMAIL = '/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/';

const VENTANA_LIMITE_SEG = 600;   // 10 minutos
const MAX_ENVIOS_VENTANA = 5;
const MIN_LLENADO_MS = 1500;
const MAX_EDAD_FORM_MS = 7200000; // 2 horas

function responder_json($datos, $codigo = 200)
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

function ip_del_visitante()
{
    foreach (['HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'] as $clave) {
        if (!empty($_SERVER[$clave])) {
            $valor = explode(',', $_SERVER[$clave])[0];
            return trim($valor);
        }
    }

    return 'desconocida';
}

/*
 * Límite por IP. En el hosting no hay memoria compartida entre pedidos, así
 * que el contador vive en un archivo del directorio temporal del sistema (no
 * en el webroot, para no exponerlo ni depender de permisos de escritura ahí).
 */
function supera_el_limite($ip, $formulario)
{
    $archivo = sys_get_temp_dir() . '/sise-rate-' . md5($formulario . '|' . $ip) . '.json';
    $ahora = time();

    $marcas = [];
    if (is_readable($archivo)) {
        $crudo = json_decode((string) file_get_contents($archivo), true);
        if (is_array($crudo)) {
            $marcas = array_filter($crudo, function ($t) use ($ahora) {
                return is_numeric($t) && ($ahora - $t) < VENTANA_LIMITE_SEG;
            });
        }
    }

    if (count($marcas) >= MAX_ENVIOS_VENTANA) {
        return true;
    }

    $marcas[] = $ahora;
    @file_put_contents($archivo, json_encode(array_values($marcas)), LOCK_EX);

    return false;
}

/*
 * Acepta el host propio con o sin www y el desarrollo local; rechaza
 * cualquier otro origen. Si el navegador no manda Origin ni Referer se deja
 * pasar: hay clientes que los omiten y perder un lead real es peor que
 * aceptar un envío sin cabecera, que igual tiene que superar el honeypot.
 */
function origen_permitido($host_propio)
{
    $candidatos = array_filter([
        $_SERVER['HTTP_ORIGIN'] ?? null,
        $_SERVER['HTTP_REFERER'] ?? null
    ]);

    if (!$candidatos) {
        return true;
    }

    $propio = preg_replace('/^www\./', '', strtolower($host_propio));

    foreach ($candidatos as $valor) {
        $partes = parse_url($valor);
        if (!$partes || empty($partes['host'])) {
            continue;
        }

        $host = preg_replace('/^www\./', '', strtolower($partes['host']));
        if ($host === 'localhost' || $host === '127.0.0.1') {
            return true;
        }

        if ($host === $propio) {
            return true;
        }
    }

    return false;
}

/* Un envío instantáneo es un bot; uno de hace tres horas es una pestaña
   olvidada que ya no vale la pena procesar. */
function parece_humano($iniciado_en)
{
    if (!is_numeric($iniciado_en)) {
        return true;
    }

    $edad = (microtime(true) * 1000) - (float) $iniciado_en;

    return $edad >= MIN_LLENADO_MS && $edad <= MAX_EDAD_FORM_MS;
}

/*
 * Recorte que no parte un carácter UTF-8 al medio. Va con preg y no con
 * mb_substr a propósito: mbstring no está garantizada en todo hosting
 * compartido, y cuando falta el formulario devolvía un 500 sin explicación.
 */
function recortar($texto, $max)
{
    if (strlen($texto) <= $max) {
        return $texto;
    }

    if (preg_match('/^.{0,' . (int) $max . '}/su', $texto, $coincidencia)) {
        return $coincidencia[0];
    }

    /* Si el texto no es UTF-8 válido, se corta a lo bruto. */
    return substr($texto, 0, $max);
}

function texto_seguro($valor, $max = MAX_LARGO_CAMPO)
{
    if (!is_string($valor) && !is_numeric($valor)) {
        return '';
    }

    $limpio = preg_replace('/[\r\n\t]+/u', ' ', (string) $valor);

    return recortar(trim((string) $limpio), $max);
}

function texto_multilinea_seguro($valor)
{
    if (!is_string($valor)) {
        return '';
    }

    $lineas = preg_split('/\r?\n/', $valor);
    $limpias = [];
    foreach ($lineas as $linea) {
        $limpia = texto_seguro($linea, MAX_LARGO_DETALLE);
        if ($limpia !== '') {
            $limpias[] = $limpia;
        }
    }

    return recortar(implode("\n", $limpias), MAX_LARGO_DETALLE);
}

function lista_segura($valor)
{
    if (is_array($valor)) {
        $items = array_filter(array_map('texto_seguro', $valor));
        return implode(', ', $items);
    }

    return texto_seguro($valor);
}

function email_valido($email)
{
    return (bool) preg_match(PATRON_EMAIL, $email);
}

/* Cuerpo del pedido: los formularios mandan JSON. */
function cuerpo_json()
{
    $crudo = file_get_contents('php://input');
    $datos = json_decode((string) $crudo, true);

    return is_array($datos) ? $datos : null;
}
