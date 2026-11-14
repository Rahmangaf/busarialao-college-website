// Sample-content register.
//
// Every photograph on the site is currently a generated sample (see content/08-open-questions.md).
// This file is the single list of those images: where each one comes from, its alt text, and every
// place it is (or will be) used. Replace each with a real, consented photograph before launch.
//
// - Originals live in assets/generated-photos and are never edited.
// - Web masters are produced by `npm run images` into src/assets/photos.
// - Placements follow the approved design; `built: false` means the page is not built yet.
import type { ImageMetadata } from 'astro';
import biologyLab from '../assets/photos/biology-lab.webp';
import chemistryLab from '../assets/photos/chemistry-lab.webp';
import computerLab from '../assets/photos/computer-lab.webp';
import ceremonyHall from '../assets/photos/ceremony-hall.webp';
import courtyard from '../assets/photos/courtyard.webp';
import dormitory from '../assets/photos/dormitory.webp';
import dormitoryStudy from '../assets/photos/dormitory-study.webp';
import examSession from '../assets/photos/exam-session.webp';
import football from '../assets/photos/football.webp';
import graduationGroup from '../assets/photos/graduation-group.webp';
import principalPortrait from '../assets/photos/principal-portrait.webp';
import studentsWalking from '../assets/photos/students-walking.webp';

export interface Placement {
  page: string;
  spot: string;
  built: boolean;
}

export interface SamplePhoto {
  /** Original file in assets/generated-photos. */
  source: string;
  image: ImageMetadata;
  alt: string;
  placements: Placement[];
}

export const samplePhotos = {
  'chemistry-lab': {
    source: 'Collaborative Chemistry Lab Experiment.png',
    image: chemistryLab,
    alt: 'Students in white lab coats running a titration in the chemistry laboratory',
    placements: [
      { page: 'Home', spot: 'Hero carousel: slide 1', built: true },
      { page: 'Academics', spot: 'Laboratories: Chemistry card', built: true },
    ],
  },
  'students-walking': {
    source: 'Students Walking Together on Campus.png',
    image: studentsWalking,
    alt: 'Day students in uniform walking together across campus',
    placements: [{ page: 'Home', spot: 'Day or boarding: Day school', built: true }],
  },
  dormitory: {
    source: 'Gemini-generated dormitory image (blue bunk beds, cream walls).jfif',
    image: dormitory,
    alt: 'Boarding dormitory with blue bunk beds and lockers',
    placements: [
      { page: 'Boarding & Student Life', spot: 'Hero', built: true },
    ],
  },
  courtyard: {
    source: 'Bright School Courtyard Under Blue Skies.png',
    image: courtyard,
    alt: 'School courtyard with blue-roofed classroom blocks under a clear sky',
    placements: [
      { page: 'Home', spot: 'Closing section (full-width underlay)', built: true },
      { page: 'About', spot: 'Hero', built: true },
    ],
  },
  'principal-portrait': {
    source: 'Professional Portrait in an Office.png',
    image: principalPortrait,
    alt: 'Placeholder portrait of the Principal in an office',
    placements: [{ page: 'About', spot: "Principal's welcome", built: true }],
  },
  'biology-lab': {
    source: 'Hands-On Biology Lab Lesson.png',
    image: biologyLab,
    alt: 'Biology teacher guiding students in white lab coats at a microscope',
    placements: [
      { page: 'Home', spot: 'Science section', built: true },
      { page: 'Academics', spot: 'Hero', built: true },
      { page: 'News', spot: 'Featured story: Science Fair 2026', built: true },
      { page: 'News article: Science Fair 2026', spot: 'Hero', built: true },
      { page: 'News article: other stories', spot: 'More news card', built: true },
    ],
  },
  'computer-lab': {
    source: 'Collaborative Learning in the Computer Lab.png',
    image: computerLab,
    alt: 'Teacher helping students at computers in the ICT lab',
    placements: [{ page: 'Academics', spot: 'Laboratories: ICT card', built: true }],
  },
  football: {
    source: 'Schoolyard Soccer Showdown.png',
    image: football,
    alt: 'Students in blue and white kit playing football on the school field',
    placements: [{ page: 'Boarding & Student Life', spot: 'Sports and fitness', built: true }],
  },
  'exam-session': {
    source: 'Focused Classroom Exam Session.png',
    image: examSession,
    alt: 'Students in uniform sitting a written exam in a bright classroom while an invigilator watches',
    placements: [
      { page: 'Home', spot: 'Hero carousel: slide 3', built: true },
      { page: 'Admissions', spot: 'Hero', built: true },
      { page: 'News', spot: 'Card: Scholarship Entrance Exam Open', built: true },
      { page: 'News article: Scholarship Entrance Exam Open', spot: 'Hero', built: true },
      { page: 'News article: other stories', spot: 'More news card', built: true },
    ],
  },
  'graduation-group': {
    source: 'Joyful Blue Graduation Group Photo.png',
    image: graduationGroup,
    alt: 'Smiling graduates in matching blue robes and graduation caps standing together on the steps of a school building',
    placements: [{ page: 'Home', spot: 'Hero carousel: slide 2 (20th anniversary)', built: true }],
  },
  'dormitory-study': {
    source: 'Studying Together in a Bright Dormitory.png',
    image: dormitoryStudy,
    alt: 'Two boarders in school uniform reading a book together on a bunk bed in a bright dormitory',
    placements: [{ page: 'Home', spot: 'Day or boarding: Boarding', built: true }],
  },
  'ceremony-hall': {
    source: 'Formal Ceremony with Blue Drapery and Audience.png',
    image: ceremonyHall,
    alt: 'Guests and graduates in blue attire seated in a large hall decorated with blue drapes and white flowers',
    placements: [{ page: '20 Years (Coming soon today; full page later)', spot: 'Ceremony image, not placed yet', built: false }],
  },
} satisfies Record<string, SamplePhoto>;

export type PhotoId = keyof typeof samplePhotos;
