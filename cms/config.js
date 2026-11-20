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
  'borehole',
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
  str('leadershipNote', 'Line under the Leadership heading'),
  obj('vision2035', 'Vision 2035', [
    str('heading', 'Heading'),
    txt('vision', 'Vision'),
    txt('mission', 'Mission'),
    str('prioritiesHeading', 'Priorities heading'),
    strList('priorities', 'Priorities'),
  ]),
  list('leadership', 'Leadership (roles and years only; names are not published)', [str('role', 'Role'), str('years', 'Years in post')], { summary: '{{fields.role}}: {{fields.years}}' }),
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

const twentyYears = entry('twentyYears', 'Celebrating 20 Years', 'twenty-years', [
  str('title', 'Page title'),
  txt('lead', 'Opening line', { hint: 'Leave {foundedYear} as it is; it is filled in from the founding year.' }),
  str('eventLine', 'Date line'),
  obj('week', 'Anniversary week', [str('heading', 'Heading'), strList('items', 'Highlights (one per item, no numbers)', { field: { name: 'item', label: 'Highlight', widget: 'string' } })]),
  obj('foundation', 'The Foundation (navy section)', [
    str('heading', 'Heading'),
    strList('paragraphs', 'Paragraphs'),
    str('note', 'Note'),
    photoSelect('photo'),
    focus('focus', 'Photo focus'),
  ]),
  obj('gallery', 'Gallery', [
    str('heading', 'Heading'),
    list(
      'slots',
      'Photo slots (a slot with no photo is hidden)',
      [
        str('name', 'Slot name (not shown on the page)'),
        { name: 'photo', label: 'Photo', widget: 'select', options: PHOTO_OPTIONS, required: false, default: '' },
        focus('focus', 'Photo focus'),
      ],
      { summary: '{{fields.name}}' },
    ),
  ]),
  obj('next', 'Looking ahead', [str('heading', 'Heading'), str('label', 'Button text'), str('href', 'Button address')]),
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
    txt('facilitiesNote', 'Other facilities (shown under the four labs)'),
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
  obj('cafeteria', 'School cafeteria', [str('heading', 'Heading'), txt('text', 'Text')]),
  obj('clubs', 'Clubs and societies', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
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
      num('candidates', 'Candidates', { required: false }),
      num('wassce', 'WASSCE general percentage passed (%)', { value_type: 'float', step: 0.01, required: false, hint: 'Leave empty if there is no figure. Never guess.' }),
      num('neco', 'NECO general percentage passed (%)', { value_type: 'float', step: 0.01, required: false, hint: 'Leave empty if there is no figure. Never guess.' }),
      str('necoNote', 'NECO note when there is no figure yet', { required: false, hint: 'For example Awaiting.' }),
      num('universityAdmission', 'University admission (%)', { value_type: 'float', step: 0.01, required: false }),
      str('universityAdmissionNote', 'Admission note when there is no figure yet', { required: false, hint: 'For example In view.' }),
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

// ---------------------------------------------------------------------------------------------
// v1 site shell (header, mobile menu, footer): used by the /preview/*-v1/ pages
// ---------------------------------------------------------------------------------------------

const linkFields = [str('label', 'Link text'), str('href', 'Link address')];
const linkList = (name, label) => list(name, label, linkFields, { summary: '{{fields.label}}' });
const siteShell = entry('site', 'Site header and footer (v1 pages)', 'site', [
  obj('home', 'Logo link', [str('href', 'Address'), str('label', 'Name for screen readers')]),
  linkList('nav', 'Navigation links'),
  obj('apply', 'Apply button', linkFields),
  obj('forms', 'Short forms (the Book a tour phone field)', [str('phoneError', 'Error when no phone number is entered'), str('previewNotice', 'Words shown when a number is entered (the form does not send yet)')]),
  obj('menu', 'Mobile menu', [str('open', 'Open button label'), str('close', 'Close button label'), str('title', 'Panel name')]),
  obj('footer', 'Footer', [
    txt('blurb', 'Short description', { hint: 'Leave {foundedYear} as it is; it is filled in from the founding year.' }),
    str('logoAlt', 'Logo description'),
    obj('school', 'School column', [str('heading', 'Heading'), linkList('links', 'Links')]),
    obj('admissions', 'Admissions column', [str('heading', 'Heading'), linkList('links', 'Links')]),
    obj('findUs', 'Find us column', [
      str('heading', 'Heading'),
      strList('address', 'Address (one line per item)', { field: { name: 'item', label: 'Line', widget: 'string' } }),
      str('directionsLabel', 'Directions link text'),
      str('directionsHref', 'Directions link address'),
    ]),
    str('hours', 'Opening badge'),
    obj('contact', 'Contact column', [
      str('heading', 'Heading'),
      str('phone', 'Phone'),
      str('phoneHref', 'Phone link'),
      str('email', 'Email'),
      str('emailHref', 'Email link'),
      str('whatsappLabel', 'WhatsApp link text'),
      str('whatsappHref', 'WhatsApp link address'),
      str('portalLabel', 'Student portal link text'),
      str('portalHref', 'Student portal link address'),
    ]),
    list('socials', 'Social links', [hidden('key'), str('label', 'Name'), str('href', 'Link address')], { allow_add: false, summary: '{{fields.label}}' }),
    obj('legal', 'Bottom row', [
      str('copyright', 'Copyright', { hint: 'Leave {year} as it is; it is filled in automatically.' }),
      str('privacyLabel', 'Privacy link text'),
      str('privacyHref', 'Privacy link address'),
      str('creditPrefix', 'Credit text'),
      str('creditLabel', 'Credit link text'),
      str('creditHref', 'Credit link address'),
      str('toTopLabel', 'Back to top text'),
    ]),
  ]),
]);

// ---------------------------------------------------------------------------------------------
// v1 preview pages (/preview/*-v1/). These pages carry no tags. Words in curly brackets, such as
// {examDate}, are filled in automatically: leave them exactly as they are.
// ---------------------------------------------------------------------------------------------

const V1_PHOTOS = [
  'awards-ceremony',
  'biology-lab',
  'biology-lab-microscopy',
  'borehole',
  'ceremony-hall',
  'chemistry-lab',
  'computer-lab',
  'courtyard',
  'dormitory',
  'dormitory-study',
  'exam-session',
  'football',
  'graduating-class',
  'graduation-group',
  'hero-chemistry-experiment',
  'students-walking',
];
const v1Photo = (name = 'photo', label = 'Photo') => ({ name, label, widget: 'select', options: V1_PHOTOS });
const v1Meta = obj('meta', 'Browser tab and search text', [str('title', 'Page title'), txt('description', 'Short description')]);
const v1Action = (name, label) => obj(name, label, linkFields);
const v1Visit = obj('visit', 'Come and see us band', [
  str('heading', 'Heading'),
  txt('text', 'Text'),
  v1Photo('photo', 'Background photo'),
  focus('focus', 'Photo focus'),
  focus('focusMobile', 'Photo focus on phones', 'Where to centre the crop on a phone, for example 62% 50%.'),
  obj('form', 'Phone field', [str('label', 'Field name for screen readers'), str('placeholder', 'Placeholder'), str('button', 'Button text')]),
  obj('whatsapp', 'WhatsApp link', linkFields),
]);

const admissionsV1 = entry('admissions-v1', 'Admissions', 'admissions-v1', [
  v1Meta,
  obj('hero', 'Page opening', [
    str('eyebrow', 'Small label'),
    txt('title', 'Title', { hint: 'A new line here is a line break on wide screens only.' }),
    txt('lead', 'Lead line'),
    v1Action('primary', 'Main button'),
    v1Action('secondary', 'Second button'),
  ]),
  obj('steps', 'Three steps', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list(
      'items',
      'Steps',
      [
        str('tag', 'Step label'),
        str('title', 'Title'),
        txt('text', 'Text'),
        { name: 'illustration', label: 'Illustration', widget: 'select', options: ['step-apply', 'step-exam', 'step-offer'] },
        str('alt', 'Illustration description'),
      ],
      { summary: '{{fields.title}}', allow_add: false },
    ),
  ]),
  obj('whoCanApply', 'Who can apply', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    txt('text', 'Text'),
    list('cards', 'Cards', [str('title', 'Title'), txt('text', 'Text'), v1Photo(), focus('focus', 'Photo focus'), str('alt', 'Photo description')], { summary: '{{fields.title}}' }),
  ]),
  obj('scholarships', 'Scholarships band', [str('eyebrow', 'Small label'), txt('heading', 'Heading'), str('linkLabel', 'Link text'), str('linkHref', 'Link address')]),
  obj('faq', 'Questions', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list('items', 'Questions', [str('q', 'Question'), txt('a', 'Answer'), { name: 'open', label: 'Open when the page loads', widget: 'boolean', default: false, required: false }], { summary: '{{fields.q}}' }),
  ]),
  v1Visit,
]);

