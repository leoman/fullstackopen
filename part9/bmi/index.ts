import express from 'express'
import calculateBmi from './bmiCalculator'
import calculateExercises, { Results as ExerciseResults } from './exerciseCalculator'

const app = express()
app.use(express.json())
const port = 3004

app.get('/hello', (_req, res) => res.send('Hello Full Stack!'))
app.get('/bmi', (req, res) => {
  // res.send('Hello Full Stack!'))

  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  const bmi = calculateBmi(weight, height)

  if(!height || !weight) {
    return res.send({error: "malformatted parameters"}).status(401)
  }
  return res.status(200).json({
    height,
    weight,
    bmi
  })
})

app.post('/exercise', (req, res) => {

  const dailyExercises: Array<string> = req.body.daily_exercises
  const target: number = req.body.target

  if(!dailyExercises || !target) {
    return res.send({ error: "parameters missing" }).status(401)
  }

  if (isNaN(Number(target)) || dailyExercises.filter(d => isNaN(Number(d))).length !== 0) {
    return res.send({ error: "malformatted parameters" }).status(401)
  }

  const convertedExercises =  dailyExercises.map(d => Number(d))

  const result: ExerciseResults = calculateExercises(convertedExercises, target)

  return res.status(200).json(result)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))