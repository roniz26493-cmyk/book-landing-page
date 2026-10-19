import { bookConfig } from '../data/bookConfig'
import { WhatsAppIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { isWhatsappReady, whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './Purchase.module.css'

const { purchase, shipping, book } = bookConfig

/**
 * רכישה — הספר, המחיר, ודרך אחת: פנייה ישירה למחבר בוואטסאפ.
 * (החנויות הדיגיטליות הוסרו מהתצוגה לבקשת המחבר; הנתונים נשמרו בקונפיג.)
 */
export function Purchase() {
  return (
    <Section id="purchase" tone="alt" className={styles.section}>
      <div className={styles.opening}>
        <div className={styles.header}>
          <h2 className={styles.title}>{purchase.title}</h2>
          {purchase.price && (
            <p className={styles.price}>
              {purchase.price}
              {purchase.priceNote && (
                <span className={styles.priceNote}> · {purchase.priceNote}</span>
              )}
            </p>
          )}
        </div>

        {/* הכריכה המלאה — המוצר עצמו, כספר פיזי */}
        <div className={styles.cover}>
          <picture>
            <source srcSet={book.coverImageWebp} type="image/webp" />
            <img
              className={styles.coverImg}
              src={book.coverImage}
              alt={book.coverAlt}
              width={1100}
              height={1762}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <div className={styles.paths}>
        <Reveal className={`${styles.path} ${styles.direct}`}>
          <DirectOrderLink />

          {shipping.enabled && shipping.items.length > 0 && (
            <ul className={styles.shippingList}>
              {shipping.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * פעולת ההזמנה הישירה כקישור טיפוגרפי בצבע החלודה.
 * אותו קישור בדיוק כמו הכפתור המשותף (whatsappLink מהקונפיג). כל עוד
 * המספר בקונפיג אינו תקין — מוצג במצב לא-פעיל, בלי קישור שבור ובלי
 * הערה טכנית למבקרים.
 */
export function DirectOrderLink() {
  const label = 'להזמנה ישירה בוואטסאפ'

  if (!isWhatsappReady) {
    return (
      <button type="button" className={styles.directCta} disabled>
        <WhatsAppIcon />
        {label}
      </button>
    )
  }

  return (
    <a
      className={styles.directCta}
      href={whatsappLink ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      {label}
      <span className="srOnly">(נפתח בחלון חדש)</span>
    </a>
  )
}
