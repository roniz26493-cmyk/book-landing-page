import { bookConfig } from '../data/bookConfig'
import styles from './AboutBook.module.css'

const { about } = bookConfig

/**
 * על הספר — קומפוזיציה טיפוגרפית א־סימטרית, בלי תמונה, על גריד ה"גיליון"
 * (.spread): כותרת גדולה בעמודה הימנית, עמודת קריאה אחת מקו 69%,
 * והעמודה השמאלית שוליים. הפסקה הראשונה מוגדלת כפתיח.
 */
export function AboutBook() {
  const [lede, ...rest] = about.paragraphs

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container spread">
        <h2 id="about-title" className={`spreadHead ${styles.title}`}>
          {about.title}
        </h2>

        <div className={`spreadBody ${styles.text}`}>
          {lede && <p className={styles.lede}>{lede}</p>}
          {rest.map((p) => (
            <p key={p.slice(0, 20)} className="bodyText">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
