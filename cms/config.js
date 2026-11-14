// Decap CMS configuration for the Busarialao College site.
// It describes the JSON files in src/content-data/, so editors get forms instead of code.
//
// LOCAL USE ONLY for now: `npm run dev` + `npm run cms`, no login. The hosting provider and the
// live login are not decided yet (see CLAUDE.md), so `backend` below is a placeholder.
//
// Rules for editors: keep the [SAMPLE], [DRAFT] and [CONFIRM] tags until the school confirms the item,
// and leave words in curly brackets, such as {examDate}, exactly as they are.
const { initCMS } = window;

const PHOTO_OPTIONS = [
  { label: 'No photo', value: '' },
  'biology-lab',
  'ceremony-hall',
  'chemistry-lab',
  'computer-lab',
  'courtyard',
  'dormitory',
  'dormitory-study',
  'exam-session',
  'football',
  'graduation-group',
  'principal-portrait',
  'students-walking',
];

// Small helpers so the field lists below stay short.
const optional = { required: false };
const str = (name, label, extra = {}) => ({ name, label, widget: 'string', ...extra });
const txt = (name, label, extra = {}) => ({ name, label, widget: 'text', ...extra });
const num = (name, label, extra = {}) => ({ name, label, widget: 'number', value_type: 'int', ...extra });
const hidden = (name) => ({ name, widget: 'hidden', required: false });
const strList = (name, label, extra = {}) => ({
  name,
  label,
  widget: 'list',
  field: { name: 'item', label: 'Text', widget: 'text' },
  ...extra,
});
const list = (name, label, fields, extra = {}) => ({ name, label, widget: 'list', fields, ...extra });
const obj = (name, label, fields, extra = {}) => ({ name, label, widget: 'object', fields, ...extra });
const entry = (name, label, file, fields) => ({ name, label, file: `src/content-data/${file}.json`, fields });
const group = (name, label, description, files) => ({
  name,
  label,
  description,
  editor: { preview: false },
  files,
});

// A tag shown as a small label, for example SAMPLE becomes [SAMPLE] on the page. Empty means no label.
const tagSelect = (name, label) => ({
  name,
  label,
  widget: 'select',
  options: [{ label: 'No label', value: '' }, 'SAMPLE', 'DRAFT', 'CONFIRM'],
  default: '',
  required: false,
  hint: 'Keep the label until the school confirms the item.',
});
const photoSelect = (name, label = 'Photo') => ({ name, label, widget: 'select', options: PHOTO_OPTIONS.filter((o) => o !== '' && typeof o === 'string') });
const focus = (name, label, hint) => str(name, label, { hint: hint || 'Where to centre the crop, for example 50% 40%.' });
const link = (labelName, hrefName) => [str(labelName, 'Link text'), str(hrefName, 'Link address', { hint: 'For example /academics/ or /about/#story.' })];

const TAGS = 'Keep the [SAMPLE], [DRAFT] and [CONFIRM] tags until the school confirms the item.';

// ---------------------------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------------------------

const about = entry('about', 'About', 'about', [
  txt('lead', 'Opening line'),
  strList('story', 'Our story (one paragraph per item)'),
  list('facts', 'Key facts', [str('value', 'Number or year'), str('label', 'Label')], { summary: '{{fields.value}} {{fields.label}}' }),
  txt('vision', 'Vision'),
  strList('mission', 'Mission (one point per item)'),
  list('values', 'Values', [str('name', 'Name'), txt('text', 'Description')], { summary: '{{fields.name}}' }),
  obj('welcome', "Principal's welcome", [
    strList('paragraphs', 'Paragraphs'),
    str('note', 'Note'),
    str('signature', 'Signature'),
    str('signatureNote', 'Signature note'),
  ]),
  str('leadershipNote', 'Leadership note'),
  list('leadership', 'Leadership', [str('role', 'Role'), str('name', 'Name'), txt('detail', 'Detail')], { summary: '{{fields.role}}: {{fields.name}}' }),
  list('milestones', 'Milestones', [str('year', 'Year'), txt('text', 'What happened')], { summary: '{{fields.year}}' }),
]);

