import { bookConfig } from '../../data/bookConfig'
import styles from './PlaceholderMark.module.css'

interface PlaceholderMarkProps {
  /** טקסט חלופי לתגית */
  label?: string
  /** true = תגית בגרסה בהירה, לשימוש על רקע כהה */
  onDark?: boolean
}

/**
 * תגית קטנה שמסמנת אזור עם תוכן זמני.
 * מוצגת רק כש-placeholders.showMarks הוא true בקונפיג —
 * להעביר ל-false לפני העלייה לאוויר כדי להעלים את כל התגיות בבת אחת.
 */
export function PlaceholderMark({ label = 'תוכן זמני', onDark }: PlaceholderMarkProps) {
  if (!bookConfig.placeholders.showMarks) return null

  return (
    <span className={[styles.mark, onDark ? styles.onDark : ''].join(' ')}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  )
}
