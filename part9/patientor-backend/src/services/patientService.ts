import patientData from '../../data/patients';

import { Patient, NonSensitivePatientEntry } from '../types';

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry [] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addEntry
};