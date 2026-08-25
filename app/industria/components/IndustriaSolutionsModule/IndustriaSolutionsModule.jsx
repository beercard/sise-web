import Link from 'next/link';
import { Fragment } from 'react';

import styles from './IndustriaSolutionsModule.module.scss';

/*
 * Módulo de soluciones de /industria según Figma 5001:330 (desktop 1920×966)
 * y 5001:331 (mobile 402×1969): fondo azul oscuro #06234c con el patrón de
 * eses SISE al 4%, una bajada única de dos renglones y siete tarjetas grises
 * (fila de 3 + fila de 4 centrada) con botón "+ info". En mobile las
 * tarjetas se apilan y "cerco corporativo" pasa delante de "rastreo".
 */
const SOLUTIONS = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    body: 'Protección 24/7 con respuesta inmediata ante emergencias en tus instalaciones.',
    mobileOrder: 1
  },
  {
    key: 'cctv',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    body: 'Auditoría visual en tiempo real para el control total de la operatoria de tu negocio.',
    mobileOrder: 2
  },
  {
    key: 'cortina',
    title: ['CORTINA', 'DE HUMO'],
    body: 'Sistema de niebla activa que neutraliza robos e intrusiones en cuestión de segundos.',
    mobileOrder: 3,
    breakAfter: true
  },
  {
    key: 'acceso',
    title: ['CONTROL DE', 'ACCESO Y FICHAJE'],
    body: 'Gestión inteligente y exacta de presentismo, horarios y accesos del personal.',
    mobileOrder: 4
  },
  {
    key: 'rastreo',
    title: ['RASTREO SATELITAL', 'Y DASHCAMS'],
    body: 'Control total de tu flota comercial con rastreo GPS y cámaras vehiculares en tiempo real.',
    mobileOrder: 6
  },
  {
    key: 'cerco',
    title: ['CERCO ELÉCTRICO', 'CORPORATIVO'],
    body: 'Seguridad perimetral de máxima disuasión y 100% legal para resguardar tu empresa.',
    mobileOrder: 5
  },
  {
    key: 'vehicular',
    title: ['ACCESO VEHICULAR', 'AUTÓNOMO'],
    body: 'Lectura de patentes para automatizar y auditar el flujo de camiones, flotas y visitas en tiempo real.',
    mobileOrder: 7
  }
];

function TitleLines({ lines }) {
  return lines.flatMap((line, index) => (index === 0 ? [line] : [<br key={`br-${index}`} />, line]));
}

export default function IndustriaSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para industrias">
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={styles.lead}>
          Diseñamos soluciones robustas y personalizadas para proteger activos, procesos y logística,{' '}
          <strong>garantizando la continuidad del negocio</strong>.
        </p>

        <p className={styles.mobileLead}>
          Diseñamos soluciones robustas y personalizadas para proteger activos, procesos y logística,{' '}
          <strong>garantizando la continuidad del negocio</strong>.
        </p>
      </div>

      <h2 className={styles.heading}>Soluciones:</h2>

      <div className={styles.grid}>
        {SOLUTIONS.map((solution) => (
          <Fragment key={solution.key}>
            <article
              className={`${styles.card} ${styles[solution.key]}`}
              style={{ '--mobile-order': solution.mobileOrder }}
            >
              <h3 className={styles.cardTitle}>
                <TitleLines lines={solution.title} />
              </h3>
              <p className={styles.cardBody}>{solution.body}</p>
              <Link href="/contacto" className={styles.cardButton}>
                + info
              </Link>
            </article>
            {solution.breakAfter ? (
              /* Fuerza el corte 3 + 4 del diseño: sin esto flex-wrap metería
                 cuatro tarjetas en la primera fila. */
              <span className={styles.gridBreak} aria-hidden="true" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
