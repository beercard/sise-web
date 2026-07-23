import Image from 'next/image';
import Link from 'next/link';

import styles from '../../page.module.scss';

export default function SiteFooter() {
  return (
    <footer className={styles.footer} aria-label="Pie de página">
      <div className={styles.footerInner}>
        <div className={styles.footerDesktopGroup} aria-label="Footer desktop">
          <div className={styles.footerTopRow}>
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
            </div>

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

            <div className={styles.footerRight} id="contacto">
              <div className={styles.footerSocialRow} aria-label="Redes sociales">
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
                <a
                  href="https://www.youtube.com/@SISEArgentina"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube SISE Argentina"
                  className={styles.footerDesktopSocial}
                >
                  <Image
                    src="/image/mpr027zq-tjycpem.svg"
                    alt=""
                    className={styles.footerSocial4}
                    width={37}
                    height={26}
                  />
                </a>
                <a
                  href="mailto:info@siseargentina.com"
                  aria-label="Email info@siseargentina.com"
                  className={styles.footerDesktopSocial}
                >
                  <Image
                    src="/image/mpr027zq-sdf4kqo.svg"
                    alt=""
                    className={styles.footerSocial5}
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
            </div>
          </div>

          <div className={styles.footerBottomRow}>
            <Link
              className={styles.footerBottomLinkArrepentimiento}
              href="/arrepentimiento"
            >
              Arrepentimiento de Compra/Revocación
            </Link>
            <div className={styles.footerBottomDivider} aria-hidden="true" />
            <Link className={styles.footerBottomLinkBaja} href="/baja">
              Solicitar Baja de Servicio
            </Link>
            <div className={styles.footerBottomDivider} aria-hidden="true" />
            <Link className={styles.footerBottomLinkLegales} href="/legales">
              Legales
            </Link>
            <div className={styles.footerBottomDivider} aria-hidden="true" />
            <Link className={styles.footerBottomLinkCookies} href="/cookies">
              Gestión de Cookies
            </Link>
          </div>
        </div>

        <div className={styles.footerMobileGroup} aria-label="Footer mobile">
          <Image
            src="/image/mpr027zv-1hix4r9.png"
            alt="Grupo SISE"
            className={styles.footerMobileLogo}
            width={185}
            height={50}
          />

          <p className={styles.footerMobileText}>
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

          <div className={styles.footerMobileBottom}>
            <div className={styles.footerMobileLegalColumn} aria-label="Links legales">
              <Link className={`${styles.footerMobileSmallLink} ${styles.footerMobileArrepentimiento}`} href="/arrepentimiento">
                Arrepentimiento de Compra/Revocación
              </Link>
              <Link className={`${styles.footerMobileSmallLink} ${styles.footerMobileBaja}`} href="/baja">
                Solicitar Baja de Servicio
              </Link>
              <Link className={`${styles.footerMobileSmallLink} ${styles.footerMobileCookies}`} href="/cookies">
                Gestión de Cookies
              </Link>
              <Link className={`${styles.footerMobileSmallLink} ${styles.footerMobileLegales}`} href="/legales">
                Legales
              </Link>
            </div>

            <div className={styles.footerMobileAfipBlock}>
              <p className={styles.footerMobileAfip}>
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
                  className={styles.footerMobileAfipImage}
                  width={76}
                  height={76}
                />
              </a>
            </div>
          </div>

          <div className={styles.footerMobileSocials} aria-label="Redes sociales" id="contacto-mobile">
            <a
              href="https://www.instagram.com/sise.argentina"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram SISE Argentina"
              className={styles.footerMobileSocialLink}
            >
              <Image
                src="/image/mpr027zq-24241pb.svg"
                alt=""
                className={styles.footerMobileIconInstagram}
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.facebook.com/sise.argentina"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook SISE Argentina"
              className={styles.footerMobileSocialLink}
            >
              <Image
                src="/image/mpr027zq-wrx922f.svg"
                alt=""
                className={styles.footerMobileIconFacebook}
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.youtube.com/@SISEArgentina"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube SISE Argentina"
              className={styles.footerMobileSocialLink}
            >
              <Image
                src="/image/mpr027zq-tjycpem.svg"
                alt=""
                className={styles.footerMobileIconYoutube}
                width={24}
                height={16}
              />
            </a>
            <a
              href="mailto:info@siseargentina.com"
              aria-label="Email info@siseargentina.com"
              className={styles.footerMobileSocialLink}
            >
              <Image
                src="/image/mpr027zq-sdf4kqo.svg"
                alt=""
                className={styles.footerMobileIconMail}
                width={24}
                height={18}
              />
            </a>
            <a
              href="https://www.tiktok.com/@sise.argentina"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok SISE Argentina"
              className={styles.footerMobileSocialLink}
            >
              <Image
                src="/image/mpr027zq-2s75f6y.svg"
                alt=""
                className={styles.footerMobileIconTiktok}
                width={18}
                height={22}
              />
            </a>
          </div>
        </div>

        <p className={styles.footerCredit}>
          Desarrollo por{' '}
          <a
            className={styles.footerCreditLink}
            href="https://vektra.digital"
            target="_blank"
            rel="noreferrer"
          >
            Vektra Digital
          </a>
        </p>
      </div>
    </footer>
  );
}

