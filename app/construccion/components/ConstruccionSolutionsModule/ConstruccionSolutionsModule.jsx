'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';

import SolutionInfoPopup from '../../../components/SolutionInfoPopup/SolutionInfoPopup';
import { SOLUTIONS_INFO } from '../../../lib/solutionsInfo';

import styles from './ConstruccionSolutionsModule.module.scss';

/*
 * Módulo de soluciones de /construccion según Figma 5011:242 (desktop
 * 1920×697) y 5011:243 (mobile 402×1725): fondo púrpura urbano #250f7f con el
 * patrón de eses SISE al 4%, una bajada única y cinco tarjetas grises en una
 * sola fila con botón "+ info". En mobile las tarjetas se apilan con textos
 * propios más cortos.
 */
const SOLUTIONS = [
  {
    key: 'alarmas',
    info: 'alarma-monitoreada',
    title: ['ALARMAS Y', 'MONITOREO'],
    body: 'Protección fuera del horario laboral con supervisión permanente.',
    mobileBody: 'Protección activa de materiales y obrador fuera del horario de trabajo.'
  },
  {
    key: 'cerco',
    info: 'cerco-electrico',
    title: ['CERCO', 'ELÉCTRICO'],
    body: 'Cierre perimetral temporal para delimitar y proteger el predio.',
    mobileBody: 'Cierre perimetral de alta tensión para blindar el predio desde el día uno.'
  },
  {
    key: 'cctv',
    info: 'cctv-videovigilancia',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    body: 'Monitoreo de cámaras con enfoque preventivo y control remoto.',
    mobileBody: 'Control preventivo del terreno y supervisión remota de la ejecución.'
  },
  {
    key: 'acceso',
    info: 'control-acceso',
    title: ['CONTROL', 'DE ACCESO'],
    body: 'Registro y control de ingreso de personal y proveedores.',
    mobileBody: 'Registro estricto de contratistas, obreros y proveedores.'
  },
  {
    key: 'timelapse',
    title: ['TIMELAPSE', 'DE OBRA'],
    body: 'Registro audiovisual del avance del proyecto para control y documentación.',
    mobileBody: 'Documentación visual del avance del proyecto para control e inversores.'
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

export default function ConstruccionSolutionsModule() {
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <section className={styles.section} aria-label="Soluciones para obras">
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={styles.lead}>
          Brindamos <strong>seguridad activa y monitoreo constante</strong> en obras, previniendo
          robos, vandalismo e intrusiones durante todo el desarrollo.
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
              <span className={styles.desktopBody}>{solution.body}</span>
              <span className={styles.mobileBody}>{solution.mobileBody}</span>
            </p>
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
