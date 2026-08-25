import Image from 'next/image';

import styles from './EdificiosHero.module.scss';

/*
 * Hero de /edificios según Figma 5001:337 (desktop 1920×900) y 5001:338
 * (mobile 402×600): la foto de la torre al 80% sobre el azul #00408c, sin
 * gradiente, con "SISE URBANO" como texto, el título ("menor costo operativo."
 * en negrita) y la categoría "EDIFICIOS Y CONSORCIOS" anclados abajo a la
 * izquierda. El mobile usa un recorte propio de la misma foto. Los webp ya
 * están exportados al tamaño final, así que van sin el optimizador de Next
 * (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-edificios-torre-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-edificios-torre-mobile.webp';

export default function EdificiosHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Edificios y Consorcios">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Edificio protegido con seguridad SISE"
          className={`${styles.image} ${styles.imageDesktop}`}
          fill
          priority
          unoptimized
          sizes="100vw"
        />
        <Image
          src={HERO_IMAGE_MOBILE}
          alt=""
          className={`${styles.image} ${styles.imageMobile}`}
          fill
          loading="eager"
          unoptimized
          sizes="100vw"
        />

        <div className={styles.content}>
          <p className={styles.kicker}>
            <span className={styles.kickerBlack}>SISE</span> URBANO
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleLight}>Más seguridad, </span>
            <span className={styles.titleStrong}>menor costo operativo.</span>
          </h1>

          <p className={styles.category}>Edificios y Consorcios</p>
        </div>
      </div>
    </section>
  );
}
