import styles from './ConstruccionSolutionsModule.module.scss';

const WATERMARK_ROWS = Array.from({ length: 19 }, (_, index) => `row-${index + 1}`);

const solutions = [
  {
    key: 'alarmas',
    title: ['ALARMAS Y MONITOREO'],
    mobileTitle: ['ALARMAS Y', 'MONITOREO'],
    body: 'Protección fuera del horario laboral con supervisión permanente.',
    mobileBody: 'Protección activa de materiales y obrador fuera del horario de trabajo.'
  },
  {
    key: 'cerco',
    title: ['CERCO ELÉCTRICO'],
    mobileTitle: ['CERCO', 'ELÉCTRICO'],
    body: 'Cierre perimetral temporal para delimitar y proteger el predio.',
    mobileBody: 'Cierre perimetral de alta tensión para blindar el predio desde el día uno.'
  },
  {
    key: 'cctv',
    title: ['CCTV / VIDEOVIGILANCIA'],
    mobileTitle: ['CCTV /', 'VIDEOVIGILANCIA'],
    body: 'Monitoreo de cámaras con enfoque preventivo y control remoto.',
    mobileBody: 'Control preventivo del terreno y supervisión remota de la ejecución.'
  },
  {
    key: 'acceso',
    title: ['CONTROL DE ACCESO'],
    mobileTitle: ['CONTROL', 'DE ACCESO'],
    body: 'Registro y control de ingreso de personal y proveedores.',
    mobileBody: 'Registro estricto de contratistas, obreros y proveedores.'
  },
  {
    key: 'timelapse',
    title: ['TIMELAPSE DE OBRA'],
    mobileTitle: ['TIMELAPSE', 'DE OBRA'],
    body: 'Registro audiovisual del avance del proyecto para control y documentación.',
    mobileBody: 'Documentación visual del avance del proyecto para control e inversores.'
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
                  <span className={styles.leadLight}>Brindamos </span>
                  <span className={styles.leadStrong}>seguridad activa y monitoreo constante</span>
                  <span className={styles.leadLight}>
                    {' '}
                    en obras, previniendo robos, vandalismo e intrusiones durante todo el desarrollo.
                  </span>
                </p>
              </div>

              <div className={styles.mobileOnly}>
                <p className={styles.mobileLead}>
                  Protección desde
                  <br />
                  el primer día.
                </p>
                <p className={styles.mobileBody}>
                  <span className={styles.mobileBodyLight}>Brindamos </span>
                  <span className={styles.mobileBodyStrong}>seguridad activa y monitoreo constante</span>
                  <span className={styles.mobileBodyLight}>
                    {' '}
                    en obras, previniendo robos, vandalismo e intrusiones durante todo el desarrollo.
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
