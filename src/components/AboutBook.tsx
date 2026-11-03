import { bookConfig } from '../data/bookConfig'
import { Lines } from './ui/Lines'
import { Reveal } from './ui/Reveal'
import styles from './AboutBook.module.css'

const { book, highlights } = bookConfig

const ORDINALS = ['חלק ראשון', 'חלק שני', 'חלק שלישי']

/**
 * על הספר — לפי מקטע התוכן של אתר ההשראה: כותרת גדולה וטקסט רחב בצד
 * אחד, הספר בצד השני; אחריהם שלושת חלקי המסע, ומשפט אחד שעוצרים עליו.
 */
export function AboutBook() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <Reveal className={styles.text}>
          <span className="eyebrow">{book.aboutTitle}</span>
          <h2 id="about-title" className={styles.title}>
            <Lines text={book.aboutHeadline} />
          </h2>
          <div className={styles.body}>
            {book.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className={styles.cover} delay={120}>
          <picture>
            {book.coverImageWebp && <source srcSet={book.coverImageWebp} type="image/webp" />}
            <img
              src={book.coverImage}
              alt={book.coverAlt}
              width={1100}
              height={1762}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </Reveal>
      </div>

      {highlights.items.length > 0 && (
        <div className="container">
          <ol className={styles.parts}>
            {highlights.items.slice(0, 3).map((item, i) => (
              <Reveal as="li" key={item.id} className={styles.part} delay={i * 110}>
                <span className={styles.partLabel}>{ORDINALS[i]}</span>
                <span className={styles.partName}>{item.title}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      )}

      {book.pullQuote && (
        <Reveal className={`container ${styles.statement}`}>
          <p>
            <Lines text={book.pullQuote} />
          </p>
        </Reveal>
      )}
    </section>
  )
}
