import patientData from '../../data/patientsData'
import { v1 as uuid } from 'uuid'

import { PatientEntry, NewPatientEntry } from '../types'

const patients: PatientEntry[] = patientData

const getPatients = (): PatientEntry[] => {
  return patients
}

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getPatients,
  addPatient
}