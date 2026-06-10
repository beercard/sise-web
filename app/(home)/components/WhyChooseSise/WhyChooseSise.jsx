'use client';

import { useEffect, useMemo, useState } from 'react';
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
    iconSrc: '/image/mpr027zv-zfkbktb.png',
    iconAlt: '',
    iconWidth: 63,
    iconHeight: 55,
    titleClassName: 'cardTitle',
    title: 'Monitoreo 24/7 real',
    textClassName: 'cardText',
    modalPanelClassName: 'modalPanel',
    modalSurfaceClassName: 'modalSurface',
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
        avisamos y enviamos asistencia <strong>antes de que la situación escale</strong>.
      </>
    )
  },
  {
    id: 'tecnologia',
    cardClassName: 'cardAlt',
    iconClassName: 'cardIconAlt',
    iconSrc: '/image/mpr027zv-24x9sa2.png',
    iconAlt: '',
    iconWidth: 40,
    iconHeight: 82,
    titleClassName: 'cardTitleAlt',
    title: 'Tecnología de última generación',
    textClassName: 'cardTextAlt',
    modalPanelClassName: 'modalPanelAlt',
    modalSurfaceClassName: 'modalSurfaceAlt',
    text: (
      <>
        Soluciones <strong>modernas, fáciles de usar</strong> y pensadas para vos.
      </>
    ),
    modalText: (
      <>
        Olvidate de sistemas complejos. Desde cámaras inteligentes hasta la{' '}
        <strong>Cámara Campo con energía solar</strong>, todo lo gestionás de forma
        intuitiva con el <strong>control desde tu celular</strong> estés donde estés.
      </>
    )
  },
  {
    id: 'respuesta',
    cardClassName: 'cardAlt2',
    iconClassName: 'cardIconAlt2',
    iconSrc: '/image/mpr027zv-xilwxfu.png',
    iconAlt: '',
    iconWidth: 52,
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
    modalPanelClassName: 'modalPanelAlt2',
    modalSurfaceClassName: 'modalSurfaceAlt2',
    text: (
      <>
        Actuamos al instante ante cualquier evento, brindando{' '}
        <strong>seguridad constante.</strong>
      </>
    ),
    modalText: (
      <>
        Somos de Resistencia. Con nuestra base operativa local y{' '}
        <strong>más de 15 años de trayectoria</strong>, te garantizamos soporte técnico
        cercano y <strong>personas reales</strong> listas para asistirte cuando más lo
        necesitás.
      </>
    )
  }
];

export default function WhyChooseSise() {
  const [activeModal, setActiveModal] = useState(null);

  const activeCard = useMemo(
    () => infoCards.find((card) => card.id === activeModal) ?? null,
    [activeModal]
  );

  useEffect(() => {
    if (!activeModal) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeModal]);

  return (
    <section className={styles.section} aria-label="Por qué elegir SISE" id="porque-sise">
      <div className={styles.inner}>
        <h2 className={styles.title}>¿Por qué elegir SISE?</h2>

        <div className={styles.cards}>
          {infoCards.map((card) => (
            <article key={card.id} className={styles[card.cardClassName]}>
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
                onClick={() => setActiveModal(card.id)}
                aria-haspopup="dialog"
                aria-expanded={activeModal === card.id}
              >
                + info
              </button>
            </article>
          ))}
        </div>

        {activeCard ? (
          <div
            className={styles.modalOverlay}
            role="presentation"
            onClick={() => setActiveModal(null)}
          >
            <div
              className={styles[activeCard.modalPanelClassName]}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`why-choose-modal-title-${activeCard.id}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.modalCloseOuter}
                aria-label="Cerrar modal"
                onClick={() => setActiveModal(null)}
              >
                ×
              </button>
              <div className={styles[activeCard.modalSurfaceClassName]}>
                <p
                  className={styles.modalText}
                  id={`why-choose-modal-title-${activeCard.id}`}
                >
                  {activeCard.modalText}
                </p>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setActiveModal(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        ) : null}

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
          <Link className={styles.categoryCardHogar} href={categoryLinks.hogar}>
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

          <Link className={styles.categoryCardEmpresas} href={categoryLinks.empresas}>
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

          <Link className={styles.categoryCardUrbano} href={categoryLinks.urbano}>
            <Image src="/image/mpr027zp-xpul2cf.png" alt="SISE Urbano" width={256} height={285} />
          </Link>

          <Link className={styles.categoryCardAgro} href={categoryLinks.agro}>
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

          <Link className={styles.categoryCardCiudad} href={categoryLinks.ciudad}>
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
          <Link className={styles.categoryCardHogarMobile} href={categoryLinks.hogar}>
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

          <Link className={styles.categoryCardEmpresasMobile} href={categoryLinks.empresas}>
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

          <Link className={styles.categoryCardUrbanoMobile} href={categoryLinks.urbano}>
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

          <Link className={styles.categoryCardAgroMobile} href={categoryLinks.agro}>
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

          <Link className={styles.categoryCardCiudadMobile} href={categoryLinks.ciudad}>
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
