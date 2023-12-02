import { useRef, useState } from 'react'
import './App.css'
import BreakAndSession from './BreakAndSession'
import Timer from './Timer'
import Footer from './Footer';

const defaultTimer = {sessionSeconds: 1500, sessionLength: 25, isSessionRunning: false, breakSeconds: 300, breakLength: 5,
isBreakRunning: false, isPaused: true};
const breakTimer = {}

function App() {
  const [timer, setTimer] = useState(defaultTimer);

  function updateLength(event) {
    if (timer.isPaused) {
      if (timer.sessionSeconds % 60 !== 0) {
        fixedSessionTimer.current = Math.ceil(fixedSessionTimer.current);
      } else if (timer.breakSeconds % 60 !== 0) {
        fixedBreakTimer.current = Math.ceil(fixedBreakTimer.current)
      }
      switch (event.target.id) {
        case "session-increment":
          (timer.sessionSeconds / 60) < 60 && setTimer({...timer, sessionSeconds: timer.sessionSeconds + 60, isSessionRunning: false, isBreakRunning: false});
          break;
        case "session-decrement":
          (timer.sessionSeconds / 60) > 1 && setTimer({...timer, sessionSeconds: timer.sessionSeconds - 60, isSessionRunning: false, isBreakRunning: false});
          break;
        case "break-increment":
          (timer.breakSeconds / 60) < 60 && setTimer({...timer, breakSeconds: timer.breakSeconds + 60, isSessionRunning: false, isBreakRunning: false});
          break;
        case "break-decrement":
          (timer.breakSeconds / 60) > 1 && setTimer({...timer, breakSeconds: timer.breakSeconds - 60, isSessionRunning: false, isBreakRunning: false});
          break;
        default:
          break;
    }
    }
  }

  let intervalRef = useRef(0);
  let intervalId = null;
  const startStopBtn = useRef();
  const fixedSessionTimer = useRef(timer.sessionLength);
  const fixedBreakTimer = useRef(timer.breakLength);

  if (timer.isPaused) {
      fixedSessionTimer.current = timer.sessionSeconds / 60;
      fixedBreakTimer.current = timer.breakSeconds / 60;
  }

  function stopTimer() {
    if (startStopBtn.current.innerText === "Stop") {
      startStopBtn.current.innerText = "Start";
    }
    setTimer(prev => ({...prev, isPaused: true}));
    intervalId = intervalRef.current;
    clearInterval(intervalId);
    intervalId = null;  
  }

  function startTimer() {
    startStopBtn.current.innerText = "Stop";
    setTimer({...timer, isPaused: false})

    if (timer.sessionSeconds != 0 && !timer.isBreakRunning) {
      setTimer(prev => ({...prev, isSessionRunning: true, isPaused: false}));
      intervalId = setInterval(() => { // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        setTimer(prev => ({...prev, sessionSeconds: prev.sessionSeconds - 1}))
      }, 1000);
      intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
    } else if (timer.breakSeconds != 0 && !timer.isSessionRunning) {
      setTimer(prev => ({...prev, isBreakRunning: true, isPaused: false}));
      intervalId = setInterval(() => { // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        setTimer(prev => ({...prev, breakSeconds: prev.breakSeconds - 1}))
      }, 1000);
      intervalRef.current = intervalId;  // https://react.dev/reference/react/useRef
    }
  }

  function resetTimer() {
    document.querySelector("#beep").pause();
    document.querySelector("#beep").currentTime = 0;
    startStopBtn.current.innerText = "Start";
    setTimer(defaultTimer);
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
  } 

  function changeListener() {
    if (timer.sessionSeconds < 0) {
      clearInterval(intervalRef.current); intervalId = null;
      setTimer(prev => ({...prev, sessionSeconds: fixedSessionTimer.current * 60, isSessionRunning: false, isBreakRunning: true}));
      startStopBtn.current.innerText = "Start";
      setTimer(prev => ({...prev, isBreakRunning: true, isPaused: false}));
      intervalId = setInterval(() => {
        setTimer(prev => ({...prev, breakSeconds: prev.breakSeconds - 1}))
      }, 1000);
      intervalRef.current = intervalId;  
      document.querySelector("#beep").play();
    } else if (timer.breakSeconds < 0) {
      clearInterval(intervalRef.current); intervalId = null;
      setTimer(prev => ({...prev, breakSeconds: fixedBreakTimer.current * 60, isBreakRunning: false, isSessionRunning: true}));
      startStopBtn.current.innerText = "Start";
      setTimer(prev => ({...prev, isSessionRunning: true, isPaused: false}));
      intervalId = setInterval(() => {
        setTimer(prev => ({...prev, sessionSeconds: prev.sessionSeconds - 1}))
      }, 1000);
      intervalRef.current = intervalId;
      document.querySelector("#beep").play();
    }
  }
  changeListener()

  return (
    <>
    <div id='pomodoro-clock'>
      <h1>25 + 5 clock</h1>
      <audio id="beep" >
        <source src='/clock-alarm-8761.mp3' type='audio/mpeg' />
      </audio>
      <BreakAndSession timer={timer} updateLength={updateLength} />
      <Timer timer={timer} />
      <button ref={startStopBtn} id='start_stop' onClick={handleTimer}>Start</button>
      <button onClick={handleTimer} id='reset'>Reset</button>
    </div>
    <Footer />
    </>
  )
}

export default App
