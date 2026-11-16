import type { ElementType } from 'react'

interface AccentTitleProps {
  title: string
  /** מילה/צירוף מתוך title שיודגש בצבע — כמו המילה הצבעונית בכותרות הרפרנס */
  accent?: string
  as?: ElementType
  id?: string
  className?: string
  /** סדר החשיפה בגלילה (data-reveal) — ריק = בלי חשיפה */
  reveal?: number
}

/** כותרת מקטע בצבע הדיו, עם צירוף אחד בטורקיז. הטקסט עצמו לא משתנה. */
export function AccentTitle({ title, accent, as: Tag = 'h2', id, className, reveal }: AccentTitleProps) {
  const at = accent ? title.indexOf(accent) : -1
  return (
    <Tag id={id} className={['sectionTitle', className].filter(Boolean).join(' ')} data-reveal={reveal}>
      {at === -1 ? (
        title
      ) : (
        <>
          {title.slice(0, at)}
          <span className="accent">{accent}</span>
          {title.slice(at + (accent?.length ?? 0))}
        </>
      )}
    </Tag>
  )
}
