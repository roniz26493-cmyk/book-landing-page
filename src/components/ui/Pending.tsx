import type { ReactNode } from 'react'
import { bookConfig } from '../../data/bookConfig'

/** האם להציג סימוני "להשלמה" (placeholders.showMarks בקונפיג — false לפני פרסום). */
export const showPending = bookConfig.placeholders.showMarks

/**
 * מקום שמור לתוכן אמיתי שעדיין חסר. מוצג רק כש-showMarks פעיל, ותמיד
 * מסומן במפורש — לעולם לא תוכן שנראה אמיתי.
 */
export function Pending({ children = 'להשלמה', className }: { children?: ReactNode; className?: string }) {
  if (!showPending) return null
  return <span className={['pending', className].filter(Boolean).join(' ')}>{children}</span>
}
