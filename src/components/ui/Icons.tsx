/**
 * סט אייקונים מקומי (SVG inline) — בלי ספריות חיצוניות.
 * כל האייקונים aria-hidden כברירת מחדל; הטקסט שלצידם נושא את המשמעות.
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1.25em"
      height="1.25em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1.35em"
      height="1.35em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.25 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.8.98-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.6.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v14H6.5A2.5 2.5 0 0 0 4 19.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H19v-5" />
    </Icon>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20s-7-4.35-7-9.2A4.1 4.1 0 0 1 12 7.8a4.1 4.1 0 0 1 7 3C19 15.65 12 20 12 20Z" />
    </Icon>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.9 9.1-1.5 4.3-4.3 1.5 1.5-4.3z" />
    </Icon>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3v3M12 18v3M4.2 7.5 6.8 9M17.2 15l2.6 1.5M4.2 16.5 6.8 15M17.2 9l2.6-1.5" />
      <circle cx="12" cy="12" r="3.2" />
    </Icon>
  )
}

export function QuillIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 20c6-1 9-4 12-9 1.4-2.4 2-4.6 2-6-2 .4-4.6 1.5-6.8 3.3C8.2 10.6 6.4 14 6 18" />
      <path d="M4 20h5" />
    </Icon>
  )
}

export function ChevronIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  )
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Icon>
  )
}

export function ExternalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 4h6v6M20 4l-8 8" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </Icon>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  )
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1.75em"
      height="1.75em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.5 5C6.46 5 4 7.6 4 10.8 4 13.9 6.2 16 9 16c.5 0 .9-.05 1.3-.15C9.6 17.7 8 19 5.9 19.6l.6 1.4C10.6 19.9 13 16.4 13 12c0-4.1-1.4-7-3.5-7Zm9 0C15.46 5 13 7.6 13 10.8c0 3.1 2.2 5.2 5 5.2.5 0 .9-.05 1.3-.15-.7 1.85-2.3 3.15-4.4 3.75l.6 1.4C19.6 19.9 22 16.4 22 12c0-4.1-1.4-7-3.5-7Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.5 8.5h2.2V5.3h-2.5c-2.3 0-3.7 1.5-3.7 3.9v1.9H8.3v3.2h2.2V22h3.4v-7.7h2.4l.4-3.2h-2.8V9.6c0-.7.2-1.1 1.1-1.1Z" />
    </Icon>
  )
}

export function TiktokIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 4c.4 2.3 1.9 3.7 4.2 3.9v2.9c-1.5.1-2.9-.4-4.2-1.3v5.4c0 3.3-2.5 5.6-5.5 5.6A5.3 5.3 0 0 1 4 15.1c0-3 2.4-5.4 5.6-5.2v3a2.4 2.4 0 0 0-2.7 2.3c0 1.3 1 2.4 2.5 2.4 1.4 0 2.5-1 2.5-2.6V4Z" />
    </Icon>
  )
}

export function YoutubeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5z" />
    </Icon>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </Icon>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3c2.2 2.4 3.2 5.6 3.2 9S14.2 18.6 12 21c-2.2-2.4-3.2-5.6-3.2-9S9.8 5.4 12 3Z" />
    </Icon>
  )
}

/** מיפוי אייקון לפי המזהה שנשמר בקונפיג. */
export const highlightIcons = {
  book: BookIcon,
  heart: HeartIcon,
  compass: CompassIcon,
  spark: SparkIcon,
  quill: QuillIcon,
} as const

export const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  email: MailIcon,
  website: GlobeIcon,
} as const
