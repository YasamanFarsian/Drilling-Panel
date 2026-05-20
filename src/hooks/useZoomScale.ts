import { useEffect, useState } from 'react';

export const retinaMediaQuery =
  'screen and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi)';

const DEFAULT_ZOOM_SCALE = 1;

export const isRetina = () => {
  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return matchMedia(retinaMediaQuery).matches;
  }

  return false;
};

const isWindow = () => {
  if (navigator?.userAgent.includes('Win')) {
    return true;
  }

  return false;
};

export const getZoomScale = () =>
  isRetina() ? window.devicePixelRatio / 1.8 : window.devicePixelRatio;

export const useZoomScale = () => {
  const [currentDpr, setCurrentDpr] = useState(window.devicePixelRatio);
  const [currentZoom, setCurrentZoom] = useState(() => {
    if (typeof window !== 'undefined' && 'devicePixelRatio' in window && isWindow()) {
      return getZoomScale();
    }

    return DEFAULT_ZOOM_SCALE;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !isWindow() || !('matchMedia' in window)) {
      return;
    }

    const update = () => {
      setCurrentDpr(window.devicePixelRatio);
      setCurrentZoom(getZoomScale());
    };

    const mediaMatcher = window.matchMedia(`(resolution: ${currentDpr}dppx)`);

    mediaMatcher.addEventListener('change', update);

    return () => {
      mediaMatcher.removeEventListener('change', update);
    };
  }, [currentDpr]);

  return currentZoom;
};
