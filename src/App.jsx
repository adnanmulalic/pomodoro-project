import { useEffect, useRef, useState } from 'react'
import './App.css'
import BreakAndSession from './BreakAndSession'
import Timer from './Timer'

const defaultTimerLength = {sessionLength: 5, breakLength: 5, isTimerRunning: false};
const defaultTimer = {sessionMinutes: 0, sessionSeconds: 300, isSessionRunning: false, breakMinutes: 0, breakSeconds: 0,
isBreakRunning: false, sessionStarted: false, breakStarted: false};
const breakTimer = {}

function App() {
  const [timerLength, setTimerLength] = useState(defaultTimerLength);
  const [timer, setTimer] = useState(defaultTimer)


  function updateLength(event) {
    if (!timer.sessionStarted) {
      switch (event.target.id) {
        case "session-increment":
          timerLength.sessionLength < 60 && setTimerLength({...timerLength, sessionLength: timerLength.sessionLength + 1});
          break;
        case "session-decrement":
          timerLength.sessionLength > 1 && setTimerLength({...timerLength, sessionLength: timerLength.sessionLength - 1});
          break;
        case "break-increment":
          timerLength.breakLength < 60 && setTimerLength({...timerLength, breakLength: timerLength.breakLength + 1});
          break;
        case "break-decrement":
          timerLength.breakLength > 1 && setTimerLength({...timerLength, breakLength: timerLength.breakLength - 1});
          break;
        default:
          break;
    }
    }
  }

  let intervalRef = useRef(0);
  let intervalId = null;

// useEffect(() => {
//   setTimer({...timer, sessionSeconds: timerLength.sessionLength * 60});
// }, []);

  function stopTimer(event) {
    if (event.target.id != "reset") {
      event.target.innerText = "Start";
    }
    setTimer(prev => ({...prev, isSessionRunning: false}));
    intervalId = intervalRef.current;
    clearInterval(intervalId);
    intervalId = null;
  }

  function startTimer(event) {
    event.target.innerText = "Stop";
    if (!timer.sessionStarted) {
      setTimer({...timer, sessionSeconds: timerLength.sessionLength * 60, isSessionRunning: true, sessionStarted: true});
    }

    intervalId = setInterval(() => { // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
      timer.sessionSeconds > 0 && setTimer(prev => ({...prev, sessionSeconds: prev.sessionSeconds - 10}))
    }, 1000);
    intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
  }

  function resetTimer(event) {
    document.querySelector("#start-stop").innerText = "Start";
    setTimer(defaultTimer);
    setTimerLength(defaultTimerLength)
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
      <BreakAndSession sessionLength={timerLength.sessionLength} breakLength={timerLength.breakLength} updateLength={updateLength} />
      <Timer timer={timer}/>
      <button id='start-stop' onClick={handleTimer}>Start</button>
      <button onClick={handleTimer} id='reset'>Reset</button>
    </div>
  )
}

export default App
