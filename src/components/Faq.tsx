import { bookConfig } from '../data/bookConfig'
import { isWhatsappReady } from './ui/WhatsAppOrderButton'
import styles from './Faq.module.css'

const { faq } = bookConfig

// בלי תשובות placeholder; תשובות שמתארות את כפתור הוואטסאפ — רק כשהוא פעיל
const items = faq.items.filter((item) => !item.isPlaceholder && (!item.requiresWhatsapp || isWhatsappReady))

/**
 * S12 — שאלות נפוצות, לפני ההזמנה. על גריד ה"גיליון" (.spread): כותרת בעמודה
 * הימנית, שורות האקורדיון בעמודת הקריאה — כמו שאר מקטעי הקריאה.
 */
export function Faq() {
  if (items.length === 0) return null
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className="container spread">
        <h2 id="faq-title" className={`sectionTitle spreadHead ${styles.title}`}>
          {faq.title}
        </h2>
        <div className={`spreadBody ${styles.list}`}>
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
