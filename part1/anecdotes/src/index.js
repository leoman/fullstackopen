import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  const addVote = () => {
    const selectedInt = props.anecdotes.indexOf(props.anecdotes[selected]);
    const newVotes = {
      ...votes,
      [selectedInt]: votes[selectedInt] + 1
    }
    setVotes(newVotes);
  }

  const nextAnecdote = () => {
    const randomInt = getRandomInt(anecdotes.length);
    setSelected(randomInt);
  }

  const heightestVotes = Object.entries(votes).reduce((prev, [key, value]) => {
    // console.log(prev);
    return (value > prev) ? value : prev;
  }, 0);

  const key = Object.entries(votes).reduce((prev, [key, value]) => {
    if (value === 0) return prev;
    return (value === heightestVotes) ? key : prev;
  }, 0);

  // console.log(key);

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <p><button onClick={addVote}>Vote</button></p>
      <p><button onClick={nextAnecdote}>Next anecdote</button></p>

      <h1>Anecdote with most votes</h1>

      <p>{props.anecdotes[key]}</p>
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)