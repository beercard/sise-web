'use client';

import Image from 'next/image';

import ConstruccionMonitoreoCarousel from '../ConstruccionMonitoreoCarousel/ConstruccionMonitoreoCarousel';

import styles from '../../page.module.scss';

export default function ConstruccionHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Construcción y Obras">
      <div className={styles.heroMedia}>
        <Image src="/image/mq11fkmb-be8tqg4.png" alt="" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <Image src="/image/mq11fkmb-q59ieul.png" alt="SISE Urbano" className={styles.heroKicker} width={704} height={95} priority />

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLight}>Protección desde </span>
          <span className={styles.heroTitleStrong}>el primer día</span>
        </h1>
      </div>

      <div className={styles.heroBottom} aria-label="Construcción y Obras">
        <div className={styles.heroBottomInner}>
          <div className={styles.heroText}>
            <p className={styles.heroSectionTitle}>CONSTRUCCIÓN Y OBRAS</p>
            <div className={styles.heroDivider} aria-hidden="true" />
            <p className={styles.heroLead}>Protección desde el primer día</p>
            <p className={styles.heroBody}>
              Brindamos seguridad activa y monitoreo constante en obras, previniendo robos, vandalismo e intrusiones
              durante todo el desarrollo.
            </p>
          </div>

          <ConstruccionMonitoreoCarousel />
        </div>
      </div>
    </section>
  );
}
