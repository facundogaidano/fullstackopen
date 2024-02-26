import patientData from '../../data/patientsData'
import { v1 as uuid } from 'uuid'

import { Patient, NewPatientEntry, Entry } from '../types'

const patients: Patient[] = patientData.map(patient => ({
  ...patient,
  gender: patient.gender,
}))

const getPatients = (): Patient[] => {
  return patients
}

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

const getPatientById = (id: string): Patient | null => {
  const patients = getPatients(); // Assuming getPatients is a method that returns all patients
  return patients.find(patient => patient.id === id) || null;
};

const addEntryToPatient = (patientId: string, entry: Entry): Promise<Patient | null> => {
  const patientIndex = patients.findIndex(patient => patient.id === patientId);
  if (patientIndex === -1) {
    return Promise.resolve(null);
  }
  if (!entry.type) {
    throw new Error('Tipo de entrada no especificado');
  }

  const updatedPatient = {

    ...patients[patientIndex],
    entries: [...patients[patientIndex].entries, entry],
  };

  patients[patientIndex] = updatedPatient;
  return Promise.resolve(updatedPatient);
};



export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntryToPatient
}