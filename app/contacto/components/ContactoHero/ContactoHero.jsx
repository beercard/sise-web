import Image from 'next/image';

import styles from '../../page.module.scss';

const PHONE_NUMBER = '0800-222-5153';
const WHATSAPP_NUMBER = '5493624231144';

export default function ContactoHero() {
  return (
    <section className={styles.hero} aria-label="Contacto SISE Argentina">
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src="/image/mq2wwuif-sspil3b.png"
          alt=""
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroCopy}>
        <h1 className={styles.heroTitle}>
          Contactate
          <br />
          con nosotros
        </h1>

        <p className={styles.heroLine}>
          <span>Atención las 24hs llamando al </span>
          <a className={styles.heroLink} href="tel:08002225153">
            {PHONE_NUMBER}
          </a>
        </p>

        <p className={styles.heroLine}>
          <span>Dejanos tu consulta por </span>
          <a
            className={styles.heroLink}
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
