'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const AUTOPLAY_MS = 5500;

const ITEMS = [
  {
    id: 'group77',
    title: 'Educación y formación\nde talento',
    subtitle: 'Convenio con UEGP N.º 27 "Emilio Lamarca"',
    introParts: [
      { text: 'SISE mantiene un trabajo sostenido con esta institución educativa, brindando a estudiantes del último año la posibilidad de realizar ' },
      { text: 'pasantías educativas', strong: true },
      { text: ' en distintas áreas de la empresa.' }
    ],
    image: '/image/mq2uf58k-hkxy7zy.webp',
    bodyLabel: 'Durante estas prácticas, los estudiantes:',
    bullets: [
      'Adquieren experiencia en un entorno laboral real',
      'Conocen el funcionamiento de una organización',
      'Fortalecen su formación integral'
    ],
    closing:
      'Este acuerdo refuerza el vínculo entre el ámbito educativo y el mundo del trabajo, acompañando a jóvenes en una etapa clave de su desarrollo.',
    preview:
      'Pasantías educativas para acercar a estudiantes al entorno laboral real y fortalecer su formación profesional.'
  },
  {
    id: 'group76',
    title: 'Inclusión y\noportunidades laborales',
    subtitle: 'Convenio de pasantías con Asociación Los Girasoles',
    introParts: [
      { text: 'Desde el año 2018, SISE Argentina impulsa la ' },
      { text: 'inclusión laboral', strong: true },
      { text: ' mediante un convenio con la Asociación Los Girasoles, organización dedicada a la integración social de jóvenes con capacidades diferentes.' }
    ],
    image: '/image/mq2twaum-f3eh90n.webp',
    bodyLabel: 'En el marco de la Ley N.º 6.454 de pasantías profesionales, esta iniciativa promueve:',
    bullets: [
      'La inclusión laboral en entornos reales de trabajo',
      'El desarrollo de habilidades y competencias',
      'La integración progresiva al ámbito laboral',
      'El fortalecimiento del vínculo entre empresa y organizaciones sociales'
    ],
    closing:
      'A través de este programa, acompañamos el desarrollo individual respetando las capacidades y potencialidades de cada persona.',
    preview:
      'Un programa sostenido de inclusión laboral que promueve oportunidades reales, desarrollo personal e integración social.'
  },
  {
    id: 'group78',
    title: 'Educación y formación\nde talento',
    subtitle: 'Convenio con Universidad Tecnológica Nacional (UTN)',
    introParts: [
      { text: 'En articulación con la UTN, SISE desarrolla un programa de ' },
      { text: 'prácticas profesionales', strong: true },
      { text: ' para estudiantes de Ingeniería Industrial.' }
    ],
    image: '/image/mq2uf59b-txvmh24.webp',
    imageBackground: '/image/mq2uf59b-l9wq65i.webp',
    bodyLabel: 'Esta iniciativa permite:',
    bullets: [
      'Aplicar conocimientos técnicos en contextos reales',
      'Integrarse a áreas operativas y tecnológicas',
      'Desarrollar competencias profesionales y trabajo en equipo'
    ],
    closing:
      'De esta manera, contribuimos a la formación de futuros profesionales, fomentando la innovación y el desarrollo del talento joven.',
    preview:
      'Prácticas profesionales con la UTN para integrar estudiantes a áreas operativas y tecnológicas de la empresa.'
  },
  {
    id: 'group74',
    title: 'Infraestructura y\nseguridad pública',
    subtitle: 'Videovigilancia en Puente General Belgrano',
    introParts: [
      { text: 'En el marco de su compromiso con la seguridad y el desarrollo de infraestructura estratégica, SISE Argentina participó en la implementación de sistemas de videovigilancia en el ' },
      { text: 'Puente General Belgrano', strong: true },
      { text: ', una de las principales conexiones viales de la región.' }
    ],
    image: '/image/mq2uf593-wb2teak.webp',
    bodyLabel: 'Esta acción contribuye a:',
    bullets: [
      'Fortalecer la seguridad en un punto clave de circulación',
      'Mejorar la capacidad de monitoreo y respuesta ante incidentes',
      'Aportar tecnología para la prevención y el control en espacios públicos'
    ],
    closing:
      'A través de este tipo de iniciativas, SISE acompaña proyectos que impactan directamente en la seguridad ciudadana y en la calidad de vida de la comunidad, integrando tecnología, prevención y compromiso social.',
    preview:
      'Tecnología aplicada al monitoreo de infraestructura estratégica con impacto directo en la seguridad vial y ciudadana.'
  },
  {
    id: 'group75',
    title: 'Compromiso con la\ninfraestructura y la salud',
    subtitle: 'Proyecto IACCO - Videovigilancia de obra',
    introParts: [
      { text: 'SISE participó en este proyecto mediante la instalación de sistemas de ' },
      { text: 'videovigilancia para el monitoreo seguro', strong: true },
      { text: ' de la obra.' }
    ],
    image: '/image/mq2uf58w-3qr8qqp.webp',
    bodyLabel: 'Nuestra contribución incluye:',
    bullets: [
      'Control y seguridad del predio',
      'Transparencia en el desarrollo de la obra',
      'Implementación futura de cámara timelapse para seguimiento del avance'
    ],
    closing:
      'Esta acción acompaña el desarrollo de una infraestructura clave para la salud regional, reafirmando nuestro compromiso con proyectos de alto impacto social.',
    preview:
      'Videovigilancia de obra para reforzar control del predio, seguimiento y transparencia en infraestructura de salud.'
  },
  {
    id: 'group79',
    title: 'Compromiso ambiental\ny comunitario',
    subtitle: 'Control de basurales a cielo abierto - Barrio Golf',
    introParts: [
      { text: 'Como parte de su política ambiental, SISE implementa sistemas de ' },
      { text: 'videovigilancia con megáfono', strong: true },
      { text: ' en zonas críticas de la ciudad.' }
    ],
    image: '/image/mq2uf59f-1yduapg.webp',
    bodyLabel: 'Esta acción tiene como objetivo:',
    bullets: [
      'Prevenir el arrojo indebido de residuos',
      'Promover la concientización ambiental',
      'Proteger los espacios públicos'
    ],
    closing:
      'La iniciativa se desarrolla en conjunto con la Municipalidad de Resistencia y vecinos, fortaleciendo el trabajo colaborativo entre sector privado, Estado y comunidad.',
    preview:
      'Control ambiental con videovigilancia y megáfono para prevenir microbasurales y proteger espacios públicos.'
  },
  {
    id: 'group80',
    title: 'Apoyo al deporte local',
    subtitle: 'Ley de Sponsorización Deportiva - Club Sixty',
    introParts: [
      { text: 'En el marco de la Ley Provincial N.º 1772-S, SISE acompaña el desarrollo del deporte local mediante el patrocinio al ' },
      { text: 'Club Sixty', strong: true },
      { text: '.' }
    ],
    image: '/image/mq2uf59k-knk1tya.webp',
    bodyLabel: 'Este compromiso permite:',
    bullets: [
      'Fomentar la actividad deportiva',
      'Promover la inclusión y participación social',
      'Acompañar el desarrollo de jóvenes atletas',
      'Fortalecer instituciones deportivas'
    ],
    closing:
      'Además, esta articulación demuestra cómo el sector privado puede contribuir activamente al crecimiento del deporte comunitario.',
    preview:
      'Patrocinio deportivo para fortalecer instituciones locales y acompañar el desarrollo social y comunitario.'
  }
];

