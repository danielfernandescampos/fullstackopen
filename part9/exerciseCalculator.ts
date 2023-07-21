interface result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

const average = (numbers: Array<number>): number => {
    let total = 0;
    numbers.forEach(number => total = total + number);
    return total/numbers.length
}

const calculateExercises = (weeklyExercises: Array<number>, targetDailyExercises: number) => {
    if (process.argv.length < 4) {
        console.error('You need to provide the target average and the days exercised');
        return;
    }
    const personalAverage = average(weeklyExercises);
    const result: result = {
        periodLength: weeklyExercises.length,
        trainingDays: weeklyExercises.filter(day => day != 0).length,
        success: personalAverage >= targetDailyExercises,
        rating: 2,
        ratingDescription: 'string',
        target: targetDailyExercises,
        average: personalAverage
    };
    console.log(result)
};

const target: number = Number(process.argv[2]);
const exerciseDays: Array<number> = process.argv.slice(3).map(day => Number(day));

calculateExercises(exerciseDays, target);
