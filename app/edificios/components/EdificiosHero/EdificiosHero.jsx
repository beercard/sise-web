'use client';

import Image from 'next/image';

import EdificiosMonitoreoCarousel from '../EdificiosMonitoreoCarousel/EdificiosMonitoreoCarousel';

import styles from '../../page.module.scss';

export default function EdificiosHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Edificios y Consorcios">
      <div className={styles.heroMedia}>
        <Image src="/image/mq077jvc-gz2p9c8.webp" alt="Cámaras de seguridad y control de accesos en un edificio" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <Image src="/image/mq077jvc-gg9xdtl.png" alt="SISE Urbano" className={styles.heroKicker} width={352} height={63} priority />

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLight}>
            Más seguridad,
            <br />
          </span>
          <span className={styles.heroTitleStrong}>menor costo operativo.</span>
        </h1>
      </div>

      <div className={styles.heroBottom} aria-label="Edificios y consorcios">
        <div className={styles.heroBottomInner}>
          <div className={styles.heroText}>
            <p className={styles.heroSectionTitle}>EDIFICIOS Y CONSORCIOS</p>
            <div className={styles.heroDivider} aria-hidden="true" />
            <p className={styles.heroLead}>
              Más seguridad,
              <br />
              menor costo operativo.
            </p>
            <p className={styles.heroBody}>
              Implementamos control de accesos, videovigilancia y monitoreo para halls, portones,
              garajes y espacios comunes, optimizando costos y brindando más control a consorcios
              y residentes.
            </p>
          </div>

          <EdificiosMonitoreoCarousel />
        </div>
      </div>
    </section>
  );
}
