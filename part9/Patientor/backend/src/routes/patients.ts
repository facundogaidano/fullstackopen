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

router.post('/:id/entries', async (req, res) => {
  const patientId = req.params.id
  const entry = req.body

  try {
    const updatedPatient = await patientService.addEntryToPatient(patientId, entry);
    res.json(updatedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
})

export default router