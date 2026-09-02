import { Subject } from '../types';
import { SCIENCE_SUBJECTS } from './subjectsScience';
import { ARTS_SUBJECTS } from './subjectsArts';
import { COMMERCIAL_SUBJECTS } from './subjectsCommercial';
import { PRIMARY_SUBJECTS } from './subjectsPrimary';

// Comprehensive World Curriculum containing all Art, Science, Commercial, Languages & Primary Subjects
export const CURRICULUM_DATA: Subject[] = [
  ...SCIENCE_SUBJECTS,
  ...ARTS_SUBJECTS,
  ...COMMERCIAL_SUBJECTS,
  ...PRIMARY_SUBJECTS,
];

export { SCIENCE_SUBJECTS, ARTS_SUBJECTS, COMMERCIAL_SUBJECTS, PRIMARY_SUBJECTS };
