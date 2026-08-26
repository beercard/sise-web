'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';

import SolutionInfoPopup from '../../../components/SolutionInfoPopup/SolutionInfoPopup';
import { SOLUTIONS_INFO } from '../../../lib/solutionsInfo';

import styles from './AgroSolutionsModule.module.scss';

/*
 * Módulo de soluciones de /agro según Figma 5011:253 (desktop 1920×709) y
 * 5011:254 (mobile 402×1248): fondo verde agro #065558 con el patrón de eses
 * SISE al 4%, una bajada única centrada y cuatro tarjetas grises en una sola
 * fila con botón "+ info". En mobile las tarjetas se apilan con textos
 * propios.
 */
const SOLUTIONS = [
  {
    key: 'cctv',
    info: 'cctv-videovigilancia',
    title: ['CCTV RURAL'],
    body: 'Control remoto en tiempo real para supervisar tranqueras, galpones y lotes.'
  },
  {
    key: 'camara',
    info: 'camara-campo',
    title: ['CÁMARA CAMPO'],
    body: 'Vigilancia 100% autónoma (energía solar y 4G/ Starlink) para zonas sin infraestructura eléctrica ni internet.'
  },
  {
    key: 'alarmas',
    info: 'alarma-monitoreada',
    title: ['ALARMAS', 'RURALES'],
    body: 'Protección y alerta inmediata contra intrusiones en galpones e instalaciones aisladas.'
  },
  {
    key: 'gps',
    info: 'gps-dashcams',
    title: ['GPS Y DASHCAMS', 'RURALES'],
    body: 'Seguimiento y control total de vehículos y maquinaria, con registro continuo incluso en zonas sin cobertura.'
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

export default function AgroSolutionsModule() {
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <section className={styles.section} aria-label="Soluciones para el campo">
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={styles.lead}>
          Desarrollamos soluciones pensadas para entornos rurales, donde el desafío es{' '}
          <strong>detectar a tiempo</strong> y <strong>actuar ante eventos</strong> que afectan al
          patrimonio.
        </p>
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
