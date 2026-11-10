import { useEffect, useRef } from 'react'

/**
 * קובע את משך אנימציית ה"סרט" כך שהמהירות תהיה pxPerSecond בדיוק, כמו
 * שנמדד ברפרנס. ה-track מכיל שני עותקים זהים, ולכן לולאה = חצי מרוחבו.
 */
export function useMarquee<T extends HTMLElement>(pxPerSecond: number) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const update = () => {
      const loop = node.scrollWidth / 2
      if (loop > 0) node.style.animationDuration = `${(loop / pxPerSecond).toFixed(2)}s`
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [pxPerSecond])

  return ref
}
