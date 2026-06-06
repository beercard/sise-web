import Image from 'next/image';
import Link from 'next/link';

import styles from './WhyChooseSise.module.scss';

export default function WhyChooseSise() {
  return (
    <section className={styles.section} aria-label="Por qué elegir SISE" id="porque-sise">
      <div className={styles.inner}>
        <h2 className={styles.title}>¿Por qué elegir SISE?</h2>

        <div className={styles.cards}>
          <article className={styles.card}>
            <Image
              src="/image/mpr027zv-zfkbktb.png"
              alt=""
              className={styles.cardIcon}
              width={63}
              height={55}
            />
            <h3 className={styles.cardTitle}>Monitoreo 24/7 real</h3>
            <p className={styles.cardText}>
              Operadores especializados supervisan en tiempo real para prevenir, no solo
              registrar.
            </p>
          </article>

          <article className={styles.cardAlt}>
            <Image
              src="/image/mpr027zv-24x9sa2.png"
              alt=""
              className={styles.cardIconAlt}
              width={40}
              height={82}
            />
            <h3 className={styles.cardTitleAlt}>Tecnología de última generación</h3>
            <p className={styles.cardTextAlt}>Soluciones modernas, fáciles de usar y pensadas para vos.</p>
          </article>

          <article className={styles.cardAlt2}>
            <Image
              src="/image/mpr027zv-xilwxfu.png"
              alt=""
              className={styles.cardIconAlt2}
              width={52}
              height={62}
            />
            <h3 className={styles.cardTitleAlt2}>Respuesta rápida y humana</h3>
            <p className={styles.cardTextAlt2}>
              Actuamos al instante ante cualquier evento, brindando seguridad constante.
            </p>
          </article>
        </div>

        <Image
          src="/image/mpr027zv-e2to3ki.png"
          alt=""
          className={styles.bandStrip1}
          width={1934}
          height={142}
          priority={false}
        />
        <Image
          src="/image/mpr027zv-e2to3ki.png"
          alt=""
          className={styles.bandStrip2}
          width={1934}
          height={142}
          priority={false}
        />
        <Image
          src="/image/mpr027zv-e2to3ki.png"
          alt=""
          className={styles.bandStrip3}
          width={1934}
          height={142}
          priority={false}
        />
        <Image
          src="/image/mpr027zv-e2to3ki.png"
          alt=""
          className={styles.bandStrip4}
          width={1934}
          height={142}
          priority={false}
        />

        <div className={styles.categoriesDesktop}>
          <Link className={styles.categoryCardHogar} href="#hogar">
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

          <Link className={styles.categoryCardEmpresas} href="#empresas">
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

          <Link className={styles.categoryCardUrbano} href="#urbano">
            <Image src="/image/mpr027zp-xpul2cf.png" alt="SISE Urbano" width={256} height={285} />
          </Link>

          <Link className={styles.categoryCardAgro} href="#agro">
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

          <Link className={styles.categoryCardCiudad} href="#ciudad">
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

        <div className={styles.categoriesMobile}>
          <Link className={styles.categoryCardHogarMobile} href="#hogar">
            <div className={styles.categoryImageWrap}>
              <Image
                src="/image/mpr027zv-o3zo3d3.png"
                alt=""
                fill
                sizes="220px"
                className={styles.categoryImageFill}
              />
            </div>
            <div className={styles.categoryLogoWrap}>
              <Image
                src="/image/mpr027zv-y10zsrg.png"
                alt="SISE Hogar"
                width={92}
                height={40}
                className={styles.categoryLogoFill}
              />
            </div>
          </Link>

          <Link className={styles.categoryCardEmpresasMobile} href="#empresas">
            <div className={styles.categoryImageWrap}>
              <Image
                src="/image/mpr027zv-j0j5y64.png"
                alt=""
                fill
                sizes="220px"
                className={styles.categoryImageFill}
              />
            </div>
            <div className={styles.categoryLogoWrap}>
              <Image
                src="/image/mpr027zv-8dc81fc.png"
                alt="SISE Empresas"
                width={92}
                height={40}
                className={styles.categoryLogoFill}
              />
            </div>
          </Link>

          <Link className={styles.categoryCardUrbanoMobile} href="#urbano">
            <div className={styles.categoryImageWrap}>
              <Image
                src="/image/mpr027zp-xpul2cf.png"
                alt="SISE Urbano"
                fill
                sizes="220px"
                className={`${styles.categoryImageFill} ${styles.categoryUrbanoTop}`}
              />
            </div>
            <div className={styles.categoryLogoWrap}>
              <Image
                src="/image/mpr027zp-xpul2cf.png"
                alt=""
                fill
                sizes="220px"
                className={`${styles.categoryImageFill} ${styles.categoryUrbanoBottom}`}
              />
            </div>
          </Link>

          <Link className={styles.categoryCardAgroMobile} href="#agro">
            <div className={styles.categoryImageWrap}>
              <Image
                src="/image/mpr027zv-n7crbeg.png"
                alt=""
                fill
                sizes="220px"
                className={styles.categoryImageFill}
              />
            </div>
            <div className={styles.categoryLogoWrap}>
              <Image
                src="/image/mpr027zv-qr7hyq4.png"
                alt="SISE Agro"
                width={92}
                height={40}
                className={styles.categoryLogoFill}
              />
            </div>
          </Link>

          <Link className={styles.categoryCardCiudadMobile} href="#ciudad">
            <div className={styles.categoryImageWrap}>
              <Image
                src="/image/mpr027zv-zs0bqjf.png"
                alt=""
                fill
                sizes="220px"
                className={styles.categoryImageFill}
              />
            </div>
            <div className={styles.categoryLogoWrap}>
              <Image
                src="/image/mpr027zv-vzj6kyz.png"
                alt="SISE Ciudad"
                width={92}
                height={40}
                className={styles.categoryLogoFill}
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