const home = entry('home', 'Home', 'home', [
  obj('hero', 'Top of the page: slides', [
    str('label', 'Name of the slideshow (read by screen readers)'),
    obj('autoplay', 'Automatic sliding', [
      { name: 'enabled', label: 'Slide automatically', widget: 'boolean', default: false, hint: 'Off by default. When on, it slides slowly, stops when a visitor hovers or touches it, and stops after one round.' },
      num('seconds', 'Seconds on each slide'),
    ]),
    list(
      'slides',
      'Slides (keep three; the first loads first)',
      [
        str('name', 'Name (used by the dots)'),
        photoSelect('photo'),
        focus('focusDesktop', 'Photo focus on large screens'),
        focus('focusMobile', 'Photo focus on phones', 'Keep faces in the crop. For example 38% 35%.'),
        txt('headline', 'Headline'),
        txt('text', 'Supporting text', { hint: 'Leave words in curly brackets, such as {session} or {examDate}, as they are.' }),
        tagSelect('tag', 'Label under the text'),
        list(
          'buttons',
          'Buttons (one or two)',
          [
            str('label', 'Button text'),
            str('href', 'Link address'),
            { name: 'style', label: 'Look', widget: 'select', options: ['primary', 'secondary'], default: 'primary' },
          ],
          { summary: '{{fields.label}}', max: 2, min: 1 },
        ),
      ],
      { summary: '{{fields.name}}', min: 1, max: 5 },
    ),
  ]),
  obj('welcome', 'Welcome', [
    str('heading', 'Heading'),
    tagSelect('headingTag', 'Label under the heading'),
    txt('text', 'Text'),
    tagSelect('textTag', 'Label under the text'),
    ...link('linkLabel', 'linkHref'),
  ]),
  str('numbersLinkLabel', 'Numbers band: link text'),
  obj('science', 'Science', [
    str('heading', 'Heading'),
    tagSelect('headingTag', 'Label under the heading'),
    txt('lead', 'Opening line'),
    photoSelect('photo'),
    str('ratio', 'Photo shape on large screens', { hint: 'For example 16 / 9.' }),
    str('ratioMobile', 'Photo shape on phones', { hint: 'For example 4 / 3.' }),
    focus('focus', 'Photo focus'),
    str('labsHeading', 'Laboratories heading'),
    tagSelect('labsTag', 'Label under the laboratories heading'),
    list('labs', 'Laboratories', [str('name', 'Name'), txt('text', 'One-line description')], { summary: '{{fields.name}}' }),
    str('labsNote', 'Note under the laboratories'),
    str('examsHeading', 'Exams heading'),
    txt('examsText', 'Exams text'),
    str('examsNote', 'Note under the exams'),
    ...link('linkLabel', 'linkHref'),
  ]),
  obj('dayBoarding', 'Day or boarding', [
    str('heading', 'Heading'),
    list(
      'items',
      'The two choices',
      [
        photoSelect('photo'),
        str('ratio', 'Photo shape', { hint: 'Both photos use the same shape, 3 / 2, so they line up.' }),
        focus('focus', 'Photo focus'),
        str('title', 'Title'),
        txt('text', 'Text'),
      ],
      { summary: '{{fields.title}}' },
    ),
  ]),
  obj('proof', 'Proof', [
    str('heading', 'Heading'),
    tagSelect('headingTag', 'Label under the heading'),
    list('items', 'Achievements', [txt('text', 'Text'), tagSelect('tag', 'Label')], { summary: '{{fields.text}}' }),
    list('links', 'Links', [str('label', 'Link text'), str('href', 'Link address')], { summary: '{{fields.label}}' }),
  ]),
  obj('closing', 'Closing section', [
    str('heading', 'Heading'),
    photoSelect('photo', 'Photo behind the section'),
    focus('focus', 'Photo focus on large screens'),
    focus('focusMobile', 'Photo focus on phones'),
    str('tourLabel', 'Tour button text'),
    str('tourHref', 'Tour button address'),
    str('applyLabel', 'Apply link text'),
    str('applyHref', 'Apply link address'),
    str('whatsappLabel', 'WhatsApp link text'),
    str('stepsLinkLabel', 'Link under the steps: text'),
    str('stepsLinkHref', 'Link under the steps: address'),
  ]),
]);

