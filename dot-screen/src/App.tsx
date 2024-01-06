/* eslint-disable */
import { ElementRef, useEffect, useRef, useState } from 'react';
import './App.css';

const DEFAULT_CIRCLE_RADIUS = 10;

//!NOTE: check function (instanceof ok ???)
function isDrawingElementAvailable(el: HTMLDivElement | null): el is HTMLDivElement {
  return el instanceof HTMLDivElement;
}

//TODO: move to "types" folder
type CircleCoordinates = {
  x: number;
  y: number;
};

//TODO: move to "types" folder
type CirclesCoordinates = {
  added: CircleCoordinates[];
  removed: CircleCoordinates[];
};

function App() {
  //TODO: provide better naming
  //!NOTE: there is no need to use event listener (just append a "onClick" event to the "div")
  const drawingElementRef = useRef<ElementRef<'div'>>(null);

  //TODO: switch to "useReducer" ???
  const [_circlesCoordinates, setCirclesCoordinates] = useState<CirclesCoordinates>({
    added: [],
    removed: [],
  });

  function handleDrawingAreaClick(e: MouseEvent): void {
    const drawingElement = drawingElementRef.current;

    if (isDrawingElementAvailable(drawingElement)) {
      const rect = drawingElement.getBoundingClientRect();

      //!NOTE: for better precision apply the following code
      // const x = e.clientX - rect.left - DEFAULT_CIRCLE_RADIUS / 2;
      // const y = e.clientY - rect.top - DEFAULT_CIRCLE_RADIUS / 2;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circleElementToAdd = document.createElement('div');
      // circleElementToAdd.classList.add("circle");
      circleElementToAdd.style.position = 'absolute';
      circleElementToAdd.style.top = `${y}px`;
      circleElementToAdd.style.left = `${x}px`;
      circleElementToAdd.style.height = `${DEFAULT_CIRCLE_RADIUS}px`;
      circleElementToAdd.style.width = `${DEFAULT_CIRCLE_RADIUS}px`;
      circleElementToAdd.style.backgroundColor = 'red';
      circleElementToAdd.style.borderRadius = '50%';

      drawingElement.appendChild(circleElementToAdd);

      setCirclesCoordinates((prevCirclesCoordinates) => ({
        ...prevCirclesCoordinates,
        added: [...prevCirclesCoordinates.added, { x, y }],
      }));
    }
  }

  /**
   * !NOTE: see consideration below
   * Due to limitations in the canvas API, there is no direct method
   * to remove individual shapes. The first approach involves clearing the entire
   * canvas and redrawing all previously added circles, excluding the last one.
   *
   * -> Switching to a "div" element and using "appendChild" for circle rendering
   * could be an alternative, offering more flexibility in managing individual elements
   * added or/and removed.
   *
   * @function removeLastCircleAdded
   */
  function removeLastCircleAdded(): void {}

  function addLastCircleRemoved(): void {}

  /**
   * !NOTE: see comment below
   * There might not be the need to append an eventListener
   * to the element reference, you can just use the onClick callback
   * property.
   */
  useEffect(() => {
    drawingElementRef.current?.addEventListener('click', handleDrawingAreaClick);

    return () => {
      drawingElementRef.current?.removeEventListener('click', handleDrawingAreaClick);
    };
  }, []);

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
        <button onClick={removeLastCircleAdded}>Undo</button>
        <button onClick={addLastCircleRemoved}>Redo</button>
      </div>

      <div
        ref={drawingElementRef}
        style={{
          position: 'relative',
          border: '1px solid red',
          height: '500px',
          width: '1000px',
          cursor: 'pointer',
        }}
      ></div>
    </>
  );
}

export default App;
