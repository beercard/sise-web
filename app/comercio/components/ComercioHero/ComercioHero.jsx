'use client';

import Image from 'next/image';

import ComercioMonitoreoCarousel from '../ComercioMonitoreoCarousel/ComercioMonitoreoCarousel';

import styles from '../../page.module.scss';

export default function ComercioHero() {
  return (
    <section className={styles.hero} aria-label="SISE Comercio">
      <div className={styles.heroMedia}>
        <Image
          src="/image/mpvuunzj-eolvy7n.webp"
          alt="Cámaras de seguridad y alarma monitoreada en un comercio"
          className={styles.heroImage}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroGradient} aria-hidden="true" />

        <Image
          src="/image/mpvuunzj-tkfn7dr.png"
          alt="SISE Comercio"
          className={styles.heroKicker}
          width={416}
          height={64}
          priority
        />

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLight}>Seguridad que protege </span>
          <span className={styles.heroTitleStrong}>tu rentabilidad</span>
        </h1>
      </div>

      <div className={styles.heroBottom} aria-label="Información">
        <div className={styles.heroBottomInner}>
          <div className={styles.heroText}>
            <p className={styles.heroSectionTitle}>COMERCIOS</p>
            <div className={styles.heroDivider} aria-hidden="true" />
            <p className={styles.heroLead}>
              En comercios y negocios, la seguridad impacta directo en la continuidad y la
              rentabilidad.
            </p>
            <p className={styles.heroBody}>
              Implementamos alarmas monitoreadas, cámaras y control de accesos para locales, oficinas y depósitos, reduciendo riesgos en aperturas, cierres y operación diaria.
            </p>
            <p className={styles.heroPunch}>
              No se trata sólo de evitar robos,
              <br />
              sino de cuidar tu inversión todos los días.
            </p>
          </div>

          <ComercioMonitoreoCarousel />
        </div>
      </div>
    </section>
  );
}

