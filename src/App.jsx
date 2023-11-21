import { useEffect, useRef, useState } from 'react'
import './App.css'
import BreakAndSession from './BreakAndSession'
import Timer from './Timer'

const defaultTimer = {sessionSeconds: 1500, sessionLength: 25, isSessionRunning: false, breakSeconds: 300, breakLength: 5,
isBreakRunning: false, isPaused: true};
const defaultTimerLength = {sessionLength: defaultTimer.sessionSeconds / 60, breakLength: defaultTimer.breakSeconds / 60,
isTimerRunning: false};
const breakTimer = {}

function App() {
  const [timerLength, setTimerLength] = useState(defaultTimerLength);
  const [timer, setTimer] = useState(defaultTimer);


  function updateLength(event) {
    if (timer.isPaused) { // !timer.isSessionRunning && !timer.isBreakRunning
      if (timer.sessionSeconds % 60 !== 0) {
        fixedSessionTimer.current = Math.ceil(fixedSessionTimer.current);
      } else if (timer.breakSeconds % 60 !== 0) {
        fixedBreakTimer.current = Math.ceil(fixedBreakTimer.current)
      }
      switch (event.target.id) {
        case "session-increment":
          //timerLength.sessionLength < 60 && setTimerLength({...timerLength, sessionLength: timerLength.sessionLength + 1});
          (timer.sessionSeconds / 60) < 60 && setTimer({...timer, sessionSeconds: (fixedSessionTimer.current * 60) + 60, isSessionRunning: false, isBreakRunning: false});
          break;
        case "session-decrement":
          //timerLength.sessionLength > 1 && setTimerLength({...timerLength, sessionLength: timerLength.sessionLength - 1});
          (timer.sessionSeconds / 60) > 1 && setTimer({...timer, sessionSeconds: timer.sessionSeconds - 60, isSessionRunning: false, isBreakRunning: false});
          break;
        case "break-increment":
          //timerLength.breakLength < 60 && setTimerLength({...timerLength, breakLength: timerLength.breakLength + 1});
          (timer.breakSeconds / 60) < 60 && setTimer({...timer, breakSeconds: timer.breakSeconds + 60, isSessionRunning: false, isBreakRunning: false});
          break;
        case "break-decrement":
          //timerLength.breakLength > 1 && setTimerLength({...timerLength, breakLength: timerLength.breakLength - 1});
          (timer.breakSeconds / 60) > 1 && setTimer({...timer, breakSeconds: timer.breakSeconds - 60, isSessionRunning: false, isBreakRunning: false});
          break;
        default:
          break;
    }
    //setTimerLength(prev => ({...prev, sessionLength: prev.sessionSeconds / 60, breakLength: prev.breakSeconds / 60}));
    }
  }


  let intervalRef = useRef(0);
  let intervalId = null;
  const startStopBtn = useRef();

  const fixedSessionTimer = useRef(timer.sessionLength);
  const fixedBreakTimer = useRef(timer.breakLength);
  console.log(fixedSessionTimer.current)
  if (timer.isPaused) {
      fixedSessionTimer.current = timer.sessionSeconds / 60;
      fixedBreakTimer.current = timer.breakSeconds / 60;
      //setTimer({...timer, sessionLength: fixedSessionTimer.current, breakLength: fixedBreakTimer.current})
  }


  function stopTimer() {
    if (startStopBtn.current.innerText === "Stop") {
      startStopBtn.current.innerText = "Start";
    }
    setTimer(prev => ({...prev, isPaused: true}));
    intervalId = intervalRef.current;
    clearInterval(intervalId);
    intervalId = null;
    console.log(timer.isSessionRunning)   
  }

  function startTimer() {
    console.log(startStopBtn.current.innerText)
    startStopBtn.current.innerText = "Stop";
    setTimer({...timer, isPaused: false})

    if (timer.sessionSeconds != 0 && !timer.isBreakRunning) {
      setTimer(prev => ({...prev, isSessionRunning: true, isPaused: false}));
      intervalId = setInterval(() => { // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        setTimer(prev => ({...prev, sessionSeconds: prev.sessionSeconds - 1}))
      }, 999);
      intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
    } else if (timer.breakSeconds != 0 && !timer.isSessionRunning) {
      setTimer(prev => ({...prev, isBreakRunning: true, isPaused: false}));
      intervalId = setInterval(() => { // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        setTimer(prev => ({...prev, breakSeconds: prev.breakSeconds - 1}))
      }, 999);
      intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
    }
  }

  function resetTimer() {
    startStopBtn.current.innerText = "Start";
    setTimer(defaultTimer);
    setTimerLength(defaultTimerLength)
    stopTimer();
  }

  function handleTimer(event) {
    if (event.target.id === "reset") {
      resetTimer();
    } else {
      if (startStopBtn.current.innerText === "Start") {
        startTimer();
      } else {stopTimer()};
    }
  }  // 21.11.2023 add audio 

  function changeListener() {
    if (timer.sessionSeconds < 0) {
      clearInterval(intervalRef.current); intervalId = null;
      setTimer(prev => ({...prev, sessionSeconds: fixedSessionTimer.current * 60, isSessionRunning: false, isBreakRunning: true}));
      startStopBtn.current.innerText = "Start";
      setTimer(prev => ({...prev, isBreakRunning: true, isPaused: false}));
      intervalId = setInterval(() => { // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        setTimer(prev => ({...prev, breakSeconds: prev.breakSeconds - 1}))
      }, 1000);
      intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
    } else if (timer.breakSeconds < 0) {
      clearInterval(intervalRef.current); intervalId = null;
      setTimer(prev => ({...prev, breakSeconds: fixedBreakTimer.current * 60, isBreakRunning: false, isSessionRunning: true}));
      startStopBtn.current.innerText = "Start";
      setTimer(prev => ({...prev, isSessionRunning: true, isPaused: false}));
      intervalId = setInterval(() => { // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        setTimer(prev => ({...prev, sessionSeconds: prev.sessionSeconds - 1}))
      }, 1000);
      intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
    }
  }
  changeListener()

  return (
    <div id='pomodoro-clock'>
      <h1>Pomodoro Clock</h1>
      <BreakAndSession timer={timer} timerLength={timerLength} updateLength={updateLength} />
      <Timer timer={timer} timerLength={timerLength}/>
      <button ref={startStopBtn} id='start_stop' onClick={handleTimer}>Start</button>
      <button onClick={handleTimer} id='reset'>Reset</button>
    </div>
  )
}

export default App
