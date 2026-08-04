'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from '../../page.module.scss';

const slides = [
  {
    src: '/image/historia-carousel-1.webp',
    alt: 'Reconocimientos de SISE'
  },
  {
    src: '/image/historia-carousel-2.webp',
    alt: 'Reconocimientos de SISE'
  },
  {
    src: '/image/historia-carousel-3.webp',
    alt: 'Reconocimientos de SISE'
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
        <div className={styles.recognitionDesktop}>
          <div className={styles.recognitionDesktopLayout}>
            <div className={styles.recognitionDesktopCopy}>
              <div className={styles.recognitionDesktopTitle}>
                <span className={styles.recognitionTitleRegular}>Nuestro trabajo ha sido </span>
                <span className={styles.recognitionTitleStrong}>reconocido a nivel nacional.</span>
              </div>
              <div className={styles.recognitionDesktopText}>
                <span className={styles.recognitionStoryRegular}>El liderazgo de </span>
                <span className={styles.recognitionStoryStrong}>Grupo SISE</span>
                <span className={styles.recognitionStoryRegular}> se fundamenta en </span>
                <span className={styles.recognitionStoryStrong}>
                  15 años de evolución ininterrumpida
                </span>
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
                  .<br />
                  <br />
                  Este hito en innovación motivó a la{' '}
                </span>
                <span className={styles.recognitionStoryStrong}>Cámara de Comercio de Resistencia</span>
                <span className={styles.recognitionStoryRegular}>
                  {' '}
                  a otorgarnos un reconocimiento especial, destacando nuestra historia empresarial y
                  el impacto positivo de nuestras soluciones en la región.
                </span>
              </div>
            </div>
            <article className={styles.recognitionDesktopFeature}>
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
          </div>
        </div>

        <div className={styles.recognitionResponsive}>
          <h2 className={`${styles.recognitionTitle} ${styles.recognitionTitleDesktop}`}>
            <span className={styles.recognitionTitleRegular}>Nuestro trabajo ha sido&nbsp;</span>
            <br className={styles.recognitionTitleBreakMobile} />
            <span className={styles.recognitionTitleStrong}>reconocido a nivel nacional.</span>
          </h2>

          <h2 className={`${styles.recognitionTitle} ${styles.recognitionTitleMobile}`}>
            <span className={styles.recognitionTitleRegular}>
              Nuestro trabajo ha sido
              <br />
            </span>
            <span className={styles.recognitionTitleStrong}>reconocido a nivel nacional</span>
            <span className={styles.recognitionTitleRegular}>.</span>
          </h2>

          <div className={styles.recognitionLayout}>
            <div className={`${styles.recognitionStory} ${styles.recognitionStoryDesktop}`}>
              <p className={styles.recognitionStoryText}>
                <span className={styles.recognitionStoryRegular}>El liderazgo de&nbsp;</span>
                <span className={styles.recognitionStoryStrong}>Grupo SISE</span>
                <span className={styles.recognitionStoryRegular}>&nbsp;se fundamenta en&nbsp;</span>
                <span className={styles.recognitionStoryStrong}>
                  15 años de evolución ininterrumpida
                </span>
                <span className={styles.recognitionStoryRegular}>
                  , una trayectoria que cuenta con el respaldo de las principales instituciones del
                  país.
                  <br />
                  <br />
                  Nuestra visión tecnológica fue distinguida a nivel nacional en los&nbsp;
                </span>
                <span className={styles.recognitionStoryStrong}>Premios CASEL 2024</span>
                <span className={styles.recognitionStoryRegular}>
                  , obteniendo el reconocimiento en&nbsp;
                </span>
                <span className={styles.recognitionStoryStrong}>Desarrollo Sustentable</span>
                <span className={styles.recognitionStoryRegular}>
                  .<br />
                  <br />
                  Este hito en innovación motivó a la&nbsp;
                </span>
                <span className={styles.recognitionStoryStrong}>Cámara de Comercio de Resistencia</span>
                <span className={styles.recognitionStoryRegular}>
                  &nbsp;a otorgarnos un reconocimiento especial, destacando nuestra historia
                  empresarial y el impacto positivo de nuestras soluciones en la región.
                </span>
              </p>
            </div>

            <div className={`${styles.recognitionStory} ${styles.recognitionStoryMobileIntro}`}>
              <p className={styles.recognitionStoryText}>
                <span className={styles.recognitionStoryRegular}>El liderazgo de&nbsp;</span>
                <span className={styles.recognitionStoryStrong}>Grupo SISE</span>
                <span className={styles.recognitionStoryRegular}>&nbsp;se fundamenta en&nbsp;</span>
                <span className={styles.recognitionStoryStrong}>
                  15 años de evolución ininterrumpida
                </span>
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
                  Nuestra visión tecnológica fue distinguida a nivel nacional en los&nbsp;
                </span>
                <span className={styles.recognitionStoryStrong}>Premios CASEL 2024</span>
                <span className={styles.recognitionStoryRegular}>
                  , obteniendo el reconocimiento en&nbsp;
                </span>
                <span className={styles.recognitionStoryStrong}>Desarrollo Sustentable</span>
                <span className={styles.recognitionStoryRegular}>
                  . Este hito en innovación motivó a la&nbsp;
                </span>
                <span className={styles.recognitionStoryStrong}>Cámara de Comercio de Resistencia</span>
                <span className={styles.recognitionStoryRegular}>
                  &nbsp;a otorgarnos un reconocimiento especial, destacando nuestra historia
                  empresarial y el impacto positivo de nuestras soluciones en la región.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
