<?php
/*
 * Cliente SMTP mínimo con autenticación, en reemplazo de nodemailer.
 *
 * No usa mail() de PHP a propósito: enviar autenticado desde la casilla del
 * dominio conserva el SPF/DKIM del hosting y evita que los acuses al visitante
 * caigan en spam, que es justo lo que pasa con mail() en servidores
 * compartidos.
 *
 * Soporta los dos modos de Ferozo: SSL directo (puerto 465) y STARTTLS
 * (puerto 587). El mensaje sale como multipart/related con el logo embebido
 * por Content-ID, igual que hacía la versión en Node.
 */

class ErrorSmtp extends Exception
{
}

class ClienteSmtp
{
    private $socket;
    private $host;
    private $puerto;
    private $usuario;
    private $clave;
    private $cifrado;
    private $timeout;

    /* $cifrado: 'ssl' abre la conexión ya cifrada (puerto 465) y 'tls' la
       levanta con STARTTLS (puerto 587). Si no se indica, se deduce del
       puerto. En los dos casos la sesión viaja cifrada: no hay modo plano. */
    public function __construct($host, $puerto, $usuario, $clave, $cifrado = null, $timeout = 20)
    {
        $this->host = $host;
        $this->puerto = (int) $puerto;
        $this->usuario = $usuario;
        $this->clave = $clave;
        $this->cifrado = $cifrado ?: ($this->puerto === 465 ? 'ssl' : 'tls');
        $this->timeout = $timeout;
    }

    private function leer()
    {
        $respuesta = '';
        while (($linea = fgets($this->socket, 515)) !== false) {
            $respuesta .= $linea;
            /* En una respuesta multilínea el cuarto carácter es "-"; en la
               última es un espacio. */
            if (strlen($linea) < 4 || $linea[3] !== '-') {
                break;
            }
        }

        return $respuesta;
    }

    private function esperar($esperado, $contexto)
    {
        $respuesta = $this->leer();
        $codigo = (int) substr(trim($respuesta), 0, 3);

        if (!in_array($codigo, (array) $esperado, true)) {
            throw new ErrorSmtp(sprintf('%s: el servidor respondió "%s".', $contexto, trim($respuesta)));
        }

        return $respuesta;
    }

    private function enviar($comando, $esperado, $contexto)
    {
        fwrite($this->socket, $comando . "\r\n");

        return $this->esperar($esperado, $contexto);
    }

    public function conectar()
    {
        $directoSsl = $this->cifrado === 'ssl';
        $destino = ($directoSsl ? 'ssl://' : 'tcp://') . $this->host . ':' . $this->puerto;

        $contexto = stream_context_create([
            'ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true]
        ]);

        $this->socket = @stream_socket_client(
            $destino,
            $errno,
            $errstr,
            $this->timeout,
            STREAM_CLIENT_CONNECT,
            $contexto
        );

        if (!$this->socket) {
            throw new ErrorSmtp(sprintf('No se pudo conectar a %s (%s).', $destino, $errstr ?: $errno));
        }

        stream_set_timeout($this->socket, $this->timeout);
        $this->esperar(220, 'Saludo del servidor');

        $saludo = 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost');
        $this->enviar($saludo, 250, 'EHLO');

        if (!$directoSsl) {
            $this->enviar('STARTTLS', 220, 'STARTTLS');
            $ok = @stream_socket_enable_crypto(
                $this->socket,
                true,
                STREAM_CRYPTO_METHOD_TLS_CLIENT
            );
            if (!$ok) {
                throw new ErrorSmtp('No se pudo iniciar TLS.');
            }
            /* Después de STARTTLS hay que volver a presentarse. */
            $this->enviar($saludo, 250, 'EHLO tras STARTTLS');
        }

        $this->enviar('AUTH LOGIN', 334, 'AUTH LOGIN');
        $this->enviar(base64_encode($this->usuario), 334, 'Usuario SMTP');
        $this->enviar(base64_encode($this->clave), 235, 'Clave SMTP');
    }

    /*
     * $mensaje: ['de' => x, 'de_nombre' => x, 'para' => x, 'asunto' => x,
     *            'texto' => x, 'html' => x, 'responder_a' => x,
     *            'adjunto_inline' => ['ruta','cid','nombre','tipo']]
     */
    public function enviarMensaje(array $mensaje)
    {
        $de = $mensaje['de'];
        $para = $mensaje['para'];

        $this->enviar('MAIL FROM:<' . $de . '>', 250, 'MAIL FROM');
        $this->enviar('RCPT TO:<' . $para . '>', [250, 251], 'RCPT TO');
        $this->enviar('DATA', 354, 'DATA');

        fwrite($this->socket, $this->armarMensaje($mensaje) . "\r\n.\r\n");
        $this->esperar(250, 'Cuerpo del mensaje');
    }

