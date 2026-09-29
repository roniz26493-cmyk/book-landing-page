import { bookConfig } from '../data/bookConfig'
import { QuoteIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'
import styles from './AboutBook.module.css'

const { book } = bookConfig

export function AboutBook() {
  const hasImage = Boolean(book.secondaryImage)

  return (
    <Section id="about" tone="light">
      <div className={hasImage ? styles.grid : styles.gridSingle}>
        <Reveal className={styles.content}>
          <SectionHeading eyebrow="על הספר" title={book.subtitle || book.title} />

          <div className={styles.prose}>
            {book.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {book.pullQuote && (
            <blockquote className={styles.pullQuote}>
              <QuoteIcon className={styles.quoteIcon} />
              <p>{book.pullQuote}</p>
            </blockquote>
          )}
        </Reveal>

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
