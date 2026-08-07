'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './HomeLiveBridge.module.scss';

/*
 * El vivo se configura con NEXT_PUBLIC_LIVE_VIDEO_ID, sin tocar el código:
 * acepta tanto el id suelto (CA3S3av3C5A) como la URL completa de YouTube
 * (watch?v=…, youtu.be/… o /live/…). Si la variable no está definida se usa
 * el id de abajo. Al ser NEXT_PUBLIC_ el valor se resuelve al compilar, así
 * que un cambio necesita volver a desplegar.
 */
const FALLBACK_VIDEO_ID = 'CA3S3av3C5A';

function resolveVideoId(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return FALLBACK_VIDEO_ID;

  const fromUrl = raw.match(/(?:v=|youtu\.be\/|\/live\/|\/embed\/)([A-Za-z0-9_-]{11})/);
  if (fromUrl) return fromUrl[1];

  return /^[A-Za-z0-9_-]{11}$/.test(raw) ? raw : FALLBACK_VIDEO_ID;
}

const YOUTUBE_VIDEO_ID = resolveVideoId(process.env.NEXT_PUBLIC_LIVE_VIDEO_ID);
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
