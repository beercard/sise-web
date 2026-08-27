import Image from 'next/image';

import styles from './ComercioHero.module.scss';

/*
 * Hero de /comercio según Figma 5001:269 (desktop 1920×900) y 5001:270
 * (mobile 402×600): la foto del local al 90% sobre el azul #00408c, sin
 * gradiente, con "SISE EMPRESAS" como texto, el título y la categoría
 * "COMERCIOS" anclados abajo a la izquierda. El mobile usa un recorte propio
 * de la misma foto y cierra el título con punto. Los webp ya están exportados
 * al tamaño final, así que van sin el optimizador de Next (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-comercio-local-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-comercio-local-mobile.webp';

/*
 * El bloque de texto vive acá y lo reutiliza el carrusel del home: así los
 * dos comparten esta misma hoja de estilos y no se desalinean cuando se
 * ajusta el hero.
 */
export function ComercioHeroBrand({ TitleTag = 'h1' }) {
  return (
      <div className={styles.content}>
        <p className={styles.kicker}>
          <span className={styles.kickerBlack}>SISE</span> EMPRESAS
        </p>

        <TitleTag className={styles.title}>
          <span className={styles.titleLight}>Seguridad que protege </span>
          <span className={styles.titleStrong}>tu rentabilidad</span>
        </TitleTag>

        <p className={styles.category}>COMERCIOS</p>
      </div>
  );
}

export default function ComercioHero() {
  return (
    <section className={styles.hero} aria-label="SISE Comercio">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Vidriera de un comercio protegido con seguridad SISE"
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

        <ComercioHeroBrand />
      </div>
    </section>
  );
}
