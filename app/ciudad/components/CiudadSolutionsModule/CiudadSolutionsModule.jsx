import styles from './CiudadSolutionsModule.module.scss';

/*
 * 19 bandas: es lo que pide el diseño mobile (nodo 5026:645), donde llenan
 * justo el área de las cards — 19 × 55px + 18 separaciones de 2px = 1081px.
 * En el resto de los breakpoints sólo se ven las tres primeras.
 */
const WATERMARK_ROWS = Array.from({ length: 19 }, (_, index) => `row-${index + 1}`);

const solutions = [
  {
    key: 'puntos',
    title: ['PUNTOS SEGUROS'],
    mobileTitle: ['PUNTOS SEGUROS'],
    body:
      'Espacios equipados y monitoreados que permiten a los ciudadanos solicitar asistencia ante emergencias, conectados al centro de monitoreo.',
    mobileBody: 'Asistencia ciudadana inmediata con conexión directa a nuestra central.'
  },
  {
    key: 'paradas',
    title: ['PARADAS SEGURAS'],
    mobileTitle: ['PARADAS SEGURAS'],
    body:
      'Infraestructura de seguridad en transporte público que mejora la protección de los usuarios.',
    mobileBody: 'Monitoreo y prevención activa en refugios de transporte público.'
  },
  {
    key: 'urbana',
    title: ['VIDEOVIGILANCIA URBANA'],
    mobileTitle: ['VIDEOVIGILANCIA', 'URBANA'],
    body:
      'Red de cámaras para monitoreo de espacios públicos, prevención del delito y respuesta en tiempo real.',
    mobileBody: 'Red de cámaras en vía pública para prevenir el delito en tiempo real.'
  },
  {
    key: 'gps',
    title: ['GPS INSTITUCIONAL'],
    mobileTitle: ['GPS INSTITUCIONAL'],
    body:
      'Control y seguimiento de flota pública, optimizando recursos y detectando desvíos.',
    mobileBody: 'Control satelital de flota oficial para auditar recorridos y optimizar recursos.'
  },
  {
    key: 'accesos',
    title: ['CONTROL DE ACCESOS'],
    mobileTitle: ['CONTROL DE ACCESOS'],
    body:
      'Gestión de ingresos en dependencias oficiales, mejorando el control y la seguridad.',
    mobileBody: 'Gestión estricta de ingresos y seguridad en dependencias oficiales.'
  }
];

export default function CiudadSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para ciudades y municipios">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <div className={styles.desktopOnly}>
                <p className={styles.lead}>
                  <span className={styles.leadLight}>Desarrollamos infraestructura para la </span>
                  <span className={styles.leadStrong}>prevención del delito</span>
                  <span className={styles.leadLight}> y el </span>
                  <span className={styles.leadStrong}>control del espacio público</span>
                  <span className={styles.leadLight}>, trabajando junto a gobiernos y organismos.</span>
                </p>
              </div>

              <div className={styles.mobileOnly}>
                <p className={styles.mobileBody}>
                  <span className={styles.mobileBodyLight}>Desarrollamos infraestructura para la </span>
                  <span className={styles.mobileBodyStrong}>prevención del delito</span>
                  <span className={styles.mobileBodyLight}> y el </span>
                  <span className={styles.mobileBodyStrong}>control del espacio público</span>
                  <span className={styles.mobileBodyLight}>, trabajando junto a gobiernos y organismos.</span>
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
