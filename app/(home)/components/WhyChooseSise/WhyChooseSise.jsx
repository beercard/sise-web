'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './WhyChooseSise.module.scss';

const categoryLinks = {
  hogar: '/hogar',
  empresas: '/comercio',
  urbano: '/edificios',
  agro: '/agro',
  ciudad: '/ciudad'
};

const infoCards = [
  {
    id: 'monitoreo',
    cardClassName: 'card',
    iconClassName: 'cardIcon',
    iconSrc: '/image/why-monitoreo.svg',
    iconAlt: '',
    iconWidth: 71,
    iconHeight: 61,
    titleClassName: 'cardTitle',
    title: 'Monitoreo 24/7 real',
    textClassName: 'cardText',
    revealPanelClassName: 'modalPanel',
    revealTextClassName: 'modalText',
    text: (
      <>
        Operadores especializados supervisan <strong>en tiempo real</strong> para
        prevenir, no solo registrar.
      </>
    ),
    modalText: (
      <>
        Nuestro equipo no espera a que pase lo peor. Si detectamos un intento de
        intrusión, <strong>activamos los protocolos de respuesta al instante</strong>, te
        avisamos y enviamos asistencia <strong>antes de que la situación escale.</strong>
      </>
    )
  },
  {
    id: 'tecnologia',
    cardClassName: 'cardAlt',
    iconClassName: 'cardIconAlt',
    iconSrc: '/image/why-tecnologia.svg',
    iconAlt: '',
    iconWidth: 40,
    iconHeight: 82,
    titleClassName: 'cardTitleAlt',
    title: 'Tecnología de última generación',
    textClassName: 'cardTextAlt',
    revealPanelClassName: 'modalPanelAlt',
    revealTextClassName: 'modalTextAlt',
    text: (
      <>
        Soluciones <strong>modernas, fáciles de usar</strong> y pensadas para vos.
      </>
    ),
    modalText: (
      <>
        Olvidate de sistemas complejos. Desde cámaras inteligentes hasta la{' '}
        {/* En el diseño la coma entra dentro de la negrita. */}
        <strong>Cámara Campo con energía solar,</strong> todo lo gestionás de forma
        intuitiva con el <strong>control desde tu celular</strong> estés donde estés.
      </>
    )
  },
  {
    id: 'respuesta',
    cardClassName: 'cardAlt2',
    iconClassName: 'cardIconAlt2',
    iconSrc: '/image/why-respuesta.svg',
    iconAlt: '',
    iconWidth: 53,
    iconHeight: 62,
    titleClassName: 'cardTitleAlt2',
    title: (
      <>
        Respuesta
        <br />
        rápida y humana
      </>
    ),
    textClassName: 'cardTextAlt2',
    revealPanelClassName: 'modalPanelAlt2',
    revealTextClassName: 'modalTextAlt2',
    text: (
      <>
        Actuamos al instante ante cualquier evento, brindando{' '}
        <strong>seguridad constante.</strong>
      </>
    ),
    modalText: (
      <>
        {/* El diseño corta la linea despues de "Somos de Resistencia.". */}
        Somos de Resistencia.
        <br />
        Con nuestra base operativa local y{' '}
        <strong>más de 15 años de trayectoria</strong>, te garantizamos soporte técnico
        cercano y <strong>personas reales</strong> listas para asistirte cuando más lo
        necesitás.
      </>
    )
  }
];

