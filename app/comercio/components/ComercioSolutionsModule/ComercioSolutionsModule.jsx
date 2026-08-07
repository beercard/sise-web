import styles from './ComercioSolutionsModule.module.scss';

/*
 * 19 bandas: es lo que pide el diseño mobile (nodo 5016:503), donde llenan
 * justo el área de las cards — 19 × 55px + 18 separaciones de 2px = 1081px.
 * En el resto de los breakpoints sólo se ven las tres primeras.
 */
const WATERMARK_ROWS = Array.from({ length: 19 }, (_, index) => index + 1);

const comercioSolutions = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    mobileTitle: ['MONITOREO', 'DE ALARMAS'],
    body: 'Respuesta inmediata ante emergencias en tu local.',
    mobileBody: 'Respuesta inmediata ante emergencias en tu local.'
  },
  {
    key: 'cctv',
    title: ['CCTV / VIDEOVIGILANCIA'],
    mobileTitle: ['CCTV / VIDEOVIGILANCIA'],
    body: 'Control visual continuo para auditar tu caja y salón.',
    mobileBody: 'Control visual continuo para auditar tu caja y salón.'
  },
  {
    key: 'humo',
    title: ['CORTINA', 'DE HUMO'],
    mobileTitle: ['CORTINA', 'DE HUMO'],
    body: 'Niebla activa que frena robos en segundos.',
    mobileBody: 'Niebla activa que frena robos en segundos.'
  },
  {
    key: 'acceso',
    title: ['CONTROL DE ACCESO Y FICHAJE'],
    mobileTitle: ['CONTROL DE', 'ACCESO Y FICHAJE'],
    body: 'Gestión exacta de presentismo y horarios del personal.',
    mobileBody: 'Gestión exacta de presentismo y horarios del personal.'
  },
  {
    key: 'rastreo',
    title: ['RASTREO', 'SATELITAL'],
    mobileTitle: ['RASTREO', 'SATELITAL'],
    body: 'Seguimiento de vehículos de reparto en tiempo real.',
    mobileBody: 'Seguimiento de vehículos de reparto en tiempo real.'
  }
];

export default function ComercioSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para comercios">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <div className={styles.desktopOnly}>
                <p className={styles.lead}>
                  <span className={styles.leadLight}>En los comercios, la seguridad impacta directamente en </span>
                  <span className={styles.leadStrong}>el resultado del negocio</span>
                  <span className={styles.leadLight}>.</span>
                </p>
              </div>

              <div className={styles.mobileOnly}>
                <p className={styles.mobileLead}>Blindamos tu inversión.</p>
              </div>
            </div>

            <div className={styles.desktopOnly}>
              <p className={styles.body}>
                <span className={styles.bodyLight}>En SISE ofrecemos soluciones orientadas a </span>
                <span className={styles.bodyStrong}>prevenir pérdidas</span>
                <span className={styles.bodyLight}>, </span>
                <span className={styles.bodyStrong}>reducir riesgos</span>
                <span className={styles.bodyLight}> y </span>
                <span className={styles.bodyStrong}>garantizar la continuidad operativa</span>
                <span className={styles.bodyLight}>.</span>
              </p>
            </div>

            <div className={styles.mobileOnly}>
              <p className={styles.mobileBody}>
                Soluciones orientadas a prevenir pérdidas y garantizar la continuidad operativa de tu
                comercio.
                <br />
                <br />
                <strong className={styles.mobileBodyStrong}>
                  Seguridad que protege tu rentabilidad.
                </strong>
              </p>
            </div>
          </div>

          <div className={styles.desktopOnly}>
            <p className={styles.punch}>
              No se trata sólo de evitar robos,
              <br />
              sino de cuidar tu inversión todos los días.
            </p>
          </div>
        </div>

        <div className={styles.gridArea}>
          <div className={styles.watermark} aria-hidden="true">
            {WATERMARK_ROWS.map((row) => (
              <div key={row} className={styles.watermarkRow} />
            ))}
          </div>

          <h2 className={styles.heading}>Soluciones:</h2>

          <div className={styles.grid}>
            {comercioSolutions.map((solution) => (
              <article key={solution.key} className={`${styles.cardGroup} ${styles[solution.key]}`}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    <span className={styles.desktopTitle}>
                      {solution.title.map((line) => (
                        <span key={`${solution.key}-desktop-${line}`}>{line}</span>
                      ))}
                    </span>
                    <span className={styles.mobileTitle}>
                      {solution.mobileTitle.map((line) => (
                        <span key={`${solution.key}-mobile-${line}`}>{line}</span>
                      ))}
                    </span>
                  </h3>
                  <p className={styles.cardBody}>
                    <span className={styles.desktopBodyText}>{solution.body}</span>
                    <span className={styles.mobileBodyText}>{solution.mobileBody}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
