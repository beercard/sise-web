import Image from 'next/image';

import styles from '../../page.module.scss';

export default function HistoriaHero() {
  return (
    <section className={styles.hero} aria-label="Historia SISE Argentina">
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src="/image/mq2q87jo-iv7vjn2.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`${styles.heroImage} ${styles.heroImageDesktop}`}
        />
        <Image
          src="/image/SISE HISTORIA MOBILE.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`${styles.heroImage} ${styles.heroImageMobile}`}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroCopy}>
        <h1 className={`${styles.heroTitle} ${styles.heroTitleDesktop}`}>
          Tecnología, compromiso
          <br />y respaldo real
        </h1>
        <h1 className={`${styles.heroTitle} ${styles.heroTitleMobile}`}>
          Tecnología,
          <br />
          compromiso
          <br />y respaldo real.
        </h1>
        <p className={`${styles.heroSubtitle} ${styles.heroSubtitleDesktop}`}>
          <span className={styles.heroSubtitleRegular}>
            En SISE Argentina contamos con&nbsp;
          </span>
          <span className={styles.heroSubtitleStrong}>
            más de 15 años de experiencia
            <br />
            en seguridad electrónica y monitoreo
          </span>
          <span className={styles.heroSubtitleRegular}>
            , desarrollando soluciones que integran tecnología, prevención y compromiso con la
            comunidad.
          </span>
        </p>
        <p className={`${styles.heroSubtitle} ${styles.heroSubtitleMobile}`}>
          <span className={styles.heroSubtitleRegular}>En SISE Argentina contamos con </span>
          <span className={styles.heroSubtitleStrong}>
            más de
            <br />
            15 años de experiencia en seguridad electrónica y monitoreo
          </span>
          <span className={styles.heroSubtitleRegular}>
            , desarrollando soluciones que integran tecnología, prevención y compromiso con la
            comunidad.
          </span>
        </p>
      </div>
    </section>
  );
}
