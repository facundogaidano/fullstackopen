import patientData from '../data/patientsData'

import { PatientEntry } from '../types'

const patients: PatientEntry[] = patientData

const getPatients = (): PatientEntry[] => {
  return patients
}

const addPatient = () => {
  return null
}

export default {
  getPatients,
  addPatient
}