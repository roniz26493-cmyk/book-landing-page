import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  /** השהיה במילישניות, ליצירת אפקט מדורג בין כרטיסים */
  delay?: number
  className?: string
  id?: string
  as?: 'div' | 'li' | 'article' | 'header'
}

/** עוטף תוכן באנימציית חשיפה עדינה בגלילה. */
export function Reveal({ children, delay = 0, className, id, as = 'div' }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()
  // ה-cast מאחד את טיפוסי ה-ref של תגיות ה-HTML האפשריות
  const Tag = as as 'div'

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {}

  return (
    <Tag
      ref={ref}
      id={id}
      className={['reveal', className].filter(Boolean).join(' ')}
      data-visible={isVisible}
      style={style}
    >
      {children}
    </Tag>
  )
}
