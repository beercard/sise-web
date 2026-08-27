'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';

import SolutionInfoPopup from '../../../components/SolutionInfoPopup/SolutionInfoPopup';
import { trackSolutionInfo } from '../../../lib/analytics';
import { SOLUTIONS_INFO } from '../../../lib/solutionsInfo';

import styles from './EdificiosSolutionsModule.module.scss';

/*
 * Módulo de soluciones de /edificios según Figma 5001:343 (desktop 1920×966)
 * y 5001:345 (mobile 402×2201): fondo púrpura urbano #250f7f con el patrón de
 * eses SISE al 4%, una bajada única y ocho tarjetas grises (dos filas de 4)
 * con botón "+ info". En mobile las tarjetas se apilan en el mismo orden.
 */
const SOLUTIONS = [
  {
    key: 'guardia',
    info: 'guardia-virtual',
    title: ['GUARDIA', 'VIRTUAL'],
    body: 'Supervisión remota 24/7 que maximiza la seguridad del consorcio y reduce drásticamente las expensas.',
    /* Mobile (Figma 3513:1638): sin "drásticamente". */
    mobileBody: 'Supervisión remota 24/7 que maximiza la seguridad del consorcio y reduce las expensas.'
  },
  {
    key: 'videoportero',
    info: 'videoportero',
    title: ['VIDEOPORTERO'],
    body: 'Gestión ágil de visitas y apertura de puertas del edificio directamente desde diversos métodos.'
  },
  {
    key: 'vehicular',
    info: 'acceso-vehicular',
    title: ['ACCESO VEHICULAR', 'AUTÓNOMO'],
    body: 'Ingreso fluido a cocheras mediante lectura de patentes (LPR), sin controles remotos.'
  },
  {
    key: 'terminal',
    info: 'terminal-unidad',
    title: ['TERMINAL DE', 'UNIDAD'],
    body: 'Pantalla de control central para gestionar los accesos del edificio desde adentro del departamento.'
  },
  {
    key: 'cctv',
    info: 'cctv-videovigilancia',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    body: 'Monitoreo de cámaras con enfoque preventivo y control remoto.'
  },
  {
    key: 'ascensor',
    info: 'ascensor-sincronizado',
    title: ['ASCENSOR', 'SINCRONIZADO'],
    body: 'El ecosistema detecta el ingreso principal y llama automáticamente al ascensor.'
  },
  {
    key: 'amenities',
    info: 'gestion-amenities',
    title: ['GESTIÓN DE', 'AMENITIES'],
    body: 'Reserva de espacios comunes 100% digital y autogestionada por el residente.'
  },
  {
    key: 'cerraduras',
    info: 'cerraduras-electronicas',
    title: ['CERRADURAS', 'ELECTRÓNICAS'],
    body: 'Cerraduras de alta tecnología para departamentos completamente libres de llaves físicas.'
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

export default function EdificiosSolutionsModule() {
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <section className={styles.section} aria-label="Soluciones para consorcios">
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={styles.lead}>
          Implementamos soluciones tecnológicas que{' '}
          <strong>mejoran la seguridad en espacios compartidos</strong>, optimizando costos y brindando
          mayor control a los residentes.
        </p>
      </div>

      <h2 className={styles.heading}>Soluciones:</h2>

      <div className={`${styles.grid} ${activeInfo ? styles.gridPopupOpen : ''}`}>
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
            {solution.info ? (
              <>
                {/* En desktop abre el popup; en mobile (sin diseño todavia)
                    sigue llevando a /contacto. */}
                <button
                  type="button"
                  className={`${styles.cardButton} ${styles.cardButtonDesktop}`}
                  onClick={() => {
                    setActiveInfo(solution.info);
                    trackSolutionInfo({
                      solution: SOLUTIONS_INFO[solution.info]?.title ?? solution.info,
                      vertical: 'edificios'
                    });
                  }}
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
