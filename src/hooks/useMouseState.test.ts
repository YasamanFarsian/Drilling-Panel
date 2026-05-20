import { renderHook } from '@testing-library/react-hooks';
import { useMouseState } from './useMouseState';

describe('hook: useMouseState', () => {
  it('useMouseState should return default value as false', () => {
    const { result } = renderHook(() => useMouseState());
    expect(result.current).toBeFalsy();
  });
});
