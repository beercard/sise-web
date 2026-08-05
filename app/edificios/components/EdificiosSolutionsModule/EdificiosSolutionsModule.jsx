import styles from './EdificiosSolutionsModule.module.scss';

const WATERMARK_ROWS = Array.from({ length: 19 }, (_, index) => `row-${index + 1}`);

const solutions = [
  {
    key: 'acceso',
    title: ['CONTROL DE ACCESO'],
    mobileTitle: ['CONTROL', 'DE ACCESO'],
    body:
      'Ingreso digitalizado para residentes y visitas, con registro de movimientos.',
    mobileBody: 'Ingreso digitalizado y registro exacto de residentes y visitas.'
  },
  {
    key: 'guardia',
    title: ['GUARDIA VIRTUAL'],
    mobileTitle: ['GUARDIA VIRTUAL'],
    body:
      'Supervisión remota 24/7 de accesos y espacios comunes, con intervención ante eventos y asistencia en tiempo real.',
    mobileBody: 'Supervisión 24/7 de accesos para maximizar seguridad y reducir expensas.'
  },
  {
    key: 'alarmas',
    title: ['ALARMAS Y MONITOREO'],
    mobileTitle: ['ALARMAS Y MONITOREO'],
    body:
      'Protección de perímetros y áreas comunes con prevención y respuesta inmediata.',
    mobileBody: 'Respuesta inmediata ante emergencias en áreas compartidas.'
  },
  {
    key: 'cerco',
    title: ['CERCO ELÉCTRICO'],
    mobileTitle: ['CERCO ELÉCTRICO'],
    body: 'Seguridad perimetral en espacios compartidos.',
    mobileBody: 'Blindaje perimetral activo para muros y medianeras del complejo.'
  },
  {
    key: 'cctv',
    title: ['CCTV'],
    mobileTitle: ['CCTV'],
    body:
      'Registro y control visual de áreas comunes para mayor seguridad y respaldo.',
    mobileBody: 'Auditoría visual continua de pasillos, cocheras y espacios comunes.'
  }
];

export default function EdificiosSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para edificios y consorcios">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <div className={styles.desktopOnly}>
                <p className={styles.lead}>
                  <span className={styles.leadLight}>Implementamos</span>
                  <span className={styles.leadMedium}> </span>
                  <span className={styles.leadStrong}>soluciones tecnológicas que mejoran la seguridad</span>
                  <span className={styles.leadLight}>
                    {' '}
                    en espacios compartidos, optimizando costos y brindando mayor control a los residentes.
                  </span>
                </p>
              </div>

              <div className={styles.mobileOnly}>
                <p className={styles.mobileLead}>
                  Más seguridad,
                  <br />
                  menor costo operativo.
                </p>
                <p className={styles.mobileBody}>
                  <span className={styles.mobileBodyLight}>Implementamos </span>
                  <span className={styles.mobileBodyStrong}>soluciones tecnológicas que mejoran la seguridad</span>
                  <span className={styles.mobileBodyLight}>
                    {' '}
                    en espacios compartidos, optimizando costos y brindando mayor control a los residentes.
                  </span>
                </p>
              </div>
            </div>
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
            {solutions.map((solution) => (
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