export default function WhyChooseSise() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (!activeCard) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveCard(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCard]);

  return (
    <section className={styles.section} aria-label="Por qué elegir SISE" id="porque-sise">
      <div className={styles.inner}>
        <h2 className={styles.title}>¿Por qué elegir SISE?</h2>

        <div className={styles.cards}>
          {infoCards.map((card) => (
            <article
              key={card.id}
              className={`${styles[card.cardClassName]} ${
                activeCard === card.id ? styles.cardExpanded : ''
              }`}
            >
              <div className={styles.cardFront}>
                <div className={styles.cardIconWrap}>
                  <Image
                    src={card.iconSrc}
                    alt={card.iconAlt}
                    className={styles[card.iconClassName]}
                    width={card.iconWidth}
                    height={card.iconHeight}
                  />
                </div>
                <h3 className={styles[card.titleClassName]}>{card.title}</h3>
                <p className={styles[card.textClassName]}>{card.text}</p>
                <button
                  type="button"
                  className={styles.infoButton}
                  onClick={() => setActiveCard(card.id)}
                  aria-expanded={activeCard === card.id}
                >
                  + info
                </button>
              </div>

              <div
                className={`${styles[card.revealPanelClassName]} ${
                  activeCard === card.id ? styles.cardRevealActive : ''
                }`}
                aria-hidden={activeCard !== card.id}
              >
                <p className={styles[card.revealTextClassName]}>{card.modalText}</p>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setActiveCard(null)}
                >
                  Cerrar
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.bandStrip1} aria-hidden="true" />
        <div className={styles.bandStrip2} aria-hidden="true" />
        <div className={styles.bandStrip3} aria-hidden="true" />
        <div className={styles.bandStrip4} aria-hidden="true" />

        <div className={styles.categoriesSection}>
          <h3 className={`${styles.categoryHeading} ${styles.categoryHeadingDesktop}`}>
            Desarrollamos soluciones a medida
          </h3>

          <div className={styles.categoriesDesktop}>
            <Link className={styles.categoryCardHogar} href={categoryLinks.hogar}>
              <Image
                src="/image/mpr027zv-o3zo3d3.webp"
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

            <Link className={styles.categoryCardEmpresas} href={categoryLinks.empresas}>
              <Image
                src="/image/mpr027zv-j0j5y64.webp"
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

            <Link className={styles.categoryCardUrbano} href={categoryLinks.urbano}>
              <Image src="/image/mpr027zp-xpul2cf.webp" alt="SISE Urbano" width={256} height={285} />
            </Link>

            <Link className={styles.categoryCardAgro} href={categoryLinks.agro}>
              <Image
                src="/image/mpr027zv-n7crbeg.webp"
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

            <Link className={styles.categoryCardCiudad} href={categoryLinks.ciudad}>
              <Image
                src="/image/mpr027zv-zs0bqjf.webp"
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
            <Link className={styles.categoryCardHogarMobile} href={categoryLinks.hogar}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-o3zo3d3.webp"
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
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoHogarMobileImage}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardEmpresasMobile} href={categoryLinks.empresas}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-j0j5y64.webp"
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
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoEmpresasMobileImage}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardUrbanoMobile} href={categoryLinks.urbano}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zp-xpul2cf.webp"
                  alt="SISE Urbano"
                  fill
                  sizes="220px"
                  className={`${styles.categoryImageFill} ${styles.categoryUrbanoTop}`}
                />
              </div>
              <div className={styles.categoryLogoWrap}>
                <Image
                  src="/image/mpr027zp-xpul2cf.webp"
                  alt=""
                  fill
                  sizes="220px"
                  className={`${styles.categoryImageFill} ${styles.categoryUrbanoBottom}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardAgroMobile} href={categoryLinks.agro}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-n7crbeg.webp"
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
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoAgroMobileImage}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardCiudadMobile} href={categoryLinks.ciudad}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-zs0bqjf.webp"
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
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoCiudadMobileImage}`}
                />
              </div>
            </Link>
          </div>

          <div className={styles.categoriesMobileColumn}>
          <div className={styles.mobilePattern} aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => (
              <span
                key={`mobile-strip-${index}`}
                className={styles.mobilePatternStrip}
                style={{ top: `${index * 57}px` }}
              />
            ))}
          </div>

          <h3 className={`${styles.categoryHeading} ${styles.categoryHeadingMobile}`}>
            Desarrollamos soluciones a medida
          </h3>

          <div className={styles.mobileCategoryStack}>
            <Link className={styles.categoryCardHogarMobile} href={categoryLinks.hogar}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-o3zo3d3.webp"
                  alt=""
                  fill
                  sizes="169px"
                  className={styles.categoryImageFill}
                />
              </div>
              <div className={styles.categoryLogoWrap}>
                <Image
                  src="/image/mpr027zv-y10zsrg.png"
                  alt="SISE Hogar"
                  width={92}
                  height={40}
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoHogarMobileImage}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardEmpresasMobile} href={categoryLinks.empresas}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-j0j5y64.webp"
                  alt=""
                  fill
                  sizes="169px"
                  className={styles.categoryImageFill}
                />
              </div>
              <div className={styles.categoryLogoWrap}>
                <Image
                  src="/image/mpr027zv-8dc81fc.png"
                  alt="SISE Empresas"
                  width={92}
                  height={40}
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoEmpresasMobileImage}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardUrbanoMobile} href={categoryLinks.urbano}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zp-xpul2cf.webp"
                  alt="SISE Urbano"
                  fill
                  sizes="169px"
                  className={`${styles.categoryImageFill} ${styles.categoryUrbanoTop}`}
                />
              </div>
              <div className={styles.categoryLogoWrap}>
                <Image
                  src="/image/mpr027zp-xpul2cf.webp"
                  alt=""
                  fill
                  sizes="169px"
                  className={`${styles.categoryImageFill} ${styles.categoryUrbanoBottom}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardAgroMobile} href={categoryLinks.agro}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-n7crbeg.webp"
                  alt=""
                  fill
                  sizes="169px"
                  className={styles.categoryImageFill}
                />
              </div>
              <div className={styles.categoryLogoWrap}>
                <Image
                  src="/image/mpr027zv-qr7hyq4.png"
                  alt="SISE Agro"
                  width={92}
                  height={40}
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoAgroMobileImage}`}
                />
              </div>
            </Link>

            <Link className={styles.categoryCardCiudadMobile} href={categoryLinks.ciudad}>
              <div className={styles.categoryImageWrap}>
                <Image
                  src="/image/mpr027zv-zs0bqjf.webp"
                  alt=""
                  fill
                  sizes="169px"
                  className={styles.categoryImageFill}
                />
              </div>
              <div className={styles.categoryLogoWrap}>
                <Image
                  src="/image/mpr027zv-vzj6kyz.png"
                  alt="SISE Ciudad"
                  width={92}
                  height={40}
                  className={`${styles.categoryLogoFill} ${styles.categoryLogoCiudadMobileImage}`}
                />
              </div>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
