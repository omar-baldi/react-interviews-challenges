/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import './App.css';

//TODO: move to "helpers" and unit test this
function isCanvasAvailable(
  ctx: CanvasRenderingContext2D | null | undefined
): ctx is CanvasRenderingContext2D {
  return ctx instanceof CanvasRenderingContext2D;
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
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const [circlesCoordinates, setCirclesCoordinates] = useState<CirclesCoordinates>({
    added: [],
    removed: [],
  });

  function drawCircle(e: MouseEvent) {
    const circleCoordinateX = e.offsetX;
    const circleCoordinateY = e.offsetY;
    //TODO: replace with constant variable (not magic number)
    const circleRadius = 10;

    const ctx = canvasElementRef.current?.getContext('2d');

    if (isCanvasAvailable(ctx)) {
      ctx.beginPath();
      ctx.arc(circleCoordinateX, circleCoordinateY, circleRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  }

  function removeLastCircleAdded() {
    const ctx = canvasElementRef.current?.getContext('2d');

    if (isCanvasAvailable(ctx) && circlesCoordinates.added.length > 0) {
      ctx.clearRect(0, 0, 1000, 500);

      const updatedAddedCircles = circlesCoordinates.added.slice(0, -1);
      for (const circle of updatedAddedCircles) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
      }

      setCirclesCoordinates((prevCirclesCoordinates) => ({
        ...prevCirclesCoordinates,
        added: updatedAddedCircles,
      }));
    }
  }

  useEffect(() => {
    const canvasElement = canvasElementRef.current;
    canvasElement?.addEventListener('click', drawCircle);

    return () => {
      canvasElement?.removeEventListener('click', drawCircle);
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <button onClick={removeLastCircleAdded}>Undo</button>
        <button onClick={undefined}>Redo</button>
      </div>

      <canvas
        ref={canvasElementRef}
        //TODO: replace magic number with constants variable
        height={500}
        //TODO: replace magic number with constants variable
        width={1000}
        style={{ border: '1px solid red', cursor: 'pointer' }}
      />
    </>
  );
}

export default App;
