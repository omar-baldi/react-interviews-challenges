/* eslint-disable */
import React, { useReducer } from 'react';
import './App.css';
import { DEFAULT_CIRCLE_RADIUS } from './constants';
import { CircleCoordinates, CirclesCoordinates } from './types';

const initialReducerState = {
  added: [],
  removed: [],
} as CirclesCoordinates;

/**
 * !NOTE: see consideration below
 * Due to limitations in the canvas API, there is no direct method
 * to remove individual shapes. The first approach involves clearing the entire
 * canvas and redrawing all previously added circles, excluding the last one.
 *
 * -> Switching to a "div" element and using "appendChild" for circle rendering
 * could be an alternative, offering more flexibility in managing individual elements
 * added or/and removed.
 */
function App() {
  const [coordinates, updateCoordinates] = useReducer(
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

  const isUndoButtonDisabled = coordinates.added.length <= 0;
  const isRedoButtonDisabled = coordinates.removed.length <= 0;

  function appendCircle(e: React.MouseEvent<HTMLDivElement>): void {
    const drawingAreaElement = e.currentTarget;
    const rect = drawingAreaElement.getBoundingClientRect();

    const x = e.clientX - rect.left - DEFAULT_CIRCLE_RADIUS / 2;
    const y = e.clientY - rect.top - DEFAULT_CIRCLE_RADIUS / 2;

    updateCoordinates({
      added: [...coordinates.added, { x, y }],
    });
  }

  /**
   * @description
   * @function removeLastCircleAdded
   */
  function removeLastCircleAdded(): void {
    const { added, removed } = coordinates;

    if (added.length <= 0) return;

    const updatedAdded = [...added];
    const circleCoordinatesToRemove = updatedAdded.pop() as CircleCoordinates;

    updateCoordinates({
      added: updatedAdded,
      removed: [...removed, circleCoordinatesToRemove],
    });
  }

  /**
   * @description
   * @function restoreLastCircleRemoved
   */
  function restoreLastCircleRemoved(): void {
    const { added, removed } = coordinates;

    if (removed.length <= 0) return;

    const updatedRemoved = [...removed];
    const circleCoordinatesToRestore = updatedRemoved.pop() as CircleCoordinates;

    updateCoordinates({
      added: [...added, circleCoordinatesToRestore],
      removed: updatedRemoved,
    });
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          margin: '1rem 0',
        }}
      >
        <button disabled={isUndoButtonDisabled} onClick={removeLastCircleAdded}>
          Undo
        </button>
        <button disabled={isRedoButtonDisabled} onClick={restoreLastCircleRemoved}>
          Redo
        </button>
      </div>

      <div className='drawingArea' onClick={appendCircle}>
        {coordinates.added.map(({ x, y }) => {
          return (
            <div
              className='circle'
              key={`x-${x}-y-${y}`}
              style={
                {
                  '--circleSize': `${DEFAULT_CIRCLE_RADIUS}px`,
                  '--x': `${x}px`,
                  '--y': `${y}px`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
