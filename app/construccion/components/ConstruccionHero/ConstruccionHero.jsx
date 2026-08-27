import Image from 'next/image';

import styles from './ConstruccionHero.module.scss';

/*
 * Hero de /construccion según Figma 5011:236 (desktop 1920×900) y 5011:237
 * (mobile 402×600): la foto de la obra al 90% sobre el azul #00408c, sin
 * gradiente, con "SISE URBANO" como texto, el título ("el primer día" en
 * negrita) y la categoría "CONSTRUCCIÓN Y OBRAS" anclados abajo a la
 * izquierda. El mobile usa un recorte propio de la misma foto y cierra el
 * título con punto. Los webp ya están exportados al tamaño final, así que van
 * sin el optimizador de Next (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-construccion-obra-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-construccion-obra-mobile.webp';

/*
 * El bloque de texto vive acá y lo reutiliza el carrusel del home: así los
 * dos comparten esta misma hoja de estilos y no se desalinean cuando se
 * ajusta el hero.
 */
export function ConstruccionHeroBrand({ TitleTag = 'h1' }) {
  return (
      <div className={styles.content}>
        <p className={styles.kicker}>
          <span className={styles.kickerBlack}>SISE</span> URBANO
        </p>

        <TitleTag className={styles.title}>
          <span className={styles.titleLight}>Protección desde </span>
          <span className={styles.titleStrong}>el primer día</span>
        </TitleTag>

        <p className={styles.category}>Construcción y Obras</p>
      </div>
  );
}

export default function ConstruccionHero() {
  return (
    <section className={styles.hero} aria-label="SISE Urbano - Construcción y Obras">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Obra en construcción protegida con seguridad SISE"
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

        <ConstruccionHeroBrand />
      </div>
    </section>
  );
}
