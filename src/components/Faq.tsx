import { bookConfig } from '../data/bookConfig'
import { ChevronIcon } from './ui/Icons'
import { PlaceholderMark } from './ui/PlaceholderMark'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionFolio } from './ui/SectionFolio'
import styles from './Faq.module.css'

const { faq } = bookConfig

export function Faq() {
  if (faq.items.length === 0) return null

  return (
    <Section id="faq" tone="light" narrow className={styles.section}>
      <SectionFolio className={styles.folio} number="06" label="שאלות ותשובות" />
      <h2 className={styles.title}>{faq.title}</h2>

      <ul className={styles.list}>
        {faq.items.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 60}>
            {/* details/summary — נפתח ונסגר עם נגישות מלאה ללא JavaScript */}
            <details className={styles.item}>
              <summary className={styles.question}>
                <span className={styles.questionText}>{item.question}</span>
                <ChevronIcon className={styles.chevron} />
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
                {item.isPlaceholder && <PlaceholderMark label="תשובה להשלמה" />}
              </div>
            </details>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
