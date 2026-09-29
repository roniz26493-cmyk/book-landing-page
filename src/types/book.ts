/**
 * טיפוסים עבור כל התוכן של עמוד הנחיתה.
 * התוכן עצמו נמצא בקובץ אחד: src/data/bookConfig.ts
 */

/** פלטת הצבעים של המותג. נטענת כמשתני CSS על :root בזמן ריצה. */
export interface BrandColors {
  /** צבע ראשי — כותרות, רקע כהה, אלמנטים דומיננטיים */
  primary: string
  /** גרסה רכה יותר של הראשי — גרדיאנטים ומצבי hover */
  primarySoft: string
  /** צבע משני — מבטאים שקטים, קווים, אייקונים */
  secondary: string
  /** צבע רקע ראשי של העמוד */
  background: string
  /** רקע חלופי להחלפת אזורים */
  backgroundAlt: string
  /** רקע כרטיסים ומשטחים */
  surface: string
  /** צבע טקסט ראשי */
  text: string
  /** צבע טקסט משני/מרוכך */
  textMuted: string
  /** צבע הדגשה לכפתורים ולקישורים */
  accent: string
  /** גרסה כהה של ההדגשה — hover/active */
  accentStrong: string
}

/** חנות או אתר מכירה חיצוני. */
export interface Store {
  id: string
  /** שם החנות כפי שיוצג */
  name: string
  /** הערה קצרה מתחת לשם (אופציונלי) */
  note?: string
  /**
   * הקישור לעמוד הספר בחנות.
   * כל עוד הערך ריק — הכפתור יוצג כ"בקרוב" ולא יהיה קישור שבור.
   */
  url: string
  /**
   * נתיב ללוגו החנות (אופציונלי), למשל '/stores/steimatzky.svg'
   * בתיקיית public. אם אין לוגו — יוצג שם החנות בלבד.
   */
  logo?: string
}

/** קטע או ציטוט מתוך הספר. */
export interface Excerpt {
  id: string
  text: string
  /** מיקום בספר, שם הפרק וכו' (אופציונלי) */
  source?: string
}

/** יתרון / נושא / חוויה שהקורא ימצא בספר. */
export interface Highlight {
  id: string
  title: string
  description: string
  /** אייקון מתוך סט האייקונים המובנה */
  icon: 'book' | 'heart' | 'compass' | 'spark' | 'quill'
}

/** שאלה ותשובה. */
export interface FaqItem {
  id: string
  question: string
  answer: string
  /** האם התשובה היא placeholder שממתין לתוכן אמיתי */
  isPlaceholder?: boolean
}

/** קישור לרשת חברתית. url ריק = הקישור לא יוצג כלל. */
export interface SocialLink {
  id: string
  label: string
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'email' | 'website'
  url: string
}

/** קישור בתפריט הניווט. */
export interface NavLink {
  /** ה-id של האזור בעמוד, ללא # */
  target: string
  label: string
}

export interface BookConfig {
  /** הגדרות לסימון תוכן זמני */
  placeholders: {
    /**
     * true = יוצגו תגיות קטנות "תוכן זמני" ליד אזורים עם placeholder.
     * להעביר ל-false לפני עלייה לאוויר.
     */
    showMarks: boolean
  }

  book: {
    title: string
    /** כותרת משנה / טאגליין קצר */
    subtitle: string
    /** משפט קצר ומסקרן ל-Hero */
    heroTagline: string
    /** תיאור הספר — אזור "על הספר" */
    description: string[]
    /** משפט מודגש טיפוגרפית באזור "על הספר". ריק = לא יוצג */
    pullQuote: string
    coverImage: string
    /** גרסת WebP קלה יותר של הכריכה (אופציונלי). ריק = משתמשים ב-coverImage בלבד */
    coverImageWebp: string
    coverAlt: string
    /** תמונה נוספת של הספר (אופציונלי). ריק = לא תוצג */
    secondaryImage: string
    /** גרסת WebP של התמונה הנוספת (אופציונלי) */
    secondaryImageWebp: string
    secondaryImageAlt: string
    /** האם תמונת הכריכה היא placeholder */
    coverIsPlaceholder: boolean
  }

  author: {
    name: string
    /** תיאור תפקיד קצר, למשל "סופר ומשורר" */
    role: string
    bio: string[]
    photo: string
    photoAlt: string
    photoIsPlaceholder: boolean
  }

  brand: {
    colors: BrandColors
    /** האם הפלטה היא זמנית (עד שתנותח כריכת הספר) */
    isPlaceholderPalette: boolean
  }

  whatsapp: {
    /**
     * מספר הטלפון של המחבר בפורמט בינלאומי, ללא +, ללא מקפים וללא רווחים.
     * לדוגמה: '972501234567'
     * כל עוד הערך אינו מספר תקין — כפתורי הוואטסאפ יוצגו במצב לא-פעיל
     * עם הודעה מתאימה, ולא ייצרו קישור שבור.
     */
    phone: string
    /** הודעה מוכנה מראש. הקידוד ל-URL נעשה אוטומטית */
    message: string
    /** ההגבלה הגיאוגרפית של ההזמנה הישירה */
    areaNotice: string
  }

  purchase: {
    /** כותרת אזור הרכישה */
    title: string
    intro: string
    stores: Store[]
    /** טקסט שמוצג כשעדיין אין קישורי חנויות פעילים */
    storesPendingNotice: string
    /** מחיר — ריק = לא יוצג בשום מקום */
    price: string
  }

  peek: {
    /** false = האזור "הצצה לספר" מוסתר לחלוטין */
    enabled: boolean
    title: string
    intro: string
    excerpts: Excerpt[]
    /** האם הקטעים הם placeholder */
    isPlaceholder: boolean
  }

  highlights: {
    title: string
    intro: string
    items: Highlight[]
    isPlaceholder: boolean
  }

  faq: {
    title: string
    items: FaqItem[]
  }

  shipping: {
    /** false = לא יוצג מידע משלוחים. להעביר ל-true רק כשיש פרטים אמיתיים */
    enabled: boolean
    items: string[]
  }

  contact: {
    /** כתובת מייל. ריק = לא תוצג */
    email: string
  }

  social: SocialLink[]
  nav: NavLink[]
}
