/* eslint-disable */
import { useEffect, useState } from 'react';
import { lightsColors } from '../constants/lightsColors';

type Light = (typeof lightsColors)[number];

const DEFAULT_START_INDEX = 0;

export const useStopLight = (): Light => {
  const [activeStopLightIndex, setActiveStopLightIndex] =
    useState<number>(DEFAULT_START_INDEX);

  const activeStopLightColor = lightsColors[activeStopLightIndex];

  useEffect(() => {
    const msToWait = 1000;
    const interval = setInterval(() => {
      setActiveStopLightIndex((prevLightIndex) => {
        return prevLightIndex === lightsColors.length - 1
          ? DEFAULT_START_INDEX
          : prevLightIndex + 1;
      });
    }, msToWait);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return activeStopLightColor;
};
