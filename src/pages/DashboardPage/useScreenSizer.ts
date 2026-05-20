import { useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import { useIsZooming } from '@dt-advisory/hooks/useIsZooming';
import { useScreenSizeStore } from '@dt-advisory/store/ScreenSizeStore';

//the purpose of this store for keep the height and width of a screen size. The main problem whenever users resize the window
// window.eventListener(“resize“)
export const useScreenSizer = () => {
  const { observe, width, height } = useDimensions();
  const setScreenSize = useScreenSizeStore((state) => state.setScreenSize);
  const _height = useScreenSizeStore((state) => state.height);
  const _width = useScreenSizeStore((state) => state.width);

  const { isZooming } = useIsZooming();

  useEffect(() => {
    if (height !== 0 && width !== 0 && !isZooming) {
      setScreenSize(width, height);
    }
  }, [width, height, _height, _width, setScreenSize, isZooming]);

  return observe;
};
