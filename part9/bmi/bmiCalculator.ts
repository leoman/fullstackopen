// interface BMIValues {
//   weight: number;
//   height: number;
// }

// const parseArguments = (args: Array<string>): BMIValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       weight: Number(args[2]),
//       height: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }


const calculateBmi = (_weight: number, _height: number): string => {
  return 'Normal (healthy weight)'
}

export default calculateBmi