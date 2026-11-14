// The editable copy lives in src/content-data/about.json (edited through /admin or by hand).
// Tags ([DRAFT], [SAMPLE], [CONFIRM]) stay in the text until the school confirms the item.
import data from '../content-data/about.json';
import { fillSchool } from './school';

// {foundedYear}, {years} and {yearsInWords} in the JSON are filled in here from the stored founding year.
export const about = fillSchool(data);
