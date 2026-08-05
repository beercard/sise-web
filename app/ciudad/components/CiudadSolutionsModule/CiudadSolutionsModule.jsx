import styles from './CiudadSolutionsModule.module.scss';

/*
 * 19 bandas: es lo que pide el diseño mobile (nodo 5011:457), donde llenan
 * justo el área de las cards — 19 × 55px + 18 separaciones de 2px = 1081px.
 * En el resto de los breakpoints sólo se ven las tres primeras.
 */
const WATERMARK_ROWS = Array.from({ length: 19 }, (_, index) => `row-${index + 1}`);

/*
 * Título y cuerpo son iguales en desktop y mobile (Figma 5011:455 / 5011:457):
 * mismo texto corto, mismo corte de título en dos líneas en ambos breakpoints.
 */
const solutions = [
  {
    key: 'puntos',
    title: ['PUNTOS', 'SEGUROS'],
    body: 'Asistencia ciudadana inmediata con conexión directa a nuestra central.'
  },
  {
    key: 'paradas',
    title: ['PARADAS', 'SEGURAS'],
    body: 'Monitoreo y prevención activa en refugios de transporte público.'
  },
  {
    key: 'urbana',
    title: ['VIDEOVIGILANCIA', 'URBANA'],
    body: 'Red de cámaras en vía pública para prevenir el delito en tiempo real.'
  },
  {
    key: 'gps',
    title: ['GPS', 'INSTITUCIONAL'],
    body: 'Control satelital de flota oficial para auditar recorridos y optimizar recursos.'
  },
  {
    key: 'accesos',
    title: ['CONTROL', 'DE ACCESOS'],
    body: 'Gestión estricta de ingresos y seguridad en dependencias oficiales.'
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
                  Desarrollamos infraestructura para la prevención del delito y el control del
                  espacio público, trabajando junto a gobiernos y organismos.
                </p>
              </div>

              <div className={styles.mobileOnly}>
                <p className={styles.mobileBody}>
                  <span className={styles.mobileBodyLight}>Desarrollamos infraestructura para la </span>
                  <span className={styles.mobileBodyStrong}>prevención del delito y el control del espacio público</span>
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
                    {solution.title.map((line) => (
                      <span key={`${solution.key}-${line}`}>{line}</span>
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
