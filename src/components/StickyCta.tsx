import { useEffect, useState } from 'react'
import { finalCtaLabel, whatsappLink } from '../lib/ctaLabel'
import { WhatsAppIcon } from './ui/Icons'
import styles from './StickyCta.module.css'

// מופיע ברגע שמתחילים לגלול (סף קטן נגד הבהוב), ונעלם רק בחזרה לראש העמוד
const SHOW_AFTER = 50

// במסך צר הנוסח נשבר לפני "במחיר" (השבירה מוצגת רק שם, ב-CSS); הנוסח עצמו לא משתנה
const [labelStart, labelEnd] = finalCtaLabel.split(/ (?=במחיר)/)

/**
 * כפתור ההזמנה היחיד באתר — צף בתחתית המסך.
 * מובייל: גלולה ממורכזת. דסקטופ (מ-48rem): פס דק לכל הרוחב, הכפתור במרכזו.
 * הפוטר שומר מקום (--cta-clearance), כך שהכפתור לא מכסה תוכן גם בסוף העמוד.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > SHOW_AFTER)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <a
        className={`btn ${styles.button}`}
        href={whatsappLink ?? '#purchase'}
        {...(whatsappLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        tabIndex={visible ? 0 : -1}
      >
        <WhatsAppIcon />
        <span className={styles.label}>
          {labelStart} <br className={styles.labelBreak} />
          {labelEnd}
        </span>
      </a>
    </div>
  )
}
