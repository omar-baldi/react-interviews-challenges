import { useEffect, useRef, useState } from 'react';
import { lightsColors } from '../constants/lightsColors';

type Light = (typeof lightsColors)[number];

const DEFAULT_START_INDEX = 0;

const DEFAULT_LIGHT_TIMERS: Record<Light, number> = {
  red: 1000,
  yellow: 1000,
  green: 1000,
};

export const useStopLight = ({
  stopLightTimers = {},
}: {
  stopLightTimers?: Partial<Record<Light, number>>;
} = {}): Light => {
  const [activeStopLightIndex, setActiveStopLightIndex] =
    useState<number>(DEFAULT_START_INDEX);

  const stopLightTimersRef = useRef<Record<Light, number>>(DEFAULT_LIGHT_TIMERS);

  useEffect(() => {
    stopLightTimersRef.current = {
      ...DEFAULT_LIGHT_TIMERS,
      ...stopLightTimers,
    };
  }, [stopLightTimers]);

  const activeStopLightColor = lightsColors[activeStopLightIndex];

  useEffect(() => {
    const msToWait = stopLightTimersRef.current[activeStopLightColor];

    const timeout = setTimeout(() => {
      setActiveStopLightIndex((prevLightIndex) => {
        return prevLightIndex === lightsColors.length - 1
          ? DEFAULT_START_INDEX
          : prevLightIndex + 1;
      });
    }, msToWait);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeStopLightColor]);

  return activeStopLightColor;
};
