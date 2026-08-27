'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';

import SolutionInfoPopup from '../../../components/SolutionInfoPopup/SolutionInfoPopup';
import { trackSolutionInfo } from '../../../lib/analytics';
import { SOLUTIONS_INFO } from '../../../lib/solutionsInfo';

import styles from './SolutionsModule.module.scss';

/*
 * Módulo de soluciones de /hogar según Figma 5001:274 (desktop 1920×1079) y
 * 5001:275 (mobile 402×1845): fondo azul #2177a5 con el patrón de eses SISE
 * al 4%, intro en dos columnas, y una grilla de seis tarjetas grises con
 * botón "+ info". En mobile las tarjetas se apilan y "propiedades
 * desocupadas" pasa delante de "barrio seguro".
 */
const SOLUTIONS = [
  {
    key: 'alarmas',
    info: 'alarma-monitoreada',
    title: ['MONITOREO', 'DE ALARMAS'],
    mobileTitle: ['MONITOREO', 'DE ALARMAS'],
    body: 'Protección ininterrumpida 24/7 con respuesta inmediata desde nuestro centro local.',
    mobileOrder: 1
  },
  {
    key: 'cctv',
    info: 'cctv-videovigilancia',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    mobileTitle: ['CCTV /', 'VIDEOVIGILANCIA'],
    body: 'Mirá tu casa en tiempo real o sumá videovigilancia activa 24/7.',
    mobileOrder: 2
  },
  {
    key: 'cerco',
    info: 'cerco-electrico',
    title: ['CERCO ELÉCTRICO/', 'MONITOREADO'],
    mobileTitle: ['CERCO ELÉCTRICO', '/MONITOREADO'],
    body: 'Barrera perimetral 100% legal, con opción de conexión a nuestra central.',
    mobileOrder: 3
  },
  {
    key: 'barrio',
    info: 'barrio-seguro',
    title: ['SISTEMA DE', 'BARRIO SEGURO'],
    mobileTitle: ['SISTEMA DE', 'BARRIO SEGURO'],
    body: 'Cámaras vecinales y altoparlante disuasivo, conectados a nuestra central y al 911.',
    mobileOrder: 5
  },
  {
    key: 'desocupadas',
    info: 'propiedades-desocupadas',
    title: ['MONITOREO DE', 'PROPIEDADES', 'DESOCUPADAS'],
    mobileTitle: ['MONITOREO DE', 'PROPIEDADES', 'DESOCUPADAS'],
    body: 'Prevención a distancia contra usurpaciones y robos.',
    mobileOrder: 4
  },
  {
    key: 'gps',
    info: 'gps-dashcams',
    title: ['GPS /', 'DASHCAMS'],
    mobileTitle: ['GPS /', 'DASHCAMS'],
    body: 'Cámaras vehiculares y rastreo GPS para proteger tu auto en movimiento.',
    mobileOrder: 6
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

export default function SolutionsModule() {
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <section className={styles.section} aria-label="Soluciones para el hogar">
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.intro}>
        <div className={styles.introLeft}>
          <p className={styles.lead}>
            <span className={styles.leadLight}>La seguridad de tu hogar no es solo tecnología, </span>
            <span className={styles.leadStrong}>es la paz de tu familia.</span>
          </p>
          <p className={styles.punch}>Con SISE, no solo alertamos: actuamos.</p>
        </div>

        <p className={styles.body}>
          Desarrollamos <strong>soluciones confiables</strong> que protegen tu hogar antes, durante y
          después de cualquier intrusión.
          <br />
          <br />
          Nuestro sistema combina <strong>tecnología avanzada</strong> con{' '}
          <strong>monitoreo profesional 24/7</strong> y <strong>control total desde tu celular</strong>,
          para que puedas trabajar, viajar o descansar con la certeza de que{' '}
          <strong>un equipo experto cuida lo que más querés en todo momento</strong>.
        </p>

        <div className={styles.introMobile}>
          <p className={styles.mobilePunch}>Con SISE, no solo alertamos: actuamos.</p>
          <p className={styles.mobileBody}>
            Monitoreo profesional 24/7 con respuesta inmediata y control total desde tu celular.
            <br />
            <br />
            Viví, viajá y descansá tranquilo; tu hogar está respaldado por expertos.
          </p>
        </div>
      </div>

      <h2 className={styles.heading}>Soluciones:</h2>

      <div className={`${styles.grid} ${activeInfo ? styles.gridPopupOpen : ''}`}>
        {SOLUTIONS.map((solution) => (
          <article
            key={solution.key}
            className={`${styles.card} ${styles[solution.key]}`}
            style={{ '--mobile-order': solution.mobileOrder }}
          >
            <h3 className={styles.cardTitle}>
              <span className={styles.desktopTitle}>
                <TitleLines lines={solution.title} />
              </span>
              <span className={styles.mobileTitle}>
                <TitleLines lines={solution.mobileTitle} />
              </span>
            </h3>
            <p className={styles.cardBody}>{solution.body}</p>
            {solution.info ? (
              <>
                {/* En desktop abre el popup; en mobile (sin diseño todavía)
                    sigue llevando a /contacto. */}
                <button
                  type="button"
                  className={`${styles.cardButton} ${styles.cardButtonDesktop}`}
                  onClick={() => {
                    setActiveInfo(solution.info);
                    trackSolutionInfo({
                      solution: SOLUTIONS_INFO[solution.info]?.title ?? solution.info,
                      vertical: 'hogar'
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
