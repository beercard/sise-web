'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import styles from '../../page.module.scss';

export default function ConstruccionMonitoreoCarousel() {
  const slides = useMemo(
    () => [
      {
        key: 'alarmas',
        title: 'Alarmas y monitoreo',
        body: 'Protección fuera del horario laboral con\nsupervisión permanente.',
        padding: { top: 76, right: 63, bottom: 77, left: 62 },
        contentWidth: 317,
        arrows: { left: '/image/mq11fkm4-05t962w.png', right: '/image/mq11fkm4-6vtzgih.png' }
      }
    ],
    []
  );

  const [activeIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const renderSlide = (slide) => (
    <>
      <p className={styles.heroCardTitle}>{slide.title}</p>
      <p className={styles.heroCardText}>
        {slide.body.split('\n').map((line, index) => (
          <span key={`${slide.key}-b-${index}`}>
            {line}
            {index < slide.body.split('\n').length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    </>
  );

  return (
    <div className={styles.heroCard} aria-label="Servicio destacado">
      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowLeft}`} aria-label="Anterior" disabled>
        <Image src={activeSlide.arrows.left} alt="" width={30} height={18} />
      </button>

      <div className={styles.heroCardStage} aria-live="polite">
        <div
          className={styles.heroCardBox}
          style={{
            '--hero-card-content-width': `${activeSlide.contentWidth}px`,
            '--hero-card-pad-top': `${activeSlide.padding.top}px`,
            '--hero-card-pad-right': `${activeSlide.padding.right}px`,
            '--hero-card-pad-bottom': `${activeSlide.padding.bottom}px`,
            '--hero-card-pad-left': `${activeSlide.padding.left}px`
          }}
        >
          {renderSlide(activeSlide)}
        </div>
      </div>

      <button type="button" className={`${styles.heroArrow} ${styles.heroArrowRight}`} aria-label="Siguiente" disabled>
        <Image src={activeSlide.arrows.right} alt="" width={30} height={17} />
      </button>
    </div>
  );
}
