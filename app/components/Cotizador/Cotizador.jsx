'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

import {
  trackFormStart,
  trackFormSubmit,
  trackQuoteStep,
  useTrackSectionView
} from '../../lib/analytics';
import styles from './Cotizador.module.scss';

const STEP = {
  PROPERTY_TYPE: 0
};

const initialAnswers = {
  propertyType: '',
  step2: '',
  step3: '',
  step4: '',
  step5: '',
  step6: '',
  step7: '',
  contactType: '',
  name: '',
  phone: '',
  email: '',
  city: ''
};

const CONTACT_FIELD_CONFIG = {
  name: {
    label: 'Nombre',
    placeholder: 'Su nombre completo',
    autoComplete: 'name',
    maxLength: 200,
    validationMessage: 'Ingresá tu nombre.'
  },
  phone: {
    label: 'Teléfono',
    placeholder: 'Su teléfono',
    autoComplete: 'tel',
    inputMode: 'tel',
    maxLength: 50,
    validationMessage: 'Ingresá tu teléfono.'
  },
  email: {
    label: 'Email',
    placeholder: 'Su email',
    autoComplete: 'email',
    inputMode: 'email',
    maxLength: 200,
    validationMessage: 'Ingresá tu email.'
  },
  city: {
    label: 'Ciudad',
    placeholder: 'Su ciudad',
    autoComplete: 'address-level2',
    maxLength: 200,
    validationMessage: 'Ingresá tu ciudad.'
  }
};

const STANDARD_CONTACT_FIELDS = ['name', 'phone', 'email'];
const ENTERPRISE_CONTACT_FIELDS = ['name', 'phone', 'email', 'city'];

const STANDARD_FOLLOW_UP_STEPS = [
  {
    key: 'step2',
    kicker: 'Experiencia previa',
    question: '¿Ya tenés o tuviste alarma?',
    options: ['Sí, actualmente tengo', 'Sí, tuve antes', 'No, sería la primera vez'],
    optionLayout: 'tall'
  },
  {
    key: 'step3',
    kicker: 'Nivel de riesgo',
    question: '¿Tuviste algún intento de robo o intrusión?',
    options: ['Sí, recientemente', 'Sí, hace tiempo', 'No']
  },
  {
    key: 'step4',
    kicker: 'Tamaño del lugar',
    question: '¿Qué tamaño tiene el espacio a proteger?',
    options: ['Hasta 60 m²', 'Entre 60 y 120 m²', 'Más de 120 m²']
  },
  {
    key: 'step5',
    kicker: 'Cantidad de ambientes',
    question: '¿Cuántos ambientes tiene el lugar?',
    options: ['1 a 2', '3 a 4', '5 o más']
  },
  {
    key: 'step6',
    kicker: 'Accesos a proteger',
    question: '¿Qué accesos querés proteger?',
    options: ['Puerta principal', 'Puertas secundarias', 'Ventanas', 'Patio / fondo'],
    multi: true,
    optionLayout: 'access'
  },
  {
    key: 'contactType',
    kicker: 'Tipo de contacto',
    question: '¿Cómo te gustaría que te contacten?',
    options: ['WhatsApp', 'Llamada', 'Mail']
  }
];

function createStandardVariantConfig(firstStep) {
  return {
    steps: [{ key: 'propertyType', ...firstStep }, ...STANDARD_FOLLOW_UP_STEPS],
    summaryRows: [
      [firstStep.summaryLabel, 'propertyType'],
      ['Experiencia previa', 'step2'],
      ['Nivel de riesgo', 'step3'],
      ['Tamaño del lugar', 'step4'],
      ['Cantidad de ambientes', 'step5'],
      ['Accesos a proteger', 'step6'],
      ['Tipo de contacto', 'contactType'],
      ['Nombre', 'name'],
      ['Teléfono', 'phone'],
      ['Email', 'email']
    ],
    contactFields: STANDARD_CONTACT_FIELDS
  };
}