    public function cerrar()
    {
        if ($this->socket) {
            @fwrite($this->socket, "QUIT\r\n");
            @fclose($this->socket);
            $this->socket = null;
        }
    }

    private function codificarCabecera($texto)
    {
        if (preg_match('/^[\x20-\x7E]*$/', $texto)) {
            return $texto;
        }

        return '=?UTF-8?B?' . base64_encode($texto) . '?=';
    }

    private function armarMensaje(array $m)
    {
        $limiteRel = 'rel_' . bin2hex(random_bytes(12));
        $limiteAlt = 'alt_' . bin2hex(random_bytes(12));

        $remitente = !empty($m['de_nombre'])
            ? $this->codificarCabecera($m['de_nombre']) . ' <' . $m['de'] . '>'
            : $m['de'];

        $cabeceras = [
            'Date: ' . date('r'),
            'From: ' . $remitente,
            'To: ' . $m['para'],
            'Subject: ' . $this->codificarCabecera($m['asunto']),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . ($_SERVER['SERVER_NAME'] ?? 'localhost') . '>',
            'MIME-Version: 1.0'
        ];

        if (!empty($m['responder_a'])) {
            $cabeceras[] = 'Reply-To: ' . $m['responder_a'];
        }

        $adjunto = $m['adjunto_inline'] ?? null;
        $contenidoAdjunto = ($adjunto && is_readable($adjunto['ruta']))
            ? file_get_contents($adjunto['ruta'])
            : null;

        /* Todo va en base64: además de resolver los acentos, evita el
           dot-stuffing del protocolo (ninguna línea puede empezar con "."). */
        $partesAlt = "--$limiteAlt\r\n"
            . "Content-Type: text/plain; charset=UTF-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($m['texto'])) . "\r\n"
            . "--$limiteAlt\r\n"
            . "Content-Type: text/html; charset=UTF-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($m['html'])) . "\r\n"
            . "--$limiteAlt--\r\n";

        if ($contenidoAdjunto === null) {
            $cabeceras[] = 'Content-Type: multipart/alternative; boundary="' . $limiteAlt . '"';
            return implode("\r\n", $cabeceras) . "\r\n\r\n" . $partesAlt;
        }

        $cabeceras[] = 'Content-Type: multipart/related; boundary="' . $limiteRel . '"';

        $cuerpo = "--$limiteRel\r\n"
            . "Content-Type: multipart/alternative; boundary=\"$limiteAlt\"\r\n\r\n"
            . $partesAlt
            . "--$limiteRel\r\n"
            . 'Content-Type: ' . $adjunto['tipo'] . '; name="' . $adjunto['nombre'] . "\"\r\n"
            . 'Content-ID: <' . $adjunto['cid'] . ">\r\n"
            . 'Content-Disposition: inline; filename="' . $adjunto['nombre'] . "\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($contenidoAdjunto)) . "\r\n"
            . "--$limiteRel--\r\n";

        return implode("\r\n", $cabeceras) . "\r\n\r\n" . $cuerpo;
    }
}

/*
 * Envía los mensajes reutilizando una sola conexión. Devuelve la lista de
 * errores: el primer mensaje (el aviso interno) es el que no puede fallar; si
 * falla el acuse al visitante, la consulta igual ya llegó a SISE.
 */
function enviar_correos(array $config, array $mensajes)
{
    $cliente = new ClienteSmtp(
        $config['SMTP_HOST'],
        $config['SMTP_PORT'],
        $config['SMTP_USER'],
        $config['SMTP_PASS'],
        $config['SMTP_CIFRADO'] ?? null
    );

    $errores = [];

    try {
        $cliente->conectar();

        foreach ($mensajes as $indice => $mensaje) {
            try {
                $cliente->enviarMensaje($mensaje);
            } catch (Exception $e) {
                $errores[$indice] = $e->getMessage();
            }
        }
    } catch (Exception $e) {
        $cliente->cerrar();
        throw $e;
    }

    $cliente->cerrar();

    return $errores;
}
