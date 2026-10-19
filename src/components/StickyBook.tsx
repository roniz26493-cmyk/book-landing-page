import { useEffect, useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { isWhatsappReady, whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './StickyBook.module.css'

const { book, purchase } = bookConfig

/**
 * הספר החוזר — כריכה זעירה ושלמה שמלווה את הגלילה ומובילה לרכישה.
 * מופיע רק אחרי שה-Hero יצא מהמסך, ונעלם כשאזור הרכישה או הפוטר גלויים
 * (שם כבר אין בו צורך). בלי עיגול, בלי הבהוב, בלי תג — ספר קטן בפינה.
 */
export function StickyBook() {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set(['top']))

  useEffect(() => {
    const targets = ['top', 'purchase', 'site-footer']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver((entries) => {
      setVisibleIds((prev) => {
        const next = new Set(prev)
        for (const entry of entries) {
          if (entry.isIntersecting) next.add(entry.target.id)
          else next.delete(entry.target.id)
        }
        return next
      })
    })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const isVisible = visibleIds.size === 0

  return (
    <a
      className={styles.book}
      // ישירות לוואטסאפ של המחבר; כל עוד המספר לא הוגדר — לאזור הרכישה
      href={isWhatsappReady ? (whatsappLink ?? undefined) : '#purchase'}
      target={isWhatsappReady ? '_blank' : undefined}
      rel={isWhatsappReady ? 'noopener noreferrer' : undefined}
      data-visible={isVisible}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      aria-label={
        isWhatsappReady ? `${purchase.primaryCta} (וואטסאפ, נפתח בחלון חדש)` : purchase.primaryCta
      }
    >
      <span className={styles.cover}>
        <img
          src={book.coverImageWebp || book.coverImage}
          alt=""
          width={1100}
          height={1762}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className={styles.label} aria-hidden="true">
        לרכישה
      </span>
    </a>
  )
}
