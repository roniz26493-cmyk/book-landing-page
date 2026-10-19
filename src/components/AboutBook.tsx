import { bookConfig } from '../data/bookConfig'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import styles from './AboutBook.module.css'

const { book } = bookConfig

/**
 * על הספר — כותרת אחת, פסקה אחת, משפט אחד שעוצרים עליו, ופרט אחד
 * מתוך איור הספר. בכוונה מעט: שאר התיאור נשמר בקונפיג (description)
 * אך לא מוצג, כדי שהעמוד יישאר קל לעין.
 */
export function AboutBook() {
  return (
    <Section id="about" tone="light" className={styles.section}>
      <div className={styles.layout}>
        <Reveal className={styles.text}>
          <h2 className={styles.title}>{book.aboutTitle}</h2>
          <p className={styles.lead}>{book.description[0]}</p>
        </Reveal>

        {book.secondaryImage && (
          <div className={styles.art} aria-hidden="true">
            <picture>
              {book.secondaryImageWebp && (
                <source srcSet={book.secondaryImageWebp} type="image/webp" />
              )}
              <img
                className={styles.artImg}
                src={book.secondaryImage}
                alt=""
                width={1100}
                height={768}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        )}

        {/* תיאור הספר במסגרת ציטוט ספרותי — זה טקסט הספר עצמו, לא המלצה:
            בלי ממליץ, בלי ייחוס ובלי דירוג. המרכאות — עיטור בלבד */}
        {book.pullQuote && (
          <Reveal className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            <p className={styles.quoteText}>
              {book.pullQuote.split('\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <span className={`${styles.quoteMark} ${styles.quoteMarkEnd}`} aria-hidden="true">
              ”
            </span>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
