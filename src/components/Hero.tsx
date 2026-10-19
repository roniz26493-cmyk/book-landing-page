import { useEffect, useRef } from 'react'
import { bookConfig } from '../data/bookConfig'
import { PurchaseReveal } from './PurchaseReveal'
import styles from './Hero.module.css'

const { book, author } = bookConfig

/**
 * המסך הראשון — ספר פיזי שנכנס לסצנה, וטיפוגרפיה שמסודרת סביבו.
 *
 * מובייל: הכריכה המלאה ממלאת את המסך הראשון ("נכנסים לכריכה"), עם
 * ההבטחה והזמנה להמשיך לגלול.
 * טאבלט ודסקטופ: העיצוב המאושר. הרקע הוא תמונת האווירה המקורית
 * (hero-atmosphere.png — אור, צלליות ענפים, משטח שיש), והספר עומד על
 * המשטח במקומו המדויק ברפרנס. הטקסט, הכפתור והכותרת-העליונה — HTML אמיתי.
 *
 * תנועה: כניסה קצרה (CSS), ותגובה עדינה לגלילה (--scroll על ה-section).
 * בלי תזוזה לפי העכבר — הספר מונח על המשטח ולא מרחף.
 */
/** ההבטחה בשורות; המילה האחרונה ("עליכם") מודגשת. הטקסט עצמו — מהקונפיג */
function renderPromise(lines: string[], accentClass: string, underlineClass: string) {
  return lines.map((line, index) => {
    const cut = line.lastIndexOf(' ')
    if (index !== lines.length - 1 || cut === -1) return <span key={line}>{line}</span>
    return (
      <span key={line}>
        {line.slice(0, cut)}{' '}
        <em className={accentClass}>
          {line.slice(cut + 1)}
          {/* קו מכחול דק מתחת למילה — עיטור בלבד */}
          <svg className={underlineClass} viewBox="0 0 200 16" aria-hidden="true" focusable="false">
            <path d="M3 11.5C46 6.2 104 3.4 197 4.6c-58 1.6-121 5.3-192 9.6z" />
          </svg>
        </em>
      </span>
    )
  })
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // ---- גלילה: התקדמות 0→1 עם האטה רכה בקצוות ----
    let scrollFrame = 0
    const updateScroll = () => {
      scrollFrame = 0
      const raw = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)))
      const eased = raw * raw * (3 - 2 * raw)
      hero.style.setProperty('--scroll', eased.toFixed(4))
    }
    const onScroll = () => {
      if (scrollFrame === 0) scrollFrame = window.requestAnimationFrame(updateScroll)
    }
    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
    }
  }, [])

  const promiseLines = book.heroPromise.split('\n')

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      {/* ---- מובייל: הכריכה המלאה היא המסך הראשון; ההבטחה יושבת עליה ---- */}
      <div className={styles.immersive}>
        <div className={styles.immersiveCover}>
          <picture>
            <source srcSet={book.coverImageWebp} type="image/webp" />
            <img
              className={styles.immersiveImg}
              src={book.coverImage}
              alt={book.coverAlt}
              width={1100}
              height={1762}
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          {/* בפינה השמאלית-תחתונה של הכריכה, לצד שם המחבר — לא בבלוק נפרד */}
          <p className={styles.immersivePromise}>
            {renderPromise(promiseLines, styles.accent, styles.underline)}
          </p>
        </div>

        <a className={styles.scrollCue} href="#order-now">
          {book.heroScrollCue}
          <span aria-hidden="true"> ↓</span>
        </a>
      </div>

      {/* ---- טאבלט ודסקטופ: העיצוב המאושר על תמונת האווירה המקורית ---- */}
      <div className={styles.stage}>
        <div className={styles.masthead}>
          <span className={styles.mastTitle}>{book.title}</span>
          <span className={styles.mastRule} aria-hidden="true" />
          <span className={styles.mastAuthor}>{author.name}</span>
        </div>

        <div className={styles.text}>
          {/* שם הספר כבר קורא בבירור מהכריכה — הכותרת נשארת לנגישות ול-SEO בלבד */}
          <h1 className="srOnly">
            {book.title} — {author.name}
          </h1>

          {/* ההבטחה בשלוש שורות; "עליכם" — מוקד בחלודה. הטקסט עצמו מהקונפיג */}
          <p className={styles.promise}>
            {renderPromise(promiseLines, styles.accent, styles.underline)}
          </p>

          <p className={styles.support}>
            {book.heroTagline.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>

          {/* הפעולה היחידה — הבחירות נפתחות רק אחרי לחיצה */}
          <PurchaseReveal className={styles.reveal} />
        </div>

        {/* הספר — עומד על משטח השיש, במקומו ברפרנס */}
        <div className={styles.bookStage}>
          <div className={styles.bookMotion}>
            <img
              className={styles.mockup}
              src="/images/book-mockup.webp"
              alt={book.coverAlt}
              width={640}
              height={1044}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
