import patientData from '../../data/patientsData'
import { v1 as uuid } from 'uuid'

import { Patient, NewPatientEntry } from '../types'

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


export default {
  getPatients,
  addPatient,
  getPatientById
}