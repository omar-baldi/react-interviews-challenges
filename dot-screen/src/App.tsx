/* eslint-disable */
import React from 'react';
import './App.css';
import { DEFAULT_CIRCLE_RADIUS } from './constants';
import { useCoordinatesHandler } from './hooks/useCoordinatesHandler';

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
  const {
    circleCoordinates,
    drawCircle,
    removeLastCircleAdded,
    restoreLastCircleRemoved,
  } = useCoordinatesHandler();

  const isUndoButtonDisabled = circleCoordinates.added.length <= 0;
  const isRedoButtonDisabled = circleCoordinates.removed.length <= 0;

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
        <button
          data-testid='buttonUndo'
          disabled={isUndoButtonDisabled}
          onClick={removeLastCircleAdded}
        >
          Undo
        </button>
        <button
          data-testid='buttonRedo'
          disabled={isRedoButtonDisabled}
          onClick={restoreLastCircleRemoved}
        >
          Redo
        </button>
      </div>

      <div className='drawingArea' data-testid='drawingArea' onClick={drawCircle}>
        {circleCoordinates.added.map(({ x, y }) => {
          return (
            <div
              data-testid='circle'
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
