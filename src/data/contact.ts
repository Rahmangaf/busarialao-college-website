// The editable details live in src/content-data/contact.json (edited through /admin or by hand).
// Everything except the area is [SAMPLE] until the school supplies the real details.
import data from '../content-data/contact.json';

export const contact = {
  ...data,
  /** The school's WhatsApp number in international form (e.g. "2348030000000"). Empty until supplied. */
  whatsappNumber: (data.whatsappNumber || null) as string | null,
  /** No real accounts exist yet; links stay empty until the school supplies them. */
  social: data.social.map((s) => ({ label: s.label, url: (s.url || null) as string | null })),
};

/**
 * Link for "chat on WhatsApp". Until a number is supplied it points at the Contact page,
 * so nothing opens a chat with a made-up number.
 */
export function whatsappHref(message?: string): string {
  if (!contact.whatsappNumber) return '/contact/#whatsapp';
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${contact.whatsappNumber}${text}`;
}

/** "0803 000 0001" -> "tel:+2348030000001". Used for every phone link. */
export function telHref(number: string): string {
  return `tel:+234${number.replace(/\D/g, '').replace(/^0/, '')}`;
}
