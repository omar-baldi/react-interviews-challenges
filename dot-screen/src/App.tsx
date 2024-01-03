/* eslint-disable */
import { useEffect, useRef } from 'react';
import './App.css';

//TODO: move to "helpers" and unit test this
function isCanvasAvailable(
  ctx: CanvasRenderingContext2D | null | undefined
): ctx is CanvasRenderingContext2D {
  return ctx instanceof CanvasRenderingContext2D;
}

function App() {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const canvasElement = canvasElementRef.current;
    canvasElement?.addEventListener('click', drawCircle);

    return () => {
      canvasElement?.removeEventListener('click', drawCircle);
    };
  }, []);

  return (
    <>
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
