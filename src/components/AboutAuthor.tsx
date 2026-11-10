import { bookConfig } from '../data/bookConfig'
import { AccentTitle } from './ui/AccentTitle'
import { Pending, showPending } from './ui/Pending'
import styles from './AboutAuthor.module.css'

const { author } = bookConfig

/**
 * S9 — על הסופר (REFERENCE_MAP): תמונה עגולה (קוטר 450) משמאל, טקסט בעמודה
 * ימנית של 475px, מרכזים באותו גובה. העיגול מוצג רק עם תמונה אמיתית;
 * בלעדיה — מקום מסומן "להשלמה" (רק כש-showMarks), ובפרסום העמודה נשארת ריקה.
 */
export function AboutAuthor() {
  const hasPhoto = !author.photoIsPlaceholder && Boolean(author.photo)

  return (
    <section id="author" className={styles.section} aria-labelledby="author-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.text}>
          <span className="eyebrow">{author.eyebrow}</span>
          <AccentTitle id="author-title" title={author.sectionTitle} className={`oneLine ${styles.title}`} />
          {author.bio.map((p) => (
            <p key={p.slice(0, 20)} className="bodyText">
              {p}
            </p>
          ))}
        </div>

        {(hasPhoto || showPending) && (
          <div className={styles.photoWrap}>
            {hasPhoto ? (
              <img className={styles.photo} src={author.photo} alt={author.photoAlt} loading="lazy" decoding="async" />
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
