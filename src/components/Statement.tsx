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
      <blockquote className={styles.quote} data-reveal="0">
        <p>
          {/* כל שורה בלוק משלה: השבירות נשמרות, ושורה ארוכה מדי נשברת בתוכה במאוזן */}
          {statement.quote.split('\n').map((line, i, lines) => (
            <span key={line} className={styles.line}>
              {line}
              {/* רווח בין השורות — כדי שהטקסט (וקוראי מסך) לא יחברו מילים משתי שורות */}
              {i < lines.length - 1 && ' '}
            </span>
          ))}
        </p>
      </blockquote>
    </section>
  )
}
