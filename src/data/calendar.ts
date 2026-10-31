// Source: content/06-news-calendar-contact.md. All term dates, 2026/2027, are [SAMPLE].

export const calendar = {
  session: '2026/2027',
  note: 'All dates [SAMPLE]. Check back before booking travel.',
  /** The calendar PDF does not exist yet. */
  pdfUrl: null as string | null,
  terms: [
    {
      name: 'First term',
      dates: [
        { date: '7 Sep', event: 'Resumption' },
        { date: '10 Oct', event: 'PTA meeting' },
        { date: '30 Oct', event: "Boarders' visiting day" },
        { date: '6–10 Nov', event: 'Mid-term break' },
        { date: '1–11 Dec', event: 'Examinations' },
        { date: '15 Dec', event: 'Vacation begins' },
      ],
    },
    {
      name: 'Second term',
      dates: [
        { date: '5 Jan', event: 'Resumption' },
        { date: '31 Jan', event: "Boarders' visiting day" },
        { date: '16–20 Feb', event: 'Mid-term break' },
        { date: '20 Mar', event: 'Entrance exam' },
        { date: '23 Mar–2 Apr', event: 'Examinations' },
        { date: '3 Apr', event: 'Vacation begins' },
      ],
    },
    {
      name: 'Third term',
      dates: [
        { date: '27 Apr', event: 'Resumption' },
        { date: '30 May', event: "Boarders' visiting day" },
        { date: '8–12 Jun', event: 'Mid-term break' },
        { date: '20 Jun', event: 'PTA meeting' },
        { date: '6–17 Jul', event: 'Examinations' },
        { date: '24 Jul', event: 'Vacation begins' },
      ],
    },
  ],
  /** WhatsApp updates: no real channel exists yet. */
  updates: { heading: 'Never miss a date', text: 'Get term dates and reminders on WhatsApp. [SAMPLE: no channel exists yet]' },
} as const;
