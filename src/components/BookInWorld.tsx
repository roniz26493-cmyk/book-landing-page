import { useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { PlaceholderMark } from './ui/PlaceholderMark'
import styles from './BookInWorld.module.css'

const { bookInWorld, placeholders } = bookConfig

/**
 * מקומות שמורים זמניים — רק בסביבת פיתוח (npm run dev) וגם כש-showMarks פעיל.
 * ב-build לאתר החי הם לעולם לא מוצגים: אין צילומים או תגובות מזויפים.
 */
const showDevPlaceholders = import.meta.env.DEV && placeholders.showMarks

/** מקומות שמורים לצילומים — יחסי גובה-רוחב שונים, כמו גיליון מגע. פיתוח בלבד. */
const placeholderFrames = ['4 / 5', '3 / 4', '1 / 1', '4 / 5', '2 / 3', '5 / 4']

/** מקומות שמורים לתגובות — טקסט בסוגריים, ברור שזמני. פיתוח בלבד. */
const placeholderReactions = [
  { text: '[תגובה אמיתית של קורא/ת — להשלמה]', attribution: '[שם]' },
  { text: '[תגובה קצרה נוספת — להשלמה]', attribution: '[שם]' },
  { text: '[תגובה שלישית — להשלמה]', attribution: '[שם]' },
]

/**
 * הספר בעולם — רצועת צילומים אמיתיים של הספר שנעה לאט (כמו גיליון מגע
 * של צלם, לא קרוסלה), ומתחתיה כמה שורות קצרות של קוראים אמיתיים.
 *
 * התוכן מגיע מ-bookConfig.bookInWorld. כל עוד המערכים ריקים, מוצגים מקומות
 * שמורים רק בפיתוח; באתר החי החלק הריק פשוט לא מוצג.
 * לא ממציאים צילומים או תגובות.
 */
export function BookInWorld() {
  const [isPaused, setIsPaused] = useState(false)

  const hasPhotos = bookInWorld.photos.length > 0
  const hasReactions = bookInWorld.reactions.length > 0
  const showPhotos = hasPhotos || showDevPlaceholders
  const showReactions = hasReactions || showDevPlaceholders

  if (!showPhotos && !showReactions) return null

  const reactions = hasReactions ? bookInWorld.reactions : placeholderReactions

  // סט אחד של פריימים; הרצועה מציגה אותו פעמיים ברצף כדי שהלולאה תהיה חלקה
  const frames = hasPhotos
    ? bookInWorld.photos.map((photo, index) => (
        <img
          key={index}
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
        />
      ))
    : placeholderFrames.map((ratio, index) => (
        <span key={index} className={styles.slot} style={{ aspectRatio: ratio }} />
      ))

  return (
    <section className={styles.section} aria-label="הספר בעולם">
      {(!hasPhotos || !hasReactions) && showDevPlaceholders && (
        <div className={`container ${styles.devNote}`}>
          <PlaceholderMark label="אזור זמני — צילומי הספר ותגובות קוראים יתווספו" />
        </div>
      )}

      {showPhotos && (
        <>
          <div className={styles.strip} data-paused={isPaused}>
            <div className={styles.track}>
              <div className={styles.set}>{frames}</div>
              <div className={`${styles.set} ${styles.loopCopy}`} aria-hidden="true">
                {frames}
              </div>
            </div>
          </div>

          <div className={`container ${styles.controls}`}>
            <button
              type="button"
              className={styles.pause}
              onClick={() => setIsPaused((paused) => !paused)}
              aria-pressed={isPaused}
            >
              {isPaused ? 'הפעלת התנועה' : 'עצירת התנועה'}
            </button>
          </div>
        </>
      )}

      {showReactions && (
        <ul className={`container ${styles.reactions}`}>
          {reactions.map((reaction, index) => (
            <li key={index} className={styles.reaction}>
              <p className={styles.reactionText}>{reaction.text}</p>
              {reaction.attribution && (
                <p className={styles.attribution}>— {reaction.attribution}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
