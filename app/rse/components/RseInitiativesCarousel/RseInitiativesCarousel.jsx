'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const puenteImage = '/image/rse-puente.webp';
const girasolesImage = '/image/rse-girasoles.webp';
const lamarcaImage = '/image/rse-lamarca.webp';
const utnImage = '/image/rse-utn.webp';
const iaccoImage = '/image/rse-iacco.webp';
const sixtyImage = '/image/rse-sixty.webp';
const golfImage = '/image/rse-golf.webp';

const DESKTOP_CARDS = [
  {
    id: 'puente',
    title: 'Infraestructura Pública y Salud',
    subtitleParts: [
      { text: 'Videovigilancia en\n', weight: 'regular' },
      { text: 'Puente General Belgrano', weight: 'strong' }
    ],
    mobileSubtitleParts: [
      { text: 'Videovigilancia en\n', weight: 'regular' },
      { text: 'Puente General Belgrano', weight: 'strong' }
    ],
    description:
      'Aportamos tecnología estratégica para la implementación de sistemas de monitoreo en tiempo real y prevención vial en una de las conexiones más críticas\nde la región.',
    image: puenteImage
  },
  {
    id: 'girasoles',
    title: 'Inclusión y Formación de Talento',
    subtitleParts: [
      { text: 'Convenio de pasantías con', weight: 'regular' },
      { text: ' Asociación Los Girasoles', weight: 'strong' }
    ],
    description:
      'Integramos a jóvenes con capacidades diferentes en entornos reales de trabajo, respetando y desarrollando sus potencialidades individuales.',
    image: girasolesImage
  },
  {
    id: 'lamarca',
    title: 'Inclusión y Formación de Talento',
    subtitleParts: [
      { text: 'Convenio con\n', weight: 'regular' },
      { text: 'UEGP Nº 27\n“Emilio Lamarca”', weight: 'strong' }
    ],
    mobileSubtitleParts: [
      { text: 'Convenio con ', weight: 'regular' },
      { text: 'UEGP Nº 27 “Emilio Lamarca”', weight: 'strong' }
    ],
    description:
      'Prácticas profesionales en un entorno corporativo real para estudiantes del último año. Potenciamos su formación técnica antes de su salida al mercado laboral.',
    image: lamarcaImage
  },
  {
    id: 'utn',
    title: 'Inclusión y Formación de Talento',
    subtitleParts: [
      { text: 'Convenio con\n', weight: 'regular' },
      { text: 'Universidad Tecnológica Nacional (UTN)', weight: 'strong' }
    ],
    mobileSubtitleParts: [
      { text: 'Convenio con ', weight: 'regular' },
      { text: 'Universidad Tecnológica Nacional (UTN)', weight: 'strong' }
    ],
    description:
      'Integración de estudiantes de Ingeniería Industrial en nuestras áreas operativas. Aplican su formación académica directamente en proyectos tecnológicos de impacto.',
    image: utnImage
  },
  {
    id: 'iacco',
    title: 'Infraestructura Pública y Salud',
    subtitleParts: [
      { text: 'Proyecto IACCO\n', weight: 'strong' },
      { text: 'Videovigilancia\nde obra', weight: 'regular' }
    ],
    mobileSubtitleParts: [
      { text: 'Proyecto IACCO\n', weight: 'strong' },
      { text: 'Videovigilancia\nde obra', weight: 'regular' }
    ],
    description:
      'Garantizamos la seguridad y la transparencia en obras de infraestructura sanitaria vital, mediante la instalación de sistemas de videovigilancia y control continuo del predio.',
    image: iaccoImage
  },
  {
    id: 'sixty',
    title: 'Compromiso Ambiental y Comunitario',
    subtitleParts: [
      { text: 'Ley de\nSponsorización Deportiva\n', weight: 'regular' },
      { text: 'Club Sixty', weight: 'strong' }
    ],
    mobileSubtitleParts: [
      { text: 'Ley de\nSponsorización Deportiva\n', weight: 'regular' },
      { text: 'Club Sixty', weight: 'strong' }
    ],
    description:
      'Acompañamos el desarrollo del deporte chaqueño mediante el patrocinio. Creemos en el deporte como una herramienta fundamental para la inclusión social y el desarrollo integral de los jóvenes.',
    image: sixtyImage
  },
  {
    id: 'golf',
    title: 'Compromiso Ambiental y Comunitario',
    subtitleParts: [
      { text: 'Control de basurales\na cielo abierto\n', weight: 'strong' },
      { text: 'Barrio Golf', weight: 'regular' }
    ],
    mobileSubtitleParts: [
      { text: 'Control de basurales a cielo abierto\n', weight: 'strong' },
      { text: 'Barrio Golf', weight: 'regular' }
    ],
    description:
      'Desplegamos sistemas de videovigilancia con audio disuasivo para prevenir la contaminación y proteger los espacios públicos en conjunto con los vecinos.',
    image: golfImage
  }
];

