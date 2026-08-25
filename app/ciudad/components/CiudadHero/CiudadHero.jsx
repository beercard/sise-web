import Image from 'next/image';

import styles from './CiudadHero.module.scss';

/*
 * Hero de /ciudad según Figma 5001:251 (desktop 1920×900) y 5001:252 (mobile
 * 402×600): la foto del instalador en el poste al 90% (80% en mobile) sobre el
 * azul #00408c, sin gradiente, con "SISE CIUDAD" tipográfico y el título
 * anclados abajo a la izquierda. Los webp ya están exportados al tamaño final,
 * así que van sin el optimizador de Next (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-ciudad-poste-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-ciudad-poste-mobile.webp';

export default function CiudadHero() {
  return (
    <section className={styles.hero} aria-label="SISE Ciudad">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Técnico de SISE instalando una cámara de videovigilancia urbana"
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
            <span className={styles.kickerBlack}>SISE</span> CIUDAD
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleLight}>Tecnología aplicada a </span>
            <span className={styles.titleStrong}>la seguridad urbana.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
