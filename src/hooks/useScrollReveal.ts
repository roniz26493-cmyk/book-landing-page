import { useEffect } from 'react'

const REVEALED = 'revealed'

/**
 * חשיפה עדינה בגלילה — לכל אלמנט עם data-reveal="<סדר>" (0 = ראשון בקבוצה).
 *
 * שיפור הדרגתי: מצב "מוסתר" קיים רק כש-<html> מקבל את המחלקה reveal-ready,
 * וזה קורה רק כאן — אם JavaScript נכשל, אין IntersectionObserver או שהמבקר
 * ביקש הפחתת תנועה, התוכן פשוט מוצג כרגיל. כל אלמנט נחשף פעם אחת בלבד.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const pending = new Set(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (pending.size === 0) return

    // מה שכבר על המסך או מעליו בטעינה (למשל טעינה מחדש באמצע העמוד) — גלוי מיד, בלי הבהוב
    const viewport = window.innerHeight
    for (const el of pending) {
      if (el.getBoundingClientRect().top < viewport) {
        el.dataset[REVEALED] = 'true'
        pending.delete(el)
      }
    }

    const show = (el: HTMLElement) => {
      if (!pending.delete(el)) return
      el.dataset[REVEALED] = 'true'
      observer.unobserve(el)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) show(entry.target as HTMLElement)
      },
      // מעט אחרי שהאלמנט נכנס למסך
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    pending.forEach((el) => observer.observe(el))
    document.documentElement.classList.add('reveal-ready')

    // גלילה מהירה: אלמנט שדולגו מעליו (כבר מעל המסך) לא מחכה לגלילה חזרה
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        // הגיעו לתחתית העמוד: כל מה שעוד ממתין (למשל הפוטר) נחשף — לא נשאר תוכן מוסתר
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
        for (const el of pending) if (atBottom || el.getBoundingClientRect().bottom < 0) show(el)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // מקלדת: פוקוס בתוך בלוק שעוד לא נחשף חושף אותו מיד
    const onFocus = (event: FocusEvent) => {
      const el = (event.target as Element | null)?.closest?.<HTMLElement>('[data-reveal]')
      if (el) show(el)
    }
    document.addEventListener('focusin', onFocus)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onFocus)
      if (frame) cancelAnimationFrame(frame)
      document.documentElement.classList.remove('reveal-ready')
    }
  }, [])
}
