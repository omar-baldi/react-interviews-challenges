/* eslint-disable */
import { useResumableTimer } from '@/hooks/useResumableTimer';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

describe('useResumableTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should hook be initialized with correct default values', () => {
    const { result } = renderHook(() =>
      useResumableTimer({
        cbFunc: () => undefined,
      })
    );

    expect(result.current.isTimerInactive).toBe(true);
    expect(result.current.isTimerPaused).toBe(false);
    expect(result.current.isTimerPlaying).toBe(false);
  });
});
