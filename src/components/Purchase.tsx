import { bookConfig } from '../data/bookConfig'
import { WhatsAppOrderButton } from './ui/WhatsAppOrderButton'
import styles from './Purchase.module.css'

const { book, purchase } = bookConfig

// במסכים צרים הכפתור נשבר לשתי שורות: "במחיר השקה" ו-"70 ש״ח" נשארים יחד
// (רווח בלתי שביר — הנוסח עצמו זהה, כפי שהוא בקונפיג)
const finalCtaLabel = purchase.finalCta.replace('במחיר השקה', 'במחיר\u00a0השקה').replace(/(\d+) ש״ח/, '$1\u00a0ש״ח')

/**
 * הזמנת הספר — קומפוזיציה אחת ממורכזת: הספר מרחף בעדינות על רקע השמנת,
 * וכפתור הזמנה אחד בוואטסאפ מתחתיו. בלי כרטיס, כותרת גלויה, שם או מחיר נפרדים
 * (המחיר בתוך נוסח הכפתור). הכותרת נשארת לקוראי מסך. בלי חשיפה בגלילה —
 * הריחוף הוא התנועה היחידה, כדי שהספר לא "יקפוץ" כשהמקטע נכנס למסך.
 */
export function Purchase() {
  return (
    <section id="purchase" className={styles.section} aria-labelledby="purchase-title">
      <div className={`container ${styles.stack}`}>
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

        <WhatsAppOrderButton label={finalCtaLabel} className={styles.cta} />
      </div>
    </section>
  )
}