const VARIANT_CONFIG = {
  residential: createStandardVariantConfig({
    kicker: 'Tipo de propiedad',
    question: '¿Dónde querés instalar la alarma?',
    options: ['Casa', 'Comercio', 'Departamento', 'Oficina'],
    summaryLabel: 'Tipo de propiedad'
  }),
  enterprise: {
    steps: [
      {
        key: 'propertyType',
        kicker: 'Tipo de propiedad',
        question: '¿Qué tipo de empresa querés proteger?',
        options: ['Oficina', 'Local comercial', 'Depósito', 'Industria / Planta', 'Institución'],
        summaryLabel: 'Tipo de empresa',
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step2',
        kicker: 'Solución buscada',
        question: '¿Qué solución estás buscando?',
        options: [
          'Sistema de alarmas',
          'Cámaras de seguridad',
          'Control de accesos',
          'Monitoreo 24/7',
          'Cerco Eléctrico',
          'Una solución integral'
        ],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step3',
        kicker: 'Accesos del establecimiento',
        question: '¿Cuántos accesos tiene el establecimiento?',
        options: ['1', '2 a 4', 'Más de 4'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step4',
        kicker: 'Cantidad de personal',
        question: '¿Cuántas personas trabajan habitualmente?',
        options: ['Hasta 10', '11 a 30', 'Más de 30'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step5',
        kicker: 'Sistema de seguridad actual',
        question: '¿Contás actualmente con algún sistema de seguridad?',
        options: ['Sí', 'No', 'Quiero reemplazar el que tengo'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step6',
        kicker: 'Momento de implementación',
        question: '¿Cuándo necesitás implementar la solución?',
        options: ['Lo antes posible', 'Dentro de 30 días', 'Solo estoy evaluando opciones'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'contactType',
        kicker: 'Tipo de contacto',
        question: '¿Cómo te gustaría que te contacten?',
        options: ['Whats App', 'Llamadas'],
        optionLayout: 'enterprise'
      }
    ],
    summaryRows: [
      ['Tipo de empresa', 'propertyType'],
      ['Solución buscada', 'step2'],
      ['Accesos del establecimiento', 'step3'],
      ['Cantidad de personas', 'step4'],
      ['Sistema de seguridad actual', 'step5'],
      ['Momento de implementación', 'step6'],
      ['Tipo de contacto', 'contactType'],
      ['Nombre', 'name'],
      ['Teléfono', 'phone'],
      ['Email', 'email'],
      ['Ciudad', 'city']
    ],
    contactFields: ENTERPRISE_CONTACT_FIELDS
  },
  spaces: {
    steps: [
      {
        key: 'propertyType',
        kicker: 'Tipo de propiedad',
        question: '¿Qué espacio querés proteger?',
        options: ['Consorcio/Edificio', 'Barrio privado', 'Empresa logística', 'Obras en Construcción'],
        summaryLabel: 'Espacio a proteger',
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step2',
        kicker: 'Objetivo principal',
        question: '¿Cuál es el principal objetivo?',
        options: [
          'Controlar ingresos y egresos',
          'Mejorar la videovigilancia',
          'Responder ante emergencias',
          'Prevenir hechos de inseguridad'
        ],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step3',
        kicker: 'Accesos del lugar',
        question: '¿Cuántos accesos tiene el lugar?',
        options: ['1', '2 a 5', 'Más de 5'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step4',
        kicker: 'Vigilancia actual',
        question: '¿Actualmente cuentan con vigilancia?',
        options: ['Seguridad privada', 'Portería', 'Cámaras', 'No'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step5',
        kicker: 'Solución de interés',
        question: '¿Qué solución te interesa?',
        options: [
          'Guardia Virtual',
          'Cámaras Inteligentes',
          'Gps Rastreo Satelital',
          'Alarma Monitoreada',
          'Cerco Eléctrico'
        ],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'contactType',
        kicker: 'Tipo de contacto',
        question: '¿Cómo te gustaría que te contacten?',
        options: ['Whats App', 'Llamadas'],
        optionLayout: 'enterprise'
      }
    ],
    summaryRows: [
      ['Espacio a proteger', 'propertyType'],
      ['Objetivo principal', 'step2'],
      ['Accesos del lugar', 'step3'],
      ['Vigilancia actual', 'step4'],
      ['Solución de interés', 'step5'],
      ['Tipo de contacto', 'contactType'],
      ['Nombre', 'name'],
      ['Teléfono', 'phone'],
      ['Email', 'email'],
      ['Ciudad', 'city']
    ],
    contactFields: ENTERPRISE_CONTACT_FIELDS
  },
  agro: {
    steps: [
      {
        key: 'propertyType',
        kicker: 'Tipo de propiedad',
        question: '¿Qué querés proteger?',
        options: ['Campo', 'Galpón', 'Maquinaria', 'Ganado', 'Otro'],
        summaryLabel: 'Qué querés proteger',
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step2',
        kicker: 'Superficie a monitorear',
        question: '¿Qué superficie necesitás monitorear?',
        options: ['Hasta 100 hectáreas', '100 a 500 hectáreas', 'Más de 500 hectáreas'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step3',
        kicker: 'Energía eléctrica',
        question: '¿Hay energía eléctrica en el lugar?',
        options: ['Sí', 'No', 'Solo en algunos sectores'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step4',
        kicker: 'Conexión a internet',
        question: '¿Hay conexión a internet?',
        options: ['Sí', 'No', 'Muy limitada'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step5',
        kicker: 'Principal preocupación',
        question: '¿Cuál es tu principal preocupación?',
        options: [
          'Robo',
          'Intrusión',
          'Control de accesos',
          'Monitoreo remoto',
          'Prevención de incendios'
        ],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step6',
        kicker: 'Sistema de seguridad actual',
        question: '¿Actualmente utilizás algún sistema de seguridad?',
        options: ['Sí', 'No'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'step7',
        kicker: 'Solución de interés',
        question: '¿Qué solución te interesa?',
        options: ['Cámaras autónomas', 'Alarmas Monitoreada', 'Todo integrado', 'Necesito asesoramiento'],
        optionLayout: 'enterprise',
        multilineQuestion: true
      },
      {
        key: 'contactType',
        kicker: 'Tipo de contacto',
        question: '¿Cómo te gustaría que te contacten?',
        options: ['Whats App', 'Llamadas'],
        optionLayout: 'enterprise'
      }
    ],
    summaryRows: [
      ['Qué querés proteger', 'propertyType'],
      ['Superficie a monitorear', 'step2'],
      ['Energía eléctrica', 'step3'],
      ['Conexión a internet', 'step4'],
      ['Principal preocupación', 'step5'],
      ['Sistema de seguridad actual', 'step6'],
      ['Solución de interés', 'step7'],
      ['Tipo de contacto', 'contactType'],
      ['Nombre', 'name'],
      ['Teléfono', 'phone'],
      ['Email', 'email'],
      ['Ciudad', 'city']
    ],
    contactFields: ENTERPRISE_CONTACT_FIELDS
  }
};

function buildSummary(answers, summaryRows) {
  return summaryRows
    .map(([label, key]) => {
      const value = answers[key];
      const normalizedValue = Array.isArray(value) ? value.join(', ') : value;
      return [label, normalizedValue];
    })
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

export default function Cotizador({ showHeader = false, variant = 'residential' }) {
  const [step, setStep] = useState(STEP.PROPERTY_TYPE);
  const [answers, setAnswers] = useState(initialAnswers);
  const [website, setWebsite] = useState('');
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [stepError, setStepError] = useState('');
  const sectionRef = useTrackSectionView(`cotizador_${variant}`);
  const hasTrackedFormStart = useRef(false);
  const flowConfig = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.residential;

  const steps = useMemo(
    () =>
      flowConfig.steps.map((stepConfig, index) => ({
        ...stepConfig,
        onSelect: (value) => {
          setStepError('');

          if (stepConfig.multi) {
            setAnswers((prev) => {
              const current = Array.isArray(prev[stepConfig.key]) ? prev[stepConfig.key] : [];
              const exists = current.includes(value);
              const next = exists ? current.filter((item) => item !== value) : [...current, value];
              return { ...prev, [stepConfig.key]: next };
            });
            return;
          }

          setAnswers((prev) => ({ ...prev, [stepConfig.key]: value }));
          /* Un evento por paso completado: es lo único que después permite
             ver en qué pregunta se cae la gente. */
          trackQuoteStep({ stepIndex: index + 1, stepKey: stepConfig.key, variant });
          setStep(index + 1);
        }
      })),
    [flowConfig, variant]
  );

  const contactDetailsStep = steps.length;
  const thankYouStep = steps.length + 1;
  const activeStep = steps[step];
  const isPropertyTypeStep = step === STEP.PROPERTY_TYPE;
  const isTallOptionsStep = activeStep?.optionLayout === 'tall';
  const isEnterpriseOptionsStep = activeStep?.optionLayout === 'enterprise';
  const isAccessStep = activeStep?.optionLayout === 'access';
  const isContactDetailsStep = step === contactDetailsStep;
  const canGoBack = step > STEP.PROPERTY_TYPE && step < thankYouStep;
  const containerClassName = isContactDetailsStep
    ? `${styles.container} ${styles.containerFormStep}`
    : `${styles.container} ${styles.containerFixedStep}`;
  const headerMarkup = (
    <div className={styles.header}>
      <h2 className={styles.title}>
        <span className={styles.desktopCopy}>Cotizá tu sistema de seguridad</span>
        <span className={styles.mobileCopy}>Cotizá tu sistema de seguridad</span>
      </h2>
      {showHeader ? (
        <p className={styles.subtitle}>
          <span className={styles.desktopCopy}>COTIZADOR ONLINE</span>
          <span className={styles.mobileCopy}>COTIZADOR ONLINE</span>
        </p>
      ) : null}
    </div>
  );

  const goBack = () => {
    setStepError('');
    setSubmitError('');
    setStep((prev) => Math.max(STEP.PROPERTY_TYPE, prev - 1));
  };

  const goNextFromMultiStep = () => {
    const currentValue = activeStep ? answers[activeStep.key] : [];
    const selectedValues = Array.isArray(currentValue) ? currentValue : [];

    if (!selectedValues.length) {
      setStepError('Seleccioná al menos una opción.');
      return;
    }

    setStepError('');
    setStep(step + 1);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    for (const fieldKey of flowConfig.contactFields) {
      const value = String(answers[fieldKey] ?? '').trim();
      if (!value) {
        setSubmitError(CONTACT_FIELD_CONFIG[fieldKey].validationMessage);
        trackFormSubmit({ formName: 'cotizador', variant, status: 'validation_error' });
        return;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(answers.email.trim())) {
      setSubmitError('Ingresá un email válido.');
      trackFormSubmit({ formName: 'cotizador', variant, status: 'validation_error' });
      return;
    }

    setSubmitting(true);

    try {
      const summary = buildSummary(answers, flowConfig.summaryRows);
      const response = await fetch('/api/cotizador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, website, summary, variant, formStartedAt })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'No se pudo enviar el formulario.');
      }

      trackFormSubmit({ formName: 'cotizador', variant, status: 'success' });
      setStep(thankYouStep);
    } catch (error) {
      trackFormSubmit({ formName: 'cotizador', variant, status: 'error' });
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar el formulario.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormFocus = () => {
    if (hasTrackedFormStart.current) return;
    hasTrackedFormStart.current = true;
    setFormStartedAt(Date.now());
    trackFormStart({ formName: 'cotizador', variant });
  };

  if (step === thankYouStep) {
    return (
      <div
        ref={sectionRef}
        className={`${styles.container} ${styles.containerFixedStep}`}
        id="cotizador-online"
      >
        {headerMarkup}

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

  if (step === contactDetailsStep) {
    const summary = buildSummary(answers, flowConfig.summaryRows);

    return (
      <div ref={sectionRef} className={containerClassName} id="cotizador-online">
        {headerMarkup}

        <form className={styles.formBox} onSubmit={onSubmit} onFocusCapture={handleFormFocus} noValidate>
          <p className={styles.kicker}>Datos de contacto</p>

          {/* Honeypot anti-spam: oculto para personas, los bots lo completan. */}
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

          <div className={styles.fields}>
            {flowConfig.contactFields.map((fieldKey) => {
              const fieldConfig = CONTACT_FIELD_CONFIG[fieldKey];

              return (
                <label key={fieldKey} className={styles.field}>
                  <span className={styles.fieldLabel}>{fieldConfig.label}</span>
                  <input
                    className={styles.input}
                    value={answers[fieldKey]}
                    onChange={(event) =>
                      setAnswers((prev) => ({ ...prev, [fieldKey]: event.target.value }))
                    }
                    placeholder={fieldConfig.placeholder}
                    autoComplete={fieldConfig.autoComplete}
                    inputMode={fieldConfig.inputMode}
                    maxLength={fieldConfig.maxLength}
                  />
                </label>
              );
            })}
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

          <p
            className={
              submitError ? `${styles.error} ${styles.errorVisible}` : `${styles.error} ${styles.errorHidden}`
            }
            aria-live="polite"
          >
            {submitError || '\u00A0'}
          </p>
          {/* Ley 25.326: hay que informar quien trata los datos y para que en
              el momento mismo de pedirlos. */}
          <p className={styles.privacyNote}>
            Tus datos los trata GRUPO SISE S.A. para responder esta consulta. Podés conocer tus
            derechos en la{' '}
            <Link className={styles.privacyNoteLink} href="/privacidad">
              Política de Privacidad
            </Link>
            .
          </p>
        </form>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={containerClassName} id="cotizador-online">
      {headerMarkup}

      <div
        className={
          isPropertyTypeStep ? `${styles.stepBox} ${styles.stepBoxPropertyType}` : styles.stepBox
        }
      >
        <p className={styles.kicker}>{activeStep?.kicker}</p>
        <p
          className={
            activeStep?.multilineQuestion
              ? `${styles.question} ${styles.questionMultiline}`
              : styles.question
          }
        >
          {activeStep?.question}
        </p>

        <div
          className={
            [
              styles.options,
              isPropertyTypeStep ? styles.optionsPropertyType : '',
              isTallOptionsStep ? styles.optionsExperience : '',
              isEnterpriseOptionsStep ? styles.optionsEnterprise : '',
              isAccessStep ? styles.optionsAccess : ''
            ]
              .filter(Boolean)
              .join(' ')
          }
          role="group"
          aria-label={activeStep?.kicker}
        >
          {activeStep?.options.map((option) => (
            <button
              key={option}
              className={
                [
                  styles.option,
                  activeStep?.multi &&
                  Array.isArray(answers[activeStep.key]) &&
                  answers[activeStep.key].includes(option)
                    ? styles.optionSelected
                    : '',
                  isTallOptionsStep ? styles.optionExperience : '',
                  isEnterpriseOptionsStep ? styles.optionEnterprise : '',
                  isAccessStep ? styles.optionAccess : '',
                  isAccessStep && option === 'Puertas secundarias' ? styles.optionNoWrap : ''
                ]
                  .filter(Boolean)
                  .join(' ')
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

            <button className={styles.sendButton} type="button" onClick={goNextFromMultiStep}>
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

        <p
          className={
            stepError ? `${styles.error} ${styles.errorVisible}` : `${styles.error} ${styles.errorHidden}`
          }
          aria-live="polite"
        >
          {stepError || '\u00A0'}
        </p>
      </div>
    </div>
  );
}