function wrapIndex(index) {
  return (index + ITEMS.length) % ITEMS.length;
}

function renderRichText(parts, baseClassName, strongClassName) {
  return parts.map((part, index) => (
    <span key={`${part.text}-${index}`} className={part.strong ? strongClassName : baseClassName}>
      {part.text}
    </span>
  ));
}

function InitiativeCard({ item, isActive, onActivate, direction }) {
  const directionClassName =
    direction === 'prev'
      ? isActive
        ? styles.carouselActiveFromPrev
        : styles.carouselPreviewFromPrev
      : isActive
        ? styles.carouselActiveFromNext
        : styles.carouselPreviewFromNext;

  return (
    <article
      className={`${styles.initiativeCard} ${isActive ? styles.initiativeCardActive : styles.initiativeCardPreview} ${directionClassName}`}
      aria-hidden={!isActive}
    >
      {!isActive ? (
        <button
          type="button"
          className={styles.previewCardButton}
          onClick={onActivate}
          aria-label={`Ver ${item.title.replace('\n', ' ')}`}
        >
          <h3 className={styles.previewTitle}>
            {item.title.split('\n').map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h3>

          <p className={styles.previewSubtitle}>{item.subtitle}</p>

          <div
            className={styles.previewImageWrap}
            style={item.imageBackground ? { backgroundImage: `url(${item.imageBackground})` } : undefined}
          >
            <Image
              src={item.image}
              alt={item.title.replace('\n', ' ')}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className={styles.previewImage}
            />
          </div>

          <p className={styles.previewExcerpt}>{item.preview}</p>
        </button>
      ) : (
        <>
          <h2 className={styles.initiativeTitle}>
            {item.title.split('\n').map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>

          <div className={styles.initiativeSubtitleBar}>
            <p className={styles.initiativeSubtitle}>{item.subtitle}</p>
          </div>

          <p className={styles.initiativeIntro}>
            {renderRichText(item.introParts, styles.initiativeIntroText, styles.initiativeIntroStrong)}
          </p>

          <div
            className={styles.initiativeImageWrap}
            style={item.imageBackground ? { backgroundImage: `url(${item.imageBackground})` } : undefined}
          >
            <Image
              src={item.image}
              alt={item.title.replace('\n', ' ')}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className={styles.initiativeImage}
            />
          </div>

          <div className={styles.initiativeBody}>
            <p className={styles.initiativeBodyLabel}>{item.bodyLabel}</p>
            <ul className={styles.initiativeBodyList}>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className={styles.initiativeClosing}>{item.closing}</p>
          </div>
        </>
      )}
    </article>
  );
}

export default function RseInitiativesCarousel() {
  const initialIndex = ITEMS.findIndex((item) => item.id === 'group76');
  const [activeIndex, setActiveIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const [direction, setDirection] = useState('next');
  const [isPaused, setIsPaused] = useState(false);
  const activeIndexRef = useRef(initialIndex === -1 ? 0 : initialIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const changeSlide = useCallback((nextIndex, nextDirection) => {
    setDirection(nextDirection);
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      changeSlide(wrapIndex(activeIndexRef.current + 1), 'next');
    }, AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [changeSlide, isPaused]);

  const activeItem = ITEMS[activeIndex];
  const leftItem = ITEMS[wrapIndex(activeIndex - 1)];
  const rightItem = ITEMS[wrapIndex(activeIndex + 1)];

  const orderedItems = useMemo(
    () => [
      { ...leftItem, placement: 'left' },
      { ...activeItem, placement: 'center' },
      { ...rightItem, placement: 'right' }
    ],
    [activeItem, leftItem, rightItem]
  );

  return (
    <section
      className={styles.initiatives}
      aria-label="Programas de RSE"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') changeSlide(wrapIndex(activeIndexRef.current - 1), 'prev');
        if (event.key === 'ArrowRight') changeSlide(wrapIndex(activeIndexRef.current + 1), 'next');
      }}
      tabIndex={0}
    >
      <div className={styles.initiativesInner}>
        <div className={styles.carouselShell}>
          <button
            type="button"
            className={`${styles.carouselControl} ${styles.carouselControlLeft}`}
            aria-label="Ver iniciativa anterior"
            onClick={() => changeSlide(wrapIndex(activeIndexRef.current - 1), 'prev')}
          >
            <span className={`${styles.carouselChevron} ${styles.carouselChevronLeft}`} aria-hidden="true" />
          </button>

          <div className={styles.cardsViewport}>
            {orderedItems.map((item) => (
              <InitiativeCard
                key={`${item.id}-${item.placement}`}
                item={item}
                isActive={item.placement === 'center'}
                direction={direction}
                onActivate={() => {
                  const nextIndex = ITEMS.findIndex((entry) => entry.id === item.id);
                  const nextDirection = item.placement === 'left' ? 'prev' : 'next';
                  changeSlide(nextIndex, nextDirection);
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className={`${styles.carouselControl} ${styles.carouselControlRight}`}
            aria-label="Ver iniciativa siguiente"
            onClick={() => changeSlide(wrapIndex(activeIndexRef.current + 1), 'next')}
          >
            <span className={`${styles.carouselChevron} ${styles.carouselChevronRight}`} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.carouselFooter}>
          <div className={styles.carouselCounter}>
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className={styles.carouselCounterDivider} />
            <span>{String(ITEMS.length).padStart(2, '0')}</span>
          </div>

          <div className={styles.carouselDots} aria-label="Seleccionar iniciativa">
            {ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.carouselDot} ${index === activeIndex ? styles.carouselDotActive : ''}`}
                aria-label={`Ir a ${item.title.replace('\n', ' ')}`}
                aria-pressed={index === activeIndex}
                onClick={() => {
                  const currentIndex = activeIndexRef.current;
                  const nextDirection = index < currentIndex ? 'prev' : 'next';
                  changeSlide(index, nextDirection);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
