import styles from './IndustriaSolutionsModule.module.scss';

/*
 * 18 bandas: es lo que pide el diseño mobile (nodo 5026:465), donde llenan
 * justo el área de las cards — 18 × 55px + 17 separaciones de 2px = 1024px.
 * En el resto de los breakpoints sólo se ven las tres primeras.
 */
const WATERMARK_ROWS = Array.from({ length: 18 }, (_, index) => `row-${index + 1}`);

const solutions = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    mobileTitle: ['MONITOREO', 'DE ALARMAS'],
    body: 'Protección 24/7 para infraestructura crítica.',
    mobileBody: 'Protección 24/7 para infraestructura crítica.'
  },
  {
    key: 'cctv',
    title: ['CCTV / VIDEOVIGILANCIA'],
    mobileTitle: ['CCTV / VIDEOVIGILANCIA'],
    body: 'Auditoría visual de procesos productivos y planta.',
    mobileBody: 'Auditoría visual de procesos productivos y planta.'
  },
  {
    key: 'cerco',
    title: ['CERCO', 'ELÉCTRICO'],
    mobileTitle: ['CERCO', 'ELÉCTRICO'],
    body: 'Defensa perimetral de alta tensión.',
    mobileBody: 'Defensa perimetral de alta tensión.'
  },
  {
    key: 'accesos',
    title: ['CONTROL DE ACCESO'],
    mobileTitle: ['CONTROL DE', 'ACCESO'],
    body: 'Gestión de ingresos por niveles de seguridad.',
    mobileBody: 'Gestión de ingresos por niveles de seguridad.'
  },
  {
    key: 'gps',
    title: ['GPS', 'CORPORATIVO'],
    mobileTitle: ['GPS', 'CORPORATIVO'],
    body: 'Telemetría logística para flota.',
    mobileBody: 'Telemetría logística para flota.'
  }
];

export default function IndustriaSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para industrias y empresas">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <p className={styles.lead}>
            <span className={styles.leadLight}>
              Diseñamos soluciones robustas y personalizadas para proteger activos, procesos y logística,
            </span>
            <span className={styles.leadStrong}> garantizando la continuidad del negocio.</span>
          </p>
        </div>

        <div className={styles.gridArea}>
          <div className={styles.watermark} aria-hidden="true">
            {WATERMARK_ROWS.map((row) => (
              <div key={row} className={styles.watermarkRow} />
            ))}
          </div>

          <h2 className={styles.heading}>Soluciones:</h2>

          <div className={styles.grid}>
            {solutions.map((solution) => (
              <article key={solution.key} className={styles.cardGroup}>
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
