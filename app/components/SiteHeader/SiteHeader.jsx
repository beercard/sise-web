'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './SiteHeader.module.scss';

const navItems = [
  { href: '#hogar', label: 'HOGAR', className: styles.hogar },
  {
    href: '#empresas',
    label: 'EMPRESAS',
    className: styles.empresas,
    submenu: [
      { href: '#', label: 'COMERCIO' },
      { href: '#', label: 'INDUSTRIA' }
    ]
  },
  {
    href: '#urbano',
    label: 'URBANO',
    className: styles.urbano,
    submenu: [
      { href: '#', label: 'EDIFICIOS' },
      { href: '#', label: 'CONSTRUCCIÓN' }
    ]
  },
  { href: '#agro', label: 'AGRO', className: styles.agro },
  { href: '#ciudad', label: 'CIUDAD', className: styles.ciudad },
  {
    href: '#nosotros',
    label: 'NOSOTROS',
    className: styles.nosotros,
    submenu: [
      { href: '#', label: 'HISTORIA' },
      { href: '#', label: 'RSE' }
    ]
  },
  { href: '#contacto', label: 'CONTACTO', className: styles.contacto }
];

export default function SiteHeader() {
  const navId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeMenu, isOpen]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 960px)');
    if (!media.matches) return;
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 960px)');
    const onChange = () => {
      if (!media.matches) closeMenu();
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [closeMenu]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
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
        </div>

        <button
          type="button"
          className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ''}`}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls={navId}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className={styles.menuButtonIcon} aria-hidden="true" />
        </button>

        {isOpen ? (
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Cerrar menú"
            onClick={closeMenu}
          />
        ) : null}

        <nav
          className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
          aria-label="Navegación principal"
        >
          <ul id={navId} className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
            {navItems.map((item, index) => {
              const hasSubmenu = Boolean(item.submenu?.length);
              const isSubmenuOpen = openSubmenu === item.href;
              const submenu = hasSubmenu ? (
                <div
                  className={`${styles.submenu} ${isSubmenuOpen ? styles.submenuOpen : ''}`}
                  role="menu"
                  aria-label={`Submenu ${item.label}`}
                >
                  <div className={styles.submenuHeader}>{item.label}</div>
                  <Link
                    className={styles.submenuLink}
                    href={item.submenu[0].href}
                    onClick={closeMenu}
                  >
                    {item.submenu[0].label}
                  </Link>
                  <div className={styles.submenuDivider} aria-hidden="true" />
                  <Link
                    className={styles.submenuLink}
                    href={item.submenu[1].href}
                    onClick={closeMenu}
                  >
                    {item.submenu[1].label}
                  </Link>
                </div>
              ) : null;

              const content = (
                <div className={styles.navItemContent}>
                  <div className={styles.navItemTop}>
                    <Link
                      className={`${styles.navLink} ${item.className}`}
                      href={item.href}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                    {hasSubmenu ? (
                      <button
                        type="button"
                        className={`${styles.submenuToggle} ${
                          isSubmenuOpen ? styles.submenuToggleOpen : ''
                        }`}
                        aria-label={`${isSubmenuOpen ? 'Cerrar' : 'Abrir'} submenu de ${item.label}`}
                        aria-expanded={isSubmenuOpen}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setOpenSubmenu((current) => (current === item.href ? null : item.href));
                        }}
                      />
                    ) : null}
                  </div>
                  {submenu}
                </div>
              );

              if (index === 0) {
                return (
                  <li
                    key={item.href}
                    className={`${styles.navItemFirst} ${hasSubmenu ? styles.navItemWithSubmenu : ''}`}
                  >
                    {content}
                  </li>
                );
              }

              return (
                <li
                  key={item.href}
                  className={`${styles.navItem} ${hasSubmenu ? styles.navItemWithSubmenu : ''}`}
                >
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
