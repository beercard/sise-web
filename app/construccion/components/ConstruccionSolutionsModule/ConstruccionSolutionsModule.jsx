import styles from './ConstruccionSolutionsModule.module.scss';

const WATERMARK_ROWS = Array.from({ length: 19 }, (_, index) => `row-${index + 1}`);

const solutions = [
  {
    key: 'obra',
    title: ['VIDEOVIGILANCIA', 'DE OBRA'],
    mobileTitle: ['VIDEOVIGILANCIA', 'DE OBRA'],
    body:
      'Cámaras con acceso remoto para ver el avance y contar con registro ante robos o incidentes en el predio.',
    mobileBody:
      'Cámaras con acceso remoto para ver el avance y contar con registro ante robos o incidentes en el predio.'
  },
  {
    key: 'solares',
    title: ['CÁMARAS SOLARES', 'AUTÓNOMAS'],
    mobileTitle: ['CÁMARAS SOLARES', 'AUTÓNOMAS'],
    body:
      'Sistemas con energía solar y conectividad propia, ideales para obras sin luz ni señal en sus etapas iniciales.',
    mobileBody:
      'Sistemas con energía solar y conectividad propia, ideales para obras sin luz ni señal en sus etapas iniciales.'
  },
  {
    key: 'accesos',
    title: ['CONTROL DE', 'ACCESOS'],
    mobileTitle: ['CONTROL DE', 'ACCESOS'],
    body:
      'Ingreso ordenado de personal, contratistas y proveedores, con registro de movimientos y trazabilidad.',
    mobileBody:
      'Ingreso ordenado de personal, contratistas y proveedores, con registro de movimientos y trazabilidad.'
  },
  {
    key: 'monitoreo',
    title: ['MONITOREO', 'PERIMETRAL 24/7'],
    mobileTitle: ['MONITOREO', 'PERIMETRAL 24/7'],
    body:
      'Supervisión del perímetro las 24 horas: ante una alerta verificamos el evento y coordinamos la respuesta.',
    mobileBody:
      'Supervisión del perímetro las 24 horas: ante una alerta verificamos el evento y coordinamos la respuesta.'
  },
  {
    key: 'reubicable',
    title: ['SISTEMA', 'REUBICABLE'],
    body:
      'Equipamiento escalable que se traslada al próximo proyecto cuando termina la etapa o la obra.',
    mobileTitle: ['SISTEMA', 'REUBICABLE'],
    mobileBody:
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
              <article
                key={solution.key}
                className={`${styles.cardGroup} ${styles[solution.key] ?? ''}`.trim()}
              >
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
