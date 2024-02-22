import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight) return res.status(400).send('Height and weight are required')

  const bmiResult = bmiCalculator(height, weight)
  return res.json({ bmiResult })
})

app.get('/exercises', (req, res) => {
  const daily_exercises = req.query.daily_exercises
  const target = Number(req.query.target)

  if (!daily_exercises || !target) return res.status(400).send('Daily exercises and target are required')

  let dailyExercisesArray: number[];
  if (typeof daily_exercises === 'string') {
    try {
      dailyExercisesArray = JSON.parse(daily_exercises);
    } catch (error) {
      return res.status(400).send('Invalid format for daily exercises');
    }
  } else {
    return res.status(400).send('Invalid format for daily exercises');
  }

  try {
    const result = exerciseCalculator(dailyExercisesArray, target);
    return res.json(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});