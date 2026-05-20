import { renderHook, waitFor } from '@testing-library/react';
import useIsInIframe from './useIsInIframe';

describe('useIsInIframe', () => {
  it('should not be inside an iframe', () => {
    const { result } = renderHook(() => useIsInIframe());
    expect(result.current).toBe(false);
  });
  it('should be inside an iframe', () => {
    window.self = window.top as any;
    const { result } = renderHook(() => useIsInIframe());
    waitFor(() => expect(result.current).toBe(true));
  });
});
