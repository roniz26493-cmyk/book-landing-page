import { bookConfig } from '../data/bookConfig'
import styles from './Statement.module.css'

const { statement } = bookConfig

/**
 * הציטוט — משפט אישי, ממורכז, על רקע צבעי מים מהצד האחורי של הסימנייה:
 * ענף בפינה העליונה, ים ושקיעה עם ענף בתחתית — נמסים אל השמנת, בלי מסגרת.
 * האיור דקורטיבי בלבד (סטטי, מוסתר מקוראי מסך); הציטוט טקסט HTML אמיתי.
 */
export function Statement() {
  return (
    <section className={styles.section} aria-label="ציטוט מתוך הספר">
      <img className={styles.branch} src={statement.art.branch} alt="" aria-hidden="true"
        width={313} height={335} loading="lazy" decoding="async" />
      <img className={styles.sea} src={statement.art.sea} alt="" aria-hidden="true"
        width={643} height={891} loading="lazy" decoding="async" />
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
