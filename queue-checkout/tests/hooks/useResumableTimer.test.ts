/* eslint-disable */
import { useResumableTimer } from '@/hooks/useResumableTimer';
import { act, renderHook } from '@testing-library/react';
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

  it('should callback function be executed and timer status be updated when starting the timer', () => {
    const spyFn = vi.fn();
    const mockMsToWait = 1000;

    const { result } = renderHook(() =>
      useResumableTimer({
        cbFunc: spyFn,
        msToWait: mockMsToWait,
      })
    );

    act(() => result.current.start());
    expect(result.current.isTimerPlaying).toBe(true);
    vi.advanceTimersByTime(mockMsToWait);
    expect(spyFn).toHaveBeenCalled();
  });

  it('should callback function not be executed and timer status be updated when pausing the timer', () => {
    const spyFn = vi.fn();
    const mockMsToWait = 1000;

    const { result } = renderHook(() =>
      useResumableTimer({
        cbFunc: spyFn,
        msToWait: mockMsToWait,
      })
    );

    act(() => result.current.start());
    expect(result.current.isTimerPaused).toBe(false);
    vi.advanceTimersByTime(mockMsToWait);
    expect(spyFn).toHaveBeenCalledTimes(1);

    act(() => result.current.pause());
    expect(result.current.isTimerPaused).toBe(true);
    vi.advanceTimersByTime(mockMsToWait);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  it('should callback function be executed and timer status be updated when resuming the timer', () => {
    const spyFn = vi.fn();
    const mockMsToWait = 1000;

    const { result } = renderHook(() =>
      useResumableTimer({
        cbFunc: spyFn,
        msToWait: mockMsToWait,
      })
    );

    act(() => result.current.start());
    expect(result.current.isTimerPlaying).toBe(true);
    expect(result.current.isTimerPaused).toBe(false);
    vi.advanceTimersByTime(mockMsToWait);
    expect(spyFn).toHaveBeenCalledTimes(1);

    act(() => result.current.pause());
    expect(result.current.isTimerPlaying).toBe(false);
    expect(result.current.isTimerPaused).toBe(true);
    vi.advanceTimersByTime(mockMsToWait);
    expect(spyFn).toHaveBeenCalledTimes(1);

    act(() => result.current.resume());
    expect(result.current.isTimerPlaying).toBe(true);
    expect(result.current.isTimerPaused).toBe(false);
    vi.advanceTimersByTime(mockMsToWait);
    expect(spyFn).toHaveBeenCalledTimes(2);
  });
});
