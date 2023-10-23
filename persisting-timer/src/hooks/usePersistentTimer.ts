/* eslint-disable */
import { useEffect, useState } from 'react';
import {
  DEFAULT_TIMER_MINUTES_VALUE,
  MINUTE_IN_SECONDS,
  STORAGE_TIMER_KEY,
} from '../constants';
import { getTimerFormat } from '../helpers/get-timer-format';

const defaultTimerValue = getTimerFormat(DEFAULT_TIMER_MINUTES_VALUE);

export const usePersistentTimer = ({
  minutes = DEFAULT_TIMER_MINUTES_VALUE,
  seconds = 0,
}: { minutes?: number; seconds?: number } = {}) => {
  const [currentTimer, setCurrentTimer] = useState<string>(() => {
    const previousTimerStored = localStorage.getItem(STORAGE_TIMER_KEY);
    return previousTimerStored || defaultTimerValue;
  });

  localStorage.setItem(STORAGE_TIMER_KEY, currentTimer);

  useEffect(() => {
    const updatedTimerFormat = getTimerFormat(minutes, seconds);
    setCurrentTimer(updatedTimerFormat);

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
      localStorage.removeItem(STORAGE_TIMER_KEY);
    };
  }, [minutes, seconds]);

  return currentTimer;
};
