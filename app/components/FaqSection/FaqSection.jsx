import styles from './FaqSection.module.scss';

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
