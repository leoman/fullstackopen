import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

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

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient
};