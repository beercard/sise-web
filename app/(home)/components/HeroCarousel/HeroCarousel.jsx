import styles from './HeroCarousel.module.scss';

export default function HeroCarousel() {
  return (
    <section className={styles.hero} aria-label="Hero principal">
      <div className={styles.heroMedia} aria-hidden="true" />
      <div className={styles.heroGradient} aria-hidden="true" />

      <h1 className={styles.heroTitle}>
        <span className={styles.heroLine}>
          <span className={styles.heroTitleRegular}>Soluciones en seguridad electrónica&nbsp;</span>
        </span>
        <span className={styles.heroLine}>
          <span className={styles.heroTitleBold}>accesible, moderna y humana</span>
          <span className={styles.heroTitleRegular}>.</span>
        </span>
      </h1>
    </section>
  );
}
