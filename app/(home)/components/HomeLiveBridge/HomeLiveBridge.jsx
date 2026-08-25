'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './HomeLiveBridge.module.scss';

/*
 * Por defecto se embebe el vivo del canal (`live_stream?channel=…`), no un
 * video puntual: YouTube resuelve solo cuál es la transmisión en curso, así
 * que cuando cambia el vivo la sección lo sigue sin tocar nada.
 *
 * Las dos variables son opcionales y sólo hacen falta para casos puntuales:
 *   NEXT_PUBLIC_LIVE_CHANNEL_ID  otro canal (id que empieza con UC…)
 *   NEXT_PUBLIC_LIVE_VIDEO_ID    fijar un video concreto en vez del vivo;
 *                                acepta el id o la URL entera de YouTube
 * Al ser NEXT_PUBLIC_ se resuelven al compilar: cambiarlas exige desplegar.
 */
const FALLBACK_CHANNEL_ID = 'UC2RkL2eATR1V6H8g4eNfA5Q';

function resolveChannelId(value) {
  const raw = String(value ?? '').trim();
  const fromUrl = raw.match(/(UC[A-Za-z0-9_-]{22})/);
  return fromUrl ? fromUrl[1] : FALLBACK_CHANNEL_ID;
}

function resolveVideoId(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const fromUrl = raw.match(/(?:v=|youtu\.be\/|\/live\/|\/embed\/)([A-Za-z0-9_-]{11})/);
  if (fromUrl) return fromUrl[1];

  return /^[A-Za-z0-9_-]{11}$/.test(raw) ? raw : null;
}

const PINNED_VIDEO_ID = resolveVideoId(process.env.NEXT_PUBLIC_LIVE_VIDEO_ID);
const CHANNEL_ID = resolveChannelId(process.env.NEXT_PUBLIC_LIVE_CHANNEL_ID);

const PLAYER_PARAMS = 'autoplay=1&mute=1&playsinline=1&rel=0';
const YOUTUBE_EMBED_URL = PINNED_VIDEO_ID
  ? `https://www.youtube-nocookie.com/embed/${PINNED_VIDEO_ID}?${PLAYER_PARAMS}`
  : `https://www.youtube-nocookie.com/embed/live_stream?channel=${CHANNEL_ID}&${PLAYER_PARAMS}`;

/* En modo canal no hay id del que derivar la miniatura, así que la portada es
   un archivo propio (el cuadro del vivo del diseño, Figma 3182:607/653 — la
   misma captura sirve para desktop y mobile). Además evita pegarle a
   i.ytimg.com antes de que el visitante toque play. */
const POSTER_SRC = '/image/live-puente-captura.webp';

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
                src={POSTER_SRC}
                alt=""
                fill
                unoptimized
                sizes="100vw"
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
