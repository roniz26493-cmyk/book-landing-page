import styles from './SectionFolio.module.css'

interface SectionFolioProps {
  /** מספר העמוד/הפרק, לדוגמה "01" */
  number: string
  /** תווית קצרה — לא כותרת האזור, אלא תיוג עדין בסגנון גיליון */
  label: string
  onDark?: boolean
  className?: string
}

/**
 * סימון "עמוד/פרק" עדין — התחליף המאוחד לתבנית eyebrow+קו+כותרת-ממורכזת
 * שחזרה בכל אזור. זהו הפריט המשותף היחיד בין האזורים; ההרכב הפנימי
 * של כל אזור נשאר שונה, כדי שהעמוד ירגיש כמו דפדוף בגיליון ולא כמו
 * רכיב שחוזר על עצמו.
 */
export function SectionFolio({ number, label, onDark, className }: SectionFolioProps) {
  return (
    <div
      className={[styles.folio, onDark ? styles.onDark : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.number}>{number}</span>
      <span className={styles.rule} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
