const calculateBmi = (height: number, weight: number) => {
    const bmi = Math.round(weight/(height*height) * 100) / 100
    let value = ''
    if(bmi <= 18.5) value = 'Underweight'
    if(bmi > 18.5 && bmi <= 24.9) value = 'Normal weight'
    if(bmi > 25 && bmi <= 29.9) value = 'Overweight'
    if(bmi > 30) value = 'Obesity'
    console.log(`${value}, bmi: ${bmi}`)
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
calculateBmi(height, weight);
