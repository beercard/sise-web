import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const MAX_FIELD_LENGTH = 200;
const MAX_LIST_ITEMS = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Límite de envíos por IP (en memoria, por instancia).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
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

function buildEmailText(answers) {
  const lines = [
    ['Tipo de propiedad', answers?.propertyType],
    ['Experiencia previa', answers?.experience],
    ['Nivel de riesgo', answers?.risk],
    ['Tamaño del lugar', answers?.placeSize],
    ['Cantidad de ambientes', answers?.rooms],
    ['Accesos a proteger', safeList(answers?.access)],
    ['Tipo de contacto', answers?.contactType],
    ['Nombre', answers?.name],
    ['Teléfono', answers?.phone],
    ['Email', answers?.email]
  ]
    .map(([label, value]) => `${label}: ${typeof value === 'string' || typeof value === 'number' ? safeText(value) : safeList(value)}`)
    .join('\n');

  return `Nuevo cotizador online\n\n${lines}\n`;
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

    if (!answers || typeof answers !== 'object') {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
    }

    // Honeypot: los bots completan el campo oculto; respondemos ok sin enviar.
    if (safeText(payload?.website)) {
      return Response.json({ ok: true });
    }

    const name = safeText(answers.name);
    const phone = safeText(answers.phone);
    const email = safeText(answers.email);

    if (!name || !phone || !email) {
      return Response.json(
        { error: 'Faltan datos de contacto (nombre, teléfono o email).' },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ error: 'Ingresá un email válido.' }, { status: 400 });
    }

    const to = requiredEnv('SALES_EMAIL_TO');
    const from = process.env.SALES_EMAIL_FROM || requiredEnv('SMTP_USER');

    await getTransporter().sendMail({
      from,
      to,
      subject: `Cotizador online - ${name}`,
      text: buildEmailText(answers),
      replyTo: email
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('[cotizador] Error al procesar la solicitud:', error);
    return Response.json(
      { error: 'No pudimos enviar tu consulta. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
