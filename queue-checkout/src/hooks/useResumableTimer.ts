/* eslint-disable */
import { useEffect, useRef, useState } from 'react';

export type ResumableTimerProps = {
  cbFunc: () => void;
  msToWait?: number;
};

export type TimerStatus = 'INACTIVE' | 'PLAYING' | 'PAUSED';

//TODO: move to "constants"
const DEFAULT_MS_TO_WAIT = 1000;

export const useResumableTimer = ({
  cbFunc,
  msToWait = DEFAULT_MS_TO_WAIT,
}: ResumableTimerProps) => {
  const cbFuncRef = useRef<typeof cbFunc | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('INACTIVE');

  useEffect(() => {
    cbFuncRef.current = cbFunc;
  }, [cbFunc]);

  function start(): void {
    if (timerStatus === 'INACTIVE') {
      intervalRef.current = setInterval(() => {
        const fn = cbFuncRef.current;
        fn?.();
      }, msToWait);

      setTimerStatus('PLAYING');
    }
  }

  function pause(): void {
    if (timerStatus === 'PLAYING') {
      clearInterval(intervalRef.current);
      setTimerStatus('PAUSED');
    }
  }

  function resume(): void {
    if (timerStatus === 'PAUSED') {
      intervalRef.current = setInterval(() => {
        const fn = cbFuncRef.current;
        fn?.();
      }, msToWait);

      setTimerStatus('PLAYING');
    }
  }

  return {
    isTimerPlaying: timerStatus === 'PLAYING',
    isTimerPaused: timerStatus === 'PAUSED',
    isTimerInactive: timerStatus === 'INACTIVE',
    start,
    pause,
    resume,
  };
};
