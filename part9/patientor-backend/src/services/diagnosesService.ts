import diagnosesData from '../../data/diagnoses';

import { Diagnoses } from '../types';

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnosesData;
};

export default {
  getDiagnoses,
};