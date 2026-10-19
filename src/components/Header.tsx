import { useEffect, useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { useScrollPast } from '../hooks/useScrollPast'
import { CloseIcon, MenuIcon } from './ui/Icons'
import styles from './Header.module.css'

const { book, nav } = bookConfig

/**
 * הניווט המצומצם: רק האזורים שמוצגים בעמוד (bookConfig.nav, משותף עם הפוטר).
 * "רכישה" מסומן בצבע החלודה.
 */
const headerNav = nav.map((link) => ({ ...link, accent: link.target === 'purchase' }))

export function Header() {
  // מופיעה אחרי שהספר ב-Hero כבר התחיל להתיישב — חלק מאותו מעבר אל האתר
  const isScrolled = useScrollPast(120)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // נעילת גלילת הרקע כשהתפריט הנייד פתוח + סגירה ב-Escape
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header
      className={styles.header}
      data-scrolled={isScrolled}
      /* בראש העמוד הכותרת מוסתרת — המסך הראשון נקי. מופיעה בתחילת הגלילה */
      data-visible={isScrolled || isMenuOpen}
      data-menu-open={isMenuOpen}
    >
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandTitle}>{book.title}</span>
          <span className={styles.brandDivider} aria-hidden="true" />
          <span className={styles.brandAuthor}>{bookConfig.author.name}</span>
        </a>

        <nav className={styles.desktopNav} aria-label="ניווט ראשי">
          <ul className={styles.navList}>
            {headerNav.map((link) => (
              <li key={link.target}>
                <a
                  className={
                    link.accent ? `${styles.navLink} ${styles.navLinkAccent}` : styles.navLink
                  }
                  href={`#${link.target}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? 'סגירת התפריט' : 'פתיחת התפריט'}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* תפריט נייד */}
      <div
        id="mobile-nav"
        className={styles.mobileNav}
        data-open={isMenuOpen}
        hidden={!isMenuOpen}
      >
        <nav aria-label="ניווט נייד">
          <ul className={styles.mobileList}>
            {headerNav.map((link) => (
              <li key={link.target}>
                <a
                  className={link.accent ? styles.mobileCta : styles.mobileLink}
                  href={`#${link.target}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
