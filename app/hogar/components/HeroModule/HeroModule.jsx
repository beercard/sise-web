import Image from 'next/image';

import styles from './HeroModule.module.scss';

const HERO_IMAGE_SRC = '/image/hero-hogar-desktop.webp';
const HERO_LOGO_SRC = '/image/mpudc5hr-7mihfr3.png';

export default function HeroModule() {
  return (
    <section className={styles.hero} aria-label="SISE Hogar">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_SRC}
          alt="Familia protegida con sistema de seguridad para el hogar"
          className={styles.image}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.gradient} aria-hidden="true" />

        <div className={styles.content}>
          <Image
            src={HERO_LOGO_SRC}
            alt="SISE Hogar"
            className={styles.logo}
            width={334}
            height={60}
            priority
          />

          <h1 className={styles.title}>
            <span className={styles.titleLight}>Protección integral para </span>
            <span className={styles.titleStrong}>vivir con tranquilidad</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
