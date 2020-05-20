import { NewPatientEntry, Gender } from './types';

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

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any): NewPatientEntry => {
  
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };
  
  return newEntry;
};

export default toNewPatientEntry;