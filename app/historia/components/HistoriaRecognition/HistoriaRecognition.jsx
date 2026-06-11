import Image from 'next/image';

import styles from '../../page.module.scss';

export default function HistoriaRecognition() {
  return (
    <section className={styles.recognition} aria-label="Reconocimientos">
      <h2 className={styles.recognitionTitle}>
        <span className={styles.recognitionTitleRegular}>Nuestro trabajo ha sido&nbsp;</span>
        <span className={styles.recognitionTitleStrong}>reconocido a nivel nacional.</span>
      </h2>

      <div className={styles.recognitionCards}>
        <article className={styles.recognitionCard}>
          <Image
            src="/image/mq2q87jo-26hyhjv.png"
            alt="CAME"
            width={317}
            height={245}
            className={styles.recognitionCardImageLeft}
          />
          <p className={styles.recognitionCardText}>
            <span className={styles.recognitionCardTextStrong}>Cámara Campo</span>
            <span className={styles.recognitionCardTextRegular}>
              &nbsp;fue destacada por CAME como un orgullo chaqueño por su&nbsp;
            </span>
            <span className={styles.recognitionCardTextStrong}>
              impacto y sustentabilidad
            </span>
          </p>
        </article>

        <article className={styles.recognitionCardWide}>
          <Image
            src="/image/mq2q87jo-3o2yg7o.webp"
            alt="CASEL"
            width={529}
            height={245}
            className={styles.recognitionCardImageRight}
          />
          <p className={styles.recognitionCardTextWide}>
            <span className={styles.recognitionCardTextRegular}>
              CASEL reconoció el aporte de SISE al
            </span>
            <span className={styles.recognitionCardTextStrong}>
              &nbsp;desarrollo de la seguridad privada
            </span>
            <span className={styles.recognitionCardTextRegular}>&nbsp;en el país.</span>
          </p>
        </article>
      </div>

      <p className={styles.recognitionParagraph}>
        No vendemos equipos sueltos. Ofrecemos soluciones completas con respaldo humano. Desde el
        diseño hasta el monitoreo, nos hacemos responsables de cada sistema.
      </p>
      <p className={styles.recognitionParagraphStrong}>
        Para que vos te enfoques en tu vida o en tu negocio, mientras nosotros nos ocupamos de la
        seguridad.
      </p>
    </section>
  );
}

