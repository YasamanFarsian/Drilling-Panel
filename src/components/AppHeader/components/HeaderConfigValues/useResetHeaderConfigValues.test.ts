import { act, renderHook } from '@testing-library/react-hooks';
import useResetHeaderConfigValues, {
  RESET_INTERVAL_MS,
  RESET_TIMEOUT_MS,
} from './useResetHeaderConfigValues';

describe('useResetHeaderConfigValues', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('should start with isReset false', () => {
    const { result } = renderHook(() => useResetHeaderConfigValues());
    expect(result.current.isReset).toBeFalsy();
  });
  it(`should be isReset true after ${RESET_INTERVAL_MS}ms and reset it back to false after ${RESET_TIMEOUT_MS}ms`, () => {
    const { result } = renderHook(() => useResetHeaderConfigValues());
    expect(result.current.isReset).toBeFalsy();
    act(() => {
      jest.advanceTimersByTime(RESET_INTERVAL_MS);
    });
    expect(result.current.isReset).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(RESET_TIMEOUT_MS);
    });

    expect(result.current.isReset).toBeFalsy();
  });
});
