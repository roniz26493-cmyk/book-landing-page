import { useId, useState } from 'react'
import { bookConfig } from '../data/bookConfig'
import { DirectOrderLink, StoreButton } from './Purchase'
import styles from './PurchaseReveal.module.css'

const { purchase } = bookConfig

/**
 * רגע הרכישה המדורג — לפני לחיצה רואים רק "לרכישת הספר במחיר השקה".
 *
 *   לחיצה ראשונה → נפתחות שתי הדרכים (ישירות מול הסופר / חנויות דיגיטליות)
 *   לחיצה שנייה ("לצפייה בחנויות") → נפתחות החנויות עצמן
 *
 * בלי מודאל ובלי שכבה: הדף נפתח במקום. כשהחלק סגור הוא inert — לא
 * נגיש במקלדת ולא לקוראי מסך. הקישורים (וואטסאפ, חנויות) — אותם
 * רכיבים בדיוק כמו באזור הרכישה, מהקונפיג.
 */
export function PurchaseReveal({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [storesOpen, setStoresOpen] = useState(false)
  const panelId = useId()
  const storesId = useId()

  return (
    <div className={[styles.reveal, className].filter(Boolean).join(' ')} data-open={open}>
      <button
        type="button"
        className={styles.cta}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.ctaLabel}>{purchase.primaryCta}</span>
        <span className={styles.ctaArrow} aria-hidden="true">
          ←
        </span>
      </button>

      <div className={styles.fold} id={panelId} inert={!open}>
        <div className={styles.foldInner}>
          <div className={styles.panel}>
            {purchase.price && (
              <p className={styles.price}>
                {purchase.price}
                {purchase.priceNote && <span> · {purchase.priceNote}</span>}
              </p>
            )}

            {/* דרך א׳ — ישירות מול הסופר */}
            <div className={styles.path}>
              <h2 className={styles.pathTitle}>{purchase.directTitle}</h2>
              <p className={styles.pathNote}>{purchase.directNote}</p>
              <DirectOrderLink />
            </div>

            {/* דרך ב׳ — חנויות דיגיטליות, נחשפות בלחיצה נוספת */}
            <div className={styles.path}>
              <h2 className={styles.pathTitle}>{purchase.storesTitle}</h2>
              <button
                type="button"
                className={styles.toggle}
                aria-expanded={storesOpen}
                aria-controls={storesId}
                onClick={() => setStoresOpen((value) => !value)}
              >
                {purchase.storesToggle}
                <span className={styles.toggleMark} aria-hidden="true">
                  {storesOpen ? '−' : '+'}
                </span>
              </button>

              <div className={styles.fold} data-open={storesOpen} inert={!storesOpen}>
                <div className={styles.foldInner}>
                  <ul id={storesId} className={styles.storeList}>
                    {purchase.stores.map((store) => (
                      <li key={store.id}>
                        <StoreButton store={store} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
