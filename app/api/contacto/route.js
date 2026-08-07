import nodemailer from 'nodemailer';

import {
  buildContactAckEmailHtml,
  buildContactAckEmailText,
  buildContactEmailHtml
} from '@/app/lib/emailTemplates';
import { siteConfig } from '@/app/lib/seo';

export const runtime = 'nodejs';

const MAX_FIELD_LENGTH = 200;
const MAX_DETAILS_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_FORM_FILL_MS = 1500;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;
const rateLimitHits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateLimitHits.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(ip, hits);
    return true;
  }

  hits.push(now);
  rateLimitHits.set(ip, hits);

  if (rateLimitHits.size > 10000) {
    for (const [key, value] of rateLimitHits) {
      if (!value.some((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)) {
        rateLimitHits.delete(key);
      }
    }
  }

  return false;
}

function isAllowedRequestOrigin(request) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const candidates = [origin, referer].filter(Boolean);

  if (!candidates.length) return true;

  return candidates.some((value) => {
    try {
      const url = new URL(value);
      return (
        url.origin === siteConfig.siteUrl ||
        url.origin === 'http://localhost:3000' ||
        url.origin === 'http://localhost:3001'
      );
    } catch {
      return false;
    }
  });
}

function looksHumanSubmission(startedAt) {
  const timestamp = Number(startedAt);
  if (!Number.isFinite(timestamp)) return true;

  const age = Date.now() - timestamp;
  return age >= MIN_FORM_FILL_MS && age <= MAX_FORM_AGE_MS;
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta configurar ${name}.`);
  }
  return value;
}

function safeText(value, maxLength = MAX_FIELD_LENGTH) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';

  return String(value)
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function safeMultilineText(value) {
  if (typeof value !== 'string') return '';

  return value
    .split(/\r?\n/)
    .map((line) => safeText(line, MAX_DETAILS_LENGTH))
    .filter(Boolean)
    .join('\n')
    .slice(0, MAX_DETAILS_LENGTH);
}

function buildEmailText({ name, phone, email, solution, details }) {
  return [
    'Nueva solicitud de contacto',
    '',
    `Nombre: ${name}`,
    `Telefono / WhatsApp: ${phone}`,
    `Correo electronico: ${email}`,
    `Solucion buscada: ${solution}`,
    `Detalles: ${details || 'No informados'}`
  ].join('\n');
}

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = requiredEnv('SMTP_HOST');
  const port = Number(requiredEnv('SMTP_PORT'));
  const user = requiredEnv('SMTP_USER');
  const pass = requiredEnv('SMTP_PASS');

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  return cachedTransporter;
}

export async function POST(request) {
  try {
    if (!isAllowedRequestOrigin(request)) {
      return Response.json({ error: 'Origen no permitido.' }, { status: 403 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return Response.json(
        { error: 'Demasiados intentos. Probá de nuevo en unos minutos.' },
        { status: 429 }
      );
    }

    const payload = await request.json().catch(() => null);

    if (!payload || typeof payload !== 'object') {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
    }

    if (safeText(payload.website)) {
      return Response.json({ ok: true });
    }

    if (!looksHumanSubmission(payload.formStartedAt)) {
      return Response.json({ ok: true });
    }

    const name = safeText(payload.name, 120);
    const phone = safeText(payload.phone, 40);
    const email = safeText(payload.email, 120);
    const solution = safeText(payload.solution, 160);
    const details = safeMultilineText(payload.details);

    if (!name) {
      return Response.json({ error: 'Ingresá tu nombre y apellido.' }, { status: 400 });
    }

    if (!phone) {
      return Response.json({ error: 'Ingresá tu teléfono o WhatsApp.' }, { status: 400 });
    }

    if (!email) {
      return Response.json({ error: 'Ingresá tu correo electrónico.' }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ error: 'Ingresá un email válido.' }, { status: 400 });
    }

    if (!solution) {
      return Response.json(
        { error: 'Contanos qué solución estás buscando.' },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_EMAIL_TO || requiredEnv('SALES_EMAIL_TO');
    const from = process.env.CONTACT_EMAIL_FROM || process.env.SALES_EMAIL_FROM || requiredEnv('SMTP_USER');

    await getTransporter().sendMail({
      from,
      to,
      subject: `Contacto web - ${name}`,
      text: buildEmailText({ name, phone, email, solution, details }),
      html: buildContactEmailHtml({ name, phone, email, solution, details }),
      replyTo: email
    });

    /* Acuse de recibo al visitante. Va después del aviso interno y con su
       propio try/catch: si este correo falla, la consulta igual ya llegó a
       SISE y no tiene sentido devolverle un error al usuario. */
    try {
      await getTransporter().sendMail({
        from,
        to: email,
        subject: 'Recibimos tu consulta | SISE Argentina',
        text: buildContactAckEmailText({ name }),
        html: buildContactAckEmailHtml({ name, solution, details }),
        replyTo: to
      });
    } catch (ackError) {
      console.error('[contacto] No se pudo enviar el acuse al visitante:', ackError);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('[contacto] Error al procesar la solicitud:', error);
    return Response.json(
      { error: 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
