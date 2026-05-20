import { renderHook } from '@testing-library/react-hooks';
import { useTimeoutConnect, useTimer } from './useTimer';

describe('hooks: useTimer & useTimeoutConnect', () => {
  it('useTimer should each property as a string', () => {
    const { result } = renderHook(() => useTimer());
    expect('string' === typeof result.current.seconds).toBeTruthy();
    expect('string' === typeof result.current.minutes).toBeTruthy();
    expect('string' === typeof result.current.hours).toBeTruthy();
  });

  it('useTimer should return each property with 2 characters', () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.seconds.length).toEqual(2);
    expect(result.current.minutes.length).toEqual(2);
    expect(result.current.hours.length).toEqual(2);
  });

  it('useTimeoutConnect should return property isConnectionTimeout to be falsy', () => {
    const { result } = renderHook(() => useTimeoutConnect());

    expect(result.current.isConnectionTimeout).toBeFalsy();
  });

  it('useTimeoutConnect should return object with 4 properties', () => {
    const { result } = renderHook(() => useTimeoutConnect());

    expect(Object.keys(result.current).length).toEqual(5);
  });

  it('useTimeoutConnect should return object with properties with correct types', () => {
    const { result } = renderHook(() => useTimeoutConnect());

    expect('boolean' === typeof result.current.isConnectionTimeout).toBeTruthy();
    expect('number' === typeof result.current.seconds).toBeTruthy();
    expect('function' === typeof result.current.reset).toBeTruthy();
    expect('function' === typeof result.current.pause).toBeTruthy();
  });
});
