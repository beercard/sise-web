import styles from './SolutionsModule.module.scss';

const WATERMARK_ROWS = Array.from({ length: 18 }, () => 'SISE SISE SISE SISE SISE');

const hogarSolutions = [
  {
    key: 'alarmas',
    title: ['MONITOREO', 'DE ALARMAS'],
    mobileTitle: ['MONITOREO', 'DE ALARMAS'],
    body: 'Tu casa conectada con respuesta inmediata.',
    mobileBody: 'Tu casa conectada con respuesta inmediata.'
  },
  {
    key: 'cctv',
    title: ['CCTV / VIDEOVIGILANCIA'],
    mobileTitle: ['CCTV / VIDEOVIGILANCIA'],
    body: 'Mirá tu casa en tiempo real desde el celular.',
    mobileBody: 'Mirá tu casa en tiempo real desde el celular.'
  },
  {
    key: 'cerco',
    title: ['Cerco\u00A0eléctrico/', 'monitoreado'],
    mobileTitle: ['Cerco\u00A0eléctrico/', 'monitoreado'],
    body: 'Barrera perimetral disuasiva conectada a nuestra central.',
    mobileBody: 'Barrera perimetral disuasiva conectada a nuestra central.'
  },
  {
    key: 'barrio',
    title: ['SISTEMA DE BARRIO SEGURO'],
    mobileTitle: ['SISTEMA DE', 'BARRIO SEGURO'],
    body: 'Cámaras vecinales con monitoreo compartido.',
    mobileBody: 'Cámaras vecinales con monitoreo compartido.'
  },
  {
    key: 'desocupadas',
    title: ['MONITOREO DE', 'PROPIEDADES DESOCUPADAS'],
    mobileTitle: ['MONITOREO DE', 'PROPIEDADES', 'DESOCUPADAS'],
    body: 'Prevención a distancia contra usurpaciones y robos.',
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
