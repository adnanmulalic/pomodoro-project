function BreakAndSession({ sessionLength, breakLength, updateLength}) {
    return (
        <div onClick={updateLength}>
            <div id="session-label">Session Length:
                <button id="session-increment">Up</button>
                <span>{sessionLength}</span>
                <button id="session-decrement">Down</button>
            </div>
            <div id="break-label">Break Length:
                <button id="break-increment">Up</button>
                <span>{breakLength}</span>
                <button id="break-decrement">Down</button>
            </div>
        </div>
    )
}

export default BreakAndSession;