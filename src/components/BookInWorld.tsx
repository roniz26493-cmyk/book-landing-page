import { useState, type CSSProperties } from 'react'
import { bookConfig } from '../data/bookConfig'
import { PlaceholderMark } from './ui/PlaceholderMark'
import styles from './BookInWorld.module.css'

const { bookInWorld, placeholders } = bookConfig

/**
 * תגובות זמניות ותגית "אזור זמני" — רק בסביבת פיתוח (npm run dev) וכש-showMarks
 * פעיל. באתר החי לעולם לא מוצגות תגובות מזויפות.
 */
const showDevPlaceholders = import.meta.env.DEV && placeholders.showMarks

/** מסגרות ריקות לתמונות — יחסי גובה-רוחב שונים. מוצגות (גם באתר החי) כל עוד
 *  bookInWorld.photos ריק, כדי שהרצועה הנעה תופיע במקומה */
const placeholderFrames = ['4 / 5', '3 / 4', '1 / 1', '4 / 5', '2 / 3', '5 / 4', '3 / 4']

/**
 * "מתכון" הקומפוזיציה — לוח השראה / אלבום: לכל פריים גובה יחסי, סיבוב קל
 * (−4°…+4°), היסט אנכי, ו-o — כמה מהמרווח לשכן "נבלע" (מעל 1 = חפיפה עדינה). חוזר במחזור לפי האינדקס, כך
 * שכל תמונה שתתווסף מקבלת מקום טבעי ברצף, והלולאה נשארת רציפה.
 */
const collage = [
  { h: 1, r: -2.5, y: 0.6, o: 0 },
  { h: 0.82, r: 3, y: -1.6, o: 0.3 },
  { h: 0.92, r: -1, y: 1.4, o: 1.3 },
  { h: 1.06, r: 1.8, y: -0.4, o: 0.4 },
  { h: 0.78, r: -3.6, y: -2, o: 0.15 },
  { h: 0.96, r: 0.8, y: 1.8, o: 1.35 },
  { h: 0.86, r: -1.8, y: -1, o: 0.5 },
]

function frameStyle(index: number): CSSProperties {
  const c = collage[index % collage.length]
  return {
    '--h': c.h,
    '--r': `${c.r}deg`,
    '--y': `${c.y}rem`,
    '--o': c.o,
  } as CSSProperties
}

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
 * התוכן מגיע מ-bookConfig.bookInWorld. כל עוד אין תמונות — הרצועה נעה עם מסגרות
 * ריקות (בלי תוכן מומצא). תגובות מוצגות באתר החי רק כשיש תגובות אמיתיות.
 */
export function BookInWorld() {
  const [isPaused, setIsPaused] = useState(false)

  const hasPhotos = bookInWorld.photos.length > 0
  const hasReactions = bookInWorld.reactions.length > 0
  const showReactions = hasReactions || showDevPlaceholders

  const reactions = hasReactions ? bookInWorld.reactions : placeholderReactions

  // סט אחד של פריימים; הרצועה מציגה אותו פעמיים ברצף כדי שהלולאה תהיה חלקה
  // כל פריים: הדפס על נייר חם (שוליים דקים), מסובב מעט, עם צל רך
  const frames = hasPhotos
    ? bookInWorld.photos.map((photo, index) => (
        <figure key={index} className={styles.frame} style={frameStyle(index)}>
          <img
            className={styles.photo}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))
    : placeholderFrames.map((ratio, index) => (
        <figure
          key={index}
          className={`${styles.frame} ${styles.empty}`}
          style={frameStyle(index)}
          aria-hidden="true"
        >
          <span className={styles.slot} style={{ aspectRatio: ratio }} />
        </figure>
      ))

  return (
    <section className={styles.section} aria-label="הספר בעולם">
      {(!hasPhotos || !hasReactions) && showDevPlaceholders && (
        <div className={`container ${styles.devNote}`}>
          <PlaceholderMark label="אזור זמני — צילומי הספר ותגובות קוראים יתווספו" />
        </div>
      )}

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
