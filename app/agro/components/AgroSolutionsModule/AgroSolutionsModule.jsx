import styles from './AgroSolutionsModule.module.scss';

/*
 * 15 bandas: es lo que pide el diseño mobile (nodo 5026:604), donde llenan
 * justo el área de las cards — 15 × 55px + 14 separaciones de 2px = 853px.
 * En el resto de los breakpoints sólo se ven las tres primeras.
 */
const WATERMARK_ROWS = Array.from({ length: 15 }, (_, index) => `row-${index + 1}`);

const solutions = [
  {
    key: 'cctv',
    title: ['CCTV RURAL'],
    mobileTitle: ['CCTV RURAL'],
    body: 'Vigilancia de accesos, galpones y zonas productivas con monitoreo remoto en tiempo real.',
    mobileBody: 'Control remoto en tiempo real de tranqueras, galpones y lotes.'
  },
  {
    key: 'camara',
    title: ['CÁMARA CAMPO'],
    mobileTitle: ['CÁMARA CAMPO'],
    body:
      'Sistema autónomo con energía solar y conectividad integrada, ideal para campos sin internet ni electricidad.',
    mobileBody: 'Vigilancia 100% autónoma (solar y 4G) para zonas sin infraestructura.'
  },
  {
    key: 'alarmas',
    title: ['ALARMAS RURALES'],
    mobileTitle: ['ALARMAS', 'RURALES'],
    body: 'Detección de intrusiones en instalaciones aisladas con alertas inmediatas.',
    mobileBody: 'Alerta inmediata contra intrusiones en galpones e instalaciones aisladas.'
  },
  {
    key: 'gps',
    title: ['GPS PARA MAQUINARIAS Y VEHÍCULOS'],
    mobileTitle: ['GPS PARA', 'MAQUINARIAS Y', 'VEHÍCULOS'],
    body: 'Seguimiento y control de flota para optimizar recursos y prevenir pérdidas.',
    mobileBody: 'Rastreo satelital de tractores y maquinaria para prevenir robos.'
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
