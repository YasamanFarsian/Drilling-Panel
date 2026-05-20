import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useScreenSizeStore } from '@dt-advisory/store/ScreenSizeStore';
import { useIsZooming } from './useIsZooming';

jest.mock('@dt-advisory/store/ScreenSizeStore');

describe('useIsZooming', () => {
  // Mock addEventListener and removeEventListener
  const addMock = jest.spyOn(window, 'addEventListener');
  const removeMock = jest.spyOn(window, 'removeEventListener');

  afterEach(() => {
    addMock.mockClear();
    removeMock.mockClear();
  });

  it('adds and removes the resize event listener', () => {
    renderHook(() => useScreenSizeStore());
    const { unmount } = renderHook(() => useIsZooming());
    expect(addMock).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();
    expect(removeMock).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('updates isZooming based on devicePixelRatio changes', () => {
    (useScreenSizeStore as unknown as jest.Mock).mockReturnValue({
      width: 1920,
      height: 1080,
    });
    // Initial mock
    Object.defineProperty(window, 'devicePixelRatio', {
      value: 2,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useIsZooming());
    expect(result.current.isZooming).toBe(false);

    // Simulate change in devicePixelRatio
    act(() => {
      Object.defineProperty(window, 'devicePixelRatio', {
        value: 3,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event('resize'));
    });
    waitFor(() => expect(result.current.isZooming).toBe(true));

    // Reset to the same pixel ratio; should not change isZooming
    act(() => {
      Object.defineProperty(window, 'devicePixelRatio', {
        value: 3,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event('resize'));
    });
    waitFor(() => expect(result.current.isZooming).toBe(true));
  });
});
