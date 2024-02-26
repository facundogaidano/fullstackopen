import express from 'express'
import patientService from '../services/patientService'
import { getNonSensitivePatientsEntries } from '../types'
import toNewPatientEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  const patients = patientService.getPatients()
  const nonSensitivePatients = patients.map(getNonSensitivePatientsEntries)
  res.json(nonSensitivePatients)
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedPatient = patientService.addPatient(newPatientEntry)
    res.json(addedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

router.get('/:id', (req, res) => {
  const patientId = req.params.id
  try {
    const patient = patientService.getPatientById(patientId)
    if (patient) {
      res.json(patient)
    } else {
      res.status(404).send('Patient not found')
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).send(errorMessage);
  }
})

export default router