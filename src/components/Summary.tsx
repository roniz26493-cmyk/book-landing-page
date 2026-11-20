import { bookConfig } from '../data/bookConfig'
import styles from './Summary.module.css'

const { summary } = bookConfig

// טיפוגרפיה עברית בלבד (הנוסח זהה לגב הכריכה): מקף לא פותח שורה, ו"יום־יומיים" לא נשבר אחרי המקף העליון
const typeset = (text: string) => text.replace(/ – /g, '\u00a0– ').replace(/־/g, '־\u2060')

/**
 * S8 — תקציר: פאנל טיפוגרפי על גריד ה"גיליון" (טקסט בעמודה האמצעית).
 * הפנים מהכריכה הוסרו (לבקשה, נובמבר 2026) — אחרי איור הסימנייה בציטוט, התקציר נשאר טקסט בלבד.
 */
export function Summary() {
  return (
    <section className={styles.section} aria-labelledby="summary-title">
      <div className={`container ${styles.layout}`}>
        <div className={`panel ${styles.panel}`}>
          {/* הכותרת "תקציר הספר" מוסתרת ויזואלית (לבקשה) ונשארת לקוראי מסך */}
          <h2 id="summary-title" className="srOnly">
            {summary.title}
          </h2>
          <div className={styles.body}>
            {summary.paragraphs.map((p, i) => (
              <p key={p.slice(0, 20)} data-reveal={Math.min(i, 3)}>
                {typeset(p)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
