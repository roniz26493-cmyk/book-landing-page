import { bookConfig } from '../data/bookConfig'
import { isWhatsappReady, whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './PurchaseReveal.module.css'

const { purchase } = bookConfig

/**
 * הפעולה הראשית — "לרכישת הספר במחיר השקה" — פותחת ישירות שיחת וואטסאפ עם
 * המחבר (whatsappLink מהקונפיג, עם הודעה מוכנה מראש). בלי שלבים ובלי חנויות.
 *
 * כל עוד מספר הוואטסאפ בקונפיג אינו תקין, הכפתור נראה זהה אך אינו פעיל
 * (aria-disabled) — אף פעם לא קישור שבור.
 */
export function PurchaseReveal({ className }: { className?: string }) {
  const content = (
    <>
      <span className={styles.ctaLabel}>{purchase.primaryCta}</span>
      <span className={styles.ctaArrow} aria-hidden="true">
        ←
      </span>
    </>
  )

  return (
    <div className={[styles.reveal, className].filter(Boolean).join(' ')}>
      {isWhatsappReady ? (
        <a
          className={styles.cta}
          href={whatsappLink ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
          <span className="srOnly"> (וואטסאפ, נפתח בחלון חדש)</span>
        </a>
      ) : (
        <span className={styles.cta} role="link" aria-disabled="true">
          {content}
        </span>
      )}
    </div>
  )
}
