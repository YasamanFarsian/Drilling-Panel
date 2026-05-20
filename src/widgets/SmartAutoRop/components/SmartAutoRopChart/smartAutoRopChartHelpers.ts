import { Theme } from '@emotion/react';
import { isValidNumber } from '@dt-advisory/helpers/isValidNumber';
import { SmartRopDataKeyType } from '../../SmartAutoRopTypes';

const DESIGN_CHART_WIDTH = 582;
const DESIGN_INDICATOR_RADIUS = 16.295;

export type GetPieSliceColorPropsType = {
  dataKey: SmartRopDataKeyType;
  activeDataKeys: SmartRopDataKeyType[];
  theme: Theme;
  inactive: boolean;
};

export const getPieSliceColor = ({
  dataKey,
  activeDataKeys,
  theme,
  inactive,
}: GetPieSliceColorPropsType) => {
  if (inactive) return theme.smartAutoRop.chart.inactiveSlice;

  if (activeDataKeys.includes(dataKey)) {
    return theme.smartAutoRop.chart.activeSlice;
  }

  return theme.smartAutoRop.chart.slice;
};

export const getChartSize = ({
  containerWidth,
  containerHeight,
}: {
  containerWidth: number;
  containerHeight: number;
}) => {
  return Math.min(containerWidth, containerHeight);
};

export const getPieRadius = ({
  chartContentSize,
  thresholdLimit,
}: {
  chartContentSize: number;
  thresholdLimit: number;
}) => {
  const pieRadius = chartContentSize / 4;

  if (!isValidNumber(thresholdLimit) || thresholdLimit <= 0) {
    return { pieInnerRadius: pieRadius - 0.5, pieOuterRadius: pieRadius + 0.5 };
  }

  const thresholdInDecimal = Math.min(thresholdLimit, 100) / 100;
  const pieInnerRadius = pieRadius - pieRadius * thresholdInDecimal;
  const pieOuterRadius = pieRadius + pieRadius * thresholdInDecimal;

  return { pieInnerRadius, pieOuterRadius };
};

export const getScaleIndicatorRadius = ({ chartSize }: { chartSize: number }) => {
  const indicatorScaleFactor = DESIGN_INDICATOR_RADIUS / DESIGN_CHART_WIDTH;
  const indicatorRadius = indicatorScaleFactor * chartSize;

  return indicatorRadius;
};

export const getChartContentSize = ({
  chartSize,
  domainPadding,
}: {
  chartSize: number;
  domainPadding: number;
}) => {
  return chartSize - domainPadding * 2;
};
