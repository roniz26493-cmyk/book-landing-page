import { bookConfig } from '../data/bookConfig'
import { PlaceholderMark } from './ui/PlaceholderMark'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionFolio } from './ui/SectionFolio'
import styles from './ReaderHighlights.module.css'

const { highlights, book } = bookConfig

/**
 * דסקטופ בלבד: רגע אחד מתוך איור הספר ליד כל תחנה — לא שובל, אלא זיכרון
 * שמופיע ונעלם. החיתוך מוגדר ב-CSS לפי השם. מתפתחים עם התחנות:
 * דף כתב-יד בילדות, שברי צבע קרועים בהתבגרות, ענף אחד שקט בבגרות.
 */
const shardByStage = ['handwriting', 'torn', 'sprig']

function Shard({ name }: { name: string }) {
  return (
    <span className={`${styles.shard} ${styles[name]}`} aria-hidden="true">
      <picture>
        {book.secondaryImageWebp && (
          <source srcSet={book.secondaryImageWebp} type="image/webp" />
        )}
        <img
          className={styles.shardImg}
          src={book.secondaryImage}
          alt=""
          width={1100}
          height={768}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </span>
  )
}

/**
 * "מה מחכה לקוראים" — לא רשימת שלושה פיצ'רים, אלא מעבר רציף בין שלוש
 * תחנות בחיים אחד. אין מספור, אין כרטיסים, אין קווי הפרדה בין השלבים —
 * כל שלב מקבל מיקום, מרחק וקנה-מידה משלו בתוך עמודה אחת רציפה,
 * כדי שהתנועה בין ילדות, התבגרות ובגרות תורגש כתנועה בגלילה, לא כסריקת רשת.
 */
export function ReaderHighlights() {
  if (highlights.items.length === 0) return null

  return (
    <Section id="highlights" tone="alt" className={styles.section}>
      <SectionFolio className={styles.folio} number="02" label="בין הדפים" />
      <h2 className={styles.title}>{highlights.title}</h2>
      {highlights.intro && <p className={styles.intro}>{highlights.intro}</p>}
      {highlights.isPlaceholder && (
        <div className={styles.placeholderRow}>
          <PlaceholderMark />
        </div>
      )}

      <ol className={styles.passage}>
        {highlights.items.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 140} className={styles.item}>
            {index === 0 && (
              <img
                className={styles.fragment}
                src="/images/fragment-2.webp"
                alt=""
                aria-hidden="true"
                width={130}
                height={130}
                loading="lazy"
              />
            )}
            {book.secondaryImage && shardByStage[index] && (
              <Shard name={shardByStage[index]} />
            )}
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemText}>{item.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
