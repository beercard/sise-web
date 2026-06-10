import Link from 'next/link';

import styles from './HomeSeoContent.module.scss';

export default function HomeSeoContent() {
  return (
    <section className={styles.section} aria-label="Seguridad electronica y monitoreo en el NEA">
      <div className={styles.inner}>
        <div className={styles.copyBlock}>
          <h2 className={styles.title}>Seguridad electrónica y monitoreo en todo el NEA</h2>
          <p className={styles.text}>
            <span className={styles.textRegular}>Nacimos en </span>
            <Link href="/contacto" className={`${styles.textStrong} ${styles.inlineLink}`}>
              Resistencia
            </Link>
            <span className={styles.textRegular}> hace </span>
            <span className={styles.textStrong}>más de 15 años</span>
            <span className={styles.textRegular}>
              {' '}
              y hoy diseñamos los sistemas de seguridad electrónica más completos de la
              región. No importa si necesitás una{' '}
            </span>
            <Link href="/hogar" className={`${styles.textStrong} ${styles.inlineLink}`}>
              alarma monitoreada
            </Link>
            <span className={styles.textRegular}> para tu casa, </span>
            <Link href="/comercio" className={`${styles.textStrong} ${styles.inlineLink}`}>
              control de accesos
            </Link>
            <span className={styles.textRegular}> para tu empresa, cámaras de </span>
            <Link href="/edificios" className={`${styles.textStrong} ${styles.inlineLink}`}>
              videovigilancia
            </Link>
            <span className={styles.textRegular}> para un consorcio o </span>
            <Link href="/agro" className={`${styles.textStrong} ${styles.inlineLink}`}>
              tecnología autónoma
            </Link>
            <span className={styles.textRegular}>
              {' '}
              para el sector agropecuario. Integramos equipos de última generación con
              nuestro propio{' '}
            </span>
            <Link href="/contacto" className={`${styles.textStrong} ${styles.inlineLink}`}>
              centro de monitoreo profesional 24/7
            </Link>
            <span className={styles.textRegular}>. Así te garantizamos prevención real, </span>
            <span className={styles.textStrong}>respuesta humana inmediata</span>
            <span className={styles.textRegular}>
              {' '}
              y la tranquilidad de saber que lo tuyo está bien cuidado.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
