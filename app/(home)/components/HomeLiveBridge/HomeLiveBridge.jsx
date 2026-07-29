import styles from './HomeLiveBridge.module.scss';

export default function HomeLiveBridge() {
  return (
    <section className={styles.section} aria-label="Puente General Belgrano en vivo">
      <div className={styles.inner}>
        <div className={styles.pattern} aria-hidden="true" />

        <h2 className={styles.title}>PUENTE GRAL. BELGRANO EN VIVO</h2>

        <div className={styles.mediaFrame}>
          <iframe
            className={styles.media}
            src="https://www.youtube-nocookie.com/embed/9KsX_kywp84?autoplay=1&mute=1&playsinline=1&rel=0"
            title="Streaming en vivo del Puente General Belgrano"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
