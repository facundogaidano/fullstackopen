export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>

export interface Patient extends Omit<PatientEntry, 'ssn'> {}

export const getNonSensitivePatientsEntries = (patient: PatientEntry): Patient => {
  const { ssn, ...rest } = patient;
  return rest;
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}