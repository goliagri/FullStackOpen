import {useState} from 'react'


const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button> 

const ButtonDisplay = ({buttons}) => {
  return (
  <div>
    <Button clickHandler={buttons[0].clickHandler} text={buttons[0].text} />
    <Button clickHandler={buttons[1].clickHandler} text={buttons[1].text} />
    <Button clickHandler={buttons[2].clickHandler} text={buttons[2].text} />
  </div> )
}

const StatisticsLine = ({text, val}) => <><td>{text}</td><td>{val}</td></>

const StatDisplay = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  if (all==0){
    return (<div>No feedback given</div>)
  }
  const average = (good-bad)/all
  const posPercent = ((good/all)*100).toString() + ' %'
  return (
    <div>
      <table>
        <tbody>
          <tr><StatisticsLine text='good' val={good} /></tr>
          <tr><StatisticsLine text='neutral' val={neutral} /></tr>
          <tr><StatisticsLine text='bad' val={bad} /></tr>
          <tr><StatisticsLine text='all' val={all} /></tr>
          <tr><StatisticsLine text='average' val={average} /></tr>
          <tr><StatisticsLine text='positive' val={posPercent} /></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttons = [
    {
      clickHandler: () => setGood(good+1),
      text:'good'
    },
    {
      clickHandler: () => setNeutral(neutral+1),
      text:'neutral'
    },
    {
      clickHandler: () => setBad(bad+1),
      text:'bad'
    }
  ]
  return (
    <div> 
      <h1> give feedback </h1>
      <ButtonDisplay buttons={buttons} /> 
      <h1> Statistics </h1>
      <StatDisplay good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
