import { bookConfig } from '../data/bookConfig'
import styles from './AboutBook.module.css'

const { about, book } = bookConfig

/**
 * על הספר — כותרת עדינה וכל הטקסט שמתאר את הספר בעמודת קריאה מימין;
 * משמאל הכריכה, דהויה ונטמעת ברקע (כמו פרט הכריכה ליד התקציר).
 */
export function AboutBook() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.text}>
          <h2 id="about-title" className={styles.title}>
            {about.title}
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="bodyText">
              {p}
            </p>
          ))}
        </div>

        <div className={styles.media} aria-hidden="true">
          <picture>
            {book.coverImageWebp && <source srcSet={book.coverImageWebp} type="image/webp" />}
            <img
              className={styles.cover}
              src={book.coverImage}
              alt=""
              width={1100}
              height={1762}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
