import { bookConfig } from '../data/bookConfig'
import styles from './BookAroundWorld.module.css'

const { bookInWorld } = bookConfig

// הצילום הגדול כחצי מרוחב הקולאז' בדסקטופ ולכל הרוחב במובייל; הקטנים כרבע / חצי
const SIZES = [
  '(max-width: 47.99rem) 100vw, 30rem',
  '(max-width: 47.99rem) 50vw, 17rem',
  '(max-width: 47.99rem) 50vw, 17rem',
]

/**
 * הספר בעולם — קולאז' עריכתי של צילומים אמיתיים של הספר, כמו יומן מסע ספרותי:
 * צילום גדול אחד מימין ושניים קטנים לצידו (מדורגים). בלי מסגרות, קישוטים או תנועה —
 * הכיתוב ואז שלושת הצילומים נחשפים בזה אחר זה בגלילה (פעם אחת), ואחר כך סטטיים לגמרי.
 * הצילומים נטענים מיד (המקטע השני בעמוד) ובמידות קבועות — כדי שלא "ייכנסו" באמצע החשיפה.
 */
export function BookAroundWorld() {
  const photos = bookInWorld.photos.slice(0, 3)
  if (photos.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="world-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="world-title" className={styles.title} data-reveal="0">
          {bookInWorld.title}
        </h2>

        <div className={styles.collage}>
          {photos.map((photo, i) => (
            <figure key={photo.src} className={i === 0 ? styles.main : styles.side} data-reveal={i + 1}>
              <picture>
                <source type="image/webp" srcSet={photo.srcSetWebp} sizes={SIZES[i]} />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
