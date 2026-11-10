import { bookConfig } from '../data/bookConfig'
import { AccentTitle } from './ui/AccentTitle'
import { Lines } from './ui/Lines'
import styles from './Summary.module.css'

const { summary } = bookConfig

/**
 * S8 — פאנל תקציר בצד שמאל + איור בצד ימין (REFERENCE_MAP). במקום העגור
 * של הרפרנס: פרט מתוך איור הכריכה, שעולה מעל קצה הפאנל.
 */
export function Summary() {
  return (
    <section className={styles.section} aria-labelledby="summary-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.art} aria-hidden="true">
          <picture>
            <source srcSet={summary.imageWebp} type="image/webp" />
            <img src={summary.image} alt="" width={1100} height={768} loading="lazy" decoding="async" />
          </picture>
        </div>

        <div className={`panel ${styles.panel}`}>
          <AccentTitle id="summary-title" title={summary.title} />
          <div className={styles.body}>
            {summary.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>
                <Lines text={p} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
