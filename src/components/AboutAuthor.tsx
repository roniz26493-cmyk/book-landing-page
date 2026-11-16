import { bookConfig } from '../data/bookConfig'
import { Pending, showPending } from './ui/Pending'
import styles from './AboutAuthor.module.css'

const { author } = bookConfig

/**
 * על הסופר — קומפוזיציה ממורכזת אחת בכל הרוחבים: הדיוקן האמיתי (שחור־לבן, עיגול
 * וטבעת) ממורכז, והביוגרפיה מתחתיו בעמודת קריאה צרה. בלי כותרת או כיתוב־על גלויים
 * (לבקשה) — הכותרת נשארת לקוראי מסך. הדיוקן סטטי: בלי חשיפה בגלילה, נטען מראש
 * ובמידות קבועות, כדי שלא "יקפוץ". בלי תמונה אמיתית — מקום מסומן רק כש-showMarks.
 */
export function AboutAuthor() {
  const hasPhoto = !author.photoIsPlaceholder && Boolean(author.photo)

  return (
    <section id="author" className={styles.section} aria-labelledby="author-title">
      <div className={`container ${styles.stack}`}>
        <h2 id="author-title" className="srOnly">
          {author.sectionTitle}
        </h2>

        {(hasPhoto || showPending) && (
          <div className={styles.photoWrap}>
            {hasPhoto ? (
              <span className={styles.photo}>
                <img
                  src={author.photo}
                  alt={author.photoAlt}
                  width={1848}
                  height={1039}
                  fetchPriority="low"
                  decoding="async"
                />
              </span>
            ) : (
              <div className={styles.photoPending}>
                <Pending>תמונה אמיתית של {author.name} — להשלמה</Pending>
              </div>
            )}
          </div>
        )}

        <div className={styles.bio} data-reveal="0">
          {author.bio.map((p) => (
            <p key={p.slice(0, 20)} className="bodyText">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
