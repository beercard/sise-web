import nodemailer from 'nodemailer';

import {
  buildQuoteAckEmailHtml,
  buildQuoteAckEmailText,
  buildQuoteEmailHtml
} from '@/app/lib/emailTemplates';
import { siteConfig } from '@/app/lib/seo';

export const runtime = 'nodejs';

const MAX_FIELD_LENGTH = 200;
const MAX_LIST_ITEMS = 10;
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

function safeText(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  return String(value)
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, MAX_FIELD_LENGTH);
}

function safeList(value) {
  if (Array.isArray(value)) {
    return value
      .slice(0, MAX_LIST_ITEMS)
      .map((item) => safeText(item))
      .filter(Boolean)
      .join(', ');
  }

  return safeText(value);
}

function safeMultilineText(value) {
  if (typeof value !== 'string') return '';

  return value
    .split(/\r?\n/)
    .map((line) => safeText(line))
    .filter(Boolean)
    .join('\n');
}

function buildFallbackEmailText(answers) {
  const lines = [
    ['Tipo de propiedad', answers?.propertyType],
    ['Paso 2', answers?.step2],
    ['Paso 3', answers?.step3],
    ['Paso 4', answers?.step4],
    ['Paso 5', answers?.step5],
    ['Paso 6', safeList(answers?.step6)],
    ['Paso 7', safeList(answers?.step7)],
    ['Tipo de contacto', answers?.contactType],
    ['Nombre', answers?.name],
    ['Teléfono', answers?.phone],
    ['Email', answers?.email],
    ['Ciudad', answers?.city]
  ]
    .map(([label, value]) => `${label}: ${typeof value === 'string' || typeof value === 'number' ? safeText(value) : safeList(value)}`)
    .join('\n');

  return lines;
}

function buildEmailText(answers, summary) {
  const normalizedSummary = safeMultilineText(summary);
  const content = normalizedSummary || buildFallbackEmailText(answers);

  return `Nuevo cotizador online\n\n${content}\n`;
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
    const answers = payload?.answers;
    const summary = payload?.summary;
    const variant = safeText(payload?.variant);

    if (!answers || typeof answers !== 'object') {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
    }

    if (safeText(payload?.website)) {
      return Response.json({ ok: true });
    }

    if (!looksHumanSubmission(payload?.formStartedAt)) {
      return Response.json({ ok: true });
    }

    const name = safeText(answers.name);
    const phone = safeText(answers.phone);
    const email = safeText(answers.email);
    const city = safeText(answers.city);
    const normalizedAnswers = {
      propertyType: safeText(answers.propertyType),
      step2: safeText(answers.step2),
      step3: safeText(answers.step3),
      step4: safeText(answers.step4),
      step5: safeText(answers.step5),
      step6: safeList(answers.step6),
      step7: safeList(answers.step7),
      contactType: safeText(answers.contactType),
      name,
      phone,
      email,
      city
    };

    if (!name || !phone || !email) {
      return Response.json(
        { error: 'Faltan datos de contacto (nombre, teléfono o email).' },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ error: 'Ingresá un email válido.' }, { status: 400 });
    }

    if (['enterprise', 'spaces', 'agro'].includes(variant) && !city) {
      return Response.json({ error: 'Falta la ciudad.' }, { status: 400 });
    }

    const to = requiredEnv('SALES_EMAIL_TO');
    const from = process.env.SALES_EMAIL_FROM || requiredEnv('SMTP_USER');

    await getTransporter().sendMail({
      from,
      to,
      subject: `Cotizador online - ${name}`,
      text: buildEmailText(normalizedAnswers, summary),
      html: buildQuoteEmailHtml({ answers: normalizedAnswers, summary }),
      replyTo: email
    });

    /* Acuse de recibo al visitante. Va después del aviso interno y con su
       propio try/catch: si este correo falla, la cotización igual ya llegó a
       SISE y no tiene sentido devolverle un error al usuario. */
    try {
      await getTransporter().sendMail({
        from,
        to: email,
        subject: 'Recibimos tu cotización | SISE Argentina',
        text: buildQuoteAckEmailText({ answers: normalizedAnswers }),
        html: buildQuoteAckEmailHtml({ answers: normalizedAnswers, summary }),
        replyTo: to
      });
    } catch (ackError) {
      console.error('[cotizador] No se pudo enviar el acuse al visitante:', ackError);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('[cotizador] Error al procesar la solicitud:', error);
    return Response.json(
      { error: 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
