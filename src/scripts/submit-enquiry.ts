// The one place the enquiry leaves the site: a hand-off to WhatsApp.
// There is no storage and no email. The site cannot see whether the visitor presses Send in
// WhatsApp, so a "handed off" result means only that WhatsApp was opened with the message ready.
import { contact } from '../data/contact';

export interface Enquiry {
  name: string;
  phone: string;
  /** Label of the chosen level of interest. */
  interest: string;
  message: string;
}

export type SubmitResult =
  | { ok: true; status: 'handed-off' }
  | { ok: false; status: 'not-configured' }
  /** The browser refused to open a new window. `url` lets the visitor open WhatsApp themselves. */
  | { ok: false; status: 'blocked'; url: string };

export function buildWhatsAppMessage(enquiry: Enquiry): string {
  return [
    'Enquiry from the Busarialao College website',
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    `Interested in: ${enquiry.interest}`,
    '',
    enquiry.message,
  ].join('\n');
}

export function submitEnquiry(enquiry: Enquiry): SubmitResult {
  const number = contact.whatsappNumber;
  if (!number) return { ok: false, status: 'not-configured' };

  const url = `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(enquiry))}`;
  const opened = window.open(url, '_blank');
  if (!opened) return { ok: false, status: 'blocked', url };
  opened.opener = null;
  return { ok: true, status: 'handed-off' };
}
