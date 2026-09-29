import { bookConfig } from '../data/bookConfig'
import { useScrollPast } from '../hooks/useScrollPast'
import { WhatsAppIcon } from './ui/Icons'
import { isWhatsappReady, whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './StickyWhatsApp.module.css'

const { whatsapp } = bookConfig

/**
 * סרגל הזמנה דביק — מובייל בלבד, מופיע רק אחרי גלילה מעבר ל-Hero.
 * כשמספר הוואטסאפ עדיין לא הוגדר, הסרגל מוביל לאזור הרכישה בעמוד
 * במקום לקישור שבור.
 */
export function StickyWhatsApp() {
  const isVisible = useScrollPast(520)

  return (
    <div className={styles.bar} data-visible={isVisible} aria-hidden={!isVisible}>
      <div className={styles.content}>
        {isWhatsappReady ? (
          <a
            className={`btn btnWhatsapp ${styles.cta}`}
            href={whatsappLink ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isVisible ? 0 : -1}
          >
            <WhatsAppIcon />
            להזמנה ישירה בוואטסאפ
          </a>
        ) : (
          <a
            className={`btn ${styles.cta}`}
            href="#purchase"
            tabIndex={isVisible ? 0 : -1}
          >
            להזמנת הספר
          </a>
        )}
        <p className={styles.note}>{whatsapp.areaNotice}</p>
      </div>
    </div>
  )
}
