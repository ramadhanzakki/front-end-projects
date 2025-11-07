import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ShowScore(props) {
  return (
    <div className="show-score">
      <h1>{props.currentScore}</h1>
    </div>
  )
}

function ActionButton(props) {
  return (
    <div className="btn">
      <button onClick={props.onCLickBtn}>{props.textBtn}</button>
    </div>
  )
}

function App() {
  const [scoreTeam1, setScore] = useState(0)
  const [scoreTeam2, setScoreTeam] = useState(0)

  function handleScore1() {
    setScore(scoreTeam1 + 1)
  }

  function handleScore2() {
    setScoreTeam(scoreTeam2 + 1)
  }

  function handleReset() {
    setScore(0)
    setScoreTeam(0)
  }

  return (
    <div className="container">
      <input type="text" placeholder='Set Tournament Name'/>
      <div className="score-board">
        <div className="team">
          <input type="text" placeholder='Your Team'/>
          <ShowScore currentScore={scoreTeam1} />
          <ActionButton onCLickBtn={handleScore1} textBtn="Tambah Score" />
        </div>
        <div className="team">
          <input type="text" placeholder='Your Team'/>
          <ShowScore currentScore={scoreTeam2} />
          <ActionButton onCLickBtn={handleScore2} textBtn="Tambah Score" />
        </div>
      </div>
      <div className="reset-container">
        <ActionButton onCLickBtn={handleReset} textBtn="Reset Score" />
      </div>
    </div>
  )
}

export default App
