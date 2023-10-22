import { useRef, useState } from 'react'
import './App.css'
import BreakAndSession from './BreakAndSession'
import Timer from './Timer'

const defaultTimer = {sessionLength: 25, breakLength: 5}

function App() {
  const [timer, setTimer] = useState(defaultTimer);
  const [time, setTime] = useState({minutes: 0, seconds: 0})


  function updateLength(event) {
    switch (event.target.id) {
      case "session-increment":
        timer.sessionLength < 60 && setTimer({...timer, sessionLength: timer.sessionLength + 1});
        break;
      case "session-decrement":
        timer.sessionLength > 0 && setTimer({...timer, sessionLength: timer.sessionLength - 1});
        break;
      case "break-increment":
        timer.breakLength < 60 && setTimer({...timer, breakLength: timer.breakLength + 1});
        break;
      case "break-decrement":
        timer.breakLength > 0 && setTimer({...timer, breakLength: timer.breakLength - 1});
        break;
      default:
        break;
    }
  }

  let intervalRef = useRef(0);
  let intervalId = null;

  function stopTimer(event) {
    if (event.target.id != "reset") {
      event.target.innerText = "Start";
    }
    intervalId = intervalRef.current;
    clearInterval(intervalId);
    intervalId = null;
  }

  function startTimer(event) {
    event.target.innerText = "Stop";
    intervalId = setInterval(() => {
      setTimer(prev => ({...prev, sessionLength: prev.sessionLength - 1}))
    }, 1000);
    intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
  }

  function resetTimer(event) {
    document.querySelector("#start-stop").innerText = "Start";
    setTimer(defaultTimer);
    stopTimer(event);
  }

  function handleTimer(event) {
    if (event.target.id === "reset") {
      resetTimer(event);
    } else {
      if (event.target.innerText === "Start") {
        startTimer(event);
      } else {stopTimer(event)};
    }
  }

// {!intervalStarted ? "Start" : "Stop"}
  return (
    <div id='pomodoro-clock'>
      <h1>Pomodoro Clock</h1>
      <BreakAndSession sessionLength={timer.sessionLength} breakLength={timer.breakLength} updateLength={updateLength}/>
      <Timer currentLength={timer.sessionLength} />
      <button id='start-stop' onClick={handleTimer}>Start</button>
      <button onClick={handleTimer} id='reset'>Reset</button>
    </div>
  )
}

export default App
