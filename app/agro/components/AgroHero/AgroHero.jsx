'use client';

import Image from 'next/image';

import styles from '../../page.module.scss';

export default function AgroHero() {
  return (
    <section className={styles.hero} aria-label="SISE Agro">
      <div className={styles.heroMedia}>
        <Image src="/image/mq1fh69q-uknmp86.webp" alt="Cámaras de seguridad y monitoreo rural en un campo" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <Image src="/image/mq1fh69q-07xoj3d.png" alt="SISE Agro" className={styles.heroKicker} width={560} height={93} priority />

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>Seguridad sin límites, </span>
            <span className={styles.heroTitleStrong}>adaptada al campo.</span>
          </h1>

          <p className={styles.heroCategory}>SEGURIDAD RURAL</p>
        </div>
      </div>
    </section>
  );
}
