type bmiCalculatorRes = number | string

const bmiCalculator = (firstInput: number, secondInput: number): bmiCalculatorRes => {
  if (firstInput === 0) throw new Error('Height 0 is not allowed.')
  const bmi = (secondInput / (firstInput ** 2)) * 10000
  switch(true) {
    case bmi < 18.5:{
      return 'Underweight'
    }
    case bmi >= 30: {
      return 'Obese'
    }
    case bmi < 30 && bmi >= 25: {
      return 'Overweight'
    }
    case bmi >= 18.5 && bmi < 25: {
      return 'Normal weight'
    }
    default: {
      return 'Not working'
    }
  }

}

console.log(bmiCalculator(180, 50))