import styles from './ConstruccionSolutionsModule.module.scss';

const WATERMARK_ROWS = ['row-1', 'row-2', 'row-3'];

const solutions = [
  {
    key: 'obra',
    title: ['VIDEOVIGILANCIA', 'DE OBRA'],
    body:
      'Cámaras con acceso remoto para ver el avance y contar con registro ante robos o incidentes en el predio.'
  },
  {
    key: 'solares',
    title: ['CÁMARAS SOLARES', 'AUTÓNOMAS'],
    body:
      'Sistemas con energía solar y conectividad propia, ideales para obras sin luz ni señal en sus etapas iniciales.'
  },
  {
    key: 'accesos',
    title: ['CONTROL DE', 'ACCESOS'],
    body:
      'Ingreso ordenado de personal, contratistas y proveedores, con registro de movimientos y trazabilidad.'
  },
  {
    key: 'monitoreo',
    title: ['MONITOREO', 'PERIMETRAL 24/7'],
    body:
      'Supervisión del perímetro las 24 horas: ante una alerta verificamos el evento y coordinamos la respuesta.'
  },
  {
    key: 'reubicable',
    title: ['SISTEMA', 'REUBICABLE'],
    body:
      'Equipamiento escalable que se traslada al próximo proyecto cuando termina la etapa o la obra.'
  }
];

export default function ConstruccionSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para obras y construcción">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <p className={styles.lead}>
                <span className={styles.leadLight}>En una obra, la seguridad protege </span>
                <span className={styles.leadStrong}>la inversión de cada etapa</span>
                <span className={styles.leadLight}>.</span>
              </p>
            </div>

            <p className={styles.body}>
              <span className={styles.bodyLight}>En SISE ofrecemos soluciones para </span>
              <span className={styles.bodyStrong}>evitar el robo de materiales</span>
              <span className={styles.bodyLight}>, </span>
              <span className={styles.bodyStrong}>ordenar el ingreso</span>
              <span className={styles.bodyLight}> y </span>
              <span className={styles.bodyStrong}>cuidar el predio las 24 horas</span>
              <span className={styles.bodyLight}>.</span>
            </p>
          </div>

          <p className={styles.punch}>
            No se trata sólo de vigilar la obra,
            <br />
            sino de que el proyecto avance sin pérdidas.
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
