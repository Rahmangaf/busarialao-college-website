// The editable copy lives in src/content-data/home.json (edited through /admin or by hand).
// Tags ([DRAFT], [SAMPLE], [CONFIRM]) stay in the text until the school confirms the item.
//
// Words in curly brackets are filled in here: {foundedYear} from school.json, and {examDate},
// {examDateShort}, {applicationFee} and {session} from admissions.json.
import data from '../content-data/home.json';
import { fill } from './admissions';
import { samplePhotos, type PhotoId } from './sample-content-register';
import { school } from './school';

export type TagName = 'SAMPLE' | 'DRAFT' | 'CONFIRM';

/** "CONFIRM" becomes "[CONFIRM]", the literal text the launch guard looks for. An empty value gives no tag. */
export function tagText(tag: string | undefined): string | null {
  const name = (tag ?? '').trim().toUpperCase();
  if (!name) return null;
  if (name !== 'SAMPLE' && name !== 'DRAFT' && name !== 'CONFIRM') {
    throw new Error(`home.json: unknown tag "${tag}". Use SAMPLE, DRAFT or CONFIRM.`);
  }
  return `[${name}]`;
}

function photoId(id: string, where: string): PhotoId {
  if (!(id in samplePhotos)) throw new Error(`home.json: ${where} uses the photo "${id}", which is not in the sample-content register.`);
  return id as PhotoId;
}

const filled = fill(JSON.parse(JSON.stringify(data).replaceAll('{foundedYear}', String(school.foundedYear)))) as typeof data;

export interface HeroButton {
  label: string;
  href: string;
  style: 'primary' | 'secondary';
}

export interface HeroSlide {
  name: string;
  photo: PhotoId;
  focusDesktop: string;
  focusMobile: string;
  headline: string;
  text: string;
  tag: string | null;
  buttons: HeroButton[];
}

export const homePage = {
  hero: {
    label: filled.hero.label,
    autoplay: filled.hero.autoplay,
    slides: filled.hero.slides.map(
      (slide, index): HeroSlide => ({
        ...slide,
        photo: photoId(slide.photo, `hero slide ${index + 1}`),
        tag: tagText(slide.tag),
        buttons: slide.buttons as HeroButton[],
      }),
    ),
  },
  welcome: {
    ...filled.welcome,
    headingTag: tagText(filled.welcome.headingTag),
    textTag: tagText(filled.welcome.textTag),
  },
  numbersLinkLabel: filled.numbersLinkLabel,
  science: {
    ...filled.science,
    photo: photoId(filled.science.photo, 'the science section'),
    headingTag: tagText(filled.science.headingTag),
    labsTag: tagText(filled.science.labsTag),
  },
  dayBoarding: {
    ...filled.dayBoarding,
    items: filled.dayBoarding.items.map((item, index) => ({
      ...item,
      photo: photoId(item.photo, `day or boarding item ${index + 1}`),
    })),
  },
  proof: {
    ...filled.proof,
    headingTag: tagText(filled.proof.headingTag),
    items: filled.proof.items.map((item) => ({ ...item, tag: tagText(item.tag) })),
  },
  closing: {
    ...filled.closing,
    photo: photoId(filled.closing.photo, 'the closing section'),
  },
};

/**
 * Responsive sizes for the full-bleed hero photos. On a phone the 16:9 photo is cropped to the
 * 600px-tall hero, so it is drawn about 1067px wide; `sizes` says so, and the browser picks a
 * width that stays sharp. The same values build the preload link, so both fetch the same file.
 */
export const heroImage = {
  widths: [640, 960, 1280, 1600],
  sizes: '(max-width: 599px) 1067px, 100vw',
};
