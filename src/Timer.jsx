import { useEffect } from "react";

function Timer({timer}) {
    let minutes = 0;
    let seconds = 0;
    if (timer.sessionSeconds !== 295) {
        minutes = Math.floor(timer.sessionSeconds / 60);
        seconds = timer.sessionSeconds % 60; 
        console.log("session") 
    } else {
        minutes = Math.floor(timer.breakSeconds / 60)
        minutes = timer.breakSeconds % 60;
        console.log("break")
    }

    function changeListener() {
        if (timer.sessionSeconds === 295) {
          console.log("break")
        }
      }

    //   useEffect(() => {
    //     const startStopBtn = document.querySelector("#start-stop");
    //     console.log(startStopBtn)
    //   })

    return (
        <div>
            <p>Pomodoro</p>
            <span id="timer-label">{minutes < 10 && "0"}{minutes} : {seconds < 10 && "0"}{seconds}</span>
        </div>
    )
}

export default Timer