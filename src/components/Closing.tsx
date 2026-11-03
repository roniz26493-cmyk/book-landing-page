import { bookConfig } from '../data/bookConfig'
import { ExternalIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { WhatsAppOrderButton } from './ui/WhatsAppOrderButton'
import styles from './Closing.module.css'

const { book, purchase, whatsapp, author } = bookConfig

// רק חנויות עם קישור אמיתי — בלי כפתורי "בקרוב"
const liveStores = purchase.stores.filter((store) => store.url.trim() !== '')

/** סיום העמוד — קריאה אחרונה ושקטה לרכישה, בלי פוטר עמוס. */
export function Closing() {
  return (
    <section id="purchase" className={styles.section} aria-labelledby="purchase-title">
      <div className={styles.sheet}>
        <Reveal className={styles.inner}>
          <span className="eyebrow">{purchase.title}</span>
          <h2 id="purchase-title" className={styles.title}>
            {book.title}
          </h2>

          {purchase.price && (
            <p className={styles.price}>
              <span className={styles.priceValue}>{purchase.price}</span>
              {purchase.priceNote && <span className={styles.priceNote}>{purchase.priceNote}</span>}
            </p>
          )}

          <div className={styles.actions}>
            <div className={styles.direct}>
              <WhatsAppOrderButton label={purchase.directTitle} />
              <p className={styles.note}>{whatsapp.areaNotice}</p>
            </div>

            {liveStores.map((store) => (
              <div key={store.id} className={styles.direct}>
                <a className="btn btnLarge btnOutline" href={store.url} target="_blank" rel="noopener noreferrer">
                  {store.name}
                  <ExternalIcon />
                </a>
                {store.note && <p className={styles.note}>{store.note}</p>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <p className={styles.signoff}>
        {book.title} · {author.name}
      </p>
    </section>
  )
}
