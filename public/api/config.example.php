<?php
/*
 * Copiá este archivo como `config.php` DENTRO DEL HOSTING (no lo subas al
 * repositorio: lleva la clave del correo) y completá los valores.
 *
 * Hay dos maneras de enviar los correos de los formularios. Elegí UNA y
 * completá los cuatro datos SMTP_* con esa opción.
 *
 * ── OPCIÓN A · Casilla del hosting Ferozo ────────────────────────────────
 * Los datos figuran en el panel de Ferozo, en Correo → Configuración:
 *
 *   'SMTP_HOST'    => 'c0000000.ferozo.com',  // el que muestre el panel
 *   'SMTP_PORT'    => 465,
 *   'SMTP_CIFRADO' => 'ssl',
 *   'SMTP_USER'    => 'web@siseargentina.com',
 *   'SMTP_PASS'    => 'la clave de esa casilla',
 *
 * ── OPCIÓN B · Casilla de Google Workspace del dominio ───────────────────
 * Requiere generar una "contraseña de aplicación" (NO sirve la contraseña
 * normal de la cuenta):
 *
 *   1. Entrá a myaccount.google.com con la casilla que va a enviar
 *      (por ejemplo web@siseargentina.com).
 *   2. Seguridad → activá la "Verificación en dos pasos" si no está activa
 *      (sin eso Google no ofrece contraseñas de aplicación).
 *   3. Seguridad → "Contraseñas de aplicaciones" → creá una llamada
 *      "Formularios web SISE". Google te da 16 letras: esa es SMTP_PASS.
 *
 *   'SMTP_HOST'    => 'smtp.gmail.com',
 *   'SMTP_PORT'    => 465,
 *   'SMTP_CIFRADO' => 'ssl',
 *   'SMTP_USER'    => 'web@siseargentina.com',
 *   'SMTP_PASS'    => 'xxxxxxxxxxxxxxxx',      // escribila SIN los espacios
 *
 *   Con Google, MAIL_FROM tiene que ser la MISMA casilla que SMTP_USER (o un
 *   alias configurado en Gmail): Google reescribe cualquier otro remitente.
 *
 * En las dos opciones el remitente debe ser una casilla @siseargentina.com.
 * Un remitente ajeno al dominio cae en spam porque no valida el SPF.
 */

return [
    'SMTP_HOST' => 'smtp.gmail.com',
    'SMTP_PORT' => 465,
    /* 'ssl' para el puerto 465, 'tls' para el 587. */
    'SMTP_CIFRADO' => 'ssl',
    'SMTP_USER' => 'web@siseargentina.com',
    'SMTP_PASS' => 'contraseña-de-aplicacion-de-16-letras',

    /* A dónde llegan los leads. */
    'VENTAS_TO' => 'ventas@siseargentina.com',
    'CONTACTO_TO' => 'contacto@siseargentina.com',

    /* Remitente visible de los correos (con Google, igual a SMTP_USER). */
    'MAIL_FROM' => 'web@siseargentina.com',
    'MAIL_FROM_NOMBRE' => 'SISE Argentina',

    /* Host del sitio, para validar el origen de los envíos. */
    'HOST_SITIO' => 'siseargentina.com'
];
