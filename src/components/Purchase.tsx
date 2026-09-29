import { bookConfig } from '../data/bookConfig'
import { ExternalIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'
import { WhatsAppOrderButton } from './ui/WhatsAppOrderButton'
import styles from './Purchase.module.css'

const { purchase, whatsapp, shipping } = bookConfig

export function Purchase() {
  const hasActiveStore = purchase.stores.some((store) => store.url.trim() !== '')

  return (
    <Section id="purchase" tone="alt">
      <SectionHeading
        eyebrow="רכישה"
        title={purchase.title}
        intro={purchase.intro}
        align="center"
      />

      {purchase.price && <p className={styles.price}>{purchase.price}</p>}

      <div className={styles.grid}>
        {/* ---- א. חנויות ואתרי מכירה ---- */}
        <Reveal className={styles.panelWrap}>
          <article className={styles.panel} id="stores">
            <header className={styles.panelHeader}>
              <span className={styles.panelBadge}>אפשרות א׳</span>
              <h3 className={styles.panelTitle}>רכישה באתרי המכירה</h3>
              <p className={styles.panelText}>
                זמין לכל הארץ, בהתאם לתנאי המשלוח של כל חנות.
              </p>
            </header>

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
          </article>
        </Reveal>

        {/* ---- ב. הזמנה ישירה בוואטסאפ ---- */}
        <Reveal className={styles.panelWrap} delay={120}>
          <article className={`${styles.panel} ${styles.panelHighlight}`}>
            <header className={styles.panelHeader}>
              <span className={`${styles.panelBadge} ${styles.panelBadgeAccent}`}>
                אפשרות ב׳
              </span>
              <h3 className={styles.panelTitle}>הזמנה ישירה מהמחבר</h3>
              <p className={styles.panelText}>
                שיחה ישירה בוואטסאפ עם המחבר, עם הודעה מוכנה מראש.
              </p>
            </header>

            <p className={styles.areaNotice}>
              <span className={styles.areaDot} aria-hidden="true" />
              {whatsapp.areaNotice}
            </p>

            <WhatsAppOrderButton fullWidth />

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
          </article>
        </Reveal>
      </div>
    </Section>
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
