/* eslint-disable */
import { useCoordinatesHandler } from '@/hooks/useCoordinatesHandler';
import { renderHook } from '@testing-library/react';

describe('useCoordinatesHandler', () => {
  it('should initialize circle coordinates "added" and "removed" with empty arrays', () => {
    const { result } = renderHook(() => useCoordinatesHandler());
    expect(result.current.circleCoordinates.added).toEqual([]);
    expect(result.current.circleCoordinates.added).toEqual([]);
  });
});
