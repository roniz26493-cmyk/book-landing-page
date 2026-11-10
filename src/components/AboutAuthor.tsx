import { bookConfig } from '../data/bookConfig'
import { AccentTitle } from './ui/AccentTitle'
import { Pending, showPending } from './ui/Pending'
import styles from './AboutAuthor.module.css'

const { author } = bookConfig

/**
 * על הסופר — על גריד ה"גיליון" (.spread), כמו "על הספר": כיתוב־על וכותרת
 * בעמודה הימנית, הביוגרפיה בעמודת הקריאה. העיגול (בעמודה השמאלית) מוצג רק
 * עם תמונה אמיתית; בלעדיה — מקום מסומן "להשלמה" (רק כש-showMarks), ובפרסום
 * העמודה השמאלית נשארת שוליים, כמו בשאר מקטעי הקריאה.
 */
export function AboutAuthor() {
  const hasPhoto = !author.photoIsPlaceholder && Boolean(author.photo)

  return (
    <section id="author" className={styles.section} aria-labelledby="author-title">
      <div className="container spread">
        <div className="spreadHead">
          <span className="eyebrow">{author.eyebrow}</span>
          <AccentTitle id="author-title" title={author.sectionTitle} className={styles.title} />
        </div>

        <div className={`spreadBody ${styles.bio}`}>
          {author.bio.map((p) => (
            <p key={p.slice(0, 20)} className="bodyText">
              {p}
            </p>
          ))}
        </div>

        {(hasPhoto || showPending) && (
          <div className={`spreadAside ${styles.photoWrap}`}>
            {hasPhoto ? (
              <span className={styles.photo}>
                <img src={author.photo} alt={author.photoAlt} loading="lazy" decoding="async" />
              </span>
            ) : (
              <div className={styles.photoPending}>
                <Pending>תמונה אמיתית של {author.name} — להשלמה</Pending>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
