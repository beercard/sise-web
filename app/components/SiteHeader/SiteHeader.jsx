'use client';

import { Fragment, useCallback, useEffect, useId, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './SiteHeader.module.scss';

export default function SiteHeader() {
  const navId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 961px)').matches;
  });

  const navItems = useMemo(
    () => [
      { href: '/hogar', label: 'HOGAR', className: styles.hogar },
      {
        href: '/#empresas',
        label: 'EMPRESAS',
        className: styles.empresas,
        submenu: [
          { href: '/comercio', label: 'COMERCIO' },
          { href: '/industria', label: 'INDUSTRIA' }
        ]
      },
      {
        href: '/#urbano',
        label: 'URBANO',
        className: styles.urbano,
        submenu: [
          { href: '/edificios', label: 'EDIFICIOS' },
          { href: '/construccion', label: 'CONSTRUCCIÓN' }
        ]
      },
      { href: '/#agro', label: 'AGRO', className: styles.agro },
      { href: '/#ciudad', label: 'CIUDAD', className: styles.ciudad },
      {
        href: '/#nosotros',
        label: 'NOSOTROS',
        className: styles.nosotros,
        submenu: [
          { href: '/#nosotros', label: 'HISTORIA' },
          { href: '/#nosotros', label: 'RSE' }
        ]
      },
      { href: '/#contacto', label: 'CONTACTO', className: styles.contacto }
    ],
    []
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeMenu]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 961px)');
    const onChange = (event) => {
      setIsDesktop(event.matches);
      if (!event.matches) return;
      setIsOpen(false);
      setOpenSubmenu(null);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

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
          className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ''}`}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls={navId}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className={styles.menuButtonIcon} aria-hidden="true" />
        </button>

        <nav
          className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
          aria-label="Navegación principal"
        >
          <ul id={navId} className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
            {navItems.map((item, index) => {
              const hasSubmenu = Boolean(item.submenu?.length);
              const submenuId = `${navId}-${item.label.toLowerCase()}-submenu`;
              const isSubmenuOpen = openSubmenu === item.href;
              const submenuClassName = styles[`submenu${item.label.toLowerCase()}`];
              const navItemVariantClassName = styles[`navItem${item.label.toLowerCase()}`];

              const content = (
                <div className={styles.navLinkGroup}>
                  <div className={`${styles.navLinkRow} ${isSubmenuOpen ? styles.navLinkRowActive : ''}`}>
                    {hasSubmenu ? (
                      <button
                        type="button"
                        className={`${styles.navLink} ${item.className}`}
                        aria-haspopup="menu"
                        aria-expanded={isSubmenuOpen}
                        aria-controls={submenuId}
                        onClick={() => setOpenSubmenu((current) => (current === item.href ? null : item.href))}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link className={`${styles.navLink} ${item.className}`} href={item.href} onClick={closeMenu}>
                        {item.label}
                      </Link>
                    )}

                    {hasSubmenu ? (
                      <button
                        type="button"
                        className={styles.submenuToggle}
                        aria-label={`${isSubmenuOpen ? 'Cerrar' : 'Abrir'} submenú de ${item.label}`}
                        aria-expanded={isSubmenuOpen}
                        aria-controls={submenuId}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setOpenSubmenu((current) => (current === item.href ? null : item.href));
                        }}
                      >
                        <span className={styles.submenuToggleIcon} aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>

                  {hasSubmenu ? (
                    <div
                      id={submenuId}
                      className={`${styles.submenu} ${submenuClassName ?? ''} ${
                        isSubmenuOpen ? styles.submenuOpen : ''
                      }`}
                      role="menu"
                      aria-label={`Submenú de ${item.label}`}
                    >
                      {item.submenu.map((subitem) => (
                        <Fragment key={`${subitem.href}-${subitem.label}`}>
                          <Link className={styles.submenuItem} href={subitem.href} onClick={closeMenu} role="menuitem">
                            {subitem.label}
                          </Link>
                        </Fragment>
                      ))}
                    </div>
                  ) : null}
                </div>
              );

              return (
                <li
                  key={item.href}
                  className={`${styles.navItem} ${index === 0 ? styles.navItemFirst : ''} ${
                    hasSubmenu ? styles.navItemWithSubmenu : ''
                  } ${navItemVariantClassName ?? ''}`}
                  onMouseEnter={() => {
                    if (!hasSubmenu || !isDesktop) return;
                    setOpenSubmenu(item.href);
                  }}
                  onMouseLeave={() => {
                    if (!hasSubmenu || !isDesktop) return;
                    setOpenSubmenu(null);
                  }}
                >
                  <div className={styles.navItemBody}>
                    {content}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
