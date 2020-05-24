import { NewPatientEntry, Gender, BaseEntry, Entry, HealthCheckRating, Diagnoses } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    const name = (obj: any) => Object.keys(obj)[0];
    throw new Error(`Incorrect or missing ${name({param})}: ' ${param}`);
  }

  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};

const parseHealthCheckRating = (param: any): HealthCheckRating => {
  if(!Object.values(HealthCheckRating).includes(param)) {
    throw new Error('Incorrect or missing HealthCheckRating: ' + param);
  }
  return Number(param);
};

const parseDiagnosisCodes = (param: any): Array<Diagnoses['code']> => param.map((code: any) => parseString(code));

const parseEntry = (entry: any): Entry => {

  const setupDefaultFields = (entry: any): BaseEntry => {
    
    let intialEntry: BaseEntry = {
      id: entry.id,
     
      description: parseString(entry.description),
      specialist: parseString(entry.specialist),
      date: parseDate(entry.date)
    };

    if(entry.diagnosisCodes) {
      intialEntry = {
        ...intialEntry,
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
      };
    }

    return intialEntry;
  };

  const baseEntry: BaseEntry = setupDefaultFields(entry);

  switch (entry.type) {
    case "HealthCheck":
      const healthCheckEntry: Entry = {
        ...baseEntry,
        type: entry.type,
        specialist: parseString(entry.specialist),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
      return healthCheckEntry;
    case "OccupationalHealthcare":
      let occupationalHealthcareEnrty: Entry = {
        ...baseEntry,
        type: entry.type,
        employerName: parseString(entry.employerName),
      };

      if(entry.sickLeave) {
        occupationalHealthcareEnrty = {
          ...occupationalHealthcareEnrty,
          sickLeave: {
            startDate: parseDate(entry.sickLeave.startDate),
            endDate: parseDate(entry.sickLeave.endDate)
          }
        };
      }
      return occupationalHealthcareEnrty;
    case "Hospital":
      const hospitalEntry: Entry = {
        ...baseEntry,
        type: entry.type,
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseString(entry.discharge.criteria),
        }
      };
      return hospitalEntry;
    default:
      throw new Error('Unknown type: ' + entry.type);
  }
};

const parseEntries = (entries: any): Entry[] => {
  return entries.map((entry: any) => parseEntry(entry));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any): NewPatientEntry => {
  
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries)
  };
  
  return newEntry;
};

export default toNewPatientEntry;