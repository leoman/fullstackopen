import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry [] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatientInfo = (id: string): Patient => {
  const patient: Patient | undefined = patientData.find(p => p.id === id);
  if(!patient) {
    throw new Error(`no patient found for id: ${id}`);
  }
  return {
    ...patient,
    entries: [],
  };
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
  getPatientInfo,
  getNonSensitivePatientEntries,
  addPatient
};