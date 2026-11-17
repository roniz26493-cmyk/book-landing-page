import { bookConfig } from '../data/bookConfig'
import { Lines } from './ui/Lines'
import styles from './Summary.module.css'

const { summary } = bookConfig

/**
 * S8 — תקציר: פאנל על שתי העמודות הימניות של גריד ה"גיליון" (כותרת מימין,
 * טקסט מקו 69%) ופרט מאיור הכריכה בעמודה השמאלית, שנכנס אל הפאנל ונמס עליו.
 */
export function Summary() {
  return (
    <section className={styles.section} aria-labelledby="summary-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.art} aria-hidden="true">
          <picture>
            <source srcSet={summary.imageWebp} type="image/webp" />
            <img src={summary.image} alt="" width={590} height={1065} loading="lazy" decoding="async" />
          </picture>
        </div>

        <div className={`panel ${styles.panel}`}>
          {/* הכותרת "תקציר הספר" מוסתרת ויזואלית (לבקשה) ונשארת לקוראי מסך */}
          <h2 id="summary-title" className="srOnly">
            {summary.title}
          </h2>
          <div className={styles.body}>
            {summary.paragraphs.map((p, i) => (
              <p key={p.slice(0, 20)} data-reveal={Math.min(i, 3)}>
                <Lines text={p} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