const academics = entry('academics', 'Academics', 'academics', [
  str('title', 'Page title'),
  txt('lead', 'Opening line'),
  obj('curriculum', 'Curriculum', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    list(
      'stages',
      'Stages',
      [str('years', 'Years'), str('name', 'Name'), txt('text', 'Text'), strList('exams', 'Exams', { field: { name: 'item', label: 'Exam', widget: 'string' } })],
      { summary: '{{fields.name}}' },
    ),
    strList('notes', 'Notes'),
  ]),
  obj('labs', 'Laboratories', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    list(
      'items',
      'Labs',
      [
        str('name', 'Name'),
        txt('text', 'Text'),
        { name: 'photo', label: 'Photo', widget: 'select', options: PHOTO_OPTIONS, required: false },
        str('focus', 'Photo focus', { hint: 'Where to centre the crop, for example 50% 40%.' }),
      ],
      { summary: '{{fields.name}}' },
    ),
    txt('fifthLab', 'Note about a fifth lab'),
  ]),
  obj('fair', 'Science fair and projects', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    str('projectsHeading', 'Projects heading'),
    strList('projects', 'Projects', { field: { name: 'item', label: 'Project', widget: 'string' } }),
  ]),
  obj('competitions', 'Competitions and awards', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    strList('entered', 'Competitions entered'),
    strList('awards', 'Awards'),
  ]),
  obj('vocational', 'Vocational training', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    strList('areas', 'Areas', { field: { name: 'item', label: 'Area', widget: 'string' } }),
  ]),
]);

const admissions = entry('admissions', 'Admissions', 'admissions', [
  str('session', 'Session'),
  str('entranceExamDate', 'Entrance exam date', {
    hint: 'Change it here only. Every page that shows the date uses this one.',
  }),
  str('applicationFee', 'Application fee', { hint: 'Change it here only. Every page that shows the fee uses this one.' }),
  str('announcement', 'Top bar message', { hint: 'Leave {examDate} as it is; it is filled in automatically.' }),
  list('joinSummary', 'How to join: three steps on Home', [str('title', 'Title'), txt('text', 'Text')], {
    summary: '{{fields.title}}',
    hint: 'Leave {examDate} and {applicationFee} as they are.',
  }),
  obj('hero', 'Page top', [str('title', 'Title'), txt('lead', 'Opening line')]),
  list('keyDates', 'Key dates', [str('date', 'Date', { hint: 'Leave {examDateShort} as it is.' }), str('event', 'Event')], {
    summary: '{{fields.date}}: {{fields.event}}',
  }),
  list(
    'steps',
    'How to apply: steps',
    [
      str('title', 'Title'),
      txt('text', 'Text'),
      obj('link', 'Button link', [str('label', 'Label'), str('href', 'Address')], { required: false }),
    ],
    { summary: '{{fields.title}}', hint: 'Leave {examDate} and {applicationFee} as they are.' },
  ),
  str('stepsNote', 'Note under the steps'),
  strList('eligibility', 'Eligibility'),
  strList('documents', 'Documents to bring', { field: { name: 'item', label: 'Document', widget: 'string' } }),
  str('documentsNote', 'Documents note'),
  obj('exam', 'Entrance exam', [
    str('heading', 'Heading'),
    txt('text', 'Text', { hint: 'Leave {examDate} as it is.' }),
    strList('subjects', 'Subjects', { field: { name: 'item', label: 'Subject', widget: 'string' } }),
    str('subjectsNote', 'Subjects note'),
    str('samplePapersLabel', 'Sample papers label'),
    str('samplePapersUrl', 'Sample papers link', { required: false, hint: 'Leave empty until a PDF exists.' }),
  ]),
  obj('scholarship', 'Scholarships', [
    str('heading', 'Heading'),
    str('figure', 'Big number'),
    str('figureLabel', 'Label under the number'),
    strList('points', 'Points'),
    txt('note', 'Note'),
  ]),
  list('faq', 'Questions and answers', [str('q', 'Question'), txt('a', 'Answer')], { summary: '{{fields.q}}' }),
  obj('megaFeature', 'Menu highlight', [str('eyebrow', 'Small label'), str('heading', 'Heading', { hint: 'Leave {examDate} as it is.' }), txt('text', 'Text')]),
]);

