import ContactoHero from './components/ContactoHero/ContactoHero';

import { buildPageMetadata } from '../lib/seo';
import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Contacto y atención 24 horas',
  description:
    'Contactá a SISE Argentina por teléfono, WhatsApp o correo y recibí asesoramiento comercial y técnico en seguridad electrónica.',
  path: '/contacto'
});

export default function ContactoPage() {
  return (
    <div className={styles.contacto}>
      <ContactoHero />
    </div>
  );
}
