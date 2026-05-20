import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { useIsZooming } from '@dt-advisory/hooks/useIsZooming';
import { ON_RESIZE_END_TIMEOUT } from '@dt-advisory/hooks/useResponsiveDimension';
import { DEFAULT_ROOT_FONT_SIZE } from '@dt-advisory/styles/constants';
import { SCREENS } from './responsiveMainLayoutHelper';
import useResponsiveMainLayout from './useResponsiveMainLayout';

const windowResizeSpy = jest.fn();
jest.mock('@dt-advisory/hooks/useResponsiveDimension', () => {
  return {
    useResponsiveDimension: jest
      .fn()
      .mockReturnValueOnce({
        width: 1920,
        height: 1080,
      })
      .mockReturnValue({
        width: 600,
        height: 960,
      }),
  };
});

jest.mock('@dt-advisory/hooks/useZoomScale', () => {
  return {
    useZoomScale: jest.fn().mockReturnValue(1),
  };
});

jest.mock('@dt-advisory/hooks/useIsZooming');

beforeAll(() => {
  window.addEventListener('resize', windowResizeSpy);
});

describe('useResponsiveMainLayout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (useIsZooming as unknown as jest.Mock).mockReturnValue({
      realScreenWidth: SCREENS.laptopDefault.width,
      realScreenHeight: SCREENS.laptopDefault.height,
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should not call window on resize and should expect root ellement to have DEFAULT_ROOT_FONT_SIZE', () => {
    jest.restoreAllMocks();
    renderHook(() => useResponsiveMainLayout());
    expect(windowResizeSpy).not.toHaveBeenCalled();
    const rootEl = document.documentElement;
    expect(rootEl.style.fontSize).toEqual(`${DEFAULT_ROOT_FONT_SIZE}%`);
  });
  it('should call window on resize', async () => {
    jest.restoreAllMocks();
    (useIsZooming as unknown as jest.Mock).mockReturnValue({
      realScreenWidth: SCREENS.Nexus7.width,
      realScreenHeight: SCREENS.Nexus7.height,
    });
    const rootEl = document.documentElement;
    const { result } = renderHook(() => useResponsiveMainLayout());
    render(<div ref={result.current}>Foo</div>);
    act(() => {
      window.innerWidth = SCREENS.Nexus7.width;
      window.innerHeight = SCREENS.Nexus7.height;
      fireEvent(window, new Event('resize'));
      jest.advanceTimersByTime(ON_RESIZE_END_TIMEOUT);
    });
    expect(windowResizeSpy).toHaveBeenCalled();
    expect(window.innerWidth).toEqual(SCREENS.Nexus7.width);
    expect(window.innerHeight).toEqual(SCREENS.Nexus7.height);
    await waitFor(() => expect(rootEl.style.fontSize).toEqual('35.5%'));
  });
});
