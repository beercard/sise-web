import ContactoHero from './components/ContactoHero/ContactoHero';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Contacto',
  description: 'Canales de contacto y atención permanente de SISE Argentina.'
};

export default function ContactoPage() {
  return (
    <div className={styles.contacto}>
      <ContactoHero />
    </div>
  );
}
