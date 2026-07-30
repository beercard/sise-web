import styles from './AgroSolutionsModule.module.scss';

const WATERMARK_ROWS = ['row-1', 'row-2', 'row-3'];

const solutions = [
  {
    key: 'rural',
    title: ['VIDEOVIGILANCIA', 'RURAL'],
    body:
      'Cámaras con acceso remoto para vigilar tranqueras, galpones, silobolsas y casco de estancia en tiempo real.'
  },
  {
    key: 'solares',
    title: ['CÁMARAS CON', 'ENERGÍA SOLAR'],
    body:
      'Sistemas autónomos pensados para zonas rurales sin red eléctrica ni cobertura, operativos las 24 horas.'
  },
  {
    key: 'conectividad',
    title: ['CONECTIVIDAD', 'PARA EL CAMPO'],
    body:
      'Diseñamos el enlace de cada establecimiento para que las alertas lleguen a la central aun en zonas alejadas.'
  },
  {
    key: 'gps',
    title: ['GPS Y RASTREO', 'SATELITAL'],
    body:
      'Seguimiento de maquinaria, vehículos y hacienda en tiempo real, para detectar movimientos no autorizados.'
  },
  {
    key: 'monitoreo',
    title: ['MONITOREO', 'RURAL 24/7'],
    body:
      'Ante una alerta verificamos el evento y coordinamos la respuesta con el productor y las fuerzas de seguridad.'
  }
];

export default function AgroSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para el campo">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <p className={styles.lead}>
                <span className={styles.leadLight}>En el campo, la seguridad llega </span>
                <span className={styles.leadStrong}>donde no llega nadie más</span>
                <span className={styles.leadLight}>.</span>
              </p>
            </div>

            <p className={styles.body}>
              <span className={styles.bodyLight}>En SISE desarrollamos soluciones para </span>
              <span className={styles.bodyStrong}>proteger el establecimiento</span>
              <span className={styles.bodyLight}>, </span>
              <span className={styles.bodyStrong}>seguir tus activos</span>
              <span className={styles.bodyLight}> y </span>
              <span className={styles.bodyStrong}>estar conectado aunque no haya señal</span>
              <span className={styles.bodyLight}>.</span>
            </p>
          </div>

          <p className={styles.punch}>
            No se trata sólo de cuidar la tranquera,
            <br />
            sino de vigilar todo el campo a distancia.
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
