import { useEffect, useRef } from "react";

function Timer({timer, timerLength}) {
    
    let minutes = Math.floor(timer.sessionSeconds / 60);
    let seconds = timer.sessionSeconds % 60;
    let currentLabel = "Pomodoro";
    
    if (timer.isSessionRunning) {
        currentLabel = "Pomodoro";
        minutes = Math.floor(timer.sessionSeconds / 60);
        seconds = timer.sessionSeconds % 60;
    } else if (timer.isBreakRunning){
        currentLabel = "Break";
        minutes = Math.floor(timer.breakSeconds / 60)
        seconds = timer.breakSeconds % 60;
    }

    return (
        <div>
            <p id="timer-label">{currentLabel}</p>
            <span id="time-left">{minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}</span>
        </div>
    )
}

export default Timer