import styles from './EdificiosSolutionsModule.module.scss';

const WATERMARK_ROWS = ['row-1', 'row-2', 'row-3'];

const solutions = [
  {
    key: 'guardia',
    title: ['GUARDIA', 'VIRTUAL'],
    body:
      'Supervisión remota del edificio las 24 horas desde nuestro centro de monitoreo, para reforzar o reemplazar la portería física.'
  },
  {
    key: 'accesos',
    title: ['CONTROL DE', 'ACCESOS'],
    body:
      'Ingreso digitalizado con tarjetas, códigos o reconocimiento, diferenciando residentes de visitas y registrando cada movimiento.'
  },
  {
    key: 'cctv',
    title: ['CCTV / ÁREAS', 'COMUNES'],
    body:
      'Cámaras en hall, cocheras, ascensores y perímetro, con registro y respaldo ante cualquier incidente.'
  },
  {
    key: 'monitoreo',
    title: ['MONITOREO', 'CENTRALIZADO'],
    body:
      'Alarmas, cámaras y accesos integrados en un mismo sistema, con supervisión 24/7 y respuesta inmediata.'
  },
  {
    key: 'cocheras',
    title: ['MONITOREO DE', 'COCHERAS'],
    body:
      'Protección de cocheras y espacios compartidos, evitando ingresos no autorizados y daños a los vehículos.'
  }
];

export default function EdificiosSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para edificios y consorcios">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <p className={styles.lead}>
                <span className={styles.leadLight}>En un edificio, la seguridad es </span>
                <span className={styles.leadStrong}>una decisión de todos</span>
                <span className={styles.leadLight}>.</span>
              </p>
            </div>

            <p className={styles.body}>
              <span className={styles.bodyLight}>En SISE diseñamos soluciones para </span>
              <span className={styles.bodyStrong}>ordenar los accesos</span>
              <span className={styles.bodyLight}>, </span>
              <span className={styles.bodyStrong}>cuidar las áreas comunes</span>
              <span className={styles.bodyLight}> y </span>
              <span className={styles.bodyStrong}>reducir el costo de las expensas</span>
              <span className={styles.bodyLight}>.</span>
            </p>
          </div>

          <p className={styles.punch}>
            No se trata sólo de controlar la entrada,
            <br />
            sino de que cada residente se sienta seguro.
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
