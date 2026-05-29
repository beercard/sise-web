import Image from 'next/image';
import Link from 'next/link';

import SiteHeader from './components/SiteHeader/SiteHeader';

import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <section className={styles.hero} aria-label="Hero">
          <Image
            src="/image/mpr027zv-tyj9vj2.png"
            alt=""
            className={styles.heroImage}
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroGradient} aria-hidden="true" />
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleRegular}>
              Soluciones en seguridad electrónica&nbsp;
            </span>
            <span className={styles.heroTitleBold}>accesible, moderna y humana</span>
            <span className={styles.heroTitleRegular}>.</span>
          </h1>
        </section>

        <section className={styles.quote} aria-label="Cotizador">
          <h2 className={styles.quoteTitle}>Cotizá tu alarma</h2>
          <p className={styles.quoteSubtitle}>COTIZADOR ONLINE – SOLO ALARMAS</p>

          <div className={styles.quoteBox}>
            <p className={styles.quoteKicker}>Tipo de propiedad</p>
            <p className={styles.quoteQuestion}>¿Dónde querés instalar la alarma?</p>

            <div className={styles.quoteOptions} role="group" aria-label="Tipo de propiedad">
              <button className={styles.quoteOption} type="button">
                Casa
              </button>
              <button className={styles.quoteOption} type="button">
                Comercio
              </button>
              <button className={styles.quoteOption} type="button">
                Departamento
              </button>
              <button className={styles.quoteOption} type="button">
                Oficina
              </button>
            </div>
          </div>
        </section>

        <section className={styles.whyChoose} aria-label="Por qué elegir SISE">
          <div className={styles.whyChooseInner}>
            <h2 className={styles.whyChooseTitle}>¿Por qué elegir SISE?</h2>

            <div className={styles.whyChooseCards}>
              <article className={styles.whyChooseCard}>
                <Image
                  src="/image/mpr027zv-zfkbktb.png"
                  alt=""
                  className={styles.whyChooseIcon}
                  width={63}
                  height={55}
                />
                <h3 className={styles.whyChooseCardTitle}>Monitoreo 24/7 real</h3>
                <p className={styles.whyChooseCardText}>
                  Operadores especializados supervisan en tiempo real para prevenir, no
                  solo registrar.
                </p>
              </article>

              <article className={styles.whyChooseCardAlt}>
                <Image
                  src="/image/mpr027zv-24x9sa2.png"
                  alt=""
                  className={styles.whyChooseIconAlt}
                  width={40}
                  height={82}
                />
                <h3 className={styles.whyChooseCardTitleAlt}>
                  Tecnología de última generación
                </h3>
                <p className={styles.whyChooseCardTextAlt}>
                  Soluciones modernas, fáciles de usar y pensadas para vos.
                </p>
              </article>

              <article className={styles.whyChooseCardAlt2}>
                <Image
                  src="/image/mpr027zv-xilwxfu.png"
                  alt=""
                  className={styles.whyChooseIconAlt2}
                  width={52}
                  height={62}
                />
                <h3 className={styles.whyChooseCardTitleAlt2}>Respuesta rápida y humana</h3>
                <p className={styles.whyChooseCardTextAlt2}>
                  Actuamos al instante ante cualquier evento, brindando seguridad
                  constante.
                </p>
              </article>
            </div>

            <Image
              src="/image/mpr027zv-e2to3ki.png"
              alt=""
              className={styles.bandStrip1}
              width={1934}
              height={142}
            />
            <Image
              src="/image/mpr027zv-e2to3ki.png"
              alt=""
              className={styles.bandStrip2}
              width={1934}
              height={142}
            />
            <Image
              src="/image/mpr027zv-e2to3ki.png"
              alt=""
              className={styles.bandStrip3}
              width={1934}
              height={142}
            />
            <Image
              src="/image/mpr027zv-e2to3ki.png"
              alt=""
              className={styles.bandStrip4}
              width={1934}
              height={142}
            />

            <div className={styles.categoriesRow}>
              <Link className={styles.categoryCardHogar} href="#hogar" id="hogar">
                <Image
                  src="/image/mpr027zv-o3zo3d3.png"
                  alt=""
                  className={styles.categoryTopImage}
                  width={256}
                  height={222}
                />
                <Image
                  src="/image/mpr027zv-y10zsrg.png"
                  alt="SISE Hogar"
                  className={styles.categoryLogoHogar}
                  width={107}
                  height={47}
                />
              </Link>

              <Link className={styles.categoryCardEmpresas} href="#empresas" id="empresas">
                <Image
                  src="/image/mpr027zv-j0j5y64.png"
                  alt=""
                  className={styles.categoryTopImage}
                  width={256}
                  height={222}
                />
                <Image
                  src="/image/mpr027zv-8dc81fc.png"
                  alt="SISE Empresas"
                  className={styles.categoryLogoEmpresas}
                  width={104}
                  height={45}
                />
              </Link>

              <Link className={styles.categoryCardUrbano} href="#urbano" id="urbano">
                <Image
                  src="/image/mpr027zp-xpul2cf.png"
                  alt="SISE Urbano"
                  width={256}
                  height={285}
                />
              </Link>

              <Link className={styles.categoryCardAgro} href="#agro" id="agro">
                <Image
                  src="/image/mpr027zv-n7crbeg.png"
                  alt=""
                  className={styles.categoryTopImageAgro}
                  width={256}
                  height={221}
                />
                <Image
                  src="/image/mpr027zv-qr7hyq4.png"
                  alt="SISE Agro"
                  className={styles.categoryLogoAgro}
                  width={106}
                  height={50}
                />
              </Link>

              <Link className={styles.categoryCardCiudad} href="#ciudad" id="ciudad">
                <Image
                  src="/image/mpr027zv-zs0bqjf.png"
                  alt=""
                  className={styles.categoryTopImage}
                  width={256}
                  height={222}
                />
                <Image
                  src="/image/mpr027zv-vzj6kyz.png"
                  alt="SISE Ciudad"
                  className={styles.categoryLogoCiudad}
                  width={102}
                  height={49}
                />
              </Link>
            </div>
          </div>
        </section>
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
              Avenida 9 de julio 2514, Resistencia, Chaco.
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
                <p className={styles.footerPhoneNumber}>0800-222-5153</p>
              </div>
            </div>

            <div className={styles.footerCenterBottom}>
              <Link className={styles.footerSmallLink} href="#baja">
                Solicitar Baja de Servicio
              </Link>
              <div className={styles.footerDividerSmall} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.footerLegales}>
            <Link className={styles.footerSmallLink} href="#legales" id="legales">
              Legales
            </Link>
            <Image
              src="/image/mpr027zq-24241pb.svg"
              alt=""
              className={styles.footerSocial1}
              width={38}
              height={38}
            />
          </div>

          <div className={styles.footerDivider2} aria-hidden="true" />

          <Image
            src="/image/mpr027zq-wrx922f.svg"
            alt=""
            className={styles.footerSocial2}
            width={37}
            height={38}
          />
          <Image
            src="/image/mpr027zq-2s75f6y.svg"
            alt=""
            className={styles.footerSocial3}
            width={29}
            height={34}
          />

          <div className={styles.footerRight} id="contacto">
            <div className={styles.footerRightIcons}>
              <Image
                src="/image/mpr027zq-tjycpem.svg"
                alt=""
                className={styles.footerRightIcon1}
                width={37}
                height={26}
              />
              <Image
                src="/image/mpr027zq-sdf4kqo.svg"
                alt=""
                className={styles.footerRightIcon2}
                width={38}
                height={28}
              />
            </div>
            <p className={styles.footerAfip}>
              AFIP
              <br />
              Formulario 960/D
            </p>
            <Image
              src="/image/mpr027zv-ibvx8vh.png"
              alt=""
              className={styles.footerAfipImage}
              width={76}
              height={76}
            />
            <Link className={styles.footerSmallLink} href="#cookies">
              Gestión de Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
