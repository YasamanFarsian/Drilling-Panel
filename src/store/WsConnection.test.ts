import { renderHook } from '@testing-library/react-hooks';
import { useWSConnectionStore } from './WsConnection';

describe('useWSConnectionStore', () => {
  it('should have empty state on init', () => {
    const { result } = renderHook(() => useWSConnectionStore((x) => x));
    expect(result.current.wsConnectionStates).toMatchObject({});
  });
});
