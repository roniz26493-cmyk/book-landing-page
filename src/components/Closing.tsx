import { bookConfig } from '../data/bookConfig'
import { ExternalIcon } from './ui/Icons'
import { Lines } from './ui/Lines'
import { Reveal } from './ui/Reveal'
import { WhatsAppOrderButton } from './ui/WhatsAppOrderButton'
import styles from './Closing.module.css'

const { book, purchase, whatsapp, author } = bookConfig

// רק חנויות עם קישור אמיתי — בלי כפתורי "בקרוב"
const liveStores = purchase.stores.filter((store) => store.url.trim() !== '')

// השורה האחרונה של משפט הסיום מודגשת — אותו צמד כבד/קל של הפתיחה
const lastBreak = book.closingLine.lastIndexOf('\n')
const lineBody = lastBreak > -1 ? book.closingLine.slice(0, lastBreak + 1) : ''
const lineEnd = lastBreak > -1 ? book.closingLine.slice(lastBreak + 1) : book.closingLine

/**
 * סיום שקט: משפט אחד מגב הספר, ושורת רכישה אחת מתחתיו.
 * בלי חזרה על שם הספר ובלי פוטר.
 */
export function Closing() {
  return (
    <section id="purchase" className={styles.section} aria-labelledby="purchase-title">
      <div className="container">
        <Reveal as="div" className={styles.lineWrap}>
          <blockquote className={styles.line}>
            <p>
              <Lines text={lineBody} />
              <strong>{lineEnd}</strong>
            </p>
          </blockquote>
          <span className={styles.source}>מתוך גב הספר</span>
        </Reveal>

        <Reveal className={styles.buy} delay={120}>
          <div className={styles.buyHead}>
            <h2 id="purchase-title" className="eyebrow">
              {purchase.title}
            </h2>
            {purchase.price && (
              <p className={styles.price}>
                <span className={styles.priceValue}>{purchase.price}</span>
                {purchase.priceNote && <span className={styles.priceNote}>{purchase.priceNote}</span>}
              </p>
            )}
          </div>

          <div className={styles.actions}>
            <div className={styles.option}>
              <WhatsAppOrderButton label={purchase.directTitle} />
              <p className={styles.note}>{whatsapp.areaNotice}</p>
            </div>
            {liveStores.map((store) => (
              <div key={store.id} className={styles.option}>
                <a className="btn btnLarge btnOutline" href={store.url} target="_blank" rel="noopener noreferrer">
                  {store.name}
                  <ExternalIcon />
                </a>
                {store.note && <p className={styles.note}>{store.note}</p>}
              </div>
            ))}
          </div>
        </Reveal>

        <p className={styles.signoff}>
          {book.title} · {author.name}
        </p>
      </div>
    </section>
  )
}
