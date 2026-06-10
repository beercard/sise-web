'use client';

import { useMemo, useState } from 'react';

import styles from './Cotizador.module.scss';

const STEP = {
  PROPERTY_TYPE: 0,
  EXPERIENCE: 1,
  RISK: 2,
  PLACE_SIZE: 3,
  ROOMS: 4,
  ACCESS: 5,
  CONTACT_TYPE: 6,
  CONTACT_DETAILS: 7,
  THANK_YOU: 8
};

const initialAnswers = {
  propertyType: '',
  experience: '',
  risk: '',
  placeSize: '',
  rooms: '',
  access: [],
  contactType: '',
  name: '',
  phone: '',
  email: ''
};

function buildSummary(answers) {
  const accessValue = Array.isArray(answers.access) ? answers.access.join(', ') : answers.access;

  return [
    ['Tipo de propiedad', answers.propertyType],
    ['Experiencia previa', answers.experience],
    ['Nivel de riesgo', answers.risk],
    ['Tamaño del lugar', answers.placeSize],
    ['Cantidad de ambientes', answers.rooms],
    ['Accesos a proteger', accessValue],
    ['Tipo de contacto', answers.contactType],
    ['Nombre', answers.name],
    ['Teléfono', answers.phone],
    ['Email', answers.email]
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

export default function Cotizador({ showHeader = false }) {
  const [step, setStep] = useState(STEP.PROPERTY_TYPE);
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [stepError, setStepError] = useState('');

  const steps = useMemo(
    () => [
      {
        kicker: 'Tipo de propiedad',
        question: '¿Dónde querés instalar la alarma?',
        options: ['Casa', 'Comercio', 'Departamento', 'Oficina'],
        onSelect: (value) => {
          setAnswers((prev) => ({ ...prev, propertyType: value }));
          setStep(STEP.EXPERIENCE);
        }
      },
      {
        kicker: 'Experiencia previa',
        question: '¿Ya tenés o tuviste alarma?',
        options: ['Sí, actualmente tengo', 'Sí, tuve antes', 'No, sería la primera vez'],
        onSelect: (value) => {
          setAnswers((prev) => ({ ...prev, experience: value }));
          setStep(STEP.RISK);
        }
      },
      {
        kicker: 'Nivel de riesgo',
        question: '¿Tuviste algún intento de robo o intrusión?',
        options: ['Sí, recientemente', 'Sí, hace tiempo', 'No'],
        onSelect: (value) => {
          setAnswers((prev) => ({ ...prev, risk: value }));
          setStep(STEP.PLACE_SIZE);
        }
      },
      {
        kicker: 'Tamaño del lugar',
        question: '¿Qué tamaño tiene el espacio a proteger?',
        options: ['Hasta 60 m²', 'Entre 60 y 120 m²', 'Más de 120 m²'],
        onSelect: (value) => {
          setAnswers((prev) => ({ ...prev, placeSize: value }));
          setStep(STEP.ROOMS);
        }
      },
      {
        kicker: 'Cantidad de ambientes',
        question: '¿Cuántos ambientes tiene el lugar?',
        options: ['1 a 2', '3 a 4', '5 o más'],
        onSelect: (value) => {
          setAnswers((prev) => ({ ...prev, rooms: value }));
          setStep(STEP.ACCESS);
        }
      },
      {
        kicker: 'Accesos a proteger',
        question: '¿Qué accesos querés proteger?',
        options: ['Puerta principal', 'Puertas secundarias', 'Ventanas', 'Patio / fondo'],
        onSelect: (value) => {
          setStepError('');
          setAnswers((prev) => {
            const current = Array.isArray(prev.access) ? prev.access : [];
            const exists = current.includes(value);
            const next = exists ? current.filter((item) => item !== value) : [...current, value];
            return { ...prev, access: next };
          });
        },
        multi: true
      },
      {
        kicker: 'Tipo de contacto',
        question: '¿Cómo te gustaría que te contacten?',
        options: ['WhatsApp', 'Llamada', 'Mail'],
        onSelect: (value) => {
          setAnswers((prev) => ({ ...prev, contactType: value }));
          setStep(STEP.CONTACT_DETAILS);
        }
      }
    ],
    []
  );

  const activeStep = steps[step];
  const canGoBack = step > STEP.PROPERTY_TYPE && step < STEP.THANK_YOU;

  const goBack = () => {
    setStepError('');
    setSubmitError('');
    setStep((prev) => Math.max(STEP.PROPERTY_TYPE, prev - 1));
  };

  const goNextFromAccess = () => {
    const accessValue = Array.isArray(answers.access) ? answers.access : [];
    if (!accessValue.length) {
      setStepError('Seleccioná al menos una opción.');
      return;
    }

    setStepError('');
    setStep(STEP.CONTACT_TYPE);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    if (!answers.name.trim()) {
      setSubmitError('Ingresá tu nombre.');
      return;
    }

    if (!answers.phone.trim()) {
      setSubmitError('Ingresá tu teléfono.');
      return;
    }

    if (!answers.email.trim()) {
      setSubmitError('Ingresá tu email.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/cotizador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'No se pudo enviar el formulario.');
      }

      setStep(STEP.THANK_YOU);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar el formulario.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === STEP.THANK_YOU) {
    return (
      <div className={styles.container} id="cotizador-online">
        {showHeader ? (
          <div className={styles.header}>
            <h2 className={styles.title}>Cotizá tu alarma</h2>
            <p className={styles.subtitle}>COTIZADOR ONLINE – SOLO ALARMAS</p>
          </div>
        ) : null}

        <div className={styles.thanksBox}>
          <p className={styles.thanksTitle}>¡Muchas gracias!</p>
          <p className={styles.thanksText}>
            Un asesor de nuestro equipo de ventas te va a contactar a la brevedad para poder
            brindarte una atención más personalizada.
          </p>
        </div>
      </div>
    );
  }

  if (step === STEP.CONTACT_DETAILS) {
    const summary = buildSummary(answers);

    return (
      <div className={styles.container} id="cotizador-online">
        {showHeader ? (
          <div className={styles.header}>
            <h2 className={styles.title}>Cotizá tu alarma</h2>
            <p className={styles.subtitle}>COTIZADOR ONLINE – SOLO ALARMAS</p>
          </div>
        ) : null}

        <form className={styles.formBox} onSubmit={onSubmit} noValidate>
          <p className={styles.kicker}>Datos de contacto</p>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Nombre</span>
              <input
                className={styles.input}
                value={answers.name}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Su nombre completo"
                autoComplete="name"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Teléfono</span>
              <input
                className={styles.input}
                value={answers.phone}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, phone: event.target.value }))
                }
                placeholder="Su teléfono"
                autoComplete="tel"
                inputMode="tel"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <input
                className={styles.input}
                value={answers.email}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Su email"
                autoComplete="email"
                inputMode="email"
              />
            </label>
          </div>

          <div className={styles.summary}>
            <p className={styles.summaryTitle}>Resumen</p>
            <pre className={styles.summaryText}>{summary}</pre>
          </div>

          <div className={styles.actionsRow}>
            <button className={styles.backButton} type="button" onClick={goBack}>
              <span className={styles.backIcon} aria-hidden="true">
                ‹
              </span>
              Volver
            </button>

            <button className={styles.sendButton} type="submit" disabled={submitting}>
              Enviar
              <span className={styles.sendIcon} aria-hidden="true">
                ›
              </span>
            </button>
          </div>

          {submitError ? <p className={styles.error}>{submitError}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container} id="cotizador-online">
      {showHeader ? (
        <div className={styles.header}>
          <h2 className={styles.title}>Cotizá tu alarma</h2>
          <p className={styles.subtitle}>COTIZADOR ONLINE – SOLO ALARMAS</p>
        </div>
      ) : null}

      <div className={styles.stepBox}>
        <p className={styles.kicker}>{activeStep?.kicker}</p>
        <p className={styles.question}>{activeStep?.question}</p>

        <div className={styles.options} role="group" aria-label={activeStep?.kicker}>
          {activeStep?.options.map((option) => (
            <button
              key={option}
              className={
                activeStep?.multi && Array.isArray(answers.access) && answers.access.includes(option)
                  ? `${styles.option} ${styles.optionSelected}`
                  : styles.option
              }
              type="button"
              onClick={() => activeStep.onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {activeStep?.multi ? (
          <div className={styles.actionsRow}>
            {canGoBack ? (
              <button className={styles.backButton} type="button" onClick={goBack}>
                <span className={styles.backIcon} aria-hidden="true">
                  ‹
                </span>
                Volver
              </button>
            ) : (
              <span />
            )}

            <button className={styles.sendButton} type="button" onClick={goNextFromAccess}>
              Continuar
              <span className={styles.sendIcon} aria-hidden="true">
                ›
              </span>
            </button>
          </div>
        ) : (
          <div className={styles.footerRow}>
            {canGoBack ? (
              <button className={styles.backButton} type="button" onClick={goBack}>
                <span className={styles.backIcon} aria-hidden="true">
                  ‹
                </span>
                Volver
              </button>
            ) : (
              <span />
            )}
          </div>
        )}

        {stepError ? <p className={styles.error}>{stepError}</p> : null}
      </div>
    </div>
  );
}
