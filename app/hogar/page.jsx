import Image from 'next/image';

import Cotizador from '../components/Cotizador/Cotizador';
import { buildPageMetadata } from '../lib/seo';

import MonitoreoCarousel from './components/MonitoreoCarousel/MonitoreoCarousel';
import TechnologyModule from './components/TechnologyModule/TechnologyModule';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Seguridad para el hogar',
  description:
    'Alarmas monitoreadas, sensores, sirenas, camaras y control desde tu celular para proteger tu hogar con monitoreo profesional 24/7.',
  path: '/hogar'
});

export default function HogarPage() {
  return (
    <div className={styles.hogar}>
      <section className={styles.hero} aria-label="SISE Hogar">
        <div className={styles.heroMedia}>
          <Image
            src="/image/mpudc5hr-8gb1yso.png"
            alt=""
            className={styles.heroImage}
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroGradient} aria-hidden="true" />

          <div className={styles.heroTitleGroup}>
            <Image
              src="/image/mpudc5hr-7mihfr3.png"
              alt="SISE Hogar"
              className={styles.heroLogo}
              width={334}
              height={60}
              priority
            />

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLight}>Protección integral para </span>
              <span className={styles.heroTitleStrong}>vivir con tranquilidad</span>
            </h1>
          </div>
        </div>

        <div className={styles.heroBottom} aria-label="Información">
          <div className={styles.heroBottomInner}>
            <div className={styles.heroText}>
              <p className={styles.heroLead}>
                <span className={styles.heroLeadLight}>
                  Una alarma monitoreada no es solo tecnología,&nbsp;
                </span>
                <span className={styles.heroLeadStrong}>es la paz de tu familia.</span>
              </p>

              <p className={styles.heroBody}>
                Desarrollamos soluciones confiables que protegen tu hogar antes, durante y después
                de cualquier intrusión.
                <br />
                <br />
                Nuestro sistema combina sensores, sirena, cámaras, monitoreo profesional 24/7 y
                control total desde tu celular, para que puedas trabajar, viajar o descansar con la
                certeza de que un equipo experto cuida lo que más querés en todo momento.
              </p>

              <p className={styles.heroPunch}>Con SISE, no solo alertamos: actuamos.</p>
            </div>

            <MonitoreoCarousel />
          </div>
        </div>
      </section>

      <TechnologyModule />

      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}
