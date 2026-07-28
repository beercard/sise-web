import styles from './SolutionsModule.module.scss';

const WATERMARK_ROWS = ['SISE SISE SISE SISE SISE', 'SISE SISE SISE SISE SISE', 'SISE SISE SISE SISE SISE'];

const hogarSolutions = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    body:
      'Supervisión permanente las 24 horas desde nuestro centro de monitoreo. Ante cualquier evento, activamos protocolos de respuesta inmediata para asistir y dar aviso.'
  },
  {
    key: 'cctv',
    title: ['CCTV /', 'VIDEOVIGILANCIA'],
    body:
      'Cámaras con acceso remoto que permiten ver en tiempo real lo que sucede en tu hogar y contar con grabaciones ante cualquier incidente.'
  },
  {
    key: 'cerco',
    title: ['CERCO ELÉCTRICO /', 'MONITOREADO'],
    body:
      'Protección perimetral que disuade y detecta intrusiones antes de que ocurran. Puede integrarse al monitoreo de alarmas para alertas inmediatas.'
  },
  {
    key: 'barrio',
    title: ['SISTEMA DE', 'BARRIO SEGURO'],
    body:
      'Solución colaborativa que integra cámaras conectadas a un monitoreo centralizado para mayor cobertura y prevención.'
  },
  {
    key: 'desocupadas',
    title: ['MONITOREO DE', 'PROPIEDADES', 'DESOCUPADAS'],
    body:
      'Protección para casas en venta, alquiler o terrenos, evitando intrusiones, vandalismo u ocupaciones.'
  }
];

export default function SolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para el hogar">
      <div className={styles.canvas}>
        <div className={styles.intro}>
          <div className={styles.copyMain}>
            <p className={styles.lead}>
              <span className={styles.leadLight}>La seguridad de tu hogar no es solo tecnología, </span>
              <span className={styles.leadStrong}>es la paz de tu familia.</span>
            </p>
            <p className={styles.punch}>Con SISE, no solo alertamos: actuamos.</p>
          </div>

          <p className={styles.body}>
            <span className={styles.bodyLight}>Desarrollamos </span>
            <span className={styles.bodyStrong}>soluciones confiables</span>
            <span className={styles.bodyLight}>
              {' '}
              que protegen tu hogar antes, durante y después de cualquier intrusión.
              <br />
              <br />
              Nuestro sistema combina{' '}
            </span>
            <span className={styles.bodyStrong}>tecnología avanzada</span>
            <span className={styles.bodyLight}> con </span>
            <span className={styles.bodyStrong}>monitoreo profesional 24/7</span>
            <span className={styles.bodyLight}> y </span>
            <span className={styles.bodyStrong}>control total desde tu celular</span>
            <span className={styles.bodyLight}>
              , para que puedas trabajar, viajar o descansar con la certeza de que un equipo experto
              cuida lo que más querés en todo momento.
            </span>
          </p>
        </div>

        <div className={styles.gridArea}>
          <div className={styles.watermark} aria-hidden="true">
            {WATERMARK_ROWS.map((row, index) => (
              <p key={`${row}-${index}`} className={styles.watermarkRow}>
                {row}
              </p>
            ))}
          </div>

          <h2 className={styles.heading}>Soluciones:</h2>

          <div className={styles.grid}>
            {hogarSolutions.map((solution) => (
              <article key={solution.key} className={`${styles.cardGroup} ${styles[solution.key]}`}>
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
