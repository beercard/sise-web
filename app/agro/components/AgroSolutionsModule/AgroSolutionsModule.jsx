import styles from './AgroSolutionsModule.module.scss';

/*
 * 15 bandas: es lo que pide el diseño mobile (nodo 5014:470), donde llenan
 * justo el área de las cards — 15 × 55px + 14 separaciones de 2px = 853px.
 * En el resto de los breakpoints sólo se ven las tres primeras.
 */
const WATERMARK_ROWS = Array.from({ length: 15 }, (_, index) => `row-${index + 1}`);

/*
 * El cuerpo de cada card es el mismo texto corto en desktop y mobile (Figma
 * 5014:469 / 5014:470); el título sí difiere en la cantidad de renglones
 * según el breakpoint, así que ese sigue separado en desktopTitle/mobileTitle.
 */
const solutions = [
  {
    key: 'cctv',
    title: ['CCTV', 'RURAL'],
    mobileTitle: ['CCTV RURAL'],
    body: 'Control remoto en tiempo real de tranqueras, galpones y lotes.'
  },
  {
    key: 'camara',
    title: ['CÁMARA', 'CAMPO'],
    mobileTitle: ['CÁMARA CAMPO'],
    body: 'Vigilancia 100% autónoma (solar y 4G) para zonas sin infraestructura.'
  },
  {
    key: 'alarmas',
    title: ['ALARMAS', 'RURALES'],
    mobileTitle: ['ALARMAS', 'RURALES'],
    body: 'Alerta inmediata contra intrusiones en galpones e instalaciones aisladas.'
  },
  {
    key: 'gps',
    title: ['GPS PARA', 'MAQUINARIAS Y', 'VEHÍCULOS'],
    mobileTitle: ['GPS para maquinarias', 'y vehículos'],
    body: 'Rastreo satelital de tractores y maquinaria para prevenir robos.'
  }
];

export default function AgroSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para el campo">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <div className={styles.desktopOnly}>
                <p className={styles.lead}>
                  <span className={styles.leadLine1}>
                    Desarrollamos soluciones pensadas para entornos rurales, donde el desafío
                  </span>
                  <br className={styles.leadBreak} />
                  <span>es detectar a tiempo y actuar ante eventos que afectan al patrimonio.</span>
                </p>
              </div>

              <div className={styles.mobileOnly}>
                <p className={styles.mobileLead}>Seguridad sin límites, adaptada al campo.</p>
                <p className={styles.mobileBody}>
                  Desarrollamos soluciones pensadas para entornos rurales, donde el desafío es{' '}
                  <strong className={styles.mobileBodyStrong}>detectar a tiempo</strong> y{' '}
                  <strong className={styles.mobileBodyStrong}>
                    actuar ante eventos que afectan al patrimonio.
                  </strong>
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
