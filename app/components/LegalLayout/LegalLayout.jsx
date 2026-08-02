import Link from 'next/link';

import styles from './LegalLayout.module.scss';

export default function LegalLayout({ title, intro, updatedAt, children }) {
  return (
    <div className={styles.legal}>
      <section className={styles.inner} aria-label={title}>
        <nav className={styles.breadcrumb} aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>

        <header className={styles.head}>
          <p className={styles.kicker}>SISE Argentina</p>
          <h1 className={styles.title}>{title}</h1>
          {intro ? <p className={styles.introText}>{intro}</p> : null}
          {updatedAt ? (
            <p className={styles.updated}>Última actualización: {updatedAt}</p>
          ) : null}
        </header>

        <div className={styles.prose}>{children}</div>
      </section>
    </div>
  );
}
