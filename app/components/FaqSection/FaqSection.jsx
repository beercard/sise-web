import styles from './FaqSection.module.scss';

/**
 * Sección de Preguntas Frecuentes reutilizable, con el mismo diseño que el
 * módulo FAQ del home (tarjetas grises plegables con chevron). El contenido
 * de cada vertical se pasa por props; el schema FAQPage se arma en la página
 * con buildFAQPageSchema para mantener una única fuente de verdad.
 */
export default function FaqSection({
  title = 'Preguntas frecuentes',
  intro,
  faqs = [],
  ariaLabel = 'Preguntas frecuentes'
}) {
  if (!faqs.length) return null;

  return (
    <section className={styles.faqSection} aria-label={ariaLabel}>
      <div className={styles.faqInner}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>{title}</h2>
          {intro ? <p className={styles.faqIntro}>{intro}</p> : null}
        </div>

        <div className={styles.faqList}>
          {faqs.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{item.question}</summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
