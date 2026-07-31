'use client';

import Image from 'next/image';

import styles from '../../page.module.scss';

export default function EdificiosHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Edificios y Consorcios">
      <div className={styles.heroMedia}>
        <Image src="/image/hero-edificios-desktop.webp" alt="Cámaras de seguridad y control de accesos en un edificio" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <Image src="/image/mq077jvc-gg9xdtl.png" alt="SISE Urbano" className={styles.heroKicker} width={352} height={63} priority />

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>
              Más seguridad,
              <br />
            </span>
            <span className={styles.heroTitleStrong}>menor costo operativo.</span>
          </h1>

          <p className={styles.heroCategory}>EDIFICIOS Y CONSORCIOS</p>
        </div>
      </div>
    </section>
  );
}
