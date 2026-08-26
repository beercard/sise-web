'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import styles from './SolutionInfoPopup.module.scss';

const CLOSE_ANIMATION_MS = 220;

const toParagraphs = (value) => (Array.isArray(value) ? value : [value]);

/* Los componentes se agrupan en bloques de viñetas separados por notas sin
   viñeta ({ note }), como el bloque "Al escalar a monitoreo activo..." del
   diseño de CCTV. */
const toComponentBlocks = (components = []) => {
  const blocks = [];
  let items = [];
  components.forEach((entry) => {
    if (typeof entry === 'string') {
      items.push(entry);
      return;
    }
    if (items.length) blocks.push({ items });
    items = [];
    blocks.push({ note: entry.note });
  });
  if (items.length) blocks.push({ items });
  return blocks;
};

/*
 * Popup "+ info" de las tarjetas de soluciones — Figma 3585:458 (desktop,
 * 1432×562). Panel gris #d9d9d9 que cubre la grilla de tarjetas: barra de
 * título azul, columna izquierda con la bajada y la foto, y dos columnas de
 * contenido ("Descripción de la solución" / "Componentes" y "Beneficios" /
 * "Distintivo SISE") separadas por divisores blancos, con el botón "Cerrar"
 * abajo a la derecha. Es compartido: el contenido viene de
 * app/lib/solutionsInfo.js y cada módulo de soluciones lo monta sobre su
 * grilla. Por ahora sólo se abre en desktop/laptop (el diseño mobile no
 * existe todavía).
 */
export default function SolutionInfoPopup({ info, onClose }) {
  /* El cierre anima primero y recién después desmonta (el padre recibe
     onClose al terminar la salida). */
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(onClose, CLOSE_ANIMATION_MS);
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  if (!info) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={info.title}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h3 className={styles.title}>{info.title}</h3>
        </header>

        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <p className={styles.tagline}>{info.tagline}</p>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={`${styles.col} ${styles.colMid}`}>
            <p className={styles.chip}>Descripción de la solución</p>
            {toParagraphs(info.description).map((paragraph) => (
              <p key={paragraph} className={`${styles.text} ${styles.textSpaced}`}>
                {paragraph}
              </p>
            ))}

            <p className={styles.chip}>Componentes</p>
            {toComponentBlocks(info.components).map((block, index) =>
              block.note ? (
                <p key={`note-${index}`} className={styles.note}>
                  {block.note}
                </p>
              ) : (
                <ul key={`items-${index}`} className={styles.list}>
                  {block.items.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.col}>
            <p className={styles.chip}>Beneficios</p>
            {toParagraphs(info.benefits).map((paragraph) => (
              <p key={paragraph} className={`${styles.text} ${styles.textSpaced}`}>
                {paragraph}
              </p>
            ))}

            <p className={styles.chip}>
              Distintivo
              <Image
                src="/image/solucion-distintivo-sise.svg"
                alt="SISE"
                className={styles.chipLogo}
                width={49}
                height={14}
              />
            </p>
            {info.distinctive.map((paragraph) => (
              <p key={paragraph} className={`${styles.text} ${styles.textSpaced}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.photo}>
          <Image
            src={info.photo}
            alt={info.photoAlt ?? ''}
            className={styles.photoImage}
            fill
            sizes="425px"
            unoptimized
          />
        </div>

        <button type="button" className={styles.closeButton} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
