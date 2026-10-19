import { useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { ExternalIcon, WhatsAppIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { isWhatsappReady, whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './Purchase.module.css'

const { purchase, shipping, book } = bookConfig

/**
 * רכישה — הספר, המחיר, ושתי דרכים בלבד:
 *  א. ישירות מול הסופר בוואטסאפ (לתושבי השרון) — הדרך החמה.
 *  ב. חנויות הספרים הדיגיטליות — מוסתרות מאחורי לחיצה אחת.
 */
export function Purchase() {
  const [storesOpen, setStoresOpen] = useState(false)

  return (
    <Section id="purchase" tone="alt" className={styles.section}>
      <div className={styles.opening}>
        <div className={styles.header}>
          <h2 className={styles.title}>{purchase.title}</h2>
          {purchase.price && (
            <p className={styles.price}>
              {purchase.price}
              {purchase.priceNote && (
                <span className={styles.priceNote}> · {purchase.priceNote}</span>
              )}
            </p>
          )}
        </div>

        {/* הכריכה המלאה — המוצר עצמו, כספר פיזי */}
        <div className={styles.cover}>
          <picture>
            <source srcSet={book.coverImageWebp} type="image/webp" />
            <img
              className={styles.coverImg}
              src={book.coverImage}
              alt={book.coverAlt}
              width={1100}
              height={1762}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <div className={styles.paths}>
        {/* ---- א. ישירות מול הסופר ---- */}
        <Reveal className={`${styles.path} ${styles.direct}`}>
          <h3 className={styles.pathTitle}>{purchase.directTitle}</h3>
          <p className={styles.pathNote}>{purchase.directNote}</p>
          <DirectOrderLink />

          {shipping.enabled && shipping.items.length > 0 && (
            <ul className={styles.shippingList}>
              {shipping.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* ---- ב. חנויות דיגיטליות — נחשפות בלחיצה ---- */}
        <Reveal className={`${styles.path} ${styles.stores}`} id="stores" delay={120}>
          <h3 className={styles.pathTitle}>{purchase.storesTitle}</h3>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={storesOpen}
            aria-controls="store-list"
            onClick={() => setStoresOpen((open) => !open)}
          >
            {purchase.storesToggle}
            <span className={styles.toggleMark} aria-hidden="true">
              {storesOpen ? '−' : '+'}
            </span>
          </button>

          <ul id="store-list" className={styles.storeList} hidden={!storesOpen}>
            {purchase.stores.map((store) => (
              <li key={store.id}>
                <StoreButton store={store} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * פעולת ההזמנה הישירה כקישור טיפוגרפי בצבע החלודה.
 * אותו קישור בדיוק כמו הכפתור המשותף (whatsappLink מהקונפיג). כל עוד
 * המספר בקונפיג אינו תקין — מוצג במצב לא-פעיל, בלי קישור שבור ובלי
 * הערה טכנית למבקרים.
 */
export function DirectOrderLink() {
  const label = 'להזמנה ישירה בוואטסאפ'

  if (!isWhatsappReady) {
    return (
      <button type="button" className={styles.directCta} disabled>
        <WhatsAppIcon />
        {label}
      </button>
    )
  }

  return (
    <a
      className={styles.directCta}
      href={whatsappLink ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      {label}
      <span className="srOnly">(נפתח בחלון חדש)</span>
    </a>
  )
}

/**
 * כפתור חנות בודדת.
 * חנות ללא קישור מוצגת כלא-פעילה עם התווית "בקרוב" — בלי קישור שבור.
 */
export function StoreButton({ store }: { store: (typeof purchase.stores)[number] }) {
  const url = store.url.trim()

  const inner = (
    <>
      {store.logo ? (
        <img className={styles.storeLogo} src={store.logo} alt="" loading="lazy" />
      ) : null}
      <span className={styles.storeText}>
        <span className={styles.storeName}>{store.name}</span>
        {store.note && <span className={styles.storeNote}>{store.note}</span>}
      </span>
    </>
  )

  if (!url) {
    return (
      <button type="button" className={styles.storeButton} disabled>
        {inner}
        <span className={styles.storeSoon}>בקרוב</span>
      </button>
    )
  }

  return (
    <a
      className={styles.storeButton}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
      <span className={styles.storeArrow} aria-hidden="true">
        <ExternalIcon />
      </span>
      <span className="srOnly">(נפתח בחלון חדש)</span>
    </a>
  )
}
