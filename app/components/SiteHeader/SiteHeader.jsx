'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './SiteHeader.module.scss';

const navItems = [
  { href: '#hogar', label: 'HOGAR', className: styles.hogar },
  { href: '#empresas', label: 'EMPRESAS', className: styles.empresas },
  { href: '#urbano', label: 'URBANO', className: styles.urbano },
  { href: '#agro', label: 'AGRO', className: styles.agro },
  { href: '#ciudad', label: 'CIUDAD', className: styles.ciudad },
  { href: '#nosotros', label: 'NOSOTROS', className: styles.nosotros },
  { href: '#contacto', label: 'CONTACTO', className: styles.contacto }
];

export default function SiteHeader() {
  const navId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeMenu, isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="SISE">
          <Image
            src="/image/mpr0za9r-avr9t9i.png"
            alt="SISE"
            className={styles.aguila}
            width={136}
            height={80}
            priority
          />
        </Link>

        <Link href="/" aria-label="SISE Argentina">
          <Image
            src="/image/mpr0za7f-u0o57i4.png"
            alt="SISE Argentina"
            className={styles.recurso}
            width={85}
            height={50}
            priority
          />
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls={navId}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className={styles.menuButtonIcon} aria-hidden="true" />
        </button>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul id={navId} className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
            {navItems.map((item, index) => {
              const content = (
                <Link
                  className={`${styles.navLink} ${item.className}`}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );

              if (index === 0) {
                return (
                  <li key={item.href} className={styles.navItemFirst}>
                    {content}
                  </li>
                );
              }

              return (
                <li key={item.href} className={styles.navItem}>
                  <span className={styles.vector} aria-hidden="true" />
                  {content}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
