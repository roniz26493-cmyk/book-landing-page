import { useEffect, useRef } from 'react'
import { bookConfig } from '../data/bookConfig'
import { PurchaseReveal } from './PurchaseReveal'
import styles from './Hero.module.css'

const { book, author } = bookConfig

/**
 * המסך הראשון — ספר פיזי שנכנס לסצנה, וטיפוגרפיה שמסודרת סביבו.
 *
 * מובייל: הכריכה המלאה ממלאת את המסך הראשון ("נכנסים לכריכה"), עם
 * ההבטחה והזמנה להמשיך לגלול. טאבלט ודסקטופ: הספר הפיזי עומד על משטח
 * אבן באור יום רך, עם צלליות ענפים, והטיפוגרפיה לצידו.
 * הרכישה עצמה — מיד אחרי ה-Hero (PrimaryCta), לא בתוכו.
 *
 * שלוש שכבות תנועה, כל אחת על אלמנט משלה כדי שלא יתנגשו:
 *  1. כניסה (CSS בלבד) — על .book ועל שורות הטקסט, פעם אחת בטעינה.
 *  2. גלילה — --scroll (0→1) על ה-section, לאורך ~60% מגובה המסך.
 *  3. תזוזה זעירה לפי מיקום העכבר — --px/--py על אותו .bookMotion, דסקטופ בלבד.
 * הכול transform בלבד, עדכון אחד לכל פריים, וכלום כשהמשתמש לא זז.
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
  const motionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const el = motionRef.current
    if (!hero || !el) return
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

    // ---- עומק לפי העכבר: רק במכשירים עם עכבר אמיתי ----
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let pointerFrame = 0

    const stepPointer = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      el.style.setProperty('--px', current.x.toFixed(4))
      el.style.setProperty('--py', current.y.toFixed(4))
      const settled =
        Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001
      pointerFrame = settled ? 0 : window.requestAnimationFrame(stepPointer)
    }
    const kick = () => {
      if (pointerFrame === 0) pointerFrame = window.requestAnimationFrame(stepPointer)
    }
    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      target = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      }
      kick()
    }
    const onPointerLeave = () => {
      target = { x: 0, y: 0 }
      kick()
    }
    if (finePointer) {
      hero.addEventListener('pointermove', onPointerMove)
      hero.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame)
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

      {/* ---- טאבלט ודסקטופ: ספר על משטח אבן באור יום, וטיפוגרפיה לצידו ---- */}
      {/* אווירה: שכבות דקורטיביות בלבד — אור, משטח, צלליות ענפים */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.daylight} />
        <span className={styles.surface} />
        <span className={styles.floorShadow} />
        {book.secondaryImage && (
          <>
            <span className={`${styles.leaves} ${styles.leavesFar}`}>
              <img src={book.secondaryImageWebp || book.secondaryImage} alt="" decoding="async" />
            </span>
            <span className={`${styles.leaves} ${styles.leavesNear}`}>
              <img src={book.secondaryImageWebp || book.secondaryImage} alt="" decoding="async" />
            </span>
          </>
        )}
      </div>

      <div className={styles.stage}>
        <div className={styles.masthead}>
          <span className={styles.mastTitle}>{book.title}</span>
          <span className={styles.mastRule} aria-hidden="true" />
          <span className={styles.mastAuthor}>{author.name}</span>
        </div>

        <div className={styles.layout}>
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

          <div className={styles.bookStage}>
            <div className={styles.bookMotion} ref={motionRef}>
              <div className={styles.book}>
                <span className={styles.bookShadow} aria-hidden="true" />
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
        </div>
      </div>
    </section>
  )
}
