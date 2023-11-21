import { useEffect, useRef } from "react";

function BreakAndSession({ updateLength, timer, timerLength}) {

    const rememberSessionLength = useRef(timer.sessionSeconds / 60);
    const rememberBreakLength = useRef(timer.breakSeconds / 60);

    if (timer.isPaused && !timer.isSessionRunning) { 
        rememberSessionLength.current = timer.sessionSeconds / 60;
        //rememberBreakLength.current = timer.breakSeconds / 60;
    }
    if (timer.isPaused && !timer.isBreakRunning) {
        rememberBreakLength.current = timer.breakSeconds / 60;
    }

    //console.log(timer.sessionLength, rememberSessionLength.current, timer.sessionSeconds / 60)

    return (
        <div onClick={updateLength}>
            <div id="session-label">Session Length:
                <button id="session-increment">Up</button>
                <span id="session-length">{rememberSessionLength.current}</span>
                <button id="session-decrement">Down</button>
            </div>
            <div id="break-label">Break Length:
                <button id="break-increment">Up</button>
                <span id="break-length">{rememberBreakLength.current}</span>
                <button id="break-decrement">Down</button>
            </div>
        </div>
    )
}

export default BreakAndSession;