import { bookConfig } from '../data/bookConfig'
import { PlaceholderMark } from './ui/PlaceholderMark'
import styles from './Hero.module.css'

const { book, author } = bookConfig

/** מפצל משפט לשתי שורות לפני מילת-מפתח, בלי לשנות את הנוסח עצמו */
function splitBefore(text: string, word: string): [string, string] {
  const i = text.indexOf(` ${word} `)
  return i === -1 ? [text, ''] : [text.slice(0, i), text.slice(i + 1)]
}

const [leadFirst, leadSecond] = splitBefore(book.heroLead, 'על')
const [bylineFirst, bylineSecond] = splitBefore(book.heroEyebrow, 'של')

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      {/* h1 נשאר לצורכי נגישות/SEO — לא חוזר חזותית על שם הספר שכבר קורא בבירור מהכריכה */}
      <h1 className={styles.srTitle}>
        {book.title} — {author.name}
      </h1>

      {/* דסקטופ בלבד: העולם שבתוך הספר, נפתח אל תוך העמוד. הפנים מביטות שמאלה — אל הטקסט */}
      <picture className={styles.art} aria-hidden="true">
        <source srcSet={book.secondaryImageWebp} type="image/webp" />
        <img
          className={styles.artImg}
          src={book.secondaryImage}
          alt=""
          width={1100}
          height={768}
          decoding="async"
        />
      </picture>

      <div className={`container ${styles.inner}`}>
        <p className={styles.byline}>
          <span>{bylineFirst}</span> <span>{bylineSecond}</span>
        </p>

        <div className={styles.composition}>
          {/* הכריכה — החפץ הפיזי שממנו האיור התרחב */}
          <div className={styles.coverStage}>
            <img
              className={styles.fragment}
              src="/images/fragment-1.webp"
              alt=""
              aria-hidden="true"
              width={110}
              height={110}
              loading="lazy"
            />

            <div className={styles.coverFrame}>
              <picture>
                <source srcSet={book.coverImageWebp} type="image/webp" />
                <img
                  className={styles.cover}
                  src={book.coverImage}
                  alt={book.coverAlt}
                  width={1100}
                  height={1762}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>

            {book.coverIsPlaceholder && (
              <div className={styles.coverNote}>
                <PlaceholderMark label="כריכה זמנית" />
              </div>
            )}
          </div>

          <div className={styles.textStage}>
            <p className={styles.lead}>
              <span>{leadFirst}</span> <span>{leadSecond}</span>
            </p>
            <p className={styles.quote}>{book.heroTagline}</p>

            {/* מובייל (זמני, עד עיצוב המובייל): כפתור + קישור משני */}
            <div className={styles.actions}>
              <a className="btn" href="#purchase">
                להזמנת הספר
              </a>
              <a className="linkText" href="#peek">
                להצצה בין הדפים
              </a>
            </div>

            {/* דסקטופ: פעולה אחת, טיפוגרפית */}
            <a className={styles.cta} href="#purchase">
              להזמנת הספר
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
