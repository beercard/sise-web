import Image from 'next/image';

import styles from './TechCard.module.scss';

function ArtContent({ art, fallbackAlt = '' }) {
  if (!art) return null;

  const mainSrc = art.src ?? art.image?.src;
  if (mainSrc) {
    return (
      <Image
        src={mainSrc}
        alt={art.alt ?? fallbackAlt}
        className={styles.artImage}
        width={art.width ?? art.image?.width ?? 220}
        height={art.height ?? art.image?.height ?? 170}
        style={art.rotate ? { transform: `rotate(${art.rotate}deg)` } : undefined}
      />
    );
  }

  if (art.backgroundSrc) {
    const badgeSrc = art.svgSrc ?? art.iconSrc;
    return (
      <div
        className={styles.frame}
        style={{
          '--frame-bg': `url('${art.backgroundSrc}')`,
          width: art.wrapperWidth,
          height: art.wrapperHeight,
          marginTop: art.wrapperMarginTop,
          marginLeft: art.wrapperMarginLeft,
          marginRight: art.wrapperMarginRight
        }}
      >
        {art.overlaySrc ? (
          <Image
            src={art.overlaySrc}
            alt=""
            className={styles.frameOverlay}
            width={art.overlayWidth ?? 143}
            height={art.overlayHeight ?? 143}
            style={{
              top: art.overlayTop,
              right: art.overlayRight,
              bottom: art.overlayBottom,
              left: art.overlayLeft,
              transform: art.overlayTransform,
              maxWidth: art.overlayMaxWidth,
              maxHeight: art.overlayMaxHeight
            }}
          />
        ) : null}
        <div className={styles.frameBg} aria-hidden="true" />
        {art.bar ? <span className={styles.frameBar} aria-hidden="true" /> : null}
        {art.badgeBlock ? (
          <span
            className={styles.frameBadgeBlock}
            aria-hidden="true"
            style={{
              width: art.badgeBlock.width,
              height: art.badgeBlock.height,
              top: art.badgeBlock.top,
              left: art.badgeBlock.left,
              background: art.badgeBlock.background
            }}
          />
        ) : null}
        {badgeSrc ? (
          <Image
            src={badgeSrc}
            alt=""
            className={styles.frameBadge}
            width={art.iconWidth ?? 69}
            height={art.iconHeight ?? 24}
          />
        ) : null}
        {art.cornerSrc ? (
          <Image
            src={art.cornerSrc}
            alt=""
            className={styles.frameCorner}
            width={art.cornerWidth ?? 18}
            height={art.cornerHeight ?? 11}
          />
        ) : null}
      </div>
    );
  }

  return null;
}

export default function TechCard({ slide, className = '' }) {
  if (!slide) return null;

  const cardClassName = [styles.card, slide.mobileTall ? styles.cardTall : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClassName} style={slide.styleVars}>
      <p className={styles.title}>{slide.title}</p>
      {slide.text ? (
        <p className={styles.text}>
          {slide.mobileText ? (
            <>
              <span className={styles.desktopText}>{slide.text}</span>
              <span className={styles.mobileText}>{slide.mobileText}</span>
            </>
          ) : (
            slide.text
          )}
        </p>
      ) : null}
      <div className={styles.artStage}>
        <ArtContent art={slide.art} fallbackAlt={slide.title} />
        {slide.art?.accent ? (
          <span
            className={styles.artAccent}
            aria-hidden="true"
            style={{
              width: slide.art.accent.width,
              height: slide.art.accent.height,
              top: slide.art.accent.top,
              left: slide.art.accent.left,
              background: slide.art.accent.background,
              transform: slide.art.accent.rotate ? `rotate(${slide.art.accent.rotate}deg)` : undefined
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