const optionalV1Photo = { name: 'photo', label: 'Photo', widget: 'select', options: V1_PHOTOS, required: false };

const academicsV1 = entry('academics-v1', 'Academics', 'academics-v1', [
  v1Meta,
  obj('hero', 'Page opening', [
    obj('breadcrumb', 'Breadcrumb', [str('home', 'Home link text'), str('current', 'This page')]),
    str('eyebrow', 'Small label'),
    str('title', 'Title'),
    txt('lead', 'Lead line'),
    v1Action('primary', 'Main button'),
    v1Action('secondary', 'Second button'),
    v1Photo('photo', 'Photo under the title'),
    focus('focus', 'Photo focus'),
    focus('focusMobile', 'Photo focus on phones'),
    str('alt', 'Photo description'),
  ]),
  obj('curriculum', 'Curriculum', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    txt('text', 'Text'),
    list('stages', 'Two stages', [str('kicker', 'Years'), str('title', 'Title'), txt('text', 'Text'), str('pill', 'Exam label')], { allow_add: false, summary: '{{fields.title}}' }),
  ]),
  obj('labs', 'Laboratories', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list(
      'items',
      'Labs',
      [
        str('title', 'Title'),
        txt('text', 'Text'),
        str('tile', 'Text in a plain tile (leave empty if there is a photo)', { required: false }),
        optionalV1Photo,
        { ...focus('focus', 'Photo focus'), required: false },
        str('alt', 'Photo description', { required: false }),
      ],
      { summary: '{{fields.title}}' },
    ),
  ]),
  obj('beyond', 'Beyond the classroom (navy band)', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list('items', 'Cards', [str('title', 'Title'), txt('text', 'Text')], { summary: '{{fields.title}}' }),
    str('linkLabel', 'Link text'),
    str('linkHref', 'Link address'),
  ]),
  obj('vocational', 'Vocational training', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    str('text', 'Text'),
    strList('items', 'Skills (one per item)', { field: { name: 'item', label: 'Skill', widget: 'string' } }),
  ]),
]);

