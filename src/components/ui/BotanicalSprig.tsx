/**
 * קישוט בוטני עדין וקווי — הד מרוחק לענף שמאייר את כריכת הספר.
 * מכוון לשימוש חד-פעמי ומצומצם (לא בכל אזור), כדי לא להתחרות באיור עצמו.
 */
export function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17 31V9" />
      <path d="M17 13c-3-1-5-3.5-5.5-7" />
      <path d="M17 19c3-1 5-3 5.5-6.5" />
      <path d="M17 25c-2.5-.5-4-2-4.5-4.5" />
      <circle cx="17" cy="7" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}
