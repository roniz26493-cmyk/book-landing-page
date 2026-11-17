import { bookConfig } from '../data/bookConfig'
import { buildWhatsAppLink } from './whatsapp'

/**
 * נוסח כפתורי ההזמנה בסיום ובכפתור הדביק — זהה, מתוך purchase.finalCta.
 * כשהכפתור נשבר לשתי שורות, "במחיר השקה" ו-"70 ש״ח" נשארים יחד (רווח בלתי
 * שביר). הנוסח עצמו לא משתנה.
 */
export const finalCtaLabel = bookConfig.purchase.finalCta
  .replace('במחיר השקה', 'במחיר השקה')
  .replace(/(\d+) ש״ח/, '$1 ש״ח')

/** קישור ההזמנה בוואטסאפ (מספר + הודעה מוכנה מהקונפיג) — null אם המספר לא תקין */
export const whatsappLink = buildWhatsAppLink(bookConfig.whatsapp.phone, bookConfig.whatsapp.message)
