import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  
  if (total <= 0) return null;

    return (
    <>
      <h1>Statistics</h1>

      <tabel>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tabel>
    </>
  );
}

const Button = ({ text, onClickButton }) => {
  return (
    <button onClick={onClickButton}>{text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const average = (good + bad * (-1)) / total;
  const positive = (good / total) * 100;

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>

      <h1>Give feedback</h1>

      <div>
        <Button text="good" onClickButton={handleGood} />
        <Button text="neutral" onClickButton={handleNeutral} />
        <Button text="bad" onClickButton={handleBad} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)