import { bookConfig } from '../data/bookConfig'
import { BotanicalSprig } from './ui/BotanicalSprig'
import { MailIcon, socialIcons } from './ui/Icons'
import { isWhatsappReady, whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './Footer.module.css'

const { book, author, nav, social, contact, purchase, whatsapp } = bookConfig

const currentYear = new Date().getFullYear()

export function Footer() {
  const activeSocial = social.filter((link) => link.url.trim() !== '')
  const activeStores = purchase.stores.filter((store) => store.url.trim() !== '')

  return (
    <footer className={styles.footer}>
      <BotanicalSprig className={styles.sprig} />

      <div className={`container ${styles.inner}`}>
        {/* ---- מיתוג ---- */}
        <div className={styles.brandCol}>
          <p className={styles.bookTitle}>{book.title}</p>
          <p className={styles.authorName}>מאת {author.name}</p>

          {activeSocial.length > 0 && (
            <ul className={styles.socialList}>
              {activeSocial.map((link) => {
                const Icon = socialIcons[link.platform]
                return (
                  <li key={link.id}>
                    <a
                      className={styles.socialLink}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      title={link.label}
                    >
                      <Icon />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* ---- ניווט ---- */}
        <nav className={styles.col} aria-label="ניווט בעמוד">
          <h2 className={styles.colTitle}>בעמוד</h2>
          <ul className={styles.linkList}>
            {nav.map((link) => (
              <li key={link.target}>
                <a className={styles.link} href={`#${link.target}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- רכישה ---- */}
        <div className={styles.col}>
          <h2 className={styles.colTitle}>רכישה</h2>
          <ul className={styles.linkList}>
            <li>
              <a className={styles.link} href="#purchase">
                להזמנת הספר
              </a>
            </li>

            {activeStores.map((store) => (
              <li key={store.id}>
                <a
                  className={styles.link}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {store.name}
                </a>
              </li>
            ))}

            {isWhatsappReady ? (
              <li>
                <a
                  className={styles.link}
                  href={whatsappLink ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  הזמנה בוואטסאפ
                </a>
              </li>
            ) : (
              <li className={styles.linkMuted}>הזמנה בוואטסאפ — בקרוב</li>
            )}
          </ul>
          <p className={styles.note}>{whatsapp.areaNotice}</p>
        </div>

        {/* ---- יצירת קשר ---- */}
        <div className={styles.col}>
          <h2 className={styles.colTitle}>יצירת קשר</h2>
          <ul className={styles.linkList}>
            {contact.email ? (
              <li>
                <a className={styles.contactLink} href={`mailto:${contact.email}`}>
                  <MailIcon />
                  {contact.email}
                </a>
              </li>
            ) : (
              <li className={styles.linkMuted}>[כתובת מייל — להשלמה]</li>
            )}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {currentYear} {author.name}. כל הזכויות שמורות.
        </p>
        <p className={styles.credit}>{book.title}</p>
      </div>
    </footer>
  )
}
