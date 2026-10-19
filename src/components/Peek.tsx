import { bookConfig } from '../data/bookConfig'
import { PlaceholderMark } from './ui/PlaceholderMark'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionFolio } from './ui/SectionFolio'
import styles from './Peek.module.css'

const { peek } = bookConfig

/**
 * אזור אופציונלי.
 * להסתרה מלאה: peek.enabled = false בקובץ bookConfig.ts
 *
 * מוצג כעמודים ממשיים מתוך הספר — עמודת קריאה צרה על רקע נייר,
 * לא ככרטיסי ציטוט. הקטעים עצמם הם בדיוק אלה שכבר קיימים ב-bookConfig
 * (לרבות סימון ה-placeholder, אם עדיין לא סופקו קטעים אמיתיים).
 */
export function Peek() {
  if (!peek.enabled || peek.excerpts.length === 0) return null

  return (
    <Section id="peek" tone="light" narrow className={styles.section}>
      <SectionFolio className={styles.folio} number="03" label="הצצה" />
      <h2 className={styles.title}>{peek.title}</h2>
      {peek.intro && <p className={styles.intro}>{peek.intro}</p>}
      {peek.isPlaceholder && (
        <div className={styles.placeholderRow}>
          <PlaceholderMark />
        </div>
      )}

      <div className={styles.pages}>
        {/* קטע אחד בלבד */}
        {peek.excerpts.slice(0, 1).map((excerpt, index) => (
          <Reveal
            as="article"
            key={excerpt.id}
            delay={index * 140}
            className={styles.page}
          >
            <p className={styles.pageNumber} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </p>
            <blockquote className={styles.text}>
              <p>{excerpt.text}</p>
            </blockquote>
            {excerpt.source && <p className={styles.source}>{excerpt.source}</p>}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
