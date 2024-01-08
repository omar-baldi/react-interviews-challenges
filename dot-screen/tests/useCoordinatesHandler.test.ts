/* eslint-disable */
import { useCoordinatesHandler } from '@/hooks/useCoordinatesHandler';
import { act, renderHook, type RenderHookResult } from '@testing-library/react';

type CoordinatesHandler = ReturnType<typeof useCoordinatesHandler>;
type HookResult<T> = RenderHookResult<T, unknown>['result'];

describe('useCoordinatesHandler', () => {
  let coordinatesHandlerHook: HookResult<CoordinatesHandler>;

  beforeEach(() => {
    const { result } = renderHook(() => useCoordinatesHandler());
    coordinatesHandlerHook = result;
  });

  function drawCircleWithMockEvent() {
    const { drawCircle } = coordinatesHandlerHook.current;

    const mockEvent = {
      clientX: 100,
      clientY: 200,
      currentTarget: {
        getBoundingClientRect() {
          return {
            left: 0,
            top: 0,
          };
        },
      },
    } as any;

    return act(() => drawCircle(mockEvent));
  }

  it('should initialize circle coordinates "added" and "removed" with empty arrays', () => {
    expect(coordinatesHandlerHook.current.circleCoordinates.added).toEqual([]);
    expect(coordinatesHandlerHook.current.circleCoordinates.removed).toEqual([]);
  });

  it('should update circles coordinates "added" when drawing a new circle', () => {
    drawCircleWithMockEvent();
    expect(coordinatesHandlerHook.current.circleCoordinates.added.length).toBe(1);
    expect(coordinatesHandlerHook.current.circleCoordinates.added).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
        }),
      ])
    );
  });

  it('should update circles coordinates when removing last circle added', () => {
    drawCircleWithMockEvent();

    act(() => coordinatesHandlerHook.current.removeLastCircleAdded());
    expect(coordinatesHandlerHook.current.circleCoordinates.added.length).toBe(0);
    expect(coordinatesHandlerHook.current.circleCoordinates.removed.length).toBe(1);
  });

  it('should update circles coordinates when restoring last circle removed', () => {
    drawCircleWithMockEvent();

    act(() => coordinatesHandlerHook.current.removeLastCircleAdded());
    expect(coordinatesHandlerHook.current.circleCoordinates.added.length).toBe(0);
    expect(coordinatesHandlerHook.current.circleCoordinates.removed.length).toBe(1);

    act(() => coordinatesHandlerHook.current.restoreLastCircleRemoved());
    expect(coordinatesHandlerHook.current.circleCoordinates.added.length).toBe(1);
    expect(coordinatesHandlerHook.current.circleCoordinates.removed.length).toBe(0);
  });
});
