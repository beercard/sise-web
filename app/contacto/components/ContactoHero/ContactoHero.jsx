'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const PHONE_NUMBER_DISPLAY = '0-800-222-5153';
const PHONE_NUMBER_LINK = '08002225153';
const WHATSAPP_NUMBER = '5493624231144';
const SOLUTION_OPTIONS = [
  'SISE Hogar',
  'SISE Empresas',
  'SISE Urbano',
  'SISE Agro',
  'SISE Ciudad'
];

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  solution: '',
  details: ''
};

const FIELD_CONFIG = {
  name: {
    label: 'Nombre y Apellido',
    validationMessage: 'Ingresá tu nombre y apellido.',
    autoComplete: 'name',
    maxLength: 120
  },
  phone: {
    label: 'Teléfono / WhatsApp',
    validationMessage: 'Ingresá tu teléfono o WhatsApp.',
    autoComplete: 'tel',
    inputMode: 'tel',
    maxLength: 40
  },
  email: {
    label: 'Correo electrónico',
    validationMessage: 'Ingresá tu correo electrónico.',
    autoComplete: 'email',
    inputMode: 'email',
    maxLength: 120
  },
  solution: {
    label: '¿Qué solución estás buscando?',
    validationMessage: 'Contanos qué solución estás buscando.',
    maxLength: 160
  },
  details: {
    label: 'Detalles de tu consulta (Opcional)',
    maxLength: 800
  }
};

export default function ContactoHero() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    for (const fieldKey of ['name', 'phone', 'email', 'solution']) {
      const value = String(form[fieldKey] ?? '').trim();
      if (!value) {
        setSubmitError(FIELD_CONFIG[fieldKey].validationMessage);
        return;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setSubmitError('Ingresá un email válido.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'No se pudo enviar el formulario.');
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setWebsite('');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar el formulario.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.hero} aria-label="Contacto SISE Argentina">
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src="/image/hero-contacto-desktop.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`${styles.heroImage} ${styles.heroImageDesktop}`}
        />
        <Image
          src="/image/hero-contacto-mobile.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`${styles.heroImage} ${styles.heroImageMobile}`}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroIntro}>
          <h1 className={styles.heroTitle}>Contactate con nosotros</h1>

          <p className={styles.heroLine}>
            <span>Atención las 24hs llamando al </span>
            <a className={styles.heroLink} href={`tel:${PHONE_NUMBER_LINK}`}>
              {PHONE_NUMBER_DISPLAY}
            </a>
          </p>

          <p className={styles.heroLine}>
            <span>Envianos tu consulta por </span>
            <a
              className={styles.heroLink}
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </p>

          <h2 className={styles.formTitle}>¿Preferís que te llamemos?</h2>
          <p className={styles.formIntro}>
            Dejanos tus datos y un asesor de SISE se pondrá en contacto con vos a la brevedad para
            asesorarte.
          </p>
        </div>

        {submitted ? (
          <div className={styles.thanksBox}>
            <p className={styles.thanksTitle}>¡Muchas gracias!</p>
            <p className={styles.thanksText}>
              Recibimos tu consulta. Un asesor de SISE se va a comunicar con vos a la brevedad.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div style={{ display: 'none' }} aria-hidden="true">
              <label>
                No completar este campo
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className={styles.formGrid}>
              <label className={`${styles.field} ${styles.fieldName}`}>
                <span className={styles.srOnly}>{FIELD_CONFIG.name.label}</span>
                <input
                  className={styles.input}
                  type="text"
                  value={form.name}
                  onChange={onChange('name')}
                  placeholder={FIELD_CONFIG.name.label}
                  autoComplete={FIELD_CONFIG.name.autoComplete}
                  maxLength={FIELD_CONFIG.name.maxLength}
                />
              </label>

              <label className={`${styles.field} ${styles.fieldPhone}`}>
                <span className={styles.srOnly}>{FIELD_CONFIG.phone.label}</span>
                <input
                  className={styles.input}
                  type="text"
                  value={form.phone}
                  onChange={onChange('phone')}
                  placeholder={FIELD_CONFIG.phone.label}
                  autoComplete={FIELD_CONFIG.phone.autoComplete}
                  inputMode={FIELD_CONFIG.phone.inputMode}
                  maxLength={FIELD_CONFIG.phone.maxLength}
                />
              </label>

              <label className={`${styles.field} ${styles.fieldEmail}`}>
                <span className={styles.srOnly}>{FIELD_CONFIG.email.label}</span>
                <input
                  className={styles.input}
                  type="email"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder={FIELD_CONFIG.email.label}
                  autoComplete={FIELD_CONFIG.email.autoComplete}
                  inputMode={FIELD_CONFIG.email.inputMode}
                  maxLength={FIELD_CONFIG.email.maxLength}
                />
              </label>

              <label className={`${styles.field} ${styles.fieldSolution}`}>
                <span className={styles.srOnly}>{FIELD_CONFIG.solution.label}</span>
                <select
                  className={`${styles.input} ${styles.select}`}
                  value={form.solution}
                  onChange={onChange('solution')}
                >
                  <option value="">{FIELD_CONFIG.solution.label}</option>
                  {SOLUTION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${styles.field} ${styles.fieldDetails}`}>
                <span className={styles.srOnly}>{FIELD_CONFIG.details.label}</span>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={form.details}
                  onChange={onChange('details')}
                  placeholder={FIELD_CONFIG.details.label}
                  maxLength={FIELD_CONFIG.details.maxLength}
                />
              </label>
            </div>

            {submitError ? <p className={styles.formError}>{submitError}</p> : null}

            <button className={styles.submitButton} type="submit" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Solicitar asesoramiento'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
