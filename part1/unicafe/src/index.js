import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stat = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td> 
        <td>{value} {(text === 'positive' && value > 0) ? '%' : ''}</td>
      </tr>
    </tbody>
  )
} 

const Statistics = (props) => {
  return (
    <div>
      {(props.all === 0)
        ? <p>No feedback given</p>
        :
        <div>
          <h2>statistics</h2>
          <table>
              <Stat text="good" value={props.good} />
              <Stat text="neutral" value={props.neutral} />
              <Stat text="bad" value={props.bad} />
              <Stat text="all" value={props.all} />
              <Stat text="average" value={(props.good - props.bad) / props.all} />
              <Stat text="positive" value={props.good / props.all * 100} />
          </table>
        </div>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}  />
      <Button text="bad" handleClick={() => setBad(bad + 1)}  />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)