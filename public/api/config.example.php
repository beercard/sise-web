<?php
/*
 * Copiá este archivo como `config.php` DENTRO DEL HOSTING (no lo subas al
 * repositorio: lleva la clave del correo) y completá los valores.
 *
 * En el panel de Ferozo los datos SMTP de una casilla del dominio son:
 *   host   c##########.ferozo.com   (el que figura en Correo → Configuración)
 *   puerto 465 con SSL, o 587 con STARTTLS
 *   user   la dirección completa, por ejemplo web@siseargentina.com
 *   pass   la clave de esa casilla
 *
 * IMPORTANTE: el remitente (SMTP_USER / MAIL_FROM) tiene que ser una casilla
 * del propio dominio. Si se pone un Gmail, el servidor lo rechaza o el correo
 * cae en spam porque no valida el SPF.
 */

return [
    'SMTP_HOST' => 'c0000000.ferozo.com',
    'SMTP_PORT' => 465,
    /* 'ssl' para el puerto 465, 'tls' para el 587. */
    'SMTP_CIFRADO' => 'ssl',
    'SMTP_USER' => 'web@siseargentina.com',
    'SMTP_PASS' => 'la-clave-de-la-casilla',

    /* A dónde llegan los leads. */
    'VENTAS_TO' => 'ventas@siseargentina.com',
    'CONTACTO_TO' => 'contacto@siseargentina.com',

    /* Remitente visible de los correos. */
    'MAIL_FROM' => 'web@siseargentina.com',
    'MAIL_FROM_NOMBRE' => 'SISE Argentina',

    /* Host del sitio, para validar el origen de los envíos. */
    'HOST_SITIO' => 'siseargentina.com'
];
