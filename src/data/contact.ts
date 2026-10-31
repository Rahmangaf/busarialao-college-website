// Source: content/06-news-calendar-contact.md. Everything except the area is [SAMPLE].

export const contact = {
  phones: [
    { id: 'main', label: 'Main line', number: '0803 000 0000' },
    { id: 'admissions', label: 'Admissions', number: '0803 000 0002' },
    { id: 'bursary', label: 'Bursary', number: '0803 000 0001' },
    { id: 'principal', label: "Principal's Office", number: '0803 000 0003' },
  ],
  phoneTag: '[SAMPLE]',
  lead: "Call the right office, message us on WhatsApp, or send an enquiry and we'll reply within one working day. [SAMPLE]",
  offices: [
    { id: 'admissions', name: 'Admissions', hint: 'Forms, exam, tours', number: '0803 000 0002' },
    { id: 'bursary', name: 'Bursary', hint: 'Fees and payments', number: '0803 000 0001' },
    { id: 'principal', name: "Principal's Office", hint: 'General enquiries', number: '0803 000 0003' },
  ],
  hoursRows: [
    { day: 'Mon–Fri', time: '7:30am–4:00pm' },
    { day: 'Sat–Sun', time: 'Closed; WhatsApp replies on Monday' },
  ],
  replyPromise: 'We reply within one working day. [SAMPLE]',
  directions: '[SAMPLE] Landmark-based directions from the main road, to be supplied by the school.',
  /** Search link built from the school name and the area in the magazine. No exact pin is known. */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Busarialao+College+Irewolede+Ilorin+Kwara+State',
  interests: [
    { value: 'tour', label: 'Book a tour' },
    { value: 'jss1-day', label: 'JSS1, day' },
    { value: 'jss1-boarding', label: 'JSS1, boarding' },
    { value: 'ss1', label: 'SS1' },
    { value: 'other', label: 'Other' },
  ],
  consent:
    'By sending this enquiry you agree that the school may use your details to reply to you. Your message is sent through WhatsApp. [CONFIRM wording]',
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

/** "0803 000 0001" -> "tel:+2348030000001". Used for every phone link. */
export function telHref(number: string): string {
  return `tel:+234${number.replace(/\D/g, '').replace(/^0/, '')}`;
}
