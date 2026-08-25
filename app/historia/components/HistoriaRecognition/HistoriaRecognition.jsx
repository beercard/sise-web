'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './HistoriaRecognition.module.scss';

/*
 * Reconocimientos de /historia según Figma 5011:265 (desktop) y 5011:266
 * (mobile): título de 48px, relato en 24px con negritas, y a la derecha un
 * marco gris con el carrusel de fotos (la primera es la placa de los Premios
 * CASEL) y sus tres puntos. En mobile el relato se parte en dos bloques con
 * la foto en el medio.
 */
const slides = [
  { src: '/image/historia-premio-casel.webp', alt: 'Placa de los Premios CASEL 2024 a Grupo SISE' },
  { src: '/image/historia-carousel-2.webp', alt: 'Reconocimientos de SISE' },
  { src: '/image/historia-carousel-3.webp', alt: 'Reconocimientos de SISE' }
];

export default function HistoriaRecognition() {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide];

  useEffect(() => {
    const autoplayId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(autoplayId);
  }, []);

  const lead = (
    <>
      El liderazgo de <strong>Grupo SISE</strong> se fundamenta en{' '}
      <strong>15 años de evolución ininterrumpida</strong>, una trayectoria que cuenta con el
      respaldo de las principales instituciones del país.
    </>
  );

  const story = (
    <>
      Nuestra visión tecnológica fue distinguida a nivel nacional en los{' '}
      <strong>Premios CASEL 2024</strong>, obteniendo el reconocimiento en{' '}
      <strong>Desarrollo Sustentable</strong>.
      <br />
      <br />
      Este hito en innovación motivó a la <strong>Cámara de Comercio de Resistencia</strong> a
      otorgarnos un reconocimiento especial, destacando nuestra historia empresarial y el impacto
      positivo de nuestras soluciones en la región.
    </>
  );

  const feature = (
    <div className={styles.feature}>
      <div className={styles.panel}>
        <Image
          key={currentSlide.src}
          src={currentSlide.src}
          alt={currentSlide.alt}
          className={styles.photo}
          width={521}
          height={425}
        />
      </div>
      <div className={styles.dots} role="tablist" aria-label="Fotos de reconocimientos">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={index === activeSlide}
            aria-label={`Foto ${index + 1}`}
            className={`${styles.dot} ${index === activeSlide ? styles.dotActive : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.section} aria-label="Reconocimientos">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            Nuestro trabajo ha sido <strong>reconocido a nivel nacional.</strong>
          </h2>
          <p className={styles.text}>
            {lead}
            <br />
            <br />
            {story}
          </p>
        </div>

        {feature}

        {/* En mobile el relato se parte: liderazgo arriba, foto, y el resto debajo. */}
        <div className={styles.mobileFlow}>
          <h2 className={styles.title}>
            Nuestro trabajo ha sido <strong>reconocido a nivel nacional.</strong>
          </h2>
          <p className={styles.text}>{lead}</p>
          {feature}
          <p className={styles.text}>{story}</p>
        </div>
      </div>
    </section>
  );
}
