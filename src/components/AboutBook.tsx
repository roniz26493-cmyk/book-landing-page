import { bookConfig } from '../data/bookConfig'
import styles from './AboutBook.module.css'

const { about } = bookConfig

// טיפוגרפיה עברית בלבד (הנוסח זהה לגב הכריכה): מקף לא פותח שורה, מקף עליון לא נשבר
const typeset = (text: string) => text.replace(/ – /g, '\u00a0– ').replace(/־/g, '־\u2060')

/**
 * על הספר — מקטע טיפוגרפי נפרד אחרי פאנל התקציר: בלי כרטיס ובלי תמונה, על גריד
 * ה"גיליון" (.spread) — עמודת קריאה אחת מקו 69%, הפסקה הראשונה בסגנון הפתיח
 * (גדולה, טורקיז). כך אין שני כרטיסי טקסט זהים זה מעל זה.
 */
export function AboutBook() {
  const [lede, ...rest] = about.paragraphs

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container spread">
        {/* הכותרת "על הספר" מוסתרת ויזואלית (לבקשה) ונשארת לקוראי מסך */}
        <h2 id="about-title" className="srOnly">
          {about.title}
        </h2>

        <div className={`spreadBody ${styles.text}`}>
          {lede && (
            <p className={styles.lede} data-reveal="0">
              {typeset(lede)}
            </p>
          )}
          {rest.map((p) => (
            <p key={p.slice(0, 20)} className="bodyText" data-reveal="1">
              {typeset(p)}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
