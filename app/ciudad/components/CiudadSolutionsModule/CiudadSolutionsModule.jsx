import Link from 'next/link';
import { Fragment } from 'react';

import styles from './CiudadSolutionsModule.module.scss';

/*
 * Módulo de soluciones de /ciudad según Figma 5001:257 (desktop 1920×966) y
 * 5001:258 (mobile 402×2467): fondo azul acero #597a9c con el patrón de eses
 * SISE, una bajada única y nueve tarjetas grises en dos filas (5 + 4) con
 * botón "+ info". En mobile las tarjetas se apilan; dos usan textos propios
 * más cortos.
 */
const SOLUTIONS = [
  {
    key: 'puntos',
    title: ['PUNTOS SEGUROS'],
    body: 'Espacios equipados y monitoreados para que los ciudadanos soliciten asistencia inmediata ante emergencias.'
  },
  {
    key: 'paradas',
    title: ['PARADAS SEGURAS'],
    body: 'Infraestructura tecnológica de seguridad diseñada para mejorar la protección de los usuarios en el transporte público.'
  },
  {
    key: 'videovigilancia',
    title: ['VIDEOVIGILANCIA', 'Y ANALÍTICA'],
    body: 'Red de cámaras HD con inteligencia artificial (reconocimiento facial y patentes) para respuesta urbana inmediata.'
  },
  {
    key: 'semaforizacion',
    title: ['SEMAFORIZACIÓN', 'ADAPTATIVA'],
    body: 'Semáforos adaptativos que mejoran la fluidez general del tránsito y otorgan prioridad absoluta a las emergencias.',
    mobileBody:
      'Semáforos que mejoran la fluidez general del tránsito y otorgan prioridad absoluta a las emergencias'
  },
  {
    key: 'parking',
    title: ['SMART PARKING', '(LPR)'],
    body: 'Ordenamiento del estacionamiento céntrico mediante cámaras de lectura de patentes para un control exacto y monetización.',
    mobileBody:
      'Orden del estacionamiento céntrico mediante cámaras de lectura de patentes para un control exacto y monetización.'
  },
  {
    key: 'flotas',
    title: ['FLOTAS Y CÁMARAS', 'MÓVILES'],
    body: 'Trazabilidad satelital de vehículos oficiales y cámaras corporales para auditar el accionar del personal en tiempo real.'
  },
  {
    key: 'accesos',
    title: ['CONTROL', 'DE ACCESOS'],
    body: 'Sistemas tecnológicos para la gestión estricta de ingresos, seguridad y personal en dependencias oficiales.'
  },
  {
    key: 'totems',
    title: ['TÓTEMS Y', 'COMUNICACIÓN'],
    body: 'Pantallas interactivas y LED para brindar asistencia turística, emitir alertas ciudadanas y monetizar publicidad.'
  },
  {
    key: 'mobiliario',
    title: ['MOBILIARIO', 'SUSTENTABLE'],
    body: 'Modernización de los espacios públicos integrando tecnología eco-amigable e iluminación inteligente.'
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

export default function CiudadSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para ciudades">
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={styles.lead}>
          Desarrollamos infraestructura para la <strong>prevención del delito</strong> y{' '}
          <strong>el control del espacio público</strong>, trabajando junto a gobiernos y
          organismos.
        </p>
      </div>

      <h2 className={styles.heading}>Soluciones:</h2>

      <div className={styles.grid}>
        {SOLUTIONS.map((solution) => (
          <article key={solution.key} className={`${styles.card} ${styles[solution.key]}`}>
            <h3 className={styles.cardTitle}>
              <TitleLines lines={solution.title} />
            </h3>
            <p className={styles.cardBody}>
              {solution.mobileBody ? (
                <>
                  <span className={styles.desktopBody}>{solution.body}</span>
                  <span className={styles.mobileBody}>{solution.mobileBody}</span>
                </>
              ) : (
                solution.body
              )}
            </p>
            <Link href="/contacto" className={styles.cardButton}>
              + info
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
