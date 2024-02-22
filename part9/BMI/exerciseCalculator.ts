import { exit } from 'process'

interface exerciseCalculatorRes {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;

}

const exerciseCalculator = (days: Array<number>, target: number): exerciseCalculatorRes => {
  const trainingDays = days.filter(num => num !==   0).length
  const sumOfTrainingHours = days.reduce((sum, num) => sum + num, 0)
  let ratingValue = 0
  let ratingString = ''
  let average = 0

  if(sumOfTrainingHours === 0) throw new Error('No not training allowed')
  else average = (sumOfTrainingHours / 7)

  if(target - average <= 0) {
    ratingString = 'Well done!'
    ratingValue = 3
  } else if(target - average > 0 && target - average <= 1) {
    ratingValue = 2
    ratingString = 'Not too bad but could be better'
  } else {
    ratingValue = 1
    ratingString = 'Not a productive week'
  }
  return {
    periodLength: days.length,
    trainingDays,
    success: false,
    rating: ratingValue,
    ratingDescription: ratingString,
    target,
    average
  }
}

if (process.argv.length <  4) {
  console.error('Por favor, proporciona los días de entrenamiento y el objetivo como argumentos de línea de comandos.');
  exit(1);
}

const days = process.argv.slice(2,  9).map(Number)
const target = Number(process.argv[9])

const result = exerciseCalculator(days, target)

console.log(result)
