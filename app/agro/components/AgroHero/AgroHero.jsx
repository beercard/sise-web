'use client';

import Image from 'next/image';

import AgroMonitoreoCarousel from '../AgroMonitoreoCarousel/AgroMonitoreoCarousel';

import styles from '../../page.module.scss';

export default function AgroHero() {
  return (
    <section className={styles.hero} aria-label="SISE Agro">
      <div className={styles.heroMedia}>
        <Image src="/image/mq1fh69q-uknmp86.webp" alt="" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <Image src="/image/mq1fh69q-07xoj3d.png" alt="SISE Agro" className={styles.heroKicker} width={560} height={93} priority />

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLight}>Seguridad sin límites, </span>
          <span className={styles.heroTitleStrong}>adaptada al campo.</span>
        </h1>
      </div>

      <div className={styles.heroBottom} aria-label="Servicios destacados">
        <div className={styles.heroBottomInner}>
          <div className={styles.heroText}>
            <p className={styles.heroSectionTitle}>SEGURIDAD RURAL</p>
            <div className={styles.heroDivider} aria-hidden="true" />
            <p className={styles.heroLead}>Monitoreo remoto para establecimientos agropecuarios</p>
            <p className={styles.heroBody}>
              Protegemos tranqueras, galpones, silobolsas, maquinaria y cascos de estancia con
              videovigilancia, conectividad y control desde el celular, aun en entornos extensos o
              de difícil acceso.
            </p>
          </div>

          <AgroMonitoreoCarousel />
        </div>
      </div>
    </section>
  );
}
