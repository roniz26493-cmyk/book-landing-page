import { bookConfig } from '../data/bookConfig'
import { socialIcons } from './ui/Icons'
import { PlaceholderMark } from './ui/PlaceholderMark'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import styles from './AboutAuthor.module.css'

const { author, social } = bookConfig

export function AboutAuthor() {
  const activeSocial = social.filter((link) => link.url.trim() !== '')

  return (
    <Section id="author" tone="light">
      <div className={styles.grid}>
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
          {author.photoIsPlaceholder && (
            <div className={styles.photoNote}>
              <PlaceholderMark label="תמונה זמנית" />
            </div>
          )}
        </Reveal>

        <Reveal className={styles.content} delay={100}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            על המחבר
          </p>

          <h2 className={styles.name}>{author.name}</h2>
          <p className={styles.role}>{author.role}</p>

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
