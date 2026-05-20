import { useEffect, useState } from 'react';
import { useScreenSizeStore } from '@dt-advisory/store/ScreenSizeStore';

export const useIsZooming = () => {
  const width = useScreenSizeStore((state) => state.width);
  const height = useScreenSizeStore((state) => state.height);
  const [isZooming, setIsZooming] = useState(false);

  // we need the actual width and height that is not affected by user zoom
  const realScreenWidth = width;
  const realScreenHeight = height;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleZoomChange = () => {
    if (window.devicePixelRatio % 1 !== 0) {
      setIsZooming(true);
    } else {
      setIsZooming(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleZoomChange);

    return () => {
      window.removeEventListener('resize', handleZoomChange);
    };
  }, [handleZoomChange]);

  useEffect(() => {
    handleZoomChange();
  }, [handleZoomChange]);

  return {
    isZooming,
    realScreenWidth,
    realScreenHeight,
  };
};
