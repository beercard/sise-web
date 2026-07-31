'use client';

import Image from 'next/image';

import styles from '../../page.module.scss';

export default function IndustriaHero() {
  return (
    <section className={styles.hero} aria-label="SISE Industria">
      <div className={styles.heroMedia}>
        <Image src="/image/hero-industria-desktop.webp" alt="Videovigilancia y seguridad electrónica en una planta industrial" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <Image src="/image/mq017wn8-l2f7mev.png" alt="SISE Empresas e Industrias" className={styles.heroKicker} width={416} height={64} priority />

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>Protección para </span>
            <span className={styles.heroTitleStrong}>operaciones críticas</span>
          </h1>

          <p className={styles.heroCategory}>EMPRESAS E INDUSTRIAS</p>
        </div>
      </div>
    </section>
  );
}
