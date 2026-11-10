import { bookConfig } from '../data/bookConfig'
import { useMarquee } from '../hooks/useMarquee'
import { showPending } from './ui/Pending'
import styles from './Testimonials.module.css'

const { testimonials } = bookConfig

type Card = { text: string; attribution: string } | null

function Row({ cards, direction }: { cards: Card[]; direction: 'left' | 'right' }) {
  // ברפרנס: השורה העליונה נעה שמאלה והתחתונה ימינה, ≈36px לשנייה
  const trackRef = useMarquee<HTMLDivElement>(36)
  const set = (hidden: boolean) => (
    <ul className={styles.set} aria-hidden={hidden || undefined}>
      {cards.map((card, i) => (
        <li key={i} className={card ? styles.card : `${styles.card} ${styles.pendingCard}`}>
          {card ? (
            <>
              <p className={styles.text}>{card.text}</p>
              <p className={styles.by}>{card.attribution}</p>
            </>
          ) : (
            <p className={styles.pendingText}>המלצה אמיתית — להשלמה</p>
          )}
        </li>
      ))}
    </ul>
  )
  return (
    <div className={styles.viewport}>
      <div className={`${styles.track} ${direction === 'right' ? styles.toRight : ''}`} ref={trackRef}>
        {set(false)}
        {set(true)}
      </div>
    </div>
  )
}

/**
 * S10 — המלצות על רקע כהה (REFERENCE_MAP): כיתוב־על וכותרת ממורכזים, ושתי
 * שורות כרטיסים בתנועה מנוגדת. רק המלצות אמיתיות; בלעדיהן — כרטיסים מסומנים
 * "להשלמה" (רק כש-showMarks). בפרסום בלי המלצות — המקטע לא מוצג.
 */
export function Testimonials() {
  const real: Card[] = testimonials.items
  if (real.length === 0 && !showPending) return null

  const cards: Card[] = real.length > 0 ? real : Array.from({ length: testimonials.slots }, () => null)
  const half = Math.ceil(cards.length / 2)

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={`container ${styles.head}`}>
        <span className={`eyebrow ${styles.eyebrow}`}>{testimonials.eyebrow}</span>
        <h2 id="testimonials-title" className={`sectionTitle ${styles.title}`}>
          {testimonials.title}
        </h2>
      </div>
      <Row cards={cards.slice(0, half)} direction="left" />
      <Row cards={cards.slice(half).length ? cards.slice(half) : cards.slice(0, half)} direction="right" />
    </section>
  )
}
