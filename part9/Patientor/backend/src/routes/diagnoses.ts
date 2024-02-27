import express from 'express';
import diagnosticsService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosticsService.getDiagnoses());
});

export default router;