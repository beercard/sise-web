import Image from 'next/image';

import styles from './IndustriaHero.module.scss';

/*
 * Hero de /industria según Figma 5001:324 (desktop 1920×900) y 5001:325
 * (mobile 402×600): la foto de la planta al 90% sobre el azul #00408c, sin
 * gradiente, con "SISE EMPRESAS" como texto, el título y la categoría
 * "EMPRESAS E INDUSTRIAS" anclados abajo a la izquierda. El mobile usa un
 * recorte propio de la misma foto y cierra el título con punto. Los webp ya
 * están exportados al tamaño final, así que van sin el optimizador de Next
 * (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-industria-planta-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-industria-planta-mobile.webp';

export default function IndustriaHero() {
  return (
    <section className={styles.hero} aria-label="SISE Industria">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Planta industrial protegida con seguridad SISE"
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
            <span className={styles.kickerBlack}>SISE</span> EMPRESAS
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleLight}>Protección para </span>
            <span className={styles.titleStrong}>operaciones críticas</span>
          </h1>

          <p className={styles.category}>EMPRESAS E INDUSTRIAS</p>
        </div>
      </div>
    </section>
  );
}
