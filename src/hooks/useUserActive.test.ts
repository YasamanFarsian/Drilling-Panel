import { renderHook } from '@testing-library/react-hooks';
import useUserActive from './useUserActive';

describe('useUserActive', () => {
  it('should be active', () => {
    const { result } = renderHook(() => useUserActive());
    expect(result.current).toBeTruthy();
  });
  it('should be inactive', async () => {
    const { result } = renderHook(() => useUserActive());
    expect(result.current).toBe(true);
    // Simulate page becoming hidden
    Object.defineProperty(document, 'hidden', { value: true, writable: true });
    const visibilityChangeEvent = new Event('visibilitychange');
    document.dispatchEvent(visibilityChangeEvent);

    expect(result.current).toBe(false);
  });
});
