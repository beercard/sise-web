'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';

import SolutionInfoPopup from '../../../components/SolutionInfoPopup/SolutionInfoPopup';
import { SOLUTIONS_INFO } from '../../../lib/solutionsInfo';

import styles from './ComercioSolutionsModule.module.scss';

/*
 * Módulo de soluciones de /comercio según Figma 5001:275 (desktop 1920×1079)
 * y 5001:276 (mobile 402×1574): fondo azul oscuro #06234c con el patrón de
 * eses SISE al 4%, intro en dos columnas más una bajada a todo el ancho, y
 * cinco tarjetas grises (fila de 3 + fila de 2 centrada) con botón "+ info".
 */
const SOLUTIONS = [
  {
    key: 'alarmas',
    info: 'alarma-monitoreada',
    title: ['MONITOREO', 'DE ALARMAS'],
    body: 'Protección 24/7 con respuesta inmediata ante emergencias en tus instalaciones.'
  },
  {
    key: 'cctv',
    info: 'cctv-videovigilancia',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    body: 'Auditoría visual en tiempo real para el control total de la operatoria de tu negocio.'
  },
  {
    key: 'cortina',
    info: 'cortina-humo',
    title: ['CORTINA', 'DE HUMO'],
    body: 'Sistema de niebla activa que neutraliza robos e intrusiones en cuestión de segundos.'
  },
  {
    key: 'acceso',
    info: 'control-acceso',
    title: ['CONTROL DE', 'ACCESO Y FICHAJE'],
    body: 'Gestión inteligente y exacta de presentismo, horarios y accesos del personal.'
  },
  {
    key: 'cerco',
    info: 'cerco-electrico',
    title: ['CERCO ELÉCTRICO', 'CORPORATIVO'],
    body: 'Seguridad perimetral de máxima disuasión y 100% legal para resguardar tu empresa.'
  }
];

function TitleLines({ lines }) {
  return lines.map((line, index) => (
    <Fragment key={`line-${index}`}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}

export default function ComercioSolutionsModule() {
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <section className={styles.section} aria-label="Soluciones para comercios">
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={styles.lead}>
          <span className={styles.leadLight}>En los comercios, la seguridad impacta directamente en </span>
          <span className={styles.leadStrong}>el resultado del negocio.</span>
        </p>

        <p className={styles.body}>
          En SISE ofrecemos soluciones orientadas a <strong>prevenir pérdidas, reducir riesgos</strong> y{' '}
          <strong>garantizar la continuidad operativa</strong>.
        </p>

        <p className={styles.punch}>
          No se trata sólo de evitar robos,
          <br />
          sino de cuidar tu inversión todos los días.
        </p>

        <div className={styles.introMobile}>
          <p className={styles.mobilePunch}>Blindamos tu inversión.</p>
          <p className={styles.mobileBody}>
            Soluciones orientadas a prevenir pérdidas y garantizar la continuidad operativa de tu
            comercio.
            <br />
            <br />
            <strong>Seguridad que protege tu rentabilidad.</strong>
          </p>
        </div>
      </div>

      <h2 className={styles.heading}>Soluciones:</h2>

      <div className={`${styles.grid} ${activeInfo ? styles.gridPopupOpen : ''}`}>
        {SOLUTIONS.map((solution) => (
          <article key={solution.key} className={`${styles.card} ${styles[solution.key]}`}>
            <h3 className={styles.cardTitle}>
              <TitleLines lines={solution.title} />
            </h3>
            <p className={styles.cardBody}>{solution.body}</p>
            {solution.info ? (
              <>
                {/* En desktop abre el popup; en mobile (sin diseño todavia)
                    sigue llevando a /contacto. */}
                <button
                  type="button"
                  className={`${styles.cardButton} ${styles.cardButtonDesktop}`}
                  onClick={() => setActiveInfo(solution.info)}
                >
                  + info
                </button>
                <Link href="/contacto" className={`${styles.cardButton} ${styles.cardButtonMobile}`}>
                  + info
                </Link>
              </>
            ) : (
              <Link href="/contacto" className={styles.cardButton}>
                + info
              </Link>
            )}
          </article>
        ))}
        {activeInfo ? (
          <SolutionInfoPopup info={SOLUTIONS_INFO[activeInfo]} onClose={() => setActiveInfo(null)} />
        ) : null}
      </div>
    </section>
  );
}
