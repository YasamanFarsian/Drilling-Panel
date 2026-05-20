import { renderHook } from '@testing-library/react-hooks';
import { MutableRefObject } from 'react';
import { useResponsiveDimension } from './useResponsiveDimension';

describe('hook: useResponsiveDimension', () => {
  it('useResponsiveDimension should return proper results', () => {
    const { result } = renderHook(() => useResponsiveDimension({} as MutableRefObject<null>));
    expect(result.current).toMatchObject({
      height: undefined,
      width: undefined,
    });
  });
});
