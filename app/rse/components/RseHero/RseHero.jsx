import Image from 'next/image';

import styles from '../../page.module.scss';

export default function RseHero() {
  return (
    <section className={styles.hero} aria-label="Responsabilidad Social Empresarial">
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src="/image/mq2twaum-fdvb03h.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroCopy}>
        <h1 className={styles.heroTitle}>
          Responsabilidad
          <br />
          Social
          <br />
          Empresarial
        </h1>

        <p className={styles.heroParagraph}>
          En SISE Argentina entendemos que la seguridad también implica compromiso con la
          comunidad, el ambiente y el desarrollo social.
        </p>

        <p className={styles.heroParagraph}>
          Por eso, llevamos adelante acciones sostenidas de Responsabilidad Social Empresarial
          orientadas a generar un <strong>impacto positivo real</strong>, promoviendo la
          inclusión, la educación, el deporte y el cuidado del entorno.
        </p>
      </div>
    </section>
  );
}
