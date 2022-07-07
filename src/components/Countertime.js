import { useState, useEffect } from "react";
import '../styles/components/Countertime.css';

const Countertime = ({ start }) => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval = null;

        if(timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10);
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    useEffect(() => {
        if(start) {
            setTimerOn(true)
        }

        if(!start) {
            setTimerOn(false)
        }
    }, [start]);

    return (
        <div>
            <div className="counter">
                <span>
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </span>
                {/* <span>
                    {("0" + ((time / 10) % 100)).slice(-2)}
                </span> */}
            </div>
            {/* <div>
                {!timerOn && time === 0 && (
                    <button onClick={() => setTimerOn(true)}>Start</button>
                )}
                {timerOn &&  (
                    <button onClick={() => setTimerOn(false)}>Stop</button>
                )}
                {!timerOn && time !== 0 && (
                    <button onClick={() => setTimerOn(true)}>Resume</button>
                )}
                {!timerOn && time > 0 && (
                    <button onClick={() => setTime(0)}>Reset</button>                    
                )}
            </div> */}
        </div>
    )
}

export default Countertime;