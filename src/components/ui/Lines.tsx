import { Fragment } from 'react'

/** מציג טקסט מהקונפיג עם שבירות שורה מכוונות ("\n"). */
export function Lines({ text }: { text: string }) {
  const parts = text.split('\n')
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {/* רווח לפני השבירה: אם ה-<br> מוסתר במובייל, המילים לא יידבקו */}
          {i < parts.length - 1 && (
            <>
              {' '}
              <br />
            </>
          )}
        </Fragment>
      ))}
    </>
  )
}
