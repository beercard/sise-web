import Image from 'next/image';

import styles from './HistoriaTimeline.module.scss';

/*
 * Bloque "Historia" de /historia según Figma 5011:267 (desktop 1920×638) y
 * 5011:268 (mobile 402×1188): banda gris con el relato de la empresa a la
 * izquierda (negritas por hito) y la foto del equipo al 80% a la derecha; en
 * mobile la foto pasa arriba a sangre. Reemplaza a la línea de tiempo del
 * diseño anterior.
 */
export default function HistoriaTimeline() {
  return (
    <section className={styles.section} aria-label="Historia de SISE Argentina">
      <div className={styles.media}>
        <Image
          src="/image/historia-equipo-banda.webp"
          alt="Equipo de SISE Argentina"
          className={styles.photo}
          fill
          unoptimized
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>

      <div className={styles.copy}>
        <h2 className={styles.title}>Historia</h2>
        <p className={styles.text}>
          <strong>SISE Argentina</strong> nace en <strong>2010 en Resistencia, Chaco</strong>, con
          la visión de desarrollar <strong>soluciones tecnológicas de seguridad</strong> de alto
          nivel para un mercado en constante evolución.
          <br />
          <br />
          Acompañando el avance tecnológico, consolidamos un sólido <strong>equipo profesional</strong>{' '}
          para transformar la seguridad tradicional en <strong>soluciones integrales</strong>. Hoy
          desplegamos sistemas avanzados de monitoreo, videovigilancia, rastreo satelital, control
          de accesos y <strong>desarrollos tecnológicos propios</strong>.
          <br />
          <br />
          Nuestra capacidad de innovación se refleja en hitos como <strong>Cámara Campo</strong>,
          un sistema de videovigilancia rural autónomo impulsado por{' '}
          <strong>energía solar y analítica inteligente</strong>. A nivel institucional, lideramos
          proyectos de <strong>alto impacto regional</strong>, como el despliegue del sistema de
          monitoreo en tiempo real del estratégico <strong>Puente General Belgrano</strong>.
        </p>
      </div>
    </section>
  );
}
