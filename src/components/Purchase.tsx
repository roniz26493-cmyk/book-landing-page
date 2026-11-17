import { bookConfig } from '../data/bookConfig'
import styles from './Purchase.module.css'

const { book, purchase } = bookConfig


/**
 * סיום העמוד — הספר מרחף בעדינות על רקע השמנת. אין כאן כפתור: כפתור ההזמנה היחיד
 * באתר הוא הכפתור הצף (StickyCta). הכותרת נשארת לקוראי מסך.
 */
export function Purchase() {
  return (
    <section id="purchase" className={styles.section} aria-labelledby="purchase-title">
      <div className={`container ${styles.stack}`} data-reveal="0">
        <h2 id="purchase-title" className="srOnly">
          {purchase.title}
        </h2>

        <picture className={styles.float}>
          <source srcSet="/images/book-hero.webp" type="image/webp" />
          <img
            className={styles.book}
            src="/images/book-hero.png"
            width={651}
            height={1055}
            alt={book.coverAlt}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  )
}
