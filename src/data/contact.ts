// Source: content/06-news-calendar-contact.md. Everything except the area is [SAMPLE].

export const contact = {
  phones: [
    { id: 'main', label: 'Main line', number: '0803 000 0000' },
    { id: 'admissions', label: 'Admissions', number: '0803 000 0002' },
    { id: 'bursary', label: 'Bursary', number: '0803 000 0001' },
    { id: 'principal', label: "Principal's Office", number: '0803 000 0003' },
  ],
  phoneTag: '[SAMPLE]',
  officeHours: 'Mon–Fri, 7:30am–4pm [SAMPLE]',
  tours: 'Tours run Monday to Friday, 9am to 2pm. [SAMPLE]',
  /** The school's WhatsApp number in international form (e.g. "2348030000000"). Not supplied yet. */
  whatsappNumber: null as string | null,
  /** No real accounts exist yet; links stay unset until the school supplies them. */
  social: [
    { label: 'Facebook', url: null as string | null },
    { label: 'Instagram', url: null as string | null },
  ],
} as const;

/**
 * Link for "chat on WhatsApp". Until a number is supplied it points at the Contact page,
 * so nothing opens a chat with a made-up number.
 */
export function whatsappHref(message?: string): string {
  if (!contact.whatsappNumber) return '/contact/#whatsapp';
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${contact.whatsappNumber}${text}`;
}
