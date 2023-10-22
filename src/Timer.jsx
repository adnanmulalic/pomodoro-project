function Timer({currentLength}) {
    return (
        <span id="timer-label">{currentLength < 10 && "0"}{currentLength}</span>
    )
}

export default Timer