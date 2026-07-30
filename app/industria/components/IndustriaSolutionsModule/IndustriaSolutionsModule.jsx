import styles from './IndustriaSolutionsModule.module.scss';

const WATERMARK_ROWS = ['row-1', 'row-2', 'row-3'];

const solutions = [
  {
    key: 'perimetral',
    title: ['PROTECCIÓN', 'PERIMETRAL'],
    body:
      'Cerco eléctrico, sensores y cartelería disuasiva integrados al monitoreo para detener cualquier intrusión antes de que ingrese al predio.'
  },
  {
    key: 'cctv',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    body:
      'Cámaras con acceso remoto para supervisar la planta en tiempo real y contar con registro ante cualquier incidente.'
  },
  {
    key: 'accesos',
    title: ['CONTROL DE', 'ACCESOS'],
    body:
      'Ingreso por niveles de autorización con tarjetas, biometría o reconocimiento facial, con registro de horarios y movimientos.'
  },
  {
    key: 'monitoreo',
    title: ['MONITOREO', '24/7'],
    body:
      'Supervisión permanente desde nuestro centro: ante un evento verificamos la alerta y coordinamos la respuesta inmediata.'
  },
  {
    key: 'gps',
    title: ['GPS', 'CORPORATIVO'],
    body:
      'Seguimiento de flota en tiempo real para detectar desvíos, optimizar recorridos y reducir riesgos en la logística.'
  }
];

export default function IndustriaSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para industrias y empresas">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <p className={styles.lead}>
                <span className={styles.leadLight}>En la industria, la seguridad sostiene </span>
                <span className={styles.leadStrong}>la continuidad operativa</span>
                <span className={styles.leadLight}>.</span>
              </p>
            </div>

            <p className={styles.body}>
              <span className={styles.bodyLight}>En SISE integramos soluciones para </span>
              <span className={styles.bodyStrong}>proteger activos</span>
              <span className={styles.bodyLight}>, </span>
              <span className={styles.bodyStrong}>ordenar los accesos</span>
              <span className={styles.bodyLight}> y </span>
              <span className={styles.bodyStrong}>operar sin interrupciones</span>
              <span className={styles.bodyLight}>.</span>
            </p>
          </div>

          <p className={styles.punch}>
            No se trata sólo de vigilar el predio,
            <br />
            sino de que la planta nunca deje de producir.
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
