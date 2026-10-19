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
          {book.pullQuote && <p className={styles.pause}>{book.pullQuote}</p>}
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
      </div>
    </Section>
  )
}