const boarding = entry('boarding', 'Boarding & student life', 'boarding', [
  str('title', 'Page title'),
  txt('lead', 'Opening line'),
  obj('hostel', 'The hostel', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    list('facts', 'Facts', [str('value', 'Number or year'), str('label', 'Label')], { summary: '{{fields.value}} {{fields.label}}' }),
    txt('weekend', 'Weekend routine'),
  ]),
  obj('routine', 'Daily routine', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    list('steps', 'Timetable', [str('time', 'Time'), str('text', 'What happens')], { summary: '{{fields.time}} {{fields.text}}' }),
    str('note', 'Note'),
    obj('bring', 'What to bring', [
      str('heading', 'Heading'),
      strList('items', 'Items', { field: { name: 'item', label: 'Item', widget: 'string' } }),
      str('note', 'Note'),
    ]),
    obj('care', 'Visiting and care', [str('heading', 'Heading'), strList('lines', 'Lines')]),
  ]),
  obj('clubs', 'Clubs and societies', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    txt('note', 'Note'),
    list('items', 'Clubs', [str('name', 'Name'), str('purpose', 'Purpose')], { summary: '{{fields.name}}' }),
  ]),
  obj('sports', 'Sports and fitness', [
    str('heading', 'Heading'),
    txt('facilities', 'Facilities'),
    strList('activities', 'Activities', { field: { name: 'item', label: 'Activity', widget: 'string' } }),
    txt('competitions', 'Competitions'),
    txt('schedule', 'Schedule'),
  ]),
  obj('character', 'Character and leadership', [str('heading', 'Heading'), txt('text', 'Text'), strList('points', 'Points')]),
  obj('excursions', 'Excursions', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    strList('list', 'Trips', { field: { name: 'item', label: 'Trip', widget: 'string' } }),
  ]),
  list('faq', 'Questions and answers', [str('q', 'Question'), txt('a', 'Answer')], { summary: '{{fields.q}}' }),
]);

// ---------------------------------------------------------------------------------------------
// Fees, dates and results
// ---------------------------------------------------------------------------------------------

const fees = entry('fees', 'Fees & payment', 'fees', [
  str('session', 'Session'),
  str('title', 'Page title'),
  txt('lead', 'Opening line'),
  str('pdfUrl', 'Fee schedule PDF link', { required: false, hint: 'Leave empty until a PDF exists.' }),
  obj('warning', 'Warning box', [str('heading', 'Heading'), txt('text', 'Text')]),
  obj('termly', 'Fees per term', [
    str('caption', 'Table title'),
    str('note', 'Note'),
    list('rows', 'Rows', [str('level', 'Level'), str('day', 'Day fee'), str('boarding', 'Boarding fee')], { summary: '{{fields.level}}' }),
  ]),
  obj('oneOff', 'One-off fees', [
    str('caption', 'Table title'),
    list('rows', 'Rows', [str('fee', 'Fee'), str('when', 'When'), str('amount', 'Amount')], { summary: '{{fields.fee}}' }),
  ]),
  strList('included', 'Included in the fees', { field: { name: 'item', label: 'Item', widget: 'string' } }),
  strList('separate', 'Paid separately', { field: { name: 'item', label: 'Item', widget: 'string' } }),
  txt('instalments', 'Instalments'),
  txt('sibling', 'Sibling discount'),
  obj('online', 'Online payment', [txt('text', 'Text'), str('status', 'Status label')]),
  obj('account', 'Bank account', [
    list('rows', 'Rows', [str('label', 'Label'), str('value', 'Value')], { summary: '{{fields.label}}' }),
    str('note', 'Note'),
  ]),
  obj('bursary', 'Bursary', [str('hours', 'Opening hours'), str('phone', 'Phone')]),
]);

const calendar = entry('calendar', 'Term dates', 'calendar', [
  str('session', 'Session'),
  str('note', 'Note'),
  str('pdfUrl', 'Calendar PDF link', { required: false, hint: 'Leave empty until a PDF exists.' }),
  list(
    'terms',
    'Terms',
    [
      str('name', 'Term'),
      list('dates', 'Dates', [str('date', 'Date'), str('event', 'Event')], { summary: '{{fields.date}}: {{fields.event}}' }),
    ],
    { summary: '{{fields.name}}' },
  ),
  obj('updates', 'WhatsApp updates box', [str('heading', 'Heading'), txt('text', 'Text')]),
]);

const results = entry('results', 'Results', 'results', [
  list(
    'items',
    'Results by year',
    [
      num('year', 'Year'),
      num('wassce', 'WASSCE pass rate (%)', { value_type: 'float', step: 0.01, required: false, hint: 'Leave empty if there is no figure. Never guess.' }),
      num('neco', 'NECO pass rate (%)', { value_type: 'float', step: 0.01, required: false, hint: 'Leave empty if there is no figure. Never guess.' }),
      str('bestStudent', 'Best student', { required: false, hint: 'Only with the family’s consent.' }),
      num('universityAdmission', 'University admission (%)', { value_type: 'float', step: 0.01, required: false }),
    ],
    { summary: '{{fields.year}}' },
  ),
]);

