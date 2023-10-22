/* eslint-disable */
import { useEffect, useState } from 'react';
import './App.css';

const MINUTE_IN_SECONDS = 60;
const DEFAULT_TIMER_MINUTES_VALUE = 10;

function getTimerFormat(minutes: number, seconds = 0): string {
  const minutesLabel = minutes.toString().padStart(2, '0');
  const secondsLabel = seconds.toString().padStart(2, '0');

  return `${minutesLabel}:${secondsLabel}`;
}

function App() {
  const [currentTimer, setCurrentTimer] = useState<string>(() =>
    getTimerFormat(DEFAULT_TIMER_MINUTES_VALUE)
  );

  useEffect(() => {
    const msToWait = 1000;
    const interval = setInterval(() => {
      setCurrentTimer((prevTimer) => {
        const [minutesLabel, secondsLabel] = prevTimer.split(':');

        let minutes = +minutesLabel;
        let seconds = +secondsLabel;

        seconds = seconds <= 0 ? MINUTE_IN_SECONDS - 1 : seconds - 1;

        minutes =
          seconds <= 0
            ? minutes <= 0
              ? DEFAULT_TIMER_MINUTES_VALUE
              : minutes - 1
            : minutes;

        return getTimerFormat(minutes, seconds);
      });
    }, msToWait);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{currentTimer}</>;
}

export default App;
