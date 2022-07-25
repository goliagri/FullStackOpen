import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const CurrentDisp = ({anecdotes, votes, selected}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    </>
  )
}

const MostPopularDisp = ({anecdotes, votes}) => {
  const argmax = votes.indexOf(Math.max(...votes))
  return (
  <div>
    <h1>Anecdote with the most votes</h1>
    <p>{anecdotes[argmax]}</p>
    <p>has {votes[argmax]} votes</p>
  </div>)
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
   
  const [selected, setSelected] = useState(0)

  const setToRandom = () => {
    const randIdx = Math.floor(Math.random()*anecdotes.length)
    setSelected(randIdx)
  }

  const makeVote = idx => () => {
    const votesCopy = [...votes]
    votesCopy[idx] += 1
    setVotes(votesCopy)
  }

  const randBtnText = 'next anecdote'

  const voteBtnText = 'vote'

  return (
    <> 
    <div>
      <CurrentDisp anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button onClick={makeVote(selected)} text={voteBtnText} />
      <Button onClick={setToRandom} text={randBtnText} /> 
    </div>
    <MostPopularDisp anecdotes={anecdotes} votes={votes} />
  </>

  )
}

export default App