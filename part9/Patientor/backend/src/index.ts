import express from 'express';
import diagnoseRouter from './routes/diagnoses'
import patientRouter from './routes/patients'
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}))

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});