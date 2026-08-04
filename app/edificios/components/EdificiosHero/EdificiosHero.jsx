import Image from 'next/image';

import styles from '../../page.module.scss';

export default function EdificiosHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Edificios y Consorcios">
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src="/image/hero-edificios-desktop.webp"
          alt=""
          className={styles.heroImage}
          fill
          sizes="100vw"
          loading="eager"
        />
        <div className={styles.heroGradient} />

        <Image
          src="/image/mq077jvc-gg9xdtl.png"
          alt=""
          className={styles.heroKicker}
          width={352}
          height={63}
          loading="eager"
        />

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLight}>
            Más seguridad,
            <br />
          </span>
          <span className={styles.heroTitleStrong}>menor costo operativo.</span>
        </h1>

        <p className={styles.heroCategory}>EDIFICIOS Y CONSORCIOS</p>
      </div>
    </section>
  );
}
