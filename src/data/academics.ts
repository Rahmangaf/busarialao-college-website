// The editable copy lives in src/content-data/academics.json (edited through /admin or by hand).
// Tags ([DRAFT], [SAMPLE], [CONFIRM]) stay in the text until the school confirms the item.
import data from '../content-data/academics.json';
import type { PhotoId } from './sample-content-register';

interface Lab {
  name: string;
  text: string;
  /** A photo id from the sample-content register, or null for no photo. */
  photo: PhotoId | null;
  focus: string;
}

export const academics = {
  ...data,
  labs: {
    ...data.labs,
    items: data.labs.items.map((lab) => ({ ...lab, photo: (lab.photo || null) as PhotoId | null })) as Lab[],
  },
};