const v1PhotoPick = (name, label) => obj(name, label, [v1Photo('photo', 'Photo'), focus('focus', 'Photo focus')]);
const v1Stat = (name, label) => obj(name, label, [str('title', 'Title'), str('value', 'Number'), str('note', 'Note')]);

const aboutV1 = entry('about-v1', 'About', 'about-v1', [
  v1Meta,
  obj('hero', 'Page opening', [
    obj('breadcrumb', 'Breadcrumb', [str('home', 'Home link text'), str('current', 'This page')]),
    str('eyebrow', 'Small label'),
    str('title', 'Title', { hint: 'Leave {yearsInWords} as it is; it is filled in from the founding year.' }),
    txt('lead', 'Lead line'),
    v1Photo('photo', 'Photo under the title'),
    focus('focus', 'Photo focus'),
    focus('focusMobile', 'Photo focus on phones'),
    str('alt', 'Photo description'),
  ]),
  obj('story', 'Our story', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    txt('text', 'Text'),
    list('facts', 'Three facts', [str('value', 'Number or year'), str('label', 'Label')], { allow_add: false, summary: '{{fields.value}} {{fields.label}}' }),
  ]),
  obj('visionMission', 'Vision and mission', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list(
      'items',
      'Vision and mission',
      [
        str('title', 'Title'),
        txt('text', 'Text (leave empty until the school supplies it)', { required: false }),
        str('placeholder', 'Words shown while the text is empty'),
      ],
      { allow_add: false, summary: '{{fields.title}}' },
    ),
  ]),
  obj('values', 'Core values', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    str('text', 'Text'),
    strList('items', 'Values (one per item, in order)', { field: { name: 'item', label: 'Value', widget: 'string' } }),
  ]),
  obj('principal', "Principal's welcome", [
    str('portraitLabel', 'Portrait description for screen readers'),
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    strList('paragraphs', 'Paragraphs'),
    str('signoff', 'Sign-off'),
  ]),
  obj('milestones', 'Milestones', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list('items', 'Milestones', [str('year', 'Year'), str('text', 'What happened')], { summary: '{{fields.year}} {{fields.text}}' }),
    str('linkLabel', 'Link text'),
    str('linkHref', 'Link address'),
  ]),
  obj('record', 'Our record (navy band)', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    v1PhotoPick('examPhoto', 'Photo, top left (shown in grey)'),
    v1Stat('wassce', 'WASSCE tile'),
    v1Stat('university', 'University tile'),
    str('logoAlt', 'Logo description'),
    v1PhotoPick('labPhoto', 'Photo, middle right'),
    v1PhotoPick('walkingPhoto', 'Photo, bottom left'),
    str('quote', 'Quote'),
    v1Stat('years', 'Years tile'),
  ]),
  v1Visit,
]);

