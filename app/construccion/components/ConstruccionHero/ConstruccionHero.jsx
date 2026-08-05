'use client';

import Image from 'next/image';

import styles from '../../page.module.scss';

export default function ConstruccionHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Construcción y Obras">
      <div className={styles.heroMedia}>
        <Image src="/image/mq11fkmb-be8tqg4.webp" alt="Videovigilancia y cámaras de seguridad en una obra en construcción" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <Image src="/image/mq11fkmb-q59ieul.png" alt="SISE Urbano" className={styles.heroKicker} width={704} height={126} priority />

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>Protección desde </span>
            <span className={styles.heroTitleStrong}>el primer día</span>
          </h1>

          <p className={styles.heroCategory}>CONSTRUCCIÓN Y OBRAS</p>
        </div>
      </div>
    </section>
  );
}
