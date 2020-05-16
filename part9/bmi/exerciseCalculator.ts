export interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseValues {
  target: number;
  exercises: Array<number>;
}

// const parseArgument = (args: Array<string>): ExerciseValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');

//   const [, , target, ...exercises] = args
//   const exercisesAsNumbers = exercises.map(d => Number(d))

//   if (!isNaN(Number(target))) {
//     return {
//       target: Number(target),
//       exercises: exercisesAsNumbers
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// } 

const calculateExercises = (exercises: Array<number>, target: number): Results => {

  const periodLength = exercises.length
  const trainingDays = exercises.filter(d => d > 0).length

  return { 
    periodLength: exercises.length,
    trainingDays,
    success: trainingDays >= target,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target,
    average: exercises.reduce((agg: number, next: number): number => agg + next, 0) / periodLength
  }
}

// try {
//   const { target, exercises } = parseArgument(process.argv);
//   const result = calculateExercises(exercises, target)
//   console.log(result)
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }

export default calculateExercises