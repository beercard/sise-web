import Image from 'next/image';

import styles from './HeroModule.module.scss';

/*
 * Hero de /hogar según Figma 5001:272 (desktop 1920×900) y 5001:281 (mobile
 * 402×600): la foto de la casa al 90% sobre el azul de marca, sin gradiente,
 * con "SISE HOGAR" como texto y el título anclados abajo a la izquierda.
 * El mobile usa un recorte propio de la misma foto (el sector de la entrada).
 * Los webp ya están exportados al tamaño final, así que van sin el optimizador
 * de Next (unoptimized): en dev la variante w=1920 quedaba colgada y el hero
 * no se veía en escritorio.
 */
const HERO_IMAGE_DESKTOP = '/image/hero-hogar-casa-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-hogar-casa-mobile.webp';

export default function HeroModule() {
  return (
    <section className={styles.hero} aria-label="SISE Hogar">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Casa protegida con sistema de seguridad SISE"
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
            <span className={styles.kickerBlack}>SISE</span> HOGAR
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleLight}>Protección integral para </span>
            <span className={styles.titleStrong}>vivir con tranquilidad</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
