// Photos and illustrations for the v1 preview pages, by key. A page's JSON names a photo with one of
// these keys (the admin shows the same list), so the files stay in the repo, optimised by Astro.
// All photos are WebP and self-hosted. Real photos replace these later without touching the pages.
import type { ImageMetadata } from 'astro';
import awardsCeremony from '../assets/preview-home-v3/awards-ceremony.webp';
import biologyLab from '../assets/preview-home-v3/biology-lab.webp';
import biologyMicroscopy from '../assets/preview-home-v3/biology-lab-microscopy.webp';
import chemistryLab from '../assets/preview-home-v3/chemistry-lab.webp';
import courtyard from '../assets/preview-home-v3/courtyard.webp';
import dormitoryStudy from '../assets/preview-home-v3/dormitory-study.webp';
import examSession from '../assets/preview-home-v3/exam-session.webp';
import graduatingClass from '../assets/preview-home-v3/graduating-class.webp';
import heroChemistry from '../assets/preview-home-v3/hero-chemistry-experiment.webp';
import studentsWalking from '../assets/preview-home-v3/students-walking.webp';
import borehole from '../assets/photos/borehole.webp';
import ceremonyHall from '../assets/photos/ceremony-hall.webp';
import computerLab from '../assets/photos/computer-lab.webp';
import dormitory from '../assets/photos/dormitory.webp';
import football from '../assets/photos/football.webp';
import graduationGroup from '../assets/photos/graduation-group.webp';
import stepApply from '../assets/preview-home-v3/step-1-apply.svg';
import stepExam from '../assets/preview-home-v3/step-2-exam.svg';
import stepOffer from '../assets/preview-home-v3/step-3-offer.svg';

export const v1Photos: Record<string, ImageMetadata> = {
  'awards-ceremony': awardsCeremony,
  'biology-lab': biologyLab,
  'biology-lab-microscopy': biologyMicroscopy,
  borehole,
  'ceremony-hall': ceremonyHall,
  'chemistry-lab': chemistryLab,
  'computer-lab': computerLab,
  courtyard,
  dormitory,
  'dormitory-study': dormitoryStudy,
  'exam-session': examSession,
  football,
  'graduating-class': graduatingClass,
  'graduation-group': graduationGroup,
  'hero-chemistry-experiment': heroChemistry,
  'students-walking': studentsWalking,
};

export const v1Illustrations: Record<string, ImageMetadata> = {
  'step-apply': stepApply,
  'step-exam': stepExam,
  'step-offer': stepOffer,
};

export const v1PhotoKeys = Object.keys(v1Photos);
export const v1IllustrationKeys = Object.keys(v1Illustrations);

export function photo(key: string): ImageMetadata {
  const found = v1Photos[key];
  if (!found) throw new Error(`Unknown v1 photo "${key}". Use one of: ${v1PhotoKeys.join(', ')}`);
  return found;
}
export function illustration(key: string): ImageMetadata {
  const found = v1Illustrations[key];
  if (!found) throw new Error(`Unknown v1 illustration "${key}". Use one of: ${v1IllustrationKeys.join(', ')}`);
  return found;
}
