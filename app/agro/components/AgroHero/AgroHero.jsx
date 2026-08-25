import Image from 'next/image';

import styles from './AgroHero.module.scss';

/*
 * Hero de /agro según Figma 5011:244 (desktop 1920×900) y 5011:245 (mobile
 * 402×600): la foto del campo al 90% sobre el azul #00408c, sin gradiente,
 * con "SISE AGRO" como texto y el título ("estés donde estés." en negrita)
 * anclados abajo a la izquierda; esta vertical no lleva bajada de categoría.
 * El mobile usa un recorte propio de la misma foto. Los webp ya están
 * exportados al tamaño final, así que van sin el optimizador de Next
 * (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-agro-campo-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-agro-campo-mobile.webp';

export default function AgroHero() {
  return (
    <section className={styles.hero} aria-label="SISE Agro">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Campo protegido con seguridad SISE"
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
          priority
          unoptimized
          sizes="100vw"
        />

        <div className={styles.content}>
          <p className={styles.kicker}>
            <span className={styles.kickerBlack}>SISE</span> AGRO
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleLight}>El control de tu campo, </span>
            <span className={styles.titleStrong}>estés donde estés.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
