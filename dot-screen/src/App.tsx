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

/**
 * !NOTE: all the functions are dependant on the fact that...
 * !NOTE: ...the element ref needs to be instance of HTMLDivElement, so...
 * !NOTE: ...it makes sense then to move the logic out to follow DRY principle
 */
function App() {
  //TODO: provide better naming
  //!NOTE: there is no need to use event listener (just append a "onClick" event to the "div")
  const drawingElementRef = useRef<ElementRef<'div'>>(null);

  //TODO: switch to "useReducer" ???
  const [circlesCoordinates, setCirclesCoordinates] = useState<CirclesCoordinates>({
    added: [],
    removed: [],
  });

  function createCircleElement(coordinates: CircleCoordinates): HTMLDivElement {
    const { x, y } = coordinates;

    const circleElement = document.createElement('div');
    // circleElement.classList.add("circle");
    circleElement.style.position = 'absolute';
    circleElement.style.top = `${y}px`;
    circleElement.style.left = `${x}px`;
    circleElement.style.height = `${DEFAULT_CIRCLE_RADIUS}px`;
    circleElement.style.width = `${DEFAULT_CIRCLE_RADIUS}px`;
    circleElement.style.backgroundColor = 'red';
    circleElement.style.borderRadius = '50%';

    return circleElement;
  }

  function appendCircle(e: MouseEvent): void {
    const drawingElement = drawingElementRef.current;

    if (isDrawingElementAvailable(drawingElement)) {
      const rect = drawingElement.getBoundingClientRect();

      //!NOTE: for better precision apply the following code
      // const x = e.clientX - rect.left - DEFAULT_CIRCLE_RADIUS / 2;
      // const y = e.clientY - rect.top - DEFAULT_CIRCLE_RADIUS / 2;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circleElement = createCircleElement({ x, y });
      drawingElement.appendChild(circleElement);

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
  function removeLastCircleAdded(): void {
    const el = drawingElementRef.current;

    if (isDrawingElementAvailable(el) && el.children.length > 0) {
      const lastCircleAdded = el.children[el.children.length - 1];
      el.removeChild(lastCircleAdded);

      setCirclesCoordinates((prevCirclesCoordinates) => {
        if (prevCirclesCoordinates.added.length <= 0) return prevCirclesCoordinates;

        const { added, removed } = prevCirclesCoordinates;

        const updatedAddedElements = [...added];
        const circleToRemove = updatedAddedElements.pop() as CircleCoordinates;
        const updatedRemovedElements = [...removed, circleToRemove];

        return {
          added: updatedAddedElements,
          removed: updatedRemovedElements,
        };
      });
    }
  }

  function addLastCircleRemoved(): void {}

  /**
   * !NOTE: see comment below
   * There might not be the need to append an eventListener
   * to the element reference, you can just use the onClick callback
   * property.
   */
  useEffect(() => {
    drawingElementRef.current?.addEventListener('click', appendCircle);

    return () => {
      drawingElementRef.current?.removeEventListener('click', appendCircle);
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
