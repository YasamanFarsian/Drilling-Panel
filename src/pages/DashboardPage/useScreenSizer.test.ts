import { renderHook } from '@testing-library/react-hooks';
import useDimensions from 'react-cool-dimensions';
import { useIsZooming } from '@dt-advisory/hooks/useIsZooming';
import { useScreenSizeStore } from '@dt-advisory/store/ScreenSizeStore';
import { useScreenSizer } from './useScreenSizer';

jest.mock('react-cool-dimensions');
jest.mock('@dt-advisory/store/ScreenSizeStore');
jest.mock('@dt-advisory/hooks/useIsZooming');

describe('useScreenSizer', () => {
  const setScreenSize = jest.fn().mockImplementation((width: number, height: number) => void 0);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('it should set width: 300 and height: 400 when isZooming = false, height is not equal zero and width not equal zero', () => {
    (useIsZooming as unknown as jest.Mock).mockReturnValue({
      isZooming: false,
    });
    (useDimensions as unknown as jest.Mock).mockReturnValue({
      width: 300,
      height: 400,
    });
    (useScreenSizeStore as unknown as jest.Mock).mockReturnValue(setScreenSize);

    renderHook(() => useScreenSizer());

    expect(setScreenSize).toHaveBeenCalled();
    expect(setScreenSize).toBeCalledWith(300, 400);
  });

  it('it should not set width: 300 and height: 400 when isZooming = true', () => {
    (useIsZooming as unknown as jest.Mock).mockReturnValue({
      isZooming: true,
    });
    (useDimensions as unknown as jest.Mock).mockReturnValue({
      width: 300,
      height: 400,
    });
    (useScreenSizeStore as unknown as jest.Mock).mockReturnValue(setScreenSize);

    renderHook(() => useScreenSizer());

    expect(setScreenSize).not.toHaveBeenCalled();
    expect(setScreenSize).not.toBeCalledWith(300, 400);
  });
});