const v1Faq = obj('faq', 'Questions', [
  str('eyebrow', 'Small label'),
  str('heading', 'Heading'),
  list('items', 'Questions', [str('q', 'Question'), txt('a', 'Answer'), { name: 'open', label: 'Open when the page loads', widget: 'boolean', default: false, required: false }], { summary: '{{fields.q}}' }),
]);
const v1Crumb = obj('breadcrumb', 'Breadcrumb', [str('home', 'Home link text'), str('current', 'This page')]);

const boardingV1 = entry('boarding-v1', 'Boarding & Life', 'boarding-v1', [
  v1Meta,
  obj('hero', 'Page opening', [
    v1Crumb,
    str('eyebrow', 'Small label'),
    str('title', 'Title'),
    txt('lead', 'Lead line'),
    v1Action('primary', 'Main button'),
    v1Action('secondary', 'Second button'),
    v1Photo('photo', 'Photo under the title'),
    focus('focus', 'Photo focus'),
    focus('focusMobile', 'Photo focus on phones'),
    str('alt', 'Photo description'),
  ]),
  obj('ways', 'Day school or boarding', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list(
      'cards',
      'Cards',
      [
        str('title', 'Title'),
        txt('text', 'Text'),
        v1Photo(),
        focus('focus', 'Photo focus'),
        str('alt', 'Photo description'),
        list('rows', 'Rows', [str('label', 'Label'), str('value', 'Value')], { summary: '{{fields.label}}' }),
      ],
      { allow_add: false, summary: '{{fields.title}}' },
    ),
  ]),
  obj('hostel', 'The hostel', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    txt('text', 'One short line'),
  ]),
  obj('routine', 'Daily routine', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    strList('steps', 'Steps of the day (in order)', { field: { name: 'item', label: 'Step', widget: 'string' } }),
    str('note', 'Note under the timeline'),
    obj('bring', 'What to bring', [
      str('title', 'Title'),
      strList('items', 'Items', { field: { name: 'item', label: 'Item', widget: 'string' } }),
      str('note', 'Note'),
    ]),
    obj('care', 'Visiting and care', [str('title', 'Title'), txt('text', 'Text')]),
  ]),
  obj('life', 'Student life (navy band)', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    v1Photo('photo', 'Photo'),
    focus('focus', 'Photo focus'),
    str('alt', 'Photo description'),
    list(
      'cards',
      'Cards',
      [
        str('title', 'Title'),
        strList('items', 'List (leave empty to show the text instead)', { field: { name: 'item', label: 'Item', widget: 'string' }, required: false }),
        txt('text', 'Text (used when the list is empty)', { required: false }),
      ],
      { summary: '{{fields.title}}' },
    ),
  ]),
  obj('gallery', 'Gallery', [
    { name: 'enabled', label: 'Show the gallery on the page', widget: 'boolean', default: false, hint: 'Keep this off until real photos exist.' },
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    list(
      'items',
      'Gallery items',
      [
        str('caption', 'Caption'),
        optionalV1Photo,
        { ...focus('focus', 'Photo focus'), required: false },
        str('alt', 'Photo description', { required: false }),
      ],
      { summary: '{{fields.caption}}' },
    ),
  ]),
  v1Faq,
  v1Visit,
]);

