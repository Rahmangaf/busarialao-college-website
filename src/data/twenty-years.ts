// The editable copy lives in src/content-data/twenty-years.json (edited through /admin or by hand).
// This page is linked from the footer and from Home hero slide 2 only, not from the main navigation.
//
// Names and faces of individuals are not published (content/00, content/10): no committee list and
// no directors list. Gallery photos are generated samples until the school supplies real, consented
// ones. A gallery slot with no photo is hidden, and the whole gallery is hidden if every slot is empty.
import data from '../content-data/twenty-years.json';
import { samplePhotos, type PhotoId } from './sample-content-register';
import { fillSchool } from './school';

const filled = fillSchool(data);

function photoId(id: string, where: string): PhotoId {
  if (!(id in samplePhotos)) throw new Error(`twenty-years.json: ${where} uses the photo "${id}", which is not in the sample-content register.`);
  return id as PhotoId;
}

export const twentyYears = {
  ...filled,
  foundation: { ...filled.foundation, photo: photoId(filled.foundation.photo, 'the Foundation section') },
  gallery: {
    ...filled.gallery,
    /** Only slots that have a photo. Empty slots are kept in the JSON for editors but never shown. */
    slots: filled.gallery.slots
      .filter((slot) => slot.photo.trim() !== '')
      .map((slot) => ({ ...slot, photo: photoId(slot.photo, `the gallery slot "${slot.name}"`) })),
  },
};
