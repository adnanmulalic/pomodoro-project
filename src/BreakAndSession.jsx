import { useRef } from "react";

function BreakAndSession({ updateLength, timer }) {

    const rememberSessionLength = useRef(timer.sessionSeconds / 60);
    const rememberBreakLength = useRef(timer.breakSeconds / 60);

    if (timer.isPaused && !timer.isSessionRunning) { 
        rememberSessionLength.current = timer.sessionSeconds / 60;
    }
    if (timer.isPaused && !timer.isBreakRunning) {
        rememberBreakLength.current = timer.breakSeconds / 60;
    }

    return (
        <div onClick={updateLength}>
            <div id="session-label">
                <p>Session Length:</p>
                <button id="session-increment" className="button">+</button>
                <span id="session-length">{rememberSessionLength.current}</span>
                <button id="session-decrement" className="material-symbols-outlined">-</button>
            </div>
            <div id="break-label">
                <p>Break Length:</p>
                <button id="break-increment" className="material-symbols-outlined">+</button>
                <span id="break-length">{rememberBreakLength.current}</span>
                <button id="break-decrement" className="material-symbols-outlined">-</button>
            </div>
        </div>
    )
}

export default BreakAndSession;