import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { useQueryParams } from './useQueryParams';

describe('useQueryParams', () => {
  it('should return correct values', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: MemoryRouter,
    });
    expect(result.current.accessToken).toEqual(null);
  });
});
