import { bookConfig } from '../data/bookConfig'
import { ArrowIcon } from './ui/Icons'
import { Lines } from './ui/Lines'
import styles from './Hero.module.css'

const { book, purchase } = bookConfig

// שם הספר בשתי שורות, כמו על הכריכה: "סיפור אחד" / "ביום"
const lastSpace = book.title.lastIndexOf(' ')
const titleLines =
  lastSpace > 0 ? [book.title.slice(0, lastSpace), book.title.slice(lastSpace + 1)] : [book.title]

/**
 * מקטע הפתיחה — לפי מבנה הפתיחה של אתר ההשראה: גיליון בהיר אחד,
 * טקסט בצד אחד והספר בצד השני, כותרת ענקית ופעולה אחת ברורה.
 */
export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.sheet}>
        <div className={styles.text}>
          <span className={`eyebrow ${styles.enter}`}>{book.heroEyebrow}</span>

          <h1 id="hero-title" className={`${styles.title} ${styles.enter}`}>
            {titleLines.map((line) => (
              <span key={line} className={styles.titleLine}>
                {line}
              </span>
            ))}
          </h1>

          <p className={`${styles.opening} ${styles.enter}`}>
            <Lines text={book.heroOpening} />
          </p>

          <div className={`${styles.buy} ${styles.enter}`}>
            {purchase.price && (
              <p className={styles.price}>
                <span className={styles.priceValue}>{purchase.price}</span>
                {purchase.priceNote && <span className={styles.priceNote}>{purchase.priceNote}</span>}
              </p>
            )}
            <a className="btn btnLarge" href="#purchase">
              {purchase.primaryCta}
              <ArrowIcon className="btnArrow" />
            </a>
          </div>
        </div>

        <div className={styles.media}>
          <picture>
            <source srcSet="/images/book-hero.webp" type="image/webp" />
            <img
              className={styles.book}
              src="/images/book-hero.png"
              width={651}
              height={1055}
              alt={book.coverAlt}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
