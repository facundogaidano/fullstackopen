import diagnosesData from '../../data/diagnosesData'

import { DiagnoseEntry } from '../types'

const diagnoses: DiagnoseEntry[] = diagnosesData

const getDiagnoses = () => {
  return diagnoses
}

const addDiagnose = () => {
  return null
}

export default {
  getDiagnoses,
  addDiagnose
}