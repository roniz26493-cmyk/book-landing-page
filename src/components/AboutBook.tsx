import { bookConfig } from '../data/bookConfig'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionFolio } from './ui/SectionFolio'
import styles from './AboutBook.module.css'

const { book } = bookConfig

/**
 * דסקטופ בלבד: פרט מתוך אותו איור של ה-Hero, בחיתוך אחר — כך שבגלילה
 * מתגלים פרטים חדשים מאותה יצירה (הילד בתחילה, האיש המתרחק בסוף).
 */
function ArtDetail({ className }: { className: string }) {
  if (!book.secondaryImage) return null

  return (
    <div className={`${styles.detail} ${className}`} aria-hidden="true">
      <picture>
        {book.secondaryImageWebp && (
          <source srcSet={book.secondaryImageWebp} type="image/webp" />
        )}
        <img
          className={styles.detailImg}
          src={book.secondaryImage}
          alt=""
          width={1100}
          height={768}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  )
}

export function AboutBook() {
  const hasImage = Boolean(book.secondaryImage)

  return (
    <Section id="about" tone="light" className={styles.section}>
      <div className={hasImage ? styles.grid : styles.gridSingle}>
        <Reveal className={styles.content}>
          <SectionFolio className={styles.folio} number="01" label="על הספר" />
          <h2 className={styles.title}>{book.subtitle || book.title}</h2>

          <div className={styles.prose}>
            {book.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {book.pullQuote && (
            <blockquote className={styles.pullQuote}>
              <p>{book.pullQuote}</p>
            </blockquote>
          )}
        </Reveal>

        <ArtDetail className={styles.detailChild} />
        <ArtDetail className={styles.detailAdult} />

        {hasImage && (
          <Reveal className={styles.imageWrap} delay={120}>
            {book.secondaryImageWebp ? (
              <picture>
                <source srcSet={book.secondaryImageWebp} type="image/webp" />
                <img
                  className={styles.image}
                  src={book.secondaryImage}
                  alt={book.secondaryImageAlt}
                  width={1100}
                  height={768}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            ) : (
              <img
                className={styles.image}
                src={book.secondaryImage}
                alt={book.secondaryImageAlt}
                loading="lazy"
                decoding="async"
              />
            )}
          </Reveal>
        )}
      </div>
    </Section>
  )
}
