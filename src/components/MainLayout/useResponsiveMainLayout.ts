/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable complexity, max-lines-per-function */
import { useEffect, useRef } from 'react';
import { useIsZooming } from '@dt-advisory/hooks/useIsZooming';
import { useResponsiveDimension } from '@dt-advisory/hooks/useResponsiveDimension';
import { useZoomScale } from '@dt-advisory/hooks/useZoomScale';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { DEFAULT_LABEL_STYLE, SAFEGUIDES_CUSTOM_PADDING } from '@dt-advisory/styles/constants';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { getCurrentWidgetPadding, getRootFontSize } from './responsiveMainLayoutHelper';

const useResponsiveMainLayout = () => {
  const { isZooming, realScreenWidth, realScreenHeight } = useIsZooming();
  const prevRootFontSize = useWidgetSettingsStore((x) => x.rootFontSize);
  const currentZoom = useZoomScale();
  const setPrevRootFontSize = useWidgetSettingsStore((x) => x.setRootFontSize);
  const setWidgetFontSize = useWidgetSettingsStore((x) => x.setWidgetFontSize);
  const setWidgetYAxisPadding = useWidgetSettingsStore((x) => x.setWidgetYAxisPadding);
  const setWidgetXAxisOffset = useWidgetSettingsStore((x) => x.setWidgetXAxisOffset);
  const setWidgetXSpacingTickValues = useWidgetSettingsStore((x) => x.setWidgetXSpacingTickValues);
  const setWidgetCustomPadding = useWidgetSettingsStore((x) => x.setWidgetCustomPadding);
  const setSafeguidesCustomPadding = useWidgetSettingsStore((x) => x.setSafeguidesCustomPadding);
  const mainLayoutRef = useRef<HTMLDivElement>(null);
  const { width, height } = useResponsiveDimension(mainLayoutRef, false);

  useEffect(() => {
    if (width && height) {
      const nextFontSize =
        getRootFontSize({ width: realScreenWidth, height: realScreenHeight }) / currentZoom;
      setPrevRootFontSize(nextFontSize);
      const widgetFontSize = scalePxAsVh(DEFAULT_LABEL_STYLE.fontSize);
      setWidgetFontSize(widgetFontSize);

      const { widgetPadding, yAxisPadding, xAxisSpaceTickLabel, xAxisOffset } =
        getCurrentWidgetPadding(width);

      const widgetCustomPadding = {
        left: scalePxAsVw(widgetPadding.left),
        right: scalePxAsVw(widgetPadding.right),
        top: scalePxAsVh(widgetPadding.top),
        bottom: scalePxAsVh(widgetPadding.bottom),
      };

      setWidgetCustomPadding(widgetCustomPadding);

      setWidgetYAxisPadding(scalePxAsVmin(yAxisPadding));

      setWidgetXSpacingTickValues(scalePxAsVmin(xAxisSpaceTickLabel));

      setWidgetXAxisOffset(scalePxAsVh(xAxisOffset));

      const safeguidesCustomPadding = {
        left: scalePxAsVmin(SAFEGUIDES_CUSTOM_PADDING.left),
        right: scalePxAsVmin(SAFEGUIDES_CUSTOM_PADDING.right),
        top: scalePxAsVmin(SAFEGUIDES_CUSTOM_PADDING.top),
        bottom: scalePxAsVmin(SAFEGUIDES_CUSTOM_PADDING.bottom),
      };
      setSafeguidesCustomPadding(safeguidesCustomPadding);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realScreenWidth, realScreenHeight, width, height, window.devicePixelRatio, isZooming]);

  //
  useEffect(() => {
    const rootEl = document.documentElement;
    rootEl.style.fontSize = `${prevRootFontSize}%`;
  }, [prevRootFontSize]);

  return mainLayoutRef;
};

export default useResponsiveMainLayout;
