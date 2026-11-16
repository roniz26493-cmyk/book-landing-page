import { useEffect, useState } from 'react'
import { finalCtaLabel } from '../lib/ctaLabel'
import { WhatsAppIcon } from './ui/Icons'
import { whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './StickyCta.module.css'

// ברפרנס: הכפתור מופיע אחרי ≈290px גלילה ונעלם כשהפוטר נכנס למסך (REFERENCE_MAP)
const SHOW_AFTER = 290

/**
 * כפתור ההזמנה הדביק — אותו נוסח, אייקון וצבע כמו כפתור ההזמנה בסיום.
 * נעלם כשכפתור ההזמנה בפתיחה, כפתור ההזמנה בסיום או הפוטר על המסך — כדי שלא יופיעו שני כפתורים זהים.
 */
export function StickyCta() {
  const [scrolled, setScrolled] = useState(false)
  const [heroCtaInView, setHeroCtaInView] = useState(false)
  const [purchaseInView, setPurchaseInView] = useState(false)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setScrolled(window.scrollY > SHOW_AFTER)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observers: IntersectionObserver[] = []
    if ('IntersectionObserver' in window) {
      const watch = (id: string, set: (v: boolean) => void) => {
        const el = document.getElementById(id)
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => set(entry.isIntersecting))
        observer.observe(el)
        observers.push(observer)
      }
      watch('hero-cta', setHeroCtaInView)
      watch('purchase-cta', setPurchaseInView)
      watch('footer', setFooterInView)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  const visible = scrolled && !heroCtaInView && !purchaseInView && !footerInView

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <a
        className={`btn ${styles.button}`}
        href={whatsappLink ?? '#purchase'}
        {...(whatsappLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        tabIndex={visible ? 0 : -1}
      >
        <WhatsAppIcon />
        <span className={styles.label}>{finalCtaLabel}</span>
      </a>
    </div>
  )
}
