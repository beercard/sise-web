import Image from 'next/image';
import Link from 'next/link';

import styles from './not-found.module.scss';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true }
};

const QUICK_LINKS = [
  { href: '/hogar', label: 'Hogar' },
  { href: '/comercio', label: 'Comercio' },
  { href: '/industria', label: 'Industria' },
  { href: '/edificios', label: 'Edificios' },
  { href: '/agro', label: 'Campo' },
  { href: '/ciudad', label: 'Ciudad' }
];

export default function NotFound() {
  return (
    <section className={styles.wrap} aria-label="Página no encontrada">
      <div className={styles.inner}>
        <Image
          src="/image/mpr0za9r-avr9t9i.png"
          alt="SISE Argentina"
          width={132}
          height={78}
          className={styles.logo}
          priority
        />

        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.text}>
          La página que buscás no existe o fue movida. Pero tu seguridad sigue en buenas manos:
          volvé al inicio o explorá nuestras soluciones.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            Volver al inicio
          </Link>
          <Link href="/contacto" className={styles.secondary}>
            Contactanos
          </Link>
        </div>

        <nav className={styles.quickLinks} aria-label="Soluciones de seguridad">
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.quickLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
