import Image from 'next/image';

import styles from './RseHero.module.scss';

/*
 * Hero de /rse según Figma 5014:400 (desktop 1920×917) y 5014:401 (mobile
 * 402×591): la foto de la comunidad al 50% sobre el azul #00408c, sin
 * gradiente, con el título en negrita y la bajada de dos párrafos anclados
 * abajo a la izquierda. El mobile usa un recorte propio de la misma foto y el
 * título en tres renglones. Los webp ya están exportados al tamaño final, así
 * que van sin el optimizador de Next (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-rse-comunidad-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-rse-comunidad-mobile.webp';

export default function RseHero() {
  return (
    <section className={styles.hero} aria-label="Responsabilidad Social Empresarial">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Acciones de responsabilidad social de SISE Argentina"
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
          <h1 className={`${styles.title} ${styles.titleDesktop}`}>
            Responsabilidad Social Empresarial
          </h1>
          {/* Variante visual mobile: aria-hidden para no duplicar el h1. */}
          <p className={`${styles.title} ${styles.titleMobile}`} aria-hidden="true">
            Responsabilidad
            <br />
            Social
            <br />
            Empresarial
          </p>

          <p className={styles.paragraph}>
            En SISE Argentina entendemos que la seguridad también implica{' '}
            <strong>compromiso con la comunidad, el ambiente y el desarrollo social</strong>.
            <br />
            <br />
            Por eso, llevamos adelante acciones sostenidas de Responsabilidad Social Empresarial
            orientadas a generar un <strong>impacto positivo real</strong>, promoviendo{' '}
            <strong>la inclusión, la educación, el deporte y el cuidado del entorno</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
