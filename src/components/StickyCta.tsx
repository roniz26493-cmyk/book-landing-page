import { useEffect, useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { ArrowIcon } from './ui/Icons'
import { whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './StickyCta.module.css'

const { purchase } = bookConfig

// ברפרנס: הכפתור מופיע אחרי ≈290px גלילה ונעלם כשהפוטר נכנס למסך (REFERENCE_MAP)
const SHOW_AFTER = 290

export function StickyCta() {
  const [scrolled, setScrolled] = useState(false)
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

    const footer = document.getElementById('footer')
    const observer = footer && 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting))
      : null
    if (footer && observer) observer.observe(footer)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [])

  const visible = scrolled && !footerInView

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <a
        className={`btn ${styles.button}`}
        href={whatsappLink ?? '#purchase'}
        {...(whatsappLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        tabIndex={visible ? 0 : -1}
      >
        <span>{purchase.primaryCta}</span>
        {purchase.price && <span className={styles.price}>{purchase.price}</span>}
        <ArrowIcon className="btnArrow" />
      </a>
    </div>
  )
}
