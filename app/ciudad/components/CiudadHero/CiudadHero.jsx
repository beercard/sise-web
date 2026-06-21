'use client';

import Image from 'next/image';

import CiudadMonitoreoCarousel from '../CiudadMonitoreoCarousel/CiudadMonitoreoCarousel';

import styles from '../../page.module.scss';

export default function CiudadHero() {
  return (
    <section className={styles.hero} aria-label="SISE Ciudad">
      <div className={styles.heroMedia}>
        <Image src="/image/mq1jm0cy-0248t30.webp" alt="Videovigilancia urbana y monitoreo del espacio público en una ciudad" className={styles.heroImage} fill priority sizes="100vw" />
        <div className={styles.heroOverlayPrimary} aria-hidden="true" />
        <div className={styles.heroOverlaySecondary} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <Image
            src="/image/mq1jm0cn-9kqelux.png"
            alt="SISE Ciudad"
            className={styles.heroCityLogo}
            width={325}
            height={63}
          />

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>Tecnología aplicada a&nbsp;</span>
            <span className={styles.heroTitleStrong}>la seguridad urbana.</span>
          </h1>
        </div>
      </div>

      <div className={styles.heroBottom}>
        <div className={styles.heroBottomInner}>
          <p className={styles.heroBody}>
            Desarrollamos soluciones de videovigilancia urbana, monitoreo del espacio público y
            herramientas para municipios, gobiernos y organismos que buscan prevenir el delito y
            actuar con información en tiempo real.
          </p>
          <CiudadMonitoreoCarousel />
        </div>
      </div>
    </section>
  );
}