// The Contact page takes its phone, email, address, hours, directions and social links from the
// "Site header and footer" entry, so they are edited once. Its WhatsApp link comes from there too.
const contactV1 = entry('contact-v1', 'Contact', 'contact-v1', [
  v1Meta,
  obj('hero', 'Page opening', [
    v1Crumb,
    str('eyebrow', 'Small label'),
    str('title', 'Title'),
    txt('lead', 'Lead line'),
    v1Action('primary', 'Main button'),
    str('secondaryLabel', 'Second button text (links to WhatsApp)'),
  ]),
  obj('ways', 'Ways to reach us', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    str('callTitle', 'Call card title'),
    str('emailTitle', 'Email card title'),
    str('whatsappTitle', 'WhatsApp card title'),
    str('whatsappText', 'WhatsApp card text'),
    str('visitTitle', 'Visit card title'),
  ]),
  obj('find', 'Find us', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    str('name', 'Name above the address'),
    str('mapLabel', 'Map panel title'),
    str('mapNote', 'Map panel note'),
    str('directionsLabel', 'Directions button text'),
  ]),
  obj('form', 'Message form (a preview: it does not send anything yet)', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    txt('text', 'Text'),
    obj('name', 'Name field', [str('label', 'Label'), str('placeholder', 'Placeholder')]),
    obj('phone', 'Phone field', [str('label', 'Label'), str('placeholder', 'Placeholder'), str('error', 'Error message')]),
    obj('email', 'Email field', [str('label', 'Label'), str('optional', 'Word shown next to the label'), str('placeholder', 'Placeholder'), str('error', 'Error message')]),
    obj('interest', 'Topic list', [
      str('label', 'Label'),
      strList('options', 'Options', { field: { name: 'item', label: 'Option', widget: 'string' } }),
    ]),
    obj('message', 'Message field', [str('label', 'Label'), str('placeholder', 'Placeholder')]),
    str('button', 'Button text'),
    str('previewNotice', 'Words shown when the form is filled in correctly'),
  ]),
  obj('follow', 'Follow us (navy band)', [str('eyebrow', 'Small label'), str('heading', 'Heading')]),
  obj('visit', 'Come and see us band', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    v1Photo('photo', 'Background photo'),
    focus('focus', 'Photo focus'),
    focus('focusMobile', 'Photo focus on phones', 'Where to centre the crop on a phone, for example 62% 50%.'),
    obj('form', 'Phone field', [str('label', 'Field name for screen readers'), str('placeholder', 'Placeholder'), str('button', 'Button text')]),
    obj('whatsapp', 'WhatsApp link', [str('label', 'Link text')]),
  ]),
]);

