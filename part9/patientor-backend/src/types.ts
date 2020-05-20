export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
} 

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}