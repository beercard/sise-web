'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const slides = [
  {
    src: '/image/mq2q87jo-iv7vjn2.webp',
    alt: 'Premios CASEL 2024'
  },
  {
    src: '/image/mq2q87jo-26hyhjv.png',
    alt: 'Reconocimiento institucional de CAME'
  },
  {
    src: '/image/PREMIOS 1.jpg',
    alt: 'Reconocimientos y premiaciones de SISE'
  }
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

  return (
    <section className={styles.recognition} aria-label="Reconocimientos">
      <div className={styles.recognitionInner}>
        <h2 className={styles.recognitionTitle}>
          <span className={styles.recognitionTitleRegular}>Nuestro trabajo ha sido</span>
          <br className={styles.recognitionTitleBreakMobile} />
          <span className={styles.recognitionTitleStrong}>reconocido a nivel nacional</span>
          <span className={styles.recognitionTitleRegular}>.</span>
        </h2>

        <div className={styles.recognitionLayout}>
          <div className={`${styles.recognitionStory} ${styles.recognitionStoryDesktop}`}>
            <p className={styles.recognitionStoryText}>
              <span className={styles.recognitionStoryRegular}>El liderazgo de </span>
              <span className={styles.recognitionStoryStrong}>Grupo SISE</span>
              <span className={styles.recognitionStoryRegular}> se fundamenta en </span>
              <span className={styles.recognitionStoryStrong}>15 años de evolución ininterrumpida</span>
              <span className={styles.recognitionStoryRegular}>
                , una trayectoria que cuenta con el respaldo de las principales instituciones del
                país.
                <br />
                <br />
                Nuestra visión tecnológica fue distinguida a nivel nacional en los{' '}
              </span>
              <span className={styles.recognitionStoryStrong}>Premios CASEL 2024</span>
              <span className={styles.recognitionStoryRegular}>
                , obteniendo el reconocimiento en{' '}
              </span>
              <span className={styles.recognitionStoryStrong}>Desarrollo Sustentable</span>
              <span className={styles.recognitionStoryRegular}>
                . Este hito en innovación motivó a la{' '}
              </span>
              <span className={styles.recognitionStoryStrong}>Cámara de Comercio de Resistencia</span>
              <span className={styles.recognitionStoryRegular}>
                {' '}
                a otorgarnos un reconocimiento especial, destacando nuestra historia empresarial y
                el impacto positivo de nuestras soluciones en la región.
              </span>
            </p>
          </div>

          <div className={`${styles.recognitionStory} ${styles.recognitionStoryMobileIntro}`}>
            <p className={styles.recognitionStoryText}>
              <span className={styles.recognitionStoryRegular}>El liderazgo de </span>
              <span className={styles.recognitionStoryStrong}>Grupo SISE</span>
              <span className={styles.recognitionStoryRegular}> se fundamenta en </span>
              <span className={styles.recognitionStoryStrong}>15 años de evolución ininterrumpida</span>
              <span className={styles.recognitionStoryRegular}>
                , una trayectoria que cuenta con el respaldo de las principales instituciones del
                país.
              </span>
            </p>
          </div>

          <article className={styles.recognitionFeature}>
            <div className={styles.recognitionFeaturePanel}>
              <Image
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.alt}
                width={521}
                height={425}
                className={styles.recognitionFeatureImage}
              />
            </div>
            <div className={styles.recognitionDots}>
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`${styles.recognitionDot} ${
                    index === activeSlide ? styles.recognitionDotActive : ''
                  }`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Ver imagen ${index + 1} de reconocimientos`}
                  aria-pressed={index === activeSlide}
                />
              ))}
            </div>
          </article>

          <div className={`${styles.recognitionStory} ${styles.recognitionStoryMobileOutro}`}>
            <p className={styles.recognitionStoryText}>
              <span className={styles.recognitionStoryRegular}>
                Nuestra visión tecnológica fue distinguida a nivel nacional en los{' '}
              </span>
              <span className={styles.recognitionStoryStrong}>Premios CASEL 2024</span>
              <span className={styles.recognitionStoryRegular}>
                , obteniendo el reconocimiento en{' '}
              </span>
              <span className={styles.recognitionStoryStrong}>Desarrollo Sustentable</span>
              <span className={styles.recognitionStoryRegular}>
                . Este hito en innovación motivó a la{' '}
              </span>
              <span className={styles.recognitionStoryStrong}>Cámara de Comercio de Resistencia</span>
              <span className={styles.recognitionStoryRegular}>
                {' '}
                a otorgarnos un reconocimiento especial, destacando nuestra historia empresarial y
                el impacto positivo de nuestras soluciones en la región.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
