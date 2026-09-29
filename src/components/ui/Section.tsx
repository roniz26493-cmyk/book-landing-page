import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  /** גוון הרקע של האזור */
  tone?: 'light' | 'alt' | 'dark'
  /** צמצום רוחב התוכן לקריאה נוחה */
  narrow?: boolean
  className?: string
  children: ReactNode
}

export function Section({
  id,
  tone = 'light',
  narrow = false,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[styles.section, styles[tone], className].filter(Boolean).join(' ')}
    >
      <div className={narrow ? styles.containerNarrow : 'container'}>{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  /** כיתוב-על קטן מעל הכותרת */
  eyebrow?: string
  title: string
  intro?: string
  align?: 'start' | 'center'
  onDark?: boolean
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'start',
  onDark = false,
  children,
}: SectionHeadingProps) {
  return (
    <header
      className={[styles.heading, styles[align], onDark ? styles.headingDark : '']
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
      {intro && <p className={styles.intro}>{intro}</p>}
      {children}
    </header>
  )
}
