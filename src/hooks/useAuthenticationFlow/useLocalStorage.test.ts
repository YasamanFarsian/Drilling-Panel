import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('hook: useLocalStorage', () => {
  it('useLocalStorage should return proper values', () => {
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'));

    expect(result.current.length).toEqual(2);
    expect(result.current[0]).toEqual('bar');
    expect('function' === typeof result.current[1]).toBeTruthy();
    act(() => {
      result.current[1]('barbar');
    });
    expect(result.current[0]).toEqual('barbar');
  });
});
