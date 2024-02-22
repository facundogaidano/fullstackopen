import express from 'express'
import patientService from '../services/patientService'
import { getNonSensitivePatientsEntries } from '../types'

const router = express.Router()

router.get('/', (_req, res) => {
  const patients = patientService.getPatients()
  const nonSensitivePatients = patients.map(getNonSensitivePatientsEntries)
  res.json(nonSensitivePatients)
})

router.post('/', (_req, res) => {
  res.send('Saving a patient')
})

export default router