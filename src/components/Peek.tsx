import { bookConfig } from '../data/bookConfig'
import { QuoteIcon } from './ui/Icons'
import { PlaceholderMark } from './ui/PlaceholderMark'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'
import styles from './Peek.module.css'

const { peek } = bookConfig

/**
 * אזור אופציונלי.
 * להסתרה מלאה: peek.enabled = false בקובץ bookConfig.ts
 */
export function Peek() {
  if (!peek.enabled || peek.excerpts.length === 0) return null

  return (
    <Section id="peek" tone="dark">
      <SectionHeading
        eyebrow="הצצה"
        title={peek.title}
        intro={peek.intro}
        align="center"
        onDark
      >
        {peek.isPlaceholder && <PlaceholderMark onDark />}
      </SectionHeading>

      <ul className={styles.list}>
        {peek.excerpts.map((excerpt, index) => (
          <Reveal as="li" key={excerpt.id} delay={index * 110} className={styles.item}>
            <figure className={styles.card}>
              <QuoteIcon className={styles.icon} />
              <blockquote className={styles.text}>{excerpt.text}</blockquote>
              {excerpt.source && (
                <figcaption className={styles.source}>{excerpt.source}</figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