function wrapIndex(index) {
  return (index + DESKTOP_CARDS.length) % DESKTOP_CARDS.length;
}

function TitleLines({ text }) {
  const lines = text.split('\n');

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function SubtitleParts({ parts }) {
  return parts.map((part, index) => (
    <span
      key={`${part.weight}-${index}-${part.text}`}
      className={part.weight === 'strong' ? styles.initiativeSubtitlePartStrong : styles.initiativeSubtitlePartRegular}
    >
      <TitleLines text={part.text} />
    </span>
  ));
}

function DescriptionLines({ text }) {
  const lines = text.split('\n');

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function DesktopCard({ card }) {
  const isFeature = card.slot === 'feature-left' || card.slot === 'feature-right';
  const cardClassName =
    card.id === 'puente'
      ? styles.initiativeCardPuente
      : card.id === 'iacco'
        ? styles.initiativeCardIacco
        : card.id === 'sixty'
          ? styles.initiativeCardSixty
          : card.id === 'golf'
            ? styles.initiativeCardGolf
      : card.id === 'utn'
        ? styles.initiativeCardUtn
        : card.id === 'lamarca'
          ? styles.initiativeCardLamarca
          : styles.initiativeCardGirasoles;
  const slotClassName =
    card.slot === 'preview-left'
      ? styles.initiativeSlotPreviewLeft
      : card.slot === 'preview-right'
        ? styles.initiativeSlotPreviewRight
        : '';

  return (
    <article
      className={`${styles.initiativeCard} ${cardClassName} ${slotClassName} ${
        isFeature ? styles.initiativeCardFeature : styles.initiativeCardPreview
      }`}
    >
      <h3 className={isFeature ? styles.initiativeTitleFeature : styles.initiativeTitlePreview}>
        <TitleLines text={card.title} />
      </h3>

      <div className={isFeature ? styles.initiativeImageBandFeature : styles.initiativeImageBandPreview}>
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes={isFeature ? '(max-width: 1200px) 40vw, 455px' : '(max-width: 1200px) 30vw, 354px'}
          className={styles.initiativeImage}
        />
      </div>

      <p className={isFeature ? styles.initiativeSubtitleFeature : styles.initiativeSubtitlePreview}>
        <SubtitleParts parts={card.subtitleParts} />
      </p>

      <p className={isFeature ? styles.initiativeDescriptionFeature : styles.initiativeDescriptionPreview}>
        <DescriptionLines text={card.description} />
      </p>
    </article>
  );
}

export default function RseInitiativesCarousel() {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(1);

  const visibleCards = useMemo(
    () => [
      { ...DESKTOP_CARDS[wrapIndex(desktopIndex)], slot: 'preview-left' },
      { ...DESKTOP_CARDS[wrapIndex(desktopIndex + 1)], slot: 'feature-left' },
      { ...DESKTOP_CARDS[wrapIndex(desktopIndex + 2)], slot: 'feature-right' },
      { ...DESKTOP_CARDS[wrapIndex(desktopIndex + 3)], slot: 'preview-right' }
    ],
    [desktopIndex]
  );
  const mobileCard = DESKTOP_CARDS[wrapIndex(mobileIndex)];
  const mobileSubtitleParts = mobileCard.mobileSubtitleParts ?? mobileCard.subtitleParts;
  const mobileCardClassName =
    mobileCard.id === 'puente'
      ? styles.initiativeCardPuente
      : mobileCard.id === 'iacco'
        ? styles.initiativeCardIacco
        : mobileCard.id === 'sixty'
          ? styles.initiativeCardSixty
          : mobileCard.id === 'golf'
            ? styles.initiativeCardGolf
            : mobileCard.id === 'utn'
              ? styles.initiativeCardUtn
              : mobileCard.id === 'lamarca'
                ? styles.initiativeCardLamarca
                : styles.initiativeCardGirasoles;

  return (
    <section className={styles.initiatives} aria-label="Programas de RSE">
      <div className={styles.initiativesInner}>
        <div className={styles.initiativesDesktopDeck}>
          <DesktopCard key={visibleCards[0].id} card={visibleCards[0]} />

          <button
            type="button"
            className={`${styles.initiativeArrow} ${styles.initiativeArrowLeft}`}
            aria-label="Ver cards anteriores"
            onClick={() => setDesktopIndex((current) => wrapIndex(current - 1))}
          >
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.170425 13.991C0.285845 13.6771 0.480959 13.3856 0.755768 13.1166L13.397 0.739909C13.9008 0.246636 14.542 0 15.3206 0C16.0992 0 16.7405 0.246636 17.2443 0.739909C17.7481 1.23318 18 1.86099 18 2.62332C18 3.38565 17.7481 4.01345 17.2443 4.50673L6.52674 15L17.2443 25.4933C17.7481 25.9865 18 26.6143 18 27.3767C18 28.139 17.7481 28.7668 17.2443 29.2601C16.7405 29.7534 16.0992 30 15.3206 30C14.542 30 13.9008 29.7534 13.397 29.2601L0.755768 16.8834C0.480959 16.6143 0.285845 16.3229 0.170425 16.009C0.0550041 15.6951 -0.00178909 15.3587 4.19617e-05 15C0.00187492 14.6413 0.05867 14.3049 0.170425 13.991Z"
                fill="#D9D9D9"
              />
            </svg>
          </button>

          <DesktopCard key={visibleCards[1].id} card={visibleCards[1]} />
          <DesktopCard key={visibleCards[2].id} card={visibleCards[2]} />

          <button
            type="button"
            className={`${styles.initiativeArrow} ${styles.initiativeArrowRight}`}
            aria-label="Ver cards siguientes"
            onClick={() => setDesktopIndex((current) => wrapIndex(current + 1))}
          >
            <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.839 16.009C16.73 16.3229 16.5458 16.6144 16.2862 16.8834L4.34732 29.2601C3.87149 29.7534 3.26589 30 2.53053 30C1.79516 30 1.18956 29.7534 0.713738 29.2601C0.237912 28.7668 0 28.139 0 27.3767C0 26.6144 0.237912 25.9865 0.713738 25.4933L10.8359 15L0.713738 4.50673C0.237912 4.01346 0 3.38565 0 2.62332C0 1.86099 0.237912 1.23319 0.713738 0.739916C1.18956 0.246641 1.79516 0 2.53053 0C3.26589 0 3.87149 0.246641 4.34732 0.739916L16.2862 13.1166C16.5458 13.3857 16.73 13.6771 16.839 13.991C16.948 14.3049 17.0017 14.6413 17 15C16.9982 15.3587 16.9446 15.6951 16.839 16.009Z"
                fill="#D9D9D9"
              />
            </svg>
          </button>

          <DesktopCard key={visibleCards[3].id} card={visibleCards[3]} />
        </div>

        <div className={styles.initiativeSlideMobile} data-active-mobile-card={mobileCard.id}>
          <button
            type="button"
            className={`${styles.initiativeMobileTab} ${styles.initiativeMobileTabLeft}`}
            aria-label="Ver tarjeta anterior"
            onClick={() => setMobileIndex((current) => wrapIndex(current - 1))}
          >
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M0.170425 13.991C0.285845 13.6771 0.480959 13.3856 0.755768 13.1166L13.397 0.739909C13.9008 0.246636 14.542 0 15.3206 0C16.0992 0 16.7405 0.246636 17.2443 0.739909C17.7481 1.23318 18 1.86099 18 2.62332C18 3.38565 17.7481 4.01345 17.2443 4.50673L6.52674 15L17.2443 25.4933C17.7481 25.9865 18 26.6143 18 27.3767C18 28.139 17.7481 28.7668 17.2443 29.2601C16.7405 29.7534 16.0992 30 15.3206 30C14.542 30 13.9008 29.7534 13.397 29.2601L0.755768 16.8834C0.480959 16.6143 0.285845 16.3229 0.170425 16.009C0.0550041 15.6951 -0.00178909 15.3587 4.19617e-05 15C0.00187492 14.6413 0.05867 14.3049 0.170425 13.991Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <article key={mobileCard.id} className={`${styles.initiativeCardMobile} ${mobileCardClassName}`}>
            <h3 className={styles.initiativeTitleMobile}>
              <TitleLines text={mobileCard.title} />
            </h3>

            <div className={styles.initiativeImageBandMobile}>
              <Image
                src={mobileCard.image}
                alt={mobileCard.title}
                fill
                sizes="262px"
                className={styles.initiativeImage}
              />
            </div>

            <p className={styles.initiativeSubtitleMobile}>
              <SubtitleParts parts={mobileSubtitleParts} />
            </p>

            <p className={styles.initiativeDescriptionMobile}>
              <DescriptionLines text={mobileCard.description} />
            </p>
          </article>

          <button
            type="button"
            className={`${styles.initiativeMobileTab} ${styles.initiativeMobileTabRight}`}
            aria-label="Ver tarjeta siguiente"
            onClick={() => setMobileIndex((current) => wrapIndex(current + 1))}
          >
            <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M16.839 16.009C16.73 16.3229 16.5458 16.6144 16.2862 16.8834L4.34732 29.2601C3.87149 29.7534 3.26589 30 2.53053 30C1.79516 30 1.18956 29.7534 0.713738 29.2601C0.237912 28.7668 0 28.139 0 27.3767C0 26.6144 0.237912 25.9865 0.713738 25.4933L10.8359 15L0.713738 4.50673C0.237912 4.01346 0 3.38565 0 2.62332C0 1.86099 0.237912 1.23319 0.713738 0.739916C1.18956 0.246641 1.79516 0 2.53053 0C3.26589 0 3.87149 0.246641 4.34732 0.739916L16.2862 13.1166C16.5458 13.3857 16.73 13.6771 16.839 13.991C16.948 14.3049 17.0017 14.6413 17 15C16.9982 15.3587 16.9446 15.6951 16.839 16.009Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
