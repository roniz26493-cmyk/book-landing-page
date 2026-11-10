import { bookConfig } from '../data/bookConfig'
import { WhatsAppOrderButton } from './ui/WhatsAppOrderButton'
import styles from './Purchase.module.css'

const { book, purchase, whatsapp } = bookConfig

/**
 * הזמנת הספר — בוואטסאפ בלבד, ישירות מול הסופר (אין רכישה או תשלום באתר).
 * כל עוד המספר לא הוגדר ב-bookConfig.whatsapp.phone, הכפתור מוצג במצב לא פעיל.
 */
export function Purchase() {
  return (
    <section id="purchase" className={styles.section} aria-labelledby="purchase-title">
      <div className="container">
        <h2 id="purchase-title" className={`sectionTitle ${styles.title}`}>
          {purchase.title}
        </h2>

        <div className={`panel ${styles.card}`}>
          <picture>
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

          <p className={styles.nameRow}>
            <span className={styles.name}>{book.title}</span>
            {purchase.price && <span className={styles.price}>{purchase.price}</span>}
          </p>
          {purchase.priceNote && <p className={styles.priceNote}>{purchase.priceNote}</p>}

          <div className={styles.direct}>
            <WhatsAppOrderButton label={purchase.primaryCta} className={styles.cta} />
            <p className={styles.note}>{whatsapp.areaNotice}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
