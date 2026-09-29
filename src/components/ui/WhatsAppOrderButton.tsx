import { bookConfig } from '../../data/bookConfig'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { WhatsAppIcon } from './Icons'
import styles from './WhatsAppOrderButton.module.css'

const { whatsapp } = bookConfig

/** הקישור נבנה פעם אחת — null כל עוד המספר בקונפיג אינו תקין. */
export const whatsappLink = buildWhatsAppLink(whatsapp.phone, whatsapp.message)
export const isWhatsappReady = whatsappLink !== null

interface WhatsAppOrderButtonProps {
  label?: string
  large?: boolean
  fullWidth?: boolean
  className?: string
}

/**
 * כפתור ההזמנה בוואטסאפ.
 *
 * כשמספר הטלפון בקונפיג עדיין placeholder, הכפתור מוצג במצב לא-פעיל
 * (button מושבת, לא קישור) יחד עם הודעה שמסבירה שיש להשלים את הפרטים —
 * כך שאף פעם אין קישור שבור.
 */
export function WhatsAppOrderButton({
  label = 'להזמנה ישירה בוואטסאפ',
  large = true,
  fullWidth = false,
  className,
}: WhatsAppOrderButtonProps) {
  const classNames = [
    'btn',
    isWhatsappReady ? 'btnWhatsapp' : styles.pendingButton,
    large ? 'btnLarge' : '',
    fullWidth ? 'btnFull' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (!isWhatsappReady) {
    return (
      <div className={styles.pendingWrap}>
        <button
          type="button"
          className={classNames}
          disabled
          aria-describedby="whatsapp-pending-note"
        >
          <WhatsAppIcon />
          {label}
        </button>
        <p id="whatsapp-pending-note" className={styles.pendingNote}>
          פרטי ההזמנה הישירה יתעדכנו כאן בקרוב.
          <span className={styles.pendingHint}>
            {' '}
            (להשלמה: מספר הוואטסאפ של המחבר בקובץ bookConfig.ts)
          </span>
        </p>
      </div>
    )
  }

  return (
    <a
      className={classNames}
      href={whatsappLink ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      {label}
    </a>
  )
}
