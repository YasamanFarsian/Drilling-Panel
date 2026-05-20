/* eslint-disable max-lines-per-function */
import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';

export const ON_RESIZE_END_TIMEOUT = 100;
export type DimensionType = {
  width?: number;
  height?: number;
};

export function useResponsiveDimension(
  ref: MutableRefObject<HTMLDivElement | null>,
  isWindowResizingEffectInWidgetStore = true,
): DimensionType {
  const dom = ref.current;
  const initial = useMemo(() => dom?.parentElement?.getBoundingClientRect(), [dom]);
  const { setIsWindowResizing } = useWidgetSettingsStore();
  const [resizeEnd, setResizeEnd] = useState(true);
  const [dimension, setDimension] = useState<DimensionType>({
    width: initial?.width,
    height: initial?.height,
  });

  // init resize
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      isWindowResizingEffectInWidgetStore && setIsWindowResizing(true);
      setResizeEnd(false);
      timeoutId = setTimeout(() => setResizeEnd(true), ON_RESIZE_END_TIMEOUT);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      setDimension({
        width: dom?.getBoundingClientRect()?.width,
        height: dom?.getBoundingClientRect()?.height,
      });
      isWindowResizingEffectInWidgetStore && setIsWindowResizing(false);
    };

    if (dom && resizeEnd) {
      update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dom, resizeEnd]);

  return dimension;
}
