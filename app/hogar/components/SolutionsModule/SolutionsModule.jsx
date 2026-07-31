import styles from './SolutionsModule.module.scss';

/*
 * 18 bandas: es lo que pide el diseño mobile (nodo 5013:470), donde llenan
 * justo el área de las cards — 18 × 55px + 17 separaciones de 2px = 1024px.
 * En el resto de los breakpoints sólo se ven las tres primeras.
 */
const WATERMARK_ROWS = Array.from({ length: 18 }, () => 'SISE SISE SISE SISE SISE');

const hogarSolutions = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    mobileTitle: ['MONITOREO', 'DE ALARMAS'],
    body:
      'Supervisión permanente las 24 horas desde nuestro centro de monitoreo. Ante cualquier evento, activamos protocolos de respuesta inmediata para asistir y dar aviso.',
    mobileBody: 'Tu casa conectada con respuesta inmediata.'
  },
  {
    key: 'cctv',
    title: ['CCTV / VIDEOVIGILANCIA'],
    mobileTitle: ['CCTV / VIDEOVIGILANCIA'],
    body:
      'Cámaras con acceso remoto que permiten ver en tiempo real lo que sucede en tu hogar y contar con grabaciones ante cualquier incidente.',
    mobileBody: 'Mirá tu casa en tiempo real desde el celular.'
  },
  {
    key: 'cerco',
    title: ['Cerco\u00A0eléctrico/', 'monitoreado'],
    mobileTitle: ['Cerco\u00A0eléctrico/', 'monitoreado'],
    body:
      'Protección perimetral que disuade y detecta intrusiones antes de que ocurran. Puede integrarse al monitoreo de alarmas para alertas inmediatas.',
    mobileBody: 'Barrera perimetral disuasiva conectada a nuestra central.'
  },
  {
    key: 'barrio',
    title: ['SISTEMA DE BARRIO SEGURO'],
    mobileTitle: ['SISTEMA DE', 'BARRIO SEGURO'],
    body:
      'Solución colaborativa que integra cámaras conectadas a un monitoreo centralizado para mayor cobertura y prevención.',
    mobileBody: 'Cámaras vecinales con monitoreo compartido.'
  },
  {
    key: 'desocupadas',
    title: ['MONITOREO DE', 'PROPIEDADES DESOCUPADAS'],
    mobileTitle: ['MONITOREO DE', 'PROPIEDADES', 'DESOCUPADAS'],
    body:
      'Protección para casas en venta, alquiler o terrenos, evitando intrusiones, vandalismo u ocupaciones.',
    mobileBody: 'Prevención a distancia contra usurpaciones y robos.'
  }
];

export default function SolutionsModule() {
  return (
    <section className={styles.section} aria-label="Soluciones para el hogar">
      <div className={styles.canvas}>
        <div className={styles.copyBlock}>
          <div className={styles.intro}>
            <div className={styles.copyMain}>
              <div className={styles.desktopOnly}>
                <p className={styles.lead}>
                  <span className={styles.leadLight}>La seguridad de tu hogar no es solo tecnología, </span>
                  <span className={styles.leadStrong}>es la paz de tu familia.</span>
                </p>
                <p className={styles.punch}>Con SISE, no solo alertamos: actuamos.</p>
              </div>

              <div className={styles.mobileOnly}>
                <p className={styles.mobileLead}>Con SISE, no solo alertamos: actuamos.</p>
              </div>
            </div>

            <div className={styles.desktopOnly}>
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
                <span className={styles.bodyLight}>, para que puedas trabajar, viajar o descansar con la certeza de que </span>
                <span className={styles.bodyStrong}>un equipo experto cuida lo que más querés en todo momento</span>
                <span className={styles.bodyLight}>.</span>
              </p>
            </div>

            <div className={styles.mobileOnly}>
              <p className={styles.mobileBody}>
                Monitoreo profesional 24/7 con respuesta inmediata y control total desde tu celular.
                <br />
                <br />
                Viví, viajá y descansá tranquilo; tu hogar está respaldado por expertos.
              </p>
            </div>
          </div>
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
