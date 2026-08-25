import Image from 'next/image';

import styles from './HistoriaHero.module.scss';

/*
 * Hero de /historia según Figma 5011:263 (desktop 1920×900) y 5011:264
 * (mobile 402×591): la foto del equipo al 50% sobre el azul #00408c, sin
 * gradiente, con el título en negrita y la bajada de "más de 15 años"
 * anclados abajo a la izquierda. El mobile usa un recorte propio de la misma
 * foto, el título en tres renglones (con punto final) y la bajada con su
 * corte propio. Los webp ya están exportados al tamaño final, así que van sin
 * el optimizador de Next (unoptimized).
 */
const HERO_IMAGE_DESKTOP = '/image/hero-historia-equipo-desktop.webp';
const HERO_IMAGE_MOBILE = '/image/hero-historia-equipo-mobile.webp';

export default function HistoriaHero() {
  return (
    <section className={styles.hero} aria-label="Historia SISE Argentina">
      <div className={styles.media}>
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="Equipo de SISE Argentina"
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
          <h1 className={`${styles.title} ${styles.titleDesktop}`}>
            Tecnología,
            <br />
            compromiso
            <br />y respaldo real
          </h1>
          <h1 className={`${styles.title} ${styles.titleMobile}`}>
            Tecnología,
            <br />
            compromiso
            <br />y respaldo real.
          </h1>

          <p className={`${styles.subtitle} ${styles.subtitleDesktop}`}>
            En SISE Argentina contamos con{' '}
            <strong>
              más de 15 años de experiencia
              <br />
              en seguridad electrónica y monitoreo
            </strong>
            , desarrollando soluciones que integran tecnología, prevención y compromiso con la
            comunidad.
          </p>
          <p className={`${styles.subtitle} ${styles.subtitleMobile}`}>
            En SISE Argentina contamos con{' '}
            <strong>
              más de
              <br />
              15 años de experiencia en seguridad electrónica y monitoreo
            </strong>
            , desarrollando soluciones que integran tecnología, prevención y compromiso con la
            comunidad.
          </p>
        </div>
      </div>
    </section>
  );
}
