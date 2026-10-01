import { bookConfig } from '../data/bookConfig'
import { socialIcons } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionFolio } from './ui/SectionFolio'
import styles from './AboutAuthor.module.css'

const { author, social } = bookConfig

/**
 * אזור המחבר, בהשראת עמודי הסיום של פרסום ספרותי.
 *
 * אין תמונת פורטרט אמיתית של המחבר בפרויקט (photoIsPlaceholder=true) —
 * לכן האזור טיפוגרפי לחלוטין, בלי אווטאר גנרי. אם בעתיד תתווסף תמונה
 * אמיתית (photoIsPlaceholder=false + נתיב אמיתי), היא תוצג אוטומטית.
 */
export function AboutAuthor() {
  const activeSocial = social.filter((link) => link.url.trim() !== '')
  const hasRealPhoto = !author.photoIsPlaceholder && Boolean(author.photo)

  return (
    <Section id="author" tone="light" className={styles.section}>
      <div className={hasRealPhoto ? styles.gridWithPhoto : styles.grid}>
        {hasRealPhoto && (
          <Reveal className={styles.photoWrap}>
            <div className={styles.photoFrame}>
              <img
                className={styles.photo}
                src={author.photo}
                alt={author.photoAlt}
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        )}

        <Reveal className={styles.content} delay={hasRealPhoto ? 100 : 0}>
          <SectionFolio className={styles.folio} number="04" label="על המחבר" />

          <div className={styles.byline}>
            <h2 className={styles.name}>{author.name}</h2>
            <p className={styles.role}>{author.role}</p>
          </div>

          <div className={styles.bio}>
            {author.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {activeSocial.length > 0 && (
            <div className={styles.socialRow}>
              <span className={styles.socialLabel}>לעקוב אחרי המחבר</span>
              <ul className={styles.socialList}>
                {activeSocial.map((link) => {
                  const Icon = socialIcons[link.platform]
                  return (
                    <li key={link.id}>
                      <a
                        className={styles.socialLink}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                      >
                        <Icon />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
