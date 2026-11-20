// Copy for /preview/contact-v1/ lives in src/content-data/contact-v1.json (edited in /admin).
// The phone number, email, address, opening badge, directions link and social links are NOT repeated
// here: they come from src/content-data/site.json, so they are edited in one place.
import data from '../content-data/contact-v1.json';
import { site } from './site';

export const contactV1 = {
  ...data,
  visit: { ...data.visit, whatsapp: { label: data.visit.whatsapp.label, href: site.footer.contact.whatsappHref } },
  details: {
    phone: site.footer.contact.phone,
    phoneHref: site.footer.contact.phoneHref,
    email: site.footer.contact.email,
    emailHref: site.footer.contact.emailHref,
    whatsappHref: site.footer.contact.whatsappHref,
    address: site.footer.findUs.address,
    directionsHref: site.footer.findUs.directionsHref,
    hours: site.footer.hours,
  },
};
