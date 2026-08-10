import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = good / all

  return (
    <>
      <h1>statistics</h1>
        {all == 0 ? 'No feedback given' :
        <table>
          <tbody>
            <tr><StatisticLine text="good" value={good} /></tr>
            <tr><StatisticLine text="neutral" value={neutral} /></tr>
            <tr><StatisticLine text= "bad" value={bad} /></tr>
            <tr><StatisticLine text="all" value={all} /></tr>
            <tr><StatisticLine text="average" value={average} /></tr>
            <tr><StatisticLine text="positive" value={positive} /></tr>
          </tbody>
        </table>
          }
    </>
  )
}




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClick = (review) => () => {
    if (review == 'good') {
      setGood(good + 1)
    }
    if (review == 'neutral') {
      setNeutral(neutral + 1)
    }
    if (review == 'bad') {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick('good')} text='good'/>
      <Button onClick={handleClick('neutral')} text='neutral'/>
      <Button onClick={handleClick('bad')} text='bad'/>
  
      <Statistics 
      good={good} 
      bad={bad} 
      neutral={neutral} />
    </div>
  )
}

export default App