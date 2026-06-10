import ContactoHero from './components/ContactoHero/ContactoHero';

import { buildPageMetadata } from '../lib/seo';
import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Contacto y atencion 24 horas',
  description:
    'Contacta a SISE Argentina por telefono, WhatsApp o correo y recibe asesoramiento comercial y tecnico en seguridad electronica.',
  path: '/contacto'
});

export default function ContactoPage() {
  return (
    <div className={styles.contacto}>
      <ContactoHero />
    </div>
  );
}
