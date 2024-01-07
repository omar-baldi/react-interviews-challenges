/* eslint-disable */
import { useCoordinatesHandler } from '@/hooks/useCoordinatesHandler';
import { act, renderHook } from '@testing-library/react';

describe('useCoordinatesHandler', () => {
  it('should initialize circle coordinates "added" and "removed" with empty arrays', () => {
    const { result } = renderHook(() => useCoordinatesHandler());
    expect(result.current.circleCoordinates.added).toEqual([]);
    expect(result.current.circleCoordinates.added).toEqual([]);
  });

  it('should update circle coordinates "added" when drawing a new circle', () => {
    const { result } = renderHook(() => useCoordinatesHandler());

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

    act(() => result.current.drawCircle(mockEvent));
    expect(result.current.circleCoordinates.added.length).toBe(1);
  });
});
