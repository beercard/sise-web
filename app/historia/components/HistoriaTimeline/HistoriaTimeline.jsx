import styles from '../../page.module.scss';

export default function HistoriaTimeline() {
  return (
    <section className={styles.timeline} aria-label="Historia">
      <div className={styles.timelineInner}>
        <div className={styles.timelineContent}>
          <h2 className={styles.timelineHeading}>Historia</h2>
          <p className={styles.timelineStory}>
            <span className={styles.timelineStoryStrong}>SISE Argentina</span>
            <span className={styles.timelineStoryRegular}> nace en </span>
            <span className={styles.timelineStoryStrong}>2010 en Resistencia, Chaco</span>
            <span className={styles.timelineStoryRegular}>
              , con la visión de desarrollar{' '}
            </span>
            <span className={styles.timelineStoryStrong}>soluciones tecnológicas de seguridad</span>
            <span className={styles.timelineStoryRegular}>
              {' '}
              de alto nivel para un mercado en constante evolución.
              <br />
              <br />
              Acompañando el avance tecnológico, consolidamos un sólido
            </span>
            <span className={styles.timelineStoryStrong}> equipo profesional</span>
            <span className={styles.timelineStoryRegular}>
              {' '}
              para transformar la seguridad tradicional en{' '}
            </span>
            <span className={styles.timelineStoryStrong}>soluciones integrales</span>
            <span className={styles.timelineStoryRegular}>
              . Hoy desplegamos sistemas avanzados de monitoreo, videovigilancia, rastreo
              satelital, control de accesos y{' '}
            </span>
            <span className={styles.timelineStoryStrong}>desarrollos tecnológicos propios</span>
            <span className={styles.timelineStoryRegular}>
              .
              <br />
              <br />
              Nuestra capacidad de innovación se refleja en hitos como{' '}
            </span>
            <span className={styles.timelineStoryStrong}>Cámara Campo</span>
            <span className={styles.timelineStoryRegular}>
              , un sistema de videovigilancia rural autónomo impulsado por{' '}
            </span>
            <span className={styles.timelineStoryStrong}>
              energía solar y analítica inteligente
            </span>
            <span className={styles.timelineStoryRegular}>
              . A nivel institucional, lideramos proyectos de{' '}
            </span>
            <span className={styles.timelineStoryStrong}>alto impacto regional</span>
            <span className={styles.timelineStoryRegular}>
              , como el despliegue del sistema de monitoreo en tiempo real del estratégico{' '}
            </span>
            <span className={styles.timelineStoryStrong}>Puente General Belgrano</span>
            <span className={styles.timelineStoryRegular}>.</span>
          </p>
        </div>

        <div
          className={styles.timelineMedia}
          role="img"
          aria-label="Puente General Belgrano monitoreado por SISE Argentina"
        />
      </div>
    </section>
  );
}
