import { bookConfig } from '../data/bookConfig'
import { Lines } from './ui/Lines'
import { Reveal } from './ui/Reveal'
import styles from './AboutAuthor.module.css'

const { author } = bookConfig

// "האיש מאחורי הסיפורים" בשתי שורות מאוזנות
const headline = author.sectionTitle.replace(' מאחורי ', '\nמאחורי ')

/**
 * על הסופר — המקטע הכהה היחיד בעמוד (כמו המקטע הכהה באמצע אתר ההשראה):
 * כותרת גדולה, הביוגרפיה בגודל קריאה של ממש, ושורת עובדות קצרה.
 * תמונה מוצגת רק כשיש תמונה אמיתית (photoIsPlaceholder: false).
 */
export function AboutAuthor() {
  const hasPhoto = !author.photoIsPlaceholder && Boolean(author.photo)

  return (
    <section id="author" className={`gridLines ${styles.section}`} aria-labelledby="author-title">
      <div className={`container ${styles.layout}`}>
        <Reveal className={styles.heading}>
          <span className={`eyebrow ${styles.eyebrow}`}>{author.eyebrow}</span>
          <h2 id="author-title" className={styles.title}>
            <Lines text={headline} />
          </h2>
          <p className={styles.name}>{author.name}</p>
        </Reveal>

        <Reveal className={styles.bio} delay={140}>
          {hasPhoto && (
            <img
              className={styles.photo}
              src={author.photo}
              alt={author.photoAlt}
              loading="lazy"
              decoding="async"
            />
          )}
          {author.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        {author.facts.length > 0 && (
          <Reveal as="div" className={styles.factsWrap} delay={220}>
            <dl className={styles.facts}>
              {author.facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  )
}
