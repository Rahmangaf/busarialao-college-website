// Source: content/04-boarding-and-student-life.md (magazine Chapter 3). [DRAFT] unless marked [SAMPLE].
// The gallery is hidden: real, consented photographs are not available (see sample-content-register).

export const boarding = {
  title: 'A second home, and a full life outside class',
  lead: 'Supervised boarding on Yidi Road, and clubs, sport and practical skills for every student, day or boarding. [DRAFT]',

  hostel: {
    heading: 'The hostel',
    text: 'Boarding helps students manage time between academics, practical work and personal activities, building discipline and independence. [DRAFT]',
    facts: [
      { value: '2010', label: 'hostel opened at Osere [DRAFT]' },
      { value: '2013', label: 'moved to Yidi Road, with almost 80 students [DRAFT]' },
      { value: '10', label: 'hostel staff for welfare, safety, discipline and guidance [DRAFT]' },
    ],
    weekend: 'Weekend routine: hostelites do aerobic exercise on Saturday and Sunday, 6:30 to 7:30 a.m., under a trained fitness instructor. [DRAFT]',
  },

  routine: {
    heading: 'Daily routine',
    text: 'Weekdays. Weekends add sport, laundry and supervised free time. [SAMPLE]',
    steps: [
      { time: '5:30am', text: 'Wake-up and morning devotion' },
      { time: '6:30am', text: 'Breakfast and morning prep' },
      { time: '7:45am', text: 'Classes' },
      { time: '4:00pm', text: 'Clubs, sport and rest' },
      { time: '7:00pm', text: 'Evening study, supervised' },
      { time: '9:30pm', text: 'Lights out' },
    ],
    note: 'All times [SAMPLE].',
    bring: {
      heading: 'What to bring',
      items: [
        'Bedding: sheets, pillow and blanket',
        'Toiletries and a bucket',
        'School uniforms and house wear',
        'Plate, cup and cutlery',
        'Labelled personal items',
      ],
      note: 'List [SAMPLE]. The full list is sent with the admission letter.',
    },
    care: {
      heading: 'Visiting and care',
      lines: [
        'Visiting day is the last Saturday of each month. [SAMPLE]',
        'A sick bay on site, with parents contacted promptly if a child is unwell. [SAMPLE]',
      ],
    },
  },

  clubs: {
    heading: 'Clubs and societies',
    text: 'Seven clubs, each with a teacher coordinator and student executives. [DRAFT]',
    note: '[CONFIRM] The design listed Mathematics, Debate, ICT and Science clubs, which are not in the magazine. The magazine’s seven are shown here.',
    items: [
      { name: 'Health Science', purpose: 'Hygiene, disease prevention, interest in health careers' },
      { name: 'Life Science', purpose: 'Biology practicals and observation' },
      { name: 'Physical Science', purpose: 'Physics and chemistry demonstrations' },
      { name: 'Model Youth', purpose: 'Leadership, citizenship, discipline' },
      { name: 'Readers', purpose: 'Reading habits, vocabulary, comprehension' },
      { name: 'Press', purpose: 'Writing, basic journalism, reporting school events' },
      { name: 'Drama', purpose: 'Acting, confidence, public speaking, moral messages' },
    ],
  },

  sports: {
    heading: 'Sports and fitness',
    facilities:
      'A football pitch; volleyball, basketball and badminton courts; table tennis equipment; fitness and aerobic materials. [DRAFT]',
    activities: [
      'Football: inter-class, friendlies and the annual inter-house',
      'Athletics: sprints, long-distance, javelin, high jump, relays',
      'Indoor games: chess, scrabble, darts, table tennis',
      'PE health sessions',
    ],
    competitions: 'Learners compete at zonal, local-government and state level. [DRAFT]',
    schedule: "Learners' sporting activities are on Wednesdays, 2:00 to 4:00 p.m. [DRAFT]",
  },

  character: {
    heading: 'Character and leadership',
    text: 'The school promotes discipline and self-control, integrity and honesty, respect and tolerance, responsibility and accountability, hard work and perseverance. [DRAFT]',
    points: [
      'A student council: Head Boy/Girl, Sports Captain and Club Heads',
      'A two-week certified leadership training at Sea School, Apapa, Lagos',
      'Teacher mentors, alumni mentorship and industry visits',
    ],
  },

  excursions: {
    heading: 'Excursions',
    text: 'Educational trips each session. [SAMPLE: confirm the current programme with the school]',
    list: [
      'Old Oyo National Park: the first field trip, May 2007',
      'Republic of Benin: an international excursion',
      'Sea School, Lagos',
      'Erin-Ijesa (Olumirin) Waterfall',
      'International Aviation College, Ilorin',
      'Arinta Falls and Ikogunsi warm spring (Ekiti)',
      'Idanre Hill (Osun)',
      'Farms, research institutes, universities and industrial visits',
    ],
  },

  faq: [
    {
      q: 'Can a day student become a boarder?',
      a: 'Yes, at the start of a term where space allows. Speak to the admissions office. [SAMPLE]',
    },
    {
      q: 'Can boarders use phones?',
      a: 'House staff keep a phone for calls home at set times; parents can call the house line. [SAMPLE]',
    },
    { q: 'What happens if my child is unwell?', a: 'They are seen in the sick bay, and parents are contacted. [SAMPLE]' },
  ],
} as const;
