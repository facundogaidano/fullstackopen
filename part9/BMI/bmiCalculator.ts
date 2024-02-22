type bmiCalculatorRes = { weight: number, height: number, bmi: string}

export const bmiCalculator = (firstInput: number, secondInput: number): bmiCalculatorRes => {
  if (firstInput === 0) throw new Error('Height 0 is not allowed.')
  let bmiDesc = ''
  const bmi = (secondInput / (firstInput ** 2)) * 10000
  console.log(bmi)
  switch(true) {
    case bmi <  18.5:
      bmiDesc = 'Underweight'
      break;
    case bmi >=  30:
      bmiDesc = 'Obese'
      break;
    case bmi <  30 && bmi >=  25:
      bmiDesc = 'Overweight'
      break;
    case bmi >=  18.5 && bmi <  25:
      bmiDesc = 'Normal weight'
      break;
    default:
      bmiDesc = 'Not working'
  }

  return {
    weight: secondInput,
    height: firstInput,
    bmi: bmiDesc
  }

}