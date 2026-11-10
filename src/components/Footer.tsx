import { bookConfig } from '../data/bookConfig'
import styles from './Footer.module.css'

const { book, author, footer } = bookConfig

/** S13 — פוטר כהה (REFERENCE_MAP), ממורכז. רק פרטים מאומתים — בלי רשתות או פרטי קשר שלא סופקו. */
export function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <p className={styles.mark}>
          {book.title}
          <span className={styles.author}>{author.name}</span>
        </p>
        <p className={styles.line}>
          בהוצאת {footer.publisherName}
        </p>
      </div>
      <p className={styles.credit}>© {new Date().getFullYear()} {author.name}</p>
    </footer>
  )
}
