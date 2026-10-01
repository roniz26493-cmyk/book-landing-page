import { bookConfig } from '../data/bookConfig'
import { useScrollPast } from '../hooks/useScrollPast'
import styles from './StickyWhatsApp.module.css'

const { book } = bookConfig

/**
 * סרגל רכישה דביק וצנום — מובייל בלבד, מופיע רק אחרי גלילה מעבר ל-Hero.
 * שורה אחת בלבד: שם הספר + כפתור "להזמנת הספר" שגולל לאזור הרכישה,
 * שם כל פרטי הלוגיסטיקה (כולל הגבלת השרון) כבר מופיעים במלואם —
 * בלי לחזור עליהם כאן בכל מסך.
 */
export function StickyWhatsApp() {
  const isVisible = useScrollPast(560)

  return (
    <div className={styles.bar} data-visible={isVisible} aria-hidden={!isVisible}>
      <div className={styles.content}>
        <span className={styles.bookTitle}>{book.title}</span>
        <a
          className={`btn ${styles.cta}`}
          href="#purchase"
          tabIndex={isVisible ? 0 : -1}
        >
          להזמנת הספר
        </a>
      </div>
    </div>
  )
}
