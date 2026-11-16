import { bookConfig } from '../data/bookConfig'
import { finalCtaLabel } from '../lib/ctaLabel'
import { WhatsAppIcon } from './ui/Icons'
import { Lines } from './ui/Lines'
import { whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './Hero.module.css'

const { book } = bookConfig

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

          {/* שם הספר כבר על הכריכה — הכותרת היא המשפט עצמו */}
          <h1 id="hero-title" className={`${styles.statement} ${styles.enter}`}>
            {book.heroStatement.map((sentence, i) => (
              <span key={sentence} className={i === 0 ? styles.strong : styles.light}>
                <Lines text={sentence} />{' '}
              </span>
            ))}
          </h1>

          <div className={`${styles.buy} ${styles.enter}`}>
            {/* אותו נוסח, אייקון וצבע כמו כפתור ההזמנה בסיום ובכפתור הדביק; המחיר בתוך הנוסח.
                בוואטסאפ ישירות כשהמספר מוגדר; עד אז — גלילה לאזור ההזמנה */}
            <a
              id="hero-cta"
              className={`btn btnLarge ${styles.cta}`}
              href={whatsappLink ?? '#purchase'}
              {...(whatsappLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <WhatsAppIcon />
              <span className={styles.ctaLabel}>{finalCtaLabel}</span>
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
