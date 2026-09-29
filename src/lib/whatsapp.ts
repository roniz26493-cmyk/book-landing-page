/**
 * בניית קישור WhatsApp בצורה בטוחה.
 *
 * כל עוד מספר הטלפון בקונפיג הוא placeholder (או ריק, או לא תקין),
 * הפונקציה מחזירה null — וכפתורי הוואטסאפ באתר יוצגו במצב לא-פעיל
 * במקום להוביל לקישור שבור.
 */

/** מספר בינלאומי תקין: ספרות בלבד, 8–15 ספרות. */
const VALID_PHONE = /^\d{8,15}$/

export function isPhoneConfigured(phone: string): boolean {
  return VALID_PHONE.test(phone.trim())
}

/**
 * מחזירה קישור wa.me מלא עם הודעה מקודדת ל-URL,
 * או null אם המספר עדיין לא הוגדר.
 */
export function buildWhatsAppLink(phone: string, message: string): string | null {
  const clean = phone.trim()
  if (!isPhoneConfigured(clean)) return null

  const base = `https://wa.me/${clean}`
  const text = message.trim()
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
