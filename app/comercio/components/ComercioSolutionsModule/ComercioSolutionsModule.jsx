import styles from './ComercioSolutionsModule.module.scss';

const WATERMARK_ROWS = [1, 2, 3];

const comercioSolutions = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    body:
      'Respuesta inmediata ante intentos de robo o emergencias, con intervención activa desde el centro de monitoreo.'
  },
  {
    key: 'cctv',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    body:
      'Supervisión constante de áreas críticas del negocio, con registro de eventos para control y análisis.'
  },
  {
    key: 'humo',
    title: ['CORTINA', 'DE HUMO'],
    body:
      'Sistema que libera una niebla densa ante intrusiones, reduciendo la visibilidad y neutralizando el accionar del delincuente.'
  },
  {
    key: 'acceso',
    title: ['CONTROL DE', 'ACCESO Y FICHAJE'],
    body:
      'Gestión de ingresos del personal mediante tarjetas, biometría o reconocimiento facial, con control de horarios y presencia.'
  },
  {
    key: 'rastreo',
    title: ['RASTREO', 'SATELITAL'],
    body:
      'Seguimiento en tiempo real de vehículos, permitiendo detectar desvíos, optimizar recorridos y mejorar la logística.'
  }
];

export default function ComercioSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para comercios">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <p className={styles.lead}>
                <span className={styles.leadLight}>En los comercios, la seguridad impacta directamente en </span>
                <span className={styles.leadStrong}>el resultado del negocio</span>
                <span className={styles.leadLight}>.</span>
              </p>
            </div>

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

          <p className={styles.punch}>
            No se trata sólo de evitar robos,
            <br />
            sino de cuidar tu inversión todos los días.
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
            {comercioSolutions.map((solution) => (
              <article key={solution.key} className={`${styles.cardGroup} ${styles[solution.key]}`}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    {solution.title.map((line) => (
                      <span key={`${solution.key}-${line}`}>{line}</span>
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
