import { bookConfig } from '../data/bookConfig'
import { Pending, showPending } from './ui/Pending'
import styles from './Stats.module.css'

const { stats } = bookConfig

/**
 * S2 — שורת נתונים (REFERENCE_MAP): שני מספרים גדולים עם כיתוב קטן,
 * ממורכזים ב-±13% ממרכז העמוד. רק נתונים מאומתים; חסר = "להשלמה".
 */
export function Stats() {
  const slots = Math.max(stats.items.length, stats.slots)
  if (stats.items.length === 0 && !showPending) return null

  return (
    <section className={styles.stats} aria-label="נתונים על הספר">
      <ul className={styles.row}>
        {Array.from({ length: slots }, (_, i) => {
          const item = stats.items[i]
          return (
            <li key={item?.label ?? i} className={styles.item}>
              {item ? (
                <>
                  <span className={styles.value}>{item.value}</span>
                  <span className={styles.label}>{item.label}</span>
                </>
              ) : (
                <Pending>נתון להשלמה</Pending>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
