import Image from 'next/image';
import Link from 'next/link';

import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import Cotizador from './components/Cotizador/Cotizador';
import SiteHeader from './components/SiteHeader/SiteHeader';
import WhyChooseSise from './components/WhyChooseSise/WhyChooseSise';

import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        <HeroCarousel />

        <section className={styles.quote} aria-label="Cotizador">
          <h2 className={styles.quoteTitle}>Cotizá tu alarma</h2>
          <p className={styles.quoteSubtitle}>COTIZADOR ONLINE – SOLO ALARMAS</p>

          <Cotizador />
        </section>

        <WhyChooseSise />
      </main>

      <footer className={styles.footer} aria-label="Pie de página">
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <Image
              src="/image/mpr027zv-1hix4r9.png"
              alt="Grupo SISE"
              className={styles.footerLogo}
              width={185}
              height={50}
            />
            <p className={styles.footerText}>
              GRUPO SISE S.A.
              <br />
              CUIT: 30-71594907-1
              <br />
              Habilitación Provincial Disp. Nº E7-2025-868-Ae
              <br />
              Director Técnico: Sra. Mónica Bettina Schapsis.
              <br />
              <a
                className={styles.footerAddressLink}
                href="https://maps.app.goo.gl/e7NhrBiiP8tcg56V8"
                target="_blank"
                rel="noreferrer"
              >
                Avenida 9 de julio 2514, Resistencia, Chaco.
              </a>
            </p>
            <Link className={styles.footerLink} href="#arrepentimiento" id="arrepentimiento">
              Arrepentimiento de Compra/Revocación
            </Link>
          </div>

          <div className={styles.footerDivider1} aria-hidden="true" />

          <div className={styles.footerCenter}>
            <div className={styles.footerPhone}>
              <p className={styles.footerPhoneTitle}>Atención las 24hs</p>
              <div className={styles.footerPhoneRow}>
                <Image
                  src="/image/mpr027zp-r4gy8yz.svg"
                  alt=""
                  className={styles.footerPhoneIcon}
                  width={17}
                  height={23}
                />
                <a className={styles.footerPhoneNumber} href="tel:08002225153">
                  0800-222-5153
                </a>
              </div>
            </div>

            <div className={styles.footerCenterBottom}>
              <Link className={styles.footerSmallLink} href="#baja" id="baja">
                Solicitar Baja de Servicio
              </Link>
              <div className={styles.footerDividerSmall} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.footerLegales}>
            <Link className={styles.footerSmallLink} href="#legales" id="legales">
              Legales
            </Link>
          </div>

          <div className={styles.footerDivider2} aria-hidden="true" />

          <a
            href="https://www.instagram.com/sise.argentina"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram SISE Argentina"
            className={styles.footerDesktopSocial}
          >
            <Image
              src="/image/mpr027zq-24241pb.svg"
              alt=""
              className={styles.footerSocial1}
              width={38}
              height={38}
            />
          </a>
          <a
            href="https://www.facebook.com/sise.argentina"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook SISE Argentina"
            className={styles.footerDesktopSocial}
          >
            <Image
              src="/image/mpr027zq-wrx922f.svg"
              alt=""
              className={styles.footerSocial2}
              width={37}
              height={38}
            />
          </a>
          <a
            href="https://www.tiktok.com/@sise.argentina"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok SISE Argentina"
            className={styles.footerDesktopSocial}
          >
            <Image
              src="/image/mpr027zq-2s75f6y.svg"
              alt=""
              className={styles.footerSocial3}
              width={29}
              height={34}
            />
          </a>

          <div className={styles.footerRight} id="contacto">
            <div className={styles.footerRightIcons}>
              <a
                href="https://www.youtube.com/@SISEArgentina"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube SISE Argentina"
              >
                <Image
                  src="/image/mpr027zq-tjycpem.svg"
                  alt=""
                  className={styles.footerRightIcon1}
                  width={37}
                  height={26}
                />
              </a>
              <a href="mailto:info@siseargentina.com" aria-label="Email info@siseargentina.com">
                <Image
                  src="/image/mpr027zq-sdf4kqo.svg"
                  alt=""
                  className={styles.footerRightIcon2}
                  width={38}
                  height={28}
                />
              </a>
            </div>
            <p className={styles.footerAfip}>
              AFIP
              <br />
              Formulario 960/D
            </p>
            <a
              href="https://acrobat.adobe.com/id/urn:aaid:sc:va6c2:e782b67e-0a57-4a53-95f2-30d680c19f37"
              target="_blank"
              rel="noreferrer"
              aria-label="AFIP Formulario 960/D"
            >
              <Image
                src="/image/mpr027zv-ibvx8vh.png"
                alt=""
                className={styles.footerAfipImage}
                width={76}
                height={76}
              />
            </a>
            <Link className={styles.footerSmallLink} href="#cookies" id="cookies">
              Gestión de Cookies
            </Link>
          </div>

          <div className={styles.footerMobileGroup} aria-label="Footer mobile">
            <div className={styles.footerMobileSocials} aria-label="Redes sociales" id="contacto-mobile">
              <a
                href="https://www.instagram.com/sise.argentina"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram SISE Argentina"
              >
                <Image src="/image/mpr027zq-24241pb.svg" alt="" width={38} height={38} />
              </a>
              <a
                href="https://www.facebook.com/sise.argentina"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook SISE Argentina"
              >
                <Image src="/image/mpr027zq-wrx922f.svg" alt="" width={37} height={38} />
              </a>
              <a
                href="https://www.tiktok.com/@sise.argentina"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok SISE Argentina"
              >
                <Image src="/image/mpr027zq-2s75f6y.svg" alt="" width={29} height={34} />
              </a>
              <a
                href="https://www.youtube.com/@SISEArgentina"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube SISE Argentina"
              >
                <Image src="/image/mpr027zq-tjycpem.svg" alt="" width={37} height={26} />
              </a>
              <a href="mailto:info@siseargentina.com" aria-label="Email info@siseargentina.com">
                <Image src="/image/mpr027zq-sdf4kqo.svg" alt="" width={38} height={28} />
              </a>
            </div>

            <div className={styles.footerMobileLinks} aria-label="Links legales">
              <Link className={styles.footerSmallLink} href="#baja">
                Solicitar Baja de Servicio
              </Link>
              <Link className={styles.footerSmallLink} href="#legales">
                Legales
              </Link>
              <Link className={styles.footerSmallLink} href="#cookies">
                Gestión de Cookies
              </Link>
              <Link className={styles.footerSmallLink} href="#arrepentimiento">
                Arrepentimiento de Compra/Revocación
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
