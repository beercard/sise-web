'use client';

import Image from 'next/image';

import styles from '../../page.module.scss';

export default function ComercioHero() {
  return (
    <section className={styles.hero} aria-label="SISE Comercio">
      <div className={styles.heroMedia}>
        <Image
          src="/image/mpvuunzj-eolvy7n.webp"
          alt="Cámaras de seguridad y alarma monitoreada en un comercio"
          className={styles.heroImage}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroGradient} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <Image
            src="/image/mpvuunzj-tkfn7dr.png"
            alt="SISE Comercio"
            className={styles.heroKicker}
            width={416}
            height={64}
            priority
          />

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>
              Seguridad que protege
              <br />
            </span>
            <span className={styles.heroTitleStrong}>tu rentabilidad</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

