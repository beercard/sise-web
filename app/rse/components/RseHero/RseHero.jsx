import styles from '../../page.module.scss';

export default function RseHero() {
  return (
    <section className={styles.hero} aria-label="Responsabilidad Social Empresarial">
      <div className={styles.heroMedia} aria-hidden="true">
        <picture className={styles.heroPicture}>
          <source srcSet="/image/hero-rse-mobile.webp" media="(max-width: 600px)" />
          <img
            src="/image/hero-rse-desktop.webp"
            alt=""
            className={styles.heroImage}
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroCopy}>
        <h1 className={`${styles.heroTitle} ${styles.heroTitleDesktop}`}>
          Responsabilidad Social Empresarial
        </h1>
        <h1 className={`${styles.heroTitle} ${styles.heroTitleMobile}`}>
          Responsabilidad
          <br />
          Social
          <br />
          Empresarial
        </h1>

        <p className={styles.heroParagraph}>
          En SISE Argentina entendemos que la seguridad también implica compromiso con la
          comunidad, el ambiente y el desarrollo social.
          <br />
          <br />
          Por eso, llevamos adelante acciones sostenidas de Responsabilidad Social Empresarial
          orientadas a generar un <strong>impacto positivo real</strong>, promoviendo{' '}
          <strong>la inclusión, la educación, el deporte y el cuidado del entorno.</strong>
        </p>
      </div>
    </section>
  );
}
