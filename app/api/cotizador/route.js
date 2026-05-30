import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta configurar ${name}.`);
  }
  return value;
}

function safeText(value) {
  return String(value ?? '')
    .replace(/\r/g, '')
    .trim();
}

function safeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => safeText(item)).filter(Boolean).join(', ');
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
    .map(([label, value]) => `${label}: ${safeText(value)}`)
    .join('\n');

  return `Nuevo cotizador online\n\n${lines}\n`;
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const answers = payload?.answers ?? {};

    const name = safeText(answers.name);
    const phone = safeText(answers.phone);
    const email = safeText(answers.email);

    if (!name || !phone || !email) {
      return Response.json(
        { error: 'Faltan datos de contacto (nombre, teléfono o email).' },
        { status: 400 }
      );
    }

    const host = requiredEnv('SMTP_HOST');
    const port = Number(requiredEnv('SMTP_PORT'));
    const user = requiredEnv('SMTP_USER');
    const pass = requiredEnv('SMTP_PASS');
    const to = requiredEnv('SALES_EMAIL_TO');
    const from = process.env.SALES_EMAIL_FROM || user;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from,
      to,
      subject: `Cotizador online - ${name}`,
      text: buildEmailText(answers),
      replyTo: email
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Error inesperado.' },
      { status: 500 }
    );
  }
}
