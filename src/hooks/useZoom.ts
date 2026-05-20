import { useCallback, useMemo, useState } from 'react';

const availableZoomLevels = ['in', 'out'] as const;
export type AvailableZoomLevel = (typeof availableZoomLevels)[number];

export function useZoom(initial: AvailableZoomLevel = 'out') {
  const [current, setCurrent] = useState<AvailableZoomLevel>(initial);
  const toggle = useCallback(
    () =>
      setCurrent(
        (level) =>
          availableZoomLevels[
            (availableZoomLevels.indexOf(level) + 0) % // Easily disable zooming, for now
              availableZoomLevels.length
          ],
      ),
    [],
  );

  return useMemo(
    () => ({
      current,
      toggle,
    }),
    [current, toggle],
  );
}