const newsV1 = entry('news-v1', 'News & Calendar', 'news-v1', [
  v1Meta,
  obj('hero', 'Page opening', [v1Crumb, str('eyebrow', 'Small label'), str('title', 'Title'), txt('lead', 'Lead line')]),
  obj('feature', 'Featured story (the 20 years card)', [
    str('href', 'Link address'),
    str('eyebrow', 'Small label', { hint: 'Leave {years} as it is; it is filled in from the founding year.' }),
    str('heading', 'Heading'),
    txt('text', 'Text', { hint: 'Leave {yearsInWords} as it is; it is filled in from the founding year.' }),
    str('linkLabel', 'Link text'),
    v1Photo('photo', 'Photo'),
    focus('focus', 'Photo focus'),
    str('alt', 'Photo description'),
  ]),
  obj('latest', 'Latest news', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    str('filterLabel', 'Filter group name for screen readers'),
    str('allLabel', 'Text of the "all" filter'),
    strList('categories', 'Categories (the filters, in order)', {
      field: { name: 'item', label: 'Category', widget: 'string' },
      hint: 'Filters show only when there are six or more posts. Posts pick one of these.',
    }),
    str('emptyCard', 'Text of the dashed card', { hint: 'The dashed card disappears once the posts fill a row.' }),
  ]),
  obj('calendar', 'Key dates', [
    str('eyebrow', 'Small label'),
    str('heading', 'Heading'),
    str('caption', 'Table name for screen readers'),
    list(
      'rows',
      'Dates',
      [
        str('label', 'Event'),
        str('value', 'Date', { hint: 'Leave {examDate} as it is; it is filled in from the admissions entry.' }),
        { name: 'confirmed', label: 'Date is confirmed (shown in bold)', widget: 'boolean', default: false, required: false },
      ],
      { summary: '{{fields.label}}' },
    ),
    str('note', 'Note under the table'),
  ]),
  obj('follow', 'Stay in touch (navy band)', [str('eyebrow', 'Small label'), str('heading', 'Heading')]),
  obj('visit', 'Come and see us band', [
    str('heading', 'Heading'),
    txt('text', 'Text'),
    v1Photo('photo', 'Background photo'),
    focus('focus', 'Photo focus'),
    focus('focusMobile', 'Photo focus on phones', 'Where to centre the crop on a phone, for example 62% 50%.'),
    obj('form', 'Phone field', [str('label', 'Field name for screen readers'), str('placeholder', 'Placeholder'), str('button', 'Button text')]),
    obj('whatsapp', 'WhatsApp link', [str('label', 'Link text')]),
  ]),
]);

// One JSON file per news post, in src/content-data/news-v1/. Add a post here and it appears on the page.
const newsV1Posts = {
  name: 'news-v1-posts',
  label: 'News posts (v1)',
  label_singular: 'News post',
  description: 'The stories on /preview/news-v1/. Filters appear from six posts; the dashed card disappears once a row is full.',
  folder: 'src/content-data/news-v1',
  extension: 'json',
  format: 'json',
  create: true,
  slug: '{{slug}}',
  identifier_field: 'title',
  summary: '{{order}}. {{title}}',
  sortable_fields: ['order', 'title'],
  editor: { preview: false },
  fields: [
    str('title', 'Title'),
    str('label', 'Small line above the title', { hint: 'For example May 2025 or Class of 2025.' }),
    { name: 'category', label: 'Category', widget: 'select', options: ['News', 'Results', 'Events'], hint: 'Must be one of the categories on the News page entry.' },
    num('order', 'Order on the page', { hint: '1 is first.' }),
    v1Photo('photo', 'Photo'),
    { ...focus('focus', 'Photo focus'), required: false },
    str('alt', 'Photo description', { required: false }),
    str('href', 'Link address (leave empty if the story has no page)', { required: false }),
  ],
};

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
      group('pages', 'Pages', TAGS, [home, twentyYears, about, academics, admissions, boarding]),
      group('money', 'Fees, dates and results', TAGS, [fees, calendar, results]),
      group('site', 'School and contact', TAGS, [school, contact, siteShell]),
      group('v1', 'Preview pages (v1)', 'Pages at /preview/*-v1/. No labels on these pages.', [admissionsV1, academicsV1, aboutV1, boardingV1, contactV1, newsV1]),
      newsV1Posts,
      group('news', 'News', TAGS, [news]),
    ],
  },
});
