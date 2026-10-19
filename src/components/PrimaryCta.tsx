import { PurchaseReveal } from './PurchaseReveal'
import styles from './PrimaryCta.module.css'

/**
 * מובייל: הפעולה הראשית מיד אחרי הכריכה — "לרכישת הספר במחיר השקה".
 * הבחירות נפתחות רק אחרי לחיצה (PurchaseReveal). בטאבלט ובדסקטופ אותה
 * פעולה יושבת בתוך הקומפוזיציה של ה-Hero, ולכן האזור הזה מוסתר שם.
 */
export function PrimaryCta() {
  return (
    <section className={styles.band} id="order-now" aria-label="רכישת הספר">
      <div className={`container ${styles.inner}`}>
        <PurchaseReveal />
      </div>
    </section>
  )
}
