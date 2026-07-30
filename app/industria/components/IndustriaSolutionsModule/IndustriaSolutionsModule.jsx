import styles from './IndustriaSolutionsModule.module.scss';

const WATERMARK_ROWS = ['row-1', 'row-2', 'row-3'];

const solutions = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    body:
      'Protección integral de instalaciones con respuesta inmediata ante eventos.'
  },
  {
    key: 'cctv',
    title: ['CCTV / VIDEOVIGILANCIA'],
    body:
      'Supervisión de procesos productivos, perímetros y áreas sensibles.'
  },
  {
    key: 'cerco',
    title: ['CERCO ELÉCTRICO'],
    body:
      'Defensa perimetral activa para prevenir intrusiones.'
  },
  {
    key: 'accesos',
    title: ['CONTROL DE ACCESO'],
    body:
      'Gestión de ingresos por niveles de autorización, mejorando el control interno.'
  },
  {
    key: 'gps',
    title: ['GPS CORPORATIVO'],
    body:
      'Monitoreo de flota en tiempo real para optimizar operaciones y reducir riesgos.'
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
                    {solution.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>
                  <p className={styles.cardBody}>{solution.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
