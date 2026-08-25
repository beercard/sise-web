import Link from 'next/link';

import styles from './HomeSeoContent.module.scss';

export default function HomeSeoContent() {
  return (
    <section
      className={styles.section}
      aria-label="Seguridad electrónica y monitoreo en todo el NEA"
    >
      <div className={styles.inner}>
        <h2 className={`${styles.title} ${styles.titleDesktop}`}>
          Seguridad electrónica
          <br />
          y monitoreo en todo el NEA
        </h2>

        {/* Variante visual mobile: aria-hidden para no duplicar el h2. */}
        <p className={`${styles.title} ${styles.titleMobile}`} aria-hidden="true">
          Seguridad electrónica y monitoreo en todo el NEA
        </p>

        <p className={`${styles.copy} ${styles.copyDesktop}`}>
          <span className={styles.textRegular}>Nacimos en </span>
          <span className={styles.textStrong}>Resistencia</span>
          <span className={styles.textRegular}> hace </span>
          <span className={styles.textStrong}>más de 15 años</span>
          <span className={styles.textRegular}>
            {' '}
            y hoy diseñamos los sistemas de seguridad electrónica más completos de la
            región.
            <br />
            <br />
            No importa si necesitás una{' '}
          </span>
          <span className={styles.textStrong}>alarma monitoreada</span>
          <span className={styles.textRegular}> para tu casa, </span>
          <span className={styles.textStrong}>control de accesos</span>
          <span className={styles.textRegular}> para tu empresa, cámaras de </span>
          <span className={styles.textStrong}>videovigilancia</span>
          <span className={styles.textRegular}> para un consorcio o </span>
          <span className={styles.textStrong}>tecnología autónoma </span>
          <span className={styles.textRegular}>
            para el sector agropecuario.
            <br />
            <br />
            Integramos equipos de última generación con nuestro propio
          </span>
          <span className={styles.textStrong}> centro de monitoreo profesional 24/7</span>
          <span className={styles.textRegular}>
            . Así te garantizamos prevención real,
          </span>
          <span className={styles.textStrong}> respuesta humana inmediata </span>
          <span className={styles.textRegular}>
            y la tranquilidad de saber que lo tuyo está bien cuidado.
          </span>
        </p>

        <p className={`${styles.copy} ${styles.copyMobile}`}>
          <span className={styles.textStrong}>
            Seguridad electrónica integral. Monitoreo profesional 24/7.
          </span>
          <span className={styles.textRegular}>
            <br />
            <br />
            Hace más de
          </span>
          <span className={styles.textStrong}> 15 años</span>
          <span className={styles.textRegular}> lideramos el desarrollo de </span>
          <span className={styles.textStrong}>soluciones tecnológicas</span>
          <span className={styles.textRegular}>
            {' '}
            en la región. Protegemos hogares, empresas y el sector agropecuario integrando{' '}
          </span>
          <span className={styles.textStrong}>equipos de última generación</span>
          <span className={styles.textRegular}> con </span>
          <span className={styles.textStrong}>respuesta humana inmediata</span>
          <span className={styles.textRegular}>.</span>
        </p>

        <Link href="/historia" className={styles.cta}>
          Conocé nuestra historia
        </Link>
      </div>
    </section>
  );
}
