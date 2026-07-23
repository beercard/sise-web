import Image from 'next/image';

import styles from './HomeSeoContent.module.scss';

export default function HomeSeoContent() {
  return (
    <section className={styles.section} aria-label="Alarmas monitoreadas y seguridad electrónica en el NEA">
      <div className={styles.inner}>
        <div className={styles.desktopLayout}>
          <div className={styles.desktopImageWrap}>
            <Image
              src="/image/home-seo-desktop.webp"
              alt="Frente de la sucursal SISE Argentina"
              width={456}
              height={439}
              className={styles.desktopImage}
            />
          </div>

          <div className={styles.desktopCopy}>
            <h2 className={styles.title}>Seguridad electrónica y monitoreo en todo el NEA</h2>
            <p className={styles.desktopText}>
              <span className={styles.textRegular}>Nacimos en </span>
              <span className={styles.textStrong}>Resistencia</span>
              <span className={styles.textRegular}> hace </span>
              <span className={styles.textStrong}>más de 15 años</span>
              <span className={styles.textRegular}>
                {' '}
                y hoy diseñamos los sistemas de seguridad electrónica más completos de la
                región. No importa si necesitás una{' '}
              </span>
              <span className={styles.textStrong}>alarma monitoreada</span>
              <span className={styles.textRegular}> para tu casa, </span>
              <span className={styles.textStrong}>control de accesos</span>
              <span className={styles.textRegular}> para tu empresa, cámaras de </span>
              <span className={styles.textStrong}>videovigilancia</span>
              <span className={styles.textRegular}> para un consorcio o </span>
              <span className={styles.textStrong}>tecnología autónoma</span>
              <span className={styles.textRegular}>
                {' '}
                para el sector agropecuario. Integramos equipos de última generación con
                nuestro propio{' '}
              </span>
              <span className={styles.textStrong}>centro de monitoreo profesional 24/7</span>
              <span className={styles.textRegular}>. Así te garantizamos prevención real, </span>
              <span className={styles.textStrong}>respuesta humana inmediata</span>
              <span className={styles.textRegular}>
                {' '}
                y la tranquilidad de saber que lo tuyo está bien cuidado.
              </span>
            </p>
          </div>
        </div>

        <div className={styles.mobileLayout}>
          <h2 className={styles.mobileTitle}>Seguridad electrónica y monitoreo en todo el NEA</h2>

          <div className={styles.mobileTopRow}>
            <p className={styles.mobileIntro}>
              <span className={styles.textRegular}>Nacimos en </span>
              <span className={styles.textStrong}>Resistencia</span>
              <span className={styles.textRegular}> hace </span>
              <span className={styles.textStrong}>más de 15 años</span>
              <span className={styles.textRegular}>
                {' '}
                y hoy diseñamos los sistemas de seguridad electrónica más completos de la
                región.
              </span>
            </p>

            <div className={styles.mobileImageWrap}>
              <Image
                src="/image/home-seo-mobile.webp"
                alt="Frente de la sucursal SISE Argentina"
                width={169}
                height={102}
                className={styles.mobileImage}
              />
            </div>
          </div>

          <p className={styles.mobileParagraph}>
            <span className={styles.textRegular}>No importa si necesitás una </span>
            <span className={styles.textStrong}>alarma monitoreada</span>
            <span className={styles.textRegular}> para tu casa, </span>
            <span className={styles.textStrong}>control de accesos</span>
            <span className={styles.textRegular}> para tu empresa, cámaras de </span>
            <span className={styles.textStrong}>videovigilancia</span>
            <span className={styles.textRegular}> para un consorcio o </span>
            <span className={styles.textStrong}>tecnología autónoma </span>
            <span className={styles.textRegular}>para el sector agropecuario.</span>
          </p>

          <p className={styles.mobileParagraph}>
            <span className={styles.textRegular}>
              Integramos equipos de última generación con nuestro propio
            </span>
            <span className={styles.textStrong}> centro de monitoreo profesional 24/7</span>
            <span className={styles.textRegular}>. Así te garantizamos prevención real,</span>
            <span className={styles.textStrong}> respuesta humana inmediata </span>
            <span className={styles.textRegular}>
              y la tranquilidad de saber que lo tuyo está bien cuidado.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
