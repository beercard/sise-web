'use client';

import Image from 'next/image';

import ConstruccionMonitoreoCarousel from '../ConstruccionMonitoreoCarousel/ConstruccionMonitoreoCarousel';

import styles from '../../page.module.scss';

export default function ConstruccionHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Construcción y Obras">
      <div className={styles.heroMedia}>
        <Image src="/image/mq11fkmb-be8tqg4.webp" alt="Videovigilancia y cámaras de seguridad en una obra en construcción" className={styles.heroImage} fill priority sizes="100vw" />
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
            <p className={styles.heroLead}>Seguridad activa para obras y obradores</p>
            <p className={styles.heroBody}>
              Protegemos materiales, herramientas, maquinaria y accesos con videovigilancia,
              monitoreo y control perimetral durante cada etapa del proyecto.
            </p>
          </div>

          <ConstruccionMonitoreoCarousel />
        </div>
      </div>
    </section>
  );
}
