import { Fragment } from 'react'
import { bookConfig } from '../data/bookConfig'
import styles from './Summary.module.css'

const { summary } = bookConfig

// טיפוגרפיה עברית בלבד (הנוסח זהה לגב הכריכה): מקף לא פותח שורה, ו"יום־יומיים" לא נשבר אחרי המקף העליון
const typeset = (text: string) => text.replace(/ – /g, '\u00a0– ').replace(/־/g, '־\u2060')

/** שני קווים דקים שמתחדדים החוצה ויהלום זעיר באמצע — דקורטיבי בלבד */
function Divider({ order }: { order: number }) {
  return (
    <svg className={styles.divider} viewBox="0 0 120 8" width="120" height="8" aria-hidden="true" focusable="false" data-reveal={order}>
      <path d="M2 4 Q30 3.4 53 3.05 L53 4.95 Q30 4.6 2 4 Z" />
      <path d="M60 0.6 L62.9 4 L60 7.4 L57.1 4 Z" />
      <path d="M118 4 Q90 3.4 67 3.05 L67 4.95 Q90 4.6 118 4 Z" />
    </svg>
  )
}

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
              <Fragment key={p.slice(0, 20)}>
                {/* מפריד עיטורי בין שני גושי הטקסט בלבד — כמו בספר מודפס */}
                {i > 0 && <Divider order={Math.min(i, 3)} />}
                <p data-reveal={Math.min(i, 3)}>{typeset(p)}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
