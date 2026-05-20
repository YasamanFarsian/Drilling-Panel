import { act, renderHook } from '@testing-library/react-hooks';
import useHasUserBeenInactive from './useHasUserBeenInactive';

describe('useHasUserBeenInactive', () => {
  it('should be active', () => {
    const { result } = renderHook(() => useHasUserBeenInactive());
    expect(result.current.hasUserBeenInactive).toBeFalsy();
  });
  it('should be inactive', async () => {
    const { result } = renderHook(() => useHasUserBeenInactive());
    expect(result.current.hasUserBeenInactive).toBe(false);
    // Simulate page becoming hidden
    Object.defineProperty(document, 'hidden', { value: true, writable: true });
    const visibilityChangeEvent = new Event('visibilitychange');
    document.dispatchEvent(visibilityChangeEvent);
    // Simulate page becoming visible
    Object.defineProperty(document, 'hidden', { value: false, writable: true });
    const visibilityChangeEventBack = new Event('visibilitychange');
    document.dispatchEvent(visibilityChangeEventBack);

    expect(result.current.hasUserBeenInactive).toBe(true);
  });
  it('should be set to inactive', () => {
    const { result } = renderHook(() => useHasUserBeenInactive());
    act(() => {
      result.current.setHasBeenInactive();
    });
    expect(result.current.hasUserBeenInactive).toBe(false);
  });
});
