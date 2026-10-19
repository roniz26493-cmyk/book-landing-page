import { bookConfig } from '../data/bookConfig'
import { BotanicalSprig } from './ui/BotanicalSprig'
import { MailIcon, socialIcons } from './ui/Icons'
import styles from './Footer.module.css'

const { book, author, nav, social, contact } = bookConfig

const currentYear = new Date().getFullYear()

/**
 * פוטר מינימלי — עמוד הסיום של הספר, לא מפת אתר.
 * שם הספר והמחבר, הניווט הקצר, יצירת קשר רק אם הוגדרה, וזכויות יוצרים.
 */
export function Footer() {
  const activeSocial = social.filter((link) => link.url.trim() !== '')

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <BotanicalSprig className={styles.sprig} />
          <p className={styles.bookTitle}>{book.title}</p>
          <p className={styles.authorName}>מאת {author.name}</p>
        </div>

        <nav className={styles.nav} aria-label="ניווט בעמוד">
          <ul className={styles.navList}>
            {nav.map((link) => (
              <li key={link.target}>
                <a className={styles.link} href={`#${link.target}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {(contact.email || activeSocial.length > 0) && (
          <div className={styles.contact}>
            {contact.email && (
              <a className={styles.link} href={`mailto:${contact.email}`}>
                <MailIcon />
                {contact.email}
              </a>
            )}
            {activeSocial.map((link) => {
              const Icon = socialIcons[link.platform]
              return (
                <a
                  key={link.id}
                  className={styles.link}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        )}
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {currentYear} {author.name}. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  )
}
