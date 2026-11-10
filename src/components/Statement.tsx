import { bookConfig } from '../data/bookConfig'
import styles from './Statement.module.css'

const { statement } = bookConfig

/**
 * הציטוט — סקשן משלו: משפט אישי בכתב יד, ממורכז, עם מרחב נשימה.
 * בלי כותרת, בלי טקסט נוסף ובלי מסגרת.
 */
export function Statement() {
  return (
    <section className={styles.section} aria-label="ציטוט מתוך הספר">
      <blockquote className={styles.quote}>
        <p>
          {/* כל שורה בלוק משלה: השבירות נשמרות, ושורה ארוכה מדי נשברת בתוכה במאוזן */}
          {statement.quote.split('\n').map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
      </blockquote>
    </section>
  )
}
