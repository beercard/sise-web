'use client';

import styles from './WhatsAppFloatingButton.module.scss';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=5493624231144&text=Hola%21+Quisiera+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0';

export default function WhatsAppFloatingButton() {
  return (
    <a
      className={styles.button}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.22 6.39 2.22 11.79c0 1.73.45 3.43 1.31 4.93L2 22l5.43-1.42a9.86 9.86 0 0 0 4.59 1.17h.01c5.41 0 9.81-4.4 9.81-9.8 0-2.62-1.02-5.08-2.79-6.84Zm-7.02 15.18h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.22.84.86-3.14-.2-.32a8.13 8.13 0 0 1-1.25-4.35 8.3 8.3 0 0 1 8.3-8.28c2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.85 8.3 8.3 0 0 1-8.26 8.31Zm4.55-6.2c-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.12-.57.12-.17.24-.65.81-.8.97-.14.17-.29.18-.54.06-.25-.12-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.12-.14.17-.24.26-.41.09-.17.05-.32-.02-.44-.08-.12-.57-1.37-.78-1.87-.21-.51-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.02 2.61.12.17 1.76 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.1-.22-.16-.47-.28Z" />
        </svg>
      </span>
    </a>
  );
}
