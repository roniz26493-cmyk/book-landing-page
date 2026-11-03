import { useState, type CSSProperties } from 'react'
import { bookConfig } from '../data/bookConfig'
import { Lines } from './ui/Lines'
import styles from './ScrapStrip.module.css'

const { scraps } = bookConfig

type Tone = 'peach' | 'sage' | 'linen' | 'mist' | 'stone'

interface ScrapLook {
  tone: Tone
  rotate: number
  lift: number
  width: string
  height: string
  /** דף מחברת: שורות דקות ונקבי כריכה, כמו פיסות הנייר שעל הכריכה */
  notebook?: boolean
  /** אילו צלעות קרועות (השאר חתוכות כמעט ישר) */
  torn: { top: boolean; end: boolean; bottom: boolean; start: boolean }
  seed: number
}

// מראה קבוע לכל גזר לפי מיקומו — מגוון אבל לא אקראי בכל טעינה
const LOOKS: ScrapLook[] = [
  { tone: 'linen', rotate: -2.6, lift: -14, width: '17.5rem', height: '15.5rem', notebook: true, torn: { top: true, end: false, bottom: true, start: true }, seed: 11 },
  { tone: 'peach', rotate: 2.4, lift: 26, width: '15rem', height: '12rem', torn: { top: false, end: true, bottom: true, start: true }, seed: 23 },
  { tone: 'sage', rotate: -1.2, lift: -4, width: '18rem', height: '13.5rem', torn: { top: true, end: true, bottom: false, start: true }, seed: 37 },
  { tone: 'stone', rotate: 3, lift: 30, width: '14rem', height: '15rem', torn: { top: true, end: true, bottom: true, start: false }, seed: 41 },
  { tone: 'mist', rotate: -2.3, lift: -18, width: '16.5rem', height: '14rem', notebook: true, torn: { top: false, end: true, bottom: true, start: true }, seed: 53 },
  { tone: 'peach', rotate: 1.6, lift: 14, width: '15.5rem', height: '12.5rem', torn: { top: true, end: false, bottom: true, start: true }, seed: 67 },
]

/** PRNG דטרמיניסטי קטן (mulberry32), כדי שהקרעים יהיו זהים בכל טעינה. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * בונה clip-path של פיסת נייר: צלעות קרועות משוננות, צלעות חתוכות כמעט ישרות.
 * inset > 0 מכווץ רק את הצלעות הקרועות — כך שכבה פנימית צבעונית מעל שכבה
 * בהירה יוצרת את שולי הסיבים הלבנים שנראים בקרע של נייר אמיתי.
 */
function tornPath(look: ScrapLook, seed: number, inset = 0): string {
  const rand = rng(seed)
  const pts: string[] = []
  const edge = (torn: boolean) => (torn ? inset + rand() * 3.2 : rand() * 0.3)
  const step = (torn: boolean) => (torn ? 1.6 + rand() * 2.6 : 14 + rand() * 10)
  const { top, end, bottom, start } = look.torn

  for (let x = 0; x < 100; x += step(top)) pts.push(`${x.toFixed(1)}% ${edge(top).toFixed(2)}%`)
  for (let y = 0; y < 100; y += step(end)) pts.push(`${(100 - edge(end)).toFixed(2)}% ${y.toFixed(1)}%`)
  for (let x = 100; x > 0; x -= step(bottom)) pts.push(`${x.toFixed(1)}% ${(100 - edge(bottom)).toFixed(2)}%`)
  for (let y = 100; y > 0; y -= step(start)) pts.push(`${edge(start).toFixed(2)}% ${y.toFixed(1)}%`)

  return `polygon(${pts.join(', ')})`
}

const items = scraps.items.map((item, i) => {
  const look = LOOKS[i % LOOKS.length]
  return { ...item, look, rim: tornPath(look, look.seed), clip: tornPath(look, look.seed + 7, 1.1) }
})

function ScrapSet({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={styles.set} aria-hidden={hidden || undefined}>
      {items.map(({ id, text, look, rim, clip }) => (
        <li
          key={id}
          dir="rtl"
          className={styles.scrap}
          style={
            {
              '--rotate': `${look.rotate}deg`,
              '--lift': `${look.lift}px`,
              '--width': look.width,
            } as CSSProperties
          }
        >
          <div className={styles.rim} style={{ clipPath: rim }}>
            <div
              className={[styles.paper, styles[look.tone], look.notebook ? styles.notebook : ''].join(' ')}
              style={{ clipPath: clip, minHeight: look.height }}
            >
              <p className={styles.text}>
                <Lines text={text} />
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/**
 * סרט גזרי הנייר — מחליף את סרט הפולארויד של אתר ההשראה, באותו עיקרון
 * תנועה: פס אופקי שנע לאט וברציפות, עם דהייה בקצוות.
 */
export function ScrapStrip() {
  const [paused, setPaused] = useState(false)

  if (items.length === 0) return null

  return (
    <section className={styles.strip} aria-labelledby="scraps-title">
      <h2 id="scraps-title" className="srOnly">
        {scraps.title}
      </h2>

      <div className={styles.viewport} data-paused={paused}>
        <div className={styles.track}>
          <ScrapSet />
          <ScrapSet hidden />
        </div>
      </div>

      <div className={`container ${styles.meta}`}>
        <span className={styles.caption}>{scraps.caption}</span>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          {paused ? 'הפעלת התנועה' : 'עצירת התנועה'}
        </button>
      </div>
    </section>
  )
}
