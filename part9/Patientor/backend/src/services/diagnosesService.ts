import diagnosesData from '../../data/diagnosesData'

import { Diagnosis } from '../types'

const diagnoses: Diagnosis[] = diagnosesData

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