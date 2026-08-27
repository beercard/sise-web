'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './RseInitiativesCarousel.module.scss';

/*
 * Carrusel de iniciativas de /rse según Figma 5014:402 (desktop) + 5014:403
 * (fichas) y 5014:404/405 (mobile): tarjetas de 455×597 con la foto arriba,
 * la banda de categoría en azul sobre gris, la franja azul con el convenio y
 * la descripción centrada; dos tarjetas al frente y una recortada a cada
 * lado. La tarjeta del Puente suma el botón "Ver cámaras en vivo" (el vivo
 * está embebido en el home).
 */
const CARDS = [
  {
    id: 'puente',
    /* Ancho de la caja de texto del diseño: 397px sobre los 455 de la tarjeta. */
    anchoTexto: '87.3%',
    category: 'Infraestructura Pública y Salud',
    subtitle: (
      <>
        Videovigilancia en
        <br />
        <strong>Puente General Belgrano</strong>
      </>
    ),
    description:
      'Aportamos tecnología estratégica para la implementación de sistemas de monitoreo en tiempo real y prevención vial en una de las conexiones más críticas de la región.',
    image: '/image/rse-puente-card.webp',
    live: true
  },
  {
    id: 'girasoles',
    /* Ancho de la caja de texto del diseño: 303px sobre los 455 de la tarjeta. */
    anchoTexto: '66.6%',
    category: 'Inclusión y Formación de Talento',
    subtitle: (
      <>
        Convenio de pasantías con <strong>Asociación Los Girasoles</strong>
      </>
    ),
    description:
      'Integramos a jóvenes con capacidades diferentes en entornos reales de trabajo, respetando y desarrollando sus potencialidades individuales.',
    image: '/image/rse-girasoles-card.webp'
  },
  {
    id: 'lamarca',
    /* Ancho de la caja de texto del diseño: 337px sobre los 455 de la tarjeta. */
    anchoTexto: '74.1%',
    category: 'Inclusión y Formación de Talento',
    subtitle: (
      <>
        {/* El corte va donde lo marca el diseño (3486:961): sin él el título
            se parte en tres renglones y desplaza la descripción. */}
        Convenio con <strong>UEGP Nº 27</strong>
        <br />
        <strong>“Emilio Lamarca”</strong>
      </>
    ),
    description:
      'Prácticas profesionales en un entorno corporativo real para estudiantes del último año. Potenciamos su formación técnica antes de su salida al mercado laboral.',
    image: '/image/rse-lamarca-card.webp'
  },
  {
    id: 'utn',
    /* Ancho de la caja de texto del diseño: 346px sobre los 455 de la tarjeta. */
    anchoTexto: '76.0%',
    category: 'Inclusión y Formación de Talento',
    subtitle: (
      <>
        Convenio con <strong>Universidad Tecnológica Nacional (UTN)</strong>
      </>
    ),
    description:
      'Integración de estudiantes de Ingeniería Industrial en nuestras áreas operativas. Aplican su formación académica directamente en proyectos tecnológicos de impacto.',
    image: '/image/rse-utn-card.webp'
  },
  {
    id: 'golf',
    /* Ancho de la caja de texto del diseño: 337px sobre los 455 de la tarjeta. */
    anchoTexto: '74.1%',
    category: 'Compromiso Ambiental y Comunitario',
    subtitle: (
      <>
        <strong>Control de basurales a cielo abierto</strong> (Barrio Golf)
      </>
    ),
    description:
      'Desplegamos sistemas de videovigilancia con audio disuasivo para prevenir la contaminación y proteger los espacios públicos en conjunto con los vecinos.',
    image: '/image/rse-golf-card.webp'
  },
  {
    id: 'sixty',
    /* Ancho de la caja de texto del diseño: 384px sobre los 455 de la tarjeta. */
    anchoTexto: '84.4%',
    category: 'Compromiso Ambiental y Comunitario',
    subtitle: (
      <>
        Ley de Sponsorización Deportiva <strong>Club Sixty</strong>
      </>
    ),
    description:
      'Acompañamos el desarrollo del deporte chaqueño mediante el patrocinio. Creemos en el deporte como una herramienta fundamental para la inclusión social y el desarrollo integral de los jóvenes.',
    image: '/image/rse-sixty-card.webp'
  },
  {
    id: 'iacco',
    /* Ancho de la caja de texto del diseño: 384px sobre los 455 de la tarjeta. */
    anchoTexto: '84.4%',
    category: 'Infraestructura Pública y Salud',
    subtitle: (
      <>
        <strong>Proyecto IACCO</strong> Videovigilancia de obra
      </>
    ),
    description:
      'Garantizamos la seguridad y la transparencia en obras de infraestructura sanitaria vital, mediante la instalación de sistemas de videovigilancia y control continuo del predio.',
    image: '/image/rse-iacco-card.webp'
  }
];

function wrapIndex(index) {
  return (index + CARDS.length) % CARDS.length;
}

function ArrowIcon({ direction }) {
  return direction === 'left' ? (
    <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M0.170425 13.991C0.285845 13.6771 0.480959 13.3856 0.755768 13.1166L13.397 0.739909C13.9008 0.246636 14.542 0 15.3206 0C16.0992 0 16.7405 0.246636 17.2443 0.739909C17.7481 1.23318 18 1.86099 18 2.62332C18 3.38565 17.7481 4.01345 17.2443 4.50673L6.52674 15L17.2443 25.4933C17.7481 25.9865 18 26.6143 18 27.3767C18 28.139 17.7481 28.7668 17.2443 29.2601C16.7405 29.7534 16.0992 30 15.3206 30C14.542 30 13.9008 29.7534 13.397 29.2601L0.755768 16.8834C0.480959 16.6143 0.285845 16.3229 0.170425 16.009C0.0550041 15.6951 -0.00178909 15.3587 4.19617e-05 15C0.00187492 14.6413 0.05867 14.3049 0.170425 13.991Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16.839 16.009C16.73 16.3229 16.5458 16.6144 16.2862 16.8834L4.34732 29.2601C3.87149 29.7534 3.26589 30 2.53053 30C1.79516 30 1.18956 29.7534 0.713738 29.2601C0.237912 28.7668 0 28.139 0 27.3767C0 26.6144 0.237912 25.9865 0.713738 25.4933L10.8359 15L0.713738 4.50673C0.237912 4.01346 0 3.38565 0 2.62332C0 1.86099 0.237912 1.23319 0.713738 0.739916C1.18956 0.246641 1.79516 0 2.53053 0C3.26589 0 3.87149 0.246641 4.34732 0.739916L16.2862 13.1166C16.5458 13.3857 16.73 13.6771 16.839 13.991C16.948 14.3049 17.0017 14.6413 17 15C16.9982 15.3587 16.9446 15.6951 16.839 16.009Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InitiativeCard({ card, variant }) {
  return (
    <article
      className={`${styles.card} ${styles[`card-${variant}`] ?? ''}`}
      style={{ '--rse-texto': card.anchoTexto }}
    >
      {/* La banda de categoría va DENTRO de la foto, apoyada en su borde
          inferior y con el gris al 70%, como en el diseño (3486:960). */}
      <div className={styles.photo}>
        <Image
          src={card.image}
          alt={card.category}
          fill
          sizes={variant === 'feature' ? '455px' : variant === 'preview' ? '353px' : '262px'}
          className={styles.photoImage}
        />
        <p className={styles.category}>{card.category}</p>
      </div>
      {/* El texto va dentro de un span: si cuelga directo del contenedor
          flex, cada fragmento (el <strong>, el salto) se convierte en un ítem
          y el convenio se parte en cuatro renglones en vez de dos. */}
      <p className={styles.subtitle}>
        <span className={styles.subtitleText}>{card.subtitle}</span>
      </p>
      <p className={styles.description}>{card.description}</p>
      {card.live ? (
        <Link href="/" className={styles.liveButton}>
          Ver cámaras en vivo
        </Link>
      ) : null}
    </article>
  );
}

export default function RseInitiativesCarousel() {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(1);

  const visibleCards = useMemo(
    () => [
      CARDS[wrapIndex(desktopIndex)],
      CARDS[wrapIndex(desktopIndex + 1)],
      CARDS[wrapIndex(desktopIndex + 2)],
      CARDS[wrapIndex(desktopIndex + 3)]
    ],
    [desktopIndex]
  );
  const mobileCard = CARDS[wrapIndex(mobileIndex)];

  return (
    <section className={styles.section} aria-label="Programas de RSE">
      <div className={styles.deck}>
        <div className={styles.previewSlot}>
          <InitiativeCard key={visibleCards[0].id} card={visibleCards[0]} variant="preview" />
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label="Ver tarjetas anteriores"
          onClick={() => setDesktopIndex((current) => wrapIndex(current - 1))}
        >
          <ArrowIcon direction="left" />
        </button>

        <InitiativeCard key={visibleCards[1].id} card={visibleCards[1]} variant="feature" />
        <InitiativeCard key={visibleCards[2].id} card={visibleCards[2]} variant="feature" />

        <button
          type="button"
          className={styles.arrow}
          aria-label="Ver tarjetas siguientes"
          onClick={() => setDesktopIndex((current) => wrapIndex(current + 1))}
        >
          <ArrowIcon direction="right" />
        </button>

        <div className={styles.previewSlot}>
          <InitiativeCard key={visibleCards[3].id} card={visibleCards[3]} variant="preview" />
        </div>
      </div>

      <div className={styles.mobileDeck}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Ver tarjeta anterior"
          onClick={() => setMobileIndex((current) => wrapIndex(current - 1))}
        >
          <ArrowIcon direction="left" />
        </button>

        <InitiativeCard key={mobileCard.id} card={mobileCard} variant="mobile" />

        <button
          type="button"
          className={styles.arrow}
          aria-label="Ver tarjeta siguiente"
          onClick={() => setMobileIndex((current) => wrapIndex(current + 1))}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </section>
  );
}
