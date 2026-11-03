import { useEffect, useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { ArrowIcon } from './ui/Icons'
import styles from './StickyCta.module.css'

const { purchase } = bookConfig

/**
 * כפתור רכישה צר וקבוע בתחתית המסך, כמו באתר ההשראה. מופיע רק כשהפתיחה
 * כבר מאחורינו, ונעלם כשמקטע הרכישה עצמו על המסך.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const closing = document.getElementById('purchase')
    if (!hero || !closing || !('IntersectionObserver' in window)) return

    const state = { heroInView: true, closingInView: false }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) state.heroInView = entry.isIntersecting
        if (entry.target === closing) state.closingInView = entry.isIntersecting
      }
      setVisible(!state.heroInView && !state.closingInView)
    })

    observer.observe(hero)
    observer.observe(closing)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <a className={`btn ${styles.button}`} href="#purchase" tabIndex={visible ? 0 : -1}>
        <span>{purchase.primaryCta}</span>
        {purchase.price && <span className={styles.price}>{purchase.price}</span>}
        <ArrowIcon className="btnArrow" />
      </a>
    </div>
  )
}
