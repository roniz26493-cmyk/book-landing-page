import { bookConfig } from '../data/bookConfig'
import { ArrowDownIcon } from './ui/Icons'
import { PlaceholderMark } from './ui/PlaceholderMark'
import styles from './Hero.module.css'

const { book, author, whatsapp } = bookConfig

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* הכריכה — מוצגת ראשונה במובייל (order ב-CSS) */}
        <div className={styles.coverColumn}>
          <div className={styles.coverFrame}>
            {book.coverImageWebp ? (
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
            ) : (
              <img
                className={styles.cover}
                src={book.coverImage}
                alt={book.coverAlt}
                width={800}
                height={1200}
                fetchPriority="high"
                decoding="async"
              />
            )}
          </div>
          {book.coverIsPlaceholder && (
            <div className={styles.coverNote}>
              <PlaceholderMark label="כריכה זמנית" />
            </div>
          )}
        </div>

        <div className={styles.textColumn}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            ספר חדש
          </p>

          <h1 className={styles.title}>{book.title}</h1>
          {book.subtitle && <p className={styles.subtitle}>{book.subtitle}</p>}

          <p className={styles.tagline}>{book.heroTagline}</p>

          <p className={styles.author}>
            מאת <strong>{author.name}</strong>
          </p>

          <div className={styles.ctas}>
            <a className="btn btnLarge" href="#purchase">
              להזמנת הספר
            </a>
            <a className="btn btnLarge btnOutline" href="#stores">
              לרכישה באתרי המכירה
            </a>
          </div>

          <p className={styles.areaNote}>
            {whatsapp.areaNotice} · רכישה דרך אתרי המכירה זמינה בכל הארץ,
            בהתאם לתנאי כל חנות.
          </p>
        </div>
      </div>

      <a className={styles.scrollCue} href="#about">
        <span>על הספר</span>
        <ArrowDownIcon className={styles.scrollArrow} />
      </a>
    </section>
  )
}
