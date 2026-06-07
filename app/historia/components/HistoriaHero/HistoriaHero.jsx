import Image from 'next/image';

import styles from '../../page.module.scss';

export default function HistoriaHero() {
  return (
    <section className={styles.hero} aria-label="Historia SISE Argentina">
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src="/image/mq2q87jo-iv7vjn2.png"
          alt=""
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroCopy}>
        <h1 className={styles.heroTitle}>
          Tecnología, compromiso
          <br />y respaldo real
        </h1>
        <p className={styles.heroSubtitle}>
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
      </div>
    </section>
  );
}

