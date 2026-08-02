'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './HomeLiveBridge.module.scss';

const YOUTUBE_VIDEO_ID = '6vRBMiKVkRE';
const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0`;
const YOUTUBE_THUMB_URL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;

export default function HomeLiveBridge() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  return (
    <section className={styles.section} aria-label="Puente General Belgrano en vivo">
      <div className={styles.inner}>
        <div className={styles.pattern} aria-hidden="true" />

        <h2 className={styles.title}>PUENTE GRAL. BELGRANO EN VIVO</h2>

        <div className={styles.mediaFrame}>
          {isPlayerReady ? (
            <iframe
              className={styles.media}
              src={YOUTUBE_EMBED_URL}
              title="Streaming en vivo del Puente General Belgrano"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={styles.poster}
              onClick={() => setIsPlayerReady(true)}
              aria-label="Reproducir streaming en vivo"
            >
              <Image
                className={styles.posterImage}
                src={YOUTUBE_THUMB_URL}
                alt=""
                fill
                sizes="(max-width: 600px) 354px, (max-width: 960px) 720px, 802px"
                unoptimized
              />
              <span className={styles.posterOverlay} aria-hidden="true" />
              <span className={styles.playIcon} aria-hidden="true">
                ▶
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
