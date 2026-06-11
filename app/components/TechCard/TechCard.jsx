import Image from 'next/image';

import styles from './TechCard.module.scss';

/**
 * Tarjeta unificada para los módulos "technology" de todas las verticales.
 * Normaliza título, texto y arte en una misma grilla, sin posicionamientos
 * absolutos por slide. El arte se resuelve según los datos disponibles:
 *  - `art.src` o `art.image.src`: imagen contenida en el escenario.
 *  - `art.backgroundSrc`: composición con fondo (sirena/conectividad/gps),
 *    con `svgSrc`/`iconSrc` como insignia y `overlaySrc` como detalle.
 */
function ArtContent({ art }) {
  if (!art) return null;

  const mainSrc = art.src ?? art.image?.src;
  if (mainSrc) {
    return (
      <Image
        src={mainSrc}
        alt=""
        className={styles.artImage}
        width={art.width ?? art.image?.width ?? 220}
        height={art.height ?? art.image?.height ?? 170}
      />
    );
  }

  if (art.backgroundSrc) {
    const badgeSrc = art.svgSrc ?? art.iconSrc;
    return (
      <div className={styles.frame}>
        {/* El overlay va detrás del fondo: se ve a través de la ventana
            transparente del marco (p. ej. la cámara en la pantalla del GPS). */}
        {art.overlaySrc ? (
          <Image
            src={art.overlaySrc}
            alt=""
            className={styles.frameOverlay}
            width={art.overlayWidth ?? 143}
            height={art.overlayHeight ?? 143}
          />
        ) : null}
        <div
          className={styles.frameBg}
          style={{ '--frame-bg': `url('${art.backgroundSrc}')` }}
          aria-hidden="true"
        />
        {badgeSrc ? (
          <Image
            src={badgeSrc}
            alt=""
            className={styles.frameBadge}
            width={art.iconWidth ?? 69}
            height={art.iconHeight ?? 24}
          />
        ) : null}
      </div>
    );
  }

  return null;
}

export default function TechCard({ slide, className = '' }) {
  if (!slide) return null;

  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <p className={styles.title}>{slide.title}</p>
      {slide.text ? <p className={styles.text}>{slide.text}</p> : null}
      <div className={styles.artStage}>
        <ArtContent art={slide.art} />
      </div>
    </div>
  );
}
