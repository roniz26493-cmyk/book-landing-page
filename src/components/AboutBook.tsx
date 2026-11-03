import type { CSSProperties } from 'react'
import { bookConfig } from '../data/bookConfig'
import { Lines } from './ui/Lines'
import { Reveal } from './ui/Reveal'
import styles from './AboutBook.module.css'

const { book, highlights } = bookConfig

const ORDINALS = ['חלק ראשון', 'חלק שני', 'חלק שלישי']

/** המשפט עם צירוף אחד מודגש — הטקסט עצמו לא משתנה. */
function Emphasized({ text, emphasis }: { text: string; emphasis: string }) {
  const at = emphasis ? text.indexOf(emphasis) : -1
  if (at === -1) return <Lines text={text} />
  return (
    <>
      <Lines text={text.slice(0, at)} />
      <strong>{emphasis}</strong>
      <Lines text={text.slice(at + emphasis.length)} />
    </>
  )
}

/**
 * על הספר — שלוש תנועות, לפי קצב המקטעים שאחרי הסרט באתר ההשראה:
 * 1. משפט פתיחה ממורכז: כותרת ענקית וטקסט צר מתחתיה.
 * 2. "מדרגות": שלושת חלקי הספר, כל אחד זז פנימה ומשקלו גדל — מילדות לבגרות.
 * 3. פריסה א־סימטרית: פסקה בעמודת קריאה מול המשפט מגב הספר בגדול.
 */
export function AboutBook() {
  const parts = highlights.items.slice(0, 3)

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Reveal className={`container ${styles.opener}`}>
        <span className="eyebrow">{book.aboutTitle}</span>
        <h2 id="about-title" className={styles.title}>
          <Lines text={book.aboutHeadline} />
        </h2>
        <p className={styles.lead}>{book.description[0]}</p>
      </Reveal>

      {parts.length > 0 && (
        <div className="container">
          <ol className={styles.stairs} aria-label="שלושת חלקי הספר">
            {parts.map((item, i) => (
              <Reveal
                as="li"
                key={item.id}
                className={styles.step}
                delay={i * 120}
              >
                <span className={styles.stepMeta}>
                  <span className={styles.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {ORDINALS[i]}
                </span>
                <span
                  className={styles.stepWord}
                  style={{ '--step': i, '--weight': [300, 560, 850][i] ?? 850 } as CSSProperties}
                >
                  {item.title}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      )}

      <div className={`container ${styles.spread}`}>
        {book.description[1] && (
          <Reveal className={styles.spreadText}>
            <p>{book.description[1]}</p>
          </Reveal>
        )}
        {book.pullQuote && (
          <Reveal className={styles.spreadQuote} delay={140}>
            <p>
              <Emphasized text={book.pullQuote} emphasis={book.pullQuoteEmphasis} />
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
