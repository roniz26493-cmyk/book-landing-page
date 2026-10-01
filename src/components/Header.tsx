import { useEffect, useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { useScrollPast } from '../hooks/useScrollPast'
import { CloseIcon, MenuIcon } from './ui/Icons'
import styles from './Header.module.css'

const { book, nav } = bookConfig

export function Header() {
  const isScrolled = useScrollPast(40)
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
            {nav.map((link) => (
              <li key={link.target}>
                <a className={styles.navLink} href={`#${link.target}`}>
                  {link.label}
                </a>
              </li>
            ))}
            {/* רכישה כקישור ניווט שקט — לא כפתור */}
            <li>
              <a className={`${styles.navLink} ${styles.navLinkAccent}`} href="#purchase">
                להזמנת הספר
              </a>
            </li>
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
            {nav.map((link) => (
              <li key={link.target}>
                <a
                  className={styles.mobileLink}
                  href={`#${link.target}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className={styles.mobileCta}
                href="#purchase"
                onClick={() => setIsMenuOpen(false)}
              >
                להזמנת הספר
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
