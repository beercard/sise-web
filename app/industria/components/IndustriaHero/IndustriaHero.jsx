'use client';

import Image from 'next/image';

import IndustriaMonitoreoCarousel from '../IndustriaMonitoreoCarousel/IndustriaMonitoreoCarousel';

import styles from '../../page.module.scss';

export default function IndustriaHero() {
  return (
    <section className={styles.hero} aria-label="SISE Industria">
      <div className={styles.heroMedia}>
        <Image src="/image/mq017wn8-mlb5tmm.webp" alt="" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <Image src="/image/mq017wn8-l2f7mev.png" alt="" className={styles.heroKicker} width={416} height={64} priority />

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLight}>Protección para </span>
          <span className={styles.heroTitleStrong}>operaciones críticas</span>
        </h1>
      </div>

      <div className={styles.heroBottom} aria-label="Información">
        <div className={styles.heroBottomInner}>
          <div className={styles.heroText}>
            <p className={styles.heroSectionTitle}>EMPRESAS E INDUSTRIAS</p>
            <div className={styles.heroDivider} aria-hidden="true" />
            <p className={styles.heroLead}>
              <span className={styles.heroLeadLight}>
                Diseñamos soluciones robustas y personalizadas para proteger activos, perímetros,
                ingresos y logística,
              </span>
              <span className={styles.heroLeadStrong}>
                {' '}
                garantizando continuidad operativa y control en tiempo real.
              </span>
            </p>
          </div>

          <IndustriaMonitoreoCarousel />
        </div>
      </div>
    </section>
  );
}
