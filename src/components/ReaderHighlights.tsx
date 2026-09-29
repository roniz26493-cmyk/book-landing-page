import { bookConfig } from '../data/bookConfig'
import { highlightIcons } from './ui/Icons'
import { PlaceholderMark } from './ui/PlaceholderMark'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeading } from './ui/Section'
import styles from './ReaderHighlights.module.css'

const { highlights } = bookConfig

export function ReaderHighlights() {
  if (highlights.items.length === 0) return null

  return (
    <Section id="highlights" tone="alt">
      <SectionHeading
        eyebrow="בין הדפים"
        title={highlights.title}
        intro={highlights.intro}
        align="center"
      >
        {highlights.isPlaceholder && <PlaceholderMark />}
      </SectionHeading>

      <ul className={styles.grid} data-count={highlights.items.length}>
        {highlights.items.map((item, index) => {
          const Icon = highlightIcons[item.icon]

          return (
            <Reveal as="li" key={item.id} delay={index * 90} className={styles.cardWrap}>
              <article className={styles.card}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.description}</p>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </article>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
