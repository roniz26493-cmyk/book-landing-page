import { useEffect, useState } from 'react'

/** האם המשתמש גלל מעל offset פיקסלים. משמש למצב ה-Header ולכפתור הדביק. */
export function useScrollPast(offset: number): boolean {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setPassed(window.scrollY > offset)
    }

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [offset])

  return passed
}