// ---------------------------------------------------------------------------------------------
// Site-wide details and news
// ---------------------------------------------------------------------------------------------

const school = entry('school', 'School and Home page', 'school', [
  obj('school', 'The school', [
    str('name', 'Name', { hint: 'The official spelling is still to be confirmed.' }),
    str('tagline', 'Tagline'),
    num('foundedYear', 'Year founded', { hint: 'Years since founding are worked out from this.' }),
    str('location', 'Location'),
    str('streetAddress', 'Street address'),
    str('accreditation', 'Registration line'),
  ]),
  obj('home', 'Home page headline', [
    str('title', 'Headline'),
    str('subline', 'Line under the headline', { hint: 'Leave {foundedYear} as it is.' }),
  ]),
]);

const contact = entry('contact', 'Contact details', 'contact', [
  list('phones', 'Phone numbers', [hidden('id'), str('label', 'Label'), str('number', 'Number')], {
    allow_add: false,
    summary: '{{fields.label}}: {{fields.number}}',
  }),
  str('phoneTag', 'Tag shown beside phone numbers'),
  txt('lead', 'Opening line'),
  list('offices', 'Offices', [hidden('id'), str('name', 'Name'), str('hint', 'Short description'), str('number', 'Number')], {
    allow_add: false,
    summary: '{{fields.name}}: {{fields.number}}',
  }),
  list('hoursRows', 'Opening hours', [str('day', 'Days'), str('time', 'Times')], { summary: '{{fields.day}}' }),
  str('replyPromise', 'Reply promise'),
  txt('directions', 'Directions'),
  str('mapsUrl', 'Google Maps link'),
  list('interests', 'Enquiry choices', [hidden('value'), str('label', 'Label')], {
    allow_add: false,
    summary: '{{fields.label}}',
  }),
  txt('consent', 'Consent wording'),
  str('officeHours', 'Office hours (short)'),
  str('tours', 'Tour times'),
  str('whatsappNumber', 'WhatsApp number', {
    required: false,
    hint: 'Digits only, with the country code, for example 2348030000000. Leave empty until the school supplies it.',
  }),
  list('social', 'Social media', [str('label', 'Name'), str('url', 'Link', { required: false, hint: 'Leave empty until the account exists.' })], {
    summary: '{{fields.label}}',
  }),
]);

const news = entry('news', 'News', 'news', [
  list(
    'items',
    'Stories',
    [
      str('slug', 'Web address name', { hint: 'Lower case with hyphens, for example science-fair-2026. Changing it changes the story’s link.' }),
      str('date', 'Date', {
        hint: 'Year-month-day, for example 2026-09-28.',
        pattern: ['^\\d{4}-\\d{2}-\\d{2}$', 'Use the form 2026-09-28'],
      }),
      { name: 'category', label: 'Category', widget: 'select', options: ['Events', 'Academics', 'Admissions'] },
      str('title', 'Title'),
      txt('summary', 'Short summary'),
      { name: 'photo', label: 'Photo', widget: 'select', options: PHOTO_OPTIONS, required: false },
      str('focus', 'Photo focus', { required: false, hint: 'Where to centre the crop, for example 50% 40%.' }),
      { name: 'featured', label: 'Show as the big featured story', widget: 'boolean', default: false, required: false },
      strList('body', 'Story text (one paragraph per item)'),
      obj('bodyHeading', 'Heading inside the story', [num('before', 'Place before paragraph number'), str('text', 'Heading')], { required: false }),
    ],
    { summary: '{{fields.title}}' },
  ),
]);

initCMS({
  config: {
    load_config_file: false,
    // Placeholder. Hosting and login are not decided yet. In local mode (npm run cms) this is ignored.
    backend: { name: 'github', repo: 'Rahmangaf/busarialao-college-website', branch: 'main' },
    local_backend: true,
    media_folder: 'public/uploads',
    public_folder: '/uploads',
    locale: 'en',
    collections: [
      group('pages', 'Pages', TAGS, [home, about, academics, admissions, boarding]),
      group('money', 'Fees, dates and results', TAGS, [fees, calendar, results]),
      group('site', 'School and contact', TAGS, [school, contact]),
      group('news', 'News', TAGS, [news]),
    ],
  },
});
