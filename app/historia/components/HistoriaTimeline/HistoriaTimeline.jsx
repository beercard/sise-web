import styles from '../../page.module.scss';

export default function HistoriaTimeline() {
  return (
    <section className={styles.timeline} aria-label="Historia">
      <div className={styles.timelineInner}>
        <div className={styles.timelineGraphic} aria-hidden="true">
          <p className={styles.timelineHeading}>Historia</p>
          <div className={styles.timelineBar1} />
          <div className={styles.timelineBar2} />
          <div className={styles.timelineBar3} />
          <div className={styles.timelineBar4} />
          <div className={styles.timelineBar5} />
          <div className={styles.timelineRow}>
            <div className={styles.timelineBar6} />
            <div className={styles.timelineBar7} />
          </div>
          <div className={styles.timelineBar8} />
          <div className={styles.timelineBar9} />
          <div className={styles.timelineBar10} />
          <div className={styles.timelineBar11} />
          <div className={styles.timelineBar12} />
          <div className={styles.timelineBar13} />
          <div className={styles.timelineBar14} />
          <div className={styles.timelineBar15} />
        </div>

        <div className={styles.timelineRight} role="img" aria-label="Equipo SISE Argentina">
          <p className={styles.timelineRightText}>
            <span className={styles.timelineRightTextRegular}>Hoy, con&nbsp;</span>
            <span className={styles.timelineRightTextStrong}>
              más 15 años de trayectoria,
              <br />
              SISE Argentina se posiciona como una de las empresas referentes en tecnología
              de seguridad en el norte del país
            </span>
            <span className={styles.timelineRightTextRegular}>
              ,<br />
              con un equipo en crecimiento,
              <br />
              soluciones escalables y un fuerte enfoque en&nbsp;
            </span>
            <span className={styles.timelineRightTextStrong}>
              &nbsp;la innovación y el monitoreo inteligente
            </span>
            <span className={styles.timelineRightTextRegular}>.</span>
          </p>
        </div>

        <p className={styles.timelineStory}>
          <span className={styles.timelineStoryHighlight}>SISE Argentina nace en el año 2010</span>
          <span className={styles.timelineStoryRegular}>
            &nbsp;en la ciudad
            <br />
            de Resistencia, Chaco, impulsada por la visión de desarrollar&nbsp;
          </span>
          <span className={styles.timelineStoryStrong}>
            soluciones tecnológicas de seguridad
            <br />
            más profesionales&nbsp;
          </span>
          <span className={styles.timelineStoryRegular}>
            y adaptadas a un mercado en crecimiento.
            <br />
            <br />
            Sus inicios fueron modestos: comenzó como un emprendimiento unipersonal, instalando
            alarmas y cámaras para hogares, evolucionando rápidamente junto al avance de la
            tecnología, pasando de sistemas analógicos a&nbsp;
          </span>
          <span className={styles.timelineStoryHighlight}>soluciones digitales de videovigilancia</span>
          <span className={styles.timelineStoryRegular}>
            .<br />
            <br />
            Con el tiempo, la empresa consolidó un equipo técnico y profesional, ampliando su
            oferta hacia&nbsp;
          </span>
          <span className={styles.timelineStoryHighlight}>soluciones integrales</span>
          <span className={styles.timelineStoryRegular}>&nbsp;que incluyen&nbsp;</span>
          <span className={styles.timelineStoryHighlight}>
            monitoreo de alarmas, videovigilancia, rastreo satelital, control de accesos
            <br />y desarrollos tecnológicos propios.
          </span>
          <span className={styles.timelineStoryRegular}>
            <br />
            <br />
            Un hito importante en su evolución fue el desarrollo de soluciones innovadoras como
            los&nbsp;
          </span>
          <span className={styles.timelineStoryHighlight}>sistemas de seguridad rural autónomos</span>
          <span className={styles.timelineStoryRegular}>
            &nbsp;(como Cámara Campo), incorporando energía solar, conectividad y analítica
            inteligente para zonas sin infraestructura.
            <br />
            <br />
            En paralelo, SISE ha participado en&nbsp;
          </span>
          <span className={styles.timelineStoryHighlight}>proyectos de impacto regional,</span>
          <span className={styles.timelineStoryRegular}>
            &nbsp;como la instalación y mantenimiento de cámaras de videovigilancia en el&nbsp;
          </span>
          <span className={styles.timelineStoryHighlight}>Puente General Belgrano,</span>
          <span className={styles.timelineStoryRegular}>
            &nbsp;aportando a la seguridad vial y al monitoreo en tiempo real para la comunidad.
          </span>
        </p>
      </div>
    </section>
  );
}
