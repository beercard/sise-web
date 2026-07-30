import styles from './CiudadSolutionsModule.module.scss';

const WATERMARK_ROWS = ['row-1', 'row-2', 'row-3'];

const solutions = [
  {
    key: 'urbana',
    title: ['VIDEOVIGILANCIA', 'URBANA'],
    body:
      'Cámaras en accesos, avenidas y puntos críticos, integradas a un centro de monitoreo para la prevención del delito.'
  },
  {
    key: 'puntos',
    title: ['PUNTOS', 'SEGUROS'],
    body:
      'Espacios equipados y monitoreados que permiten solicitar asistencia ante una emergencia.'
  },
  {
    key: 'paradas',
    title: ['PARADAS', 'SEGURAS'],
    body:
      'Infraestructura de seguridad en el transporte público que mejora la protección de los usuarios.'
  },
  {
    key: 'gps',
    title: ['GPS', 'INSTITUCIONAL'],
    body:
      'Control y seguimiento de la flota pública, optimizando recursos y detectando desvíos.'
  },
  {
    key: 'centro',
    title: ['CENTRO DE', 'MONITOREO'],
    body:
      'Concentra cámaras y alertas de la ciudad en tiempo real para seguir eventos y coordinar entre áreas.'
  }
];

export default function CiudadSolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para ciudades y municipios">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <p className={styles.lead}>
                <span className={styles.leadLight}>En la ciudad, la seguridad se construye </span>
                <span className={styles.leadStrong}>con información en tiempo real</span>
                <span className={styles.leadLight}>.</span>
              </p>
            </div>

            <p className={styles.body}>
              <span className={styles.bodyLight}>En SISE acompañamos a municipios y organismos con soluciones para </span>
              <span className={styles.bodyStrong}>prevenir el delito</span>
              <span className={styles.bodyLight}>, </span>
              <span className={styles.bodyStrong}>leer el territorio</span>
              <span className={styles.bodyLight}> y </span>
              <span className={styles.bodyStrong}>coordinar la respuesta</span>
              <span className={styles.bodyLight}>.</span>
            </p>
          </div>

          <p className={styles.punch}>
            No se trata sólo de instalar cámaras,
            <br />
            sino de gestionar mejor el espacio público.
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
