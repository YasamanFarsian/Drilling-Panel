import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { retinaMediaQuery, useZoomScale } from './useZoomScale';

describe('hook: useZoomScale', () => {
  beforeAll(() => {
    window.devicePixelRatio = 1;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        const instance = new EventTarget() as MediaQueryList;
        Object.assign(instance, {
          media: query,
          matches: query === retinaMediaQuery ? false : true,
        });

        window.addEventListener('resize', () => {
          instance.dispatchEvent(new Event('change'));
        });

        return instance;
      }),
    });

    Object.defineProperty(window, 'navigator', {
      value: {
        ...navigator,
        userAgent: 'Win',
      },
      writable: true,
    });
  });

  it('useZoomScale should return proper results', () => {
    const { result } = renderHook(() => useZoomScale());
    expect(result.current).toEqual(1);
  });

  it('useZoomScale should update when devicePixelRatio changes on window', () => {
    const { result } = renderHook(() => useZoomScale());
    expect(result.current).toEqual(1);
    window.devicePixelRatio = 2;
    fireEvent(window, new Event('resize'));

    expect(result.current).toEqual(2);
  });

  it('useZoomScale should alway return 1 when not on window', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        ...navigator,
        userAgent: 'Mac',
      },
      writable: true,
    });

    const { result } = renderHook(() => useZoomScale());
    expect(result.current).toEqual(1);
    fireEvent(window, new Event('resize'));

    window.devicePixelRatio = 2;
    expect(result.current).toEqual(1);
  });
});
