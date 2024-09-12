import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useRef } from 'react'
function App() {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [active, setActive] = useState(false);
  const timerId = useRef(null);
  useEffect(() => {
    if (active) {
      timerId.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1
          }
          else if (minutes > 0) {
            setMinutes(prevMinutes => prevMinutes - 1);
            return 59;
          }
          else if (hours > 0) {
            setHours(prevHours => prevHours - 1);
            setMinutes(59)
            return 59;

          }
          else {
            clearInterval(timerId.current);
            setActive(false);
            return 0;
          }
        }
        )
      }, 1000);
    }

  }, [active])




  return (
    <div className="App">
      <header className="App-header">
        <h1>Timer</h1>


        <form className="input">

          <input type='number' value={hours} placeholder='Set Hours' onChange={(e) => setHours(e.target.value)} />

          <input type='number' value={minutes} placeholder='Set Minutes' onChange={(e) => setMinutes(e.target.value)} />

          <input type='number' value={seconds} placeholder='Set Seconds' onChange={(e) => setSeconds(e.target.value)} />
        </form>
        <div className="label">
          <label>Hours</label>
          <label>Minutes</label>
          <label>Seconds</label>
        </div>
        <div className="buttons">
          <button onClick={() => setActive(true)}>Start</button>
          <button onClick={() => {setActive(false);clearInterval(timerId.current)}}>Pause</button>
          <button onClick={() => { setActive(false); setSeconds(0); setMinutes(0); setHours(0) }}>Reset</button>
        </div>

      </header>
    </div>
  );
}

export default App;
