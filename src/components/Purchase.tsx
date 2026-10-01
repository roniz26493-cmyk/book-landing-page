import { bookConfig } from '../data/bookConfig'
import { ExternalIcon, WhatsAppIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionFolio } from './ui/SectionFolio'
import { WhatsAppOrderButton, isWhatsappReady, whatsappLink } from './ui/WhatsAppOrderButton'
import styles from './Purchase.module.css'

const { purchase, whatsapp, shipping, book } = bookConfig

export function Purchase() {
  const hasActiveStore = purchase.stores.some((store) => store.url.trim() !== '')

  return (
    <Section id="purchase" tone="alt" className={styles.section}>
      <SectionFolio className={styles.folio} number="05" label="רכישה" />
      <div className={styles.opening}>
        <div className={styles.header}>
          <h2 className={styles.title}>{purchase.title}</h2>
          {purchase.intro && <p className={styles.intro}>{purchase.intro}</p>}
          {purchase.price && <p className={styles.price}>{purchase.price}</p>}
        </div>

        {/* דסקטופ: הכריכה המלאה — המוצר עצמו, לצד המחיר ומעל דרכי הרכישה */}
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

      <div className={styles.split}>
        {/* ---- א. חנויות ואתרי מכירה ---- */}
        <Reveal className={`${styles.column} ${styles.retail}`} id="stores">
          <h3 className={styles.columnTitle}>רכישה באתרי המכירה</h3>
          <p className={styles.columnText}>
            זמין לכל הארץ, בהתאם לתנאי המשלוח של כל חנות.
          </p>

          <ul className={styles.storeList}>
            {purchase.stores.map((store) => (
              <li key={store.id}>
                <StoreButton store={store} />
              </li>
            ))}
          </ul>

          {!hasActiveStore && (
            <p className={styles.pendingNotice}>{purchase.storesPendingNotice}</p>
          )}
        </Reveal>

        {/* ---- ב. הזמנה ישירה בוואטסאפ ---- */}
        <Reveal className={`${styles.column} ${styles.direct}`} delay={120}>
          <h3 className={styles.columnTitle}>הזמנה ישירה מהמחבר</h3>
          <p className={styles.columnText}>
            שיחה ישירה בוואטסאפ עם המחבר, עם הודעה מוכנה מראש.
          </p>

          <p className={styles.areaNotice}>{whatsapp.areaNotice}</p>

          {/* מובייל (עד עיצוב המובייל): הכפתור המשותף. דסקטופ: קישור טיפוגרפי */}
          <div className={styles.mobileCta}>
            <WhatsAppOrderButton />
          </div>
          <DirectOrderLink />

          <p className={styles.fineprint}>
            מחוץ לאזור השרון ניתן לרכוש את הספר דרך אתרי המכירה.
          </p>

          {shipping.enabled && shipping.items.length > 0 && (
            <ul className={styles.shippingList}>
              {shipping.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * דסקטופ: פעולת ההזמנה הישירה כקישור טיפוגרפי בצבע החלודה.
 * אותו קישור בדיוק כמו הכפתור המשותף (whatsappLink מהקונפיג). כל עוד
 * המספר בקונפיג אינו תקין — מוצג במצב לא-פעיל, בלי קישור שבור ובלי
 * הערה טכנית למבקרים.
 */
function DirectOrderLink() {
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
function StoreButton({ store }: { store: (typeof purchase.stores)[number] }) {
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
