import { bookConfig } from '../data/bookConfig'
import { isWhatsappReady } from './ui/WhatsAppOrderButton'
import styles from './Faq.module.css'

const { faq } = bookConfig

// בלי תשובות placeholder; תשובות שמתארות את כפתור הוואטסאפ — רק כשהוא פעיל
const items = faq.items.filter((item) => !item.isPlaceholder && (!item.requiresWhatsapp || isWhatsappReady))

/** S12 — שאלות נפוצות (REFERENCE_MAP): כותרת ממורכזת ושורות אקורדיון ברוחב המיכל. */
export function Faq() {
  if (items.length === 0) return null
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <h2 id="faq-title" className={`sectionTitle ${styles.title}`}>
          {faq.title}
        </h2>
        <div className={styles.list}>
          {items.map((item) => (
            <details key={item.id} className={`panel ${styles.item}`}>
              <summary className={styles.question}>
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
