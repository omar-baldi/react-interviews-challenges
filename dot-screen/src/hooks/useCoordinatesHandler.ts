/* eslint-disable */
import { useReducer } from 'react';
import { DEFAULT_CIRCLE_RADIUS } from '../constants';
import { CircleCoordinates, CirclesCoordinates } from '../types';

const initialReducerState = {
  added: [],
  removed: [],
} as CirclesCoordinates;

export const useCoordinatesHandler = () => {
  const [circleCoordinates, updateCircleCoordinates] = useReducer(
    (
      state: typeof initialReducerState,
      updatedState: Partial<typeof initialReducerState>
    ) => {
      return {
        ...state,
        ...updatedState,
      };
    },
    initialReducerState
  );

  /**
   * @function appendCircle
   * @param e
   */
  function drawCircle(e: React.MouseEvent<HTMLDivElement>): void {
    const drawingAreaElement = e.currentTarget;
    const rect = drawingAreaElement.getBoundingClientRect();

    const x = e.clientX - rect.left - DEFAULT_CIRCLE_RADIUS / 2;
    const y = e.clientY - rect.top - DEFAULT_CIRCLE_RADIUS / 2;

    updateCircleCoordinates({
      added: [...circleCoordinates.added, { x, y }],
    });
  }

  /**
   * @description
   * @function removeLastCircleAdded
   */
  function removeLastCircleAdded(): void {
    const { added, removed } = circleCoordinates;

    if (added.length <= 0) return;

    const updatedAdded = [...added];
    const circleCoordinatesToRemove = updatedAdded.pop() as CircleCoordinates;

    updateCircleCoordinates({
      added: updatedAdded,
      removed: [...removed, circleCoordinatesToRemove],
    });
  }

  /**
   * @description
   * @function restoreLastCircleRemoved
   */
  function restoreLastCircleRemoved(): void {
    const { added, removed } = circleCoordinates;

    if (removed.length <= 0) return;

    const updatedRemoved = [...removed];
    const circleCoordinatesToRestore = updatedRemoved.pop() as CircleCoordinates;

    updateCircleCoordinates({
      added: [...added, circleCoordinatesToRestore],
      removed: updatedRemoved,
    });
  }

  return {
    circleCoordinates,
    drawCircle,
    removeLastCircleAdded,
    restoreLastCircleRemoved,
  };
};
