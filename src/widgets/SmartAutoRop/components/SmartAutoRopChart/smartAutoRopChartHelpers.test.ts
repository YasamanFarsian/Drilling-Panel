import { scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import {
  getChartContentSize,
  getChartSize,
  getPieRadius,
  getPieSliceColor,
  GetPieSliceColorPropsType,
  getScaleIndicatorRadius,
} from './smartAutoRopChartHelpers';

describe('smartAutoRopChartHelpers', () => {
  describe('getPieSliceColor', () => {
    const mockData: GetPieSliceColorPropsType = {
      dataKey: 'FlowRate',
      activeDataKeys: [],
      inactive: false,
      theme: {
        smartAutoRop: {
          chart: {
            slice: '#SLICECOLOR',
            activeSlice: '#ACTIVESLICECOLOR',
            inactiveSlice: '#INACTIVESLICECOLOR',
          },
        },
      } as any,
    };

    it('should return color from slice by default', () => {
      const color = getPieSliceColor(mockData);

      expect(color).toEqual(mockData.theme.smartAutoRop.chart.slice);
    });

    it('should return inactive color', () => {
      const color = getPieSliceColor({ ...mockData, inactive: true });

      expect(color).toEqual(mockData.theme.smartAutoRop.chart.inactiveSlice);
    });

    it('should return color from activeSlice if dataKey is existed in activeDataKeys', () => {
      const color = getPieSliceColor({
        ...mockData,
        dataKey: 'FlowRate',
        activeDataKeys: ['FlowRate'],
      });

      expect(color).toEqual(mockData.theme.smartAutoRop.chart.activeSlice);
    });
  });

  describe('getChartSize', () => {
    it('should return container width when the container width is less than the container height', () => {
      const chartSize = getChartSize({ containerWidth: 100, containerHeight: 200 });

      expect(chartSize).toBe(100);
    });

    it('should return container height when the container height is less than the container width', () => {
      const chartSize = getChartSize({ containerWidth: 300, containerHeight: 200 });

      expect(chartSize).toBe(200);
    });

    it('should return either of the input when the container width is equal to the container height', () => {
      const chartSize = getChartSize({ containerWidth: 200, containerHeight: 200 });

      expect(chartSize).toBe(200);
    });
  });

  describe('scalePxAsVw', () => {
    it('should return 12 if desiredPx is 12px and screen width is 1920 (default screen)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      const scaledPx = scalePxAsVw(12);

      expect(scaledPx).toBeCloseTo(12, 0);
    });

    it('should return 24 if desiredPx is 12px and screen width is 3840 (4k screen)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 3840,
      });
      const scaledPx = scalePxAsVw(12);

      expect(scaledPx).toBeCloseTo(24, 0);
    });

    it('should return 8 if desiredPx is 12px and screen width is 1280 (720p screen)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      });
      const scaledPx = scalePxAsVw(12);

      expect(scaledPx).toBeCloseTo(8, 0);
    });
  });

  describe('getPieRadius', () => {
    it('should return 1px width if thresholdLimit is NaN', () => {
      const { pieInnerRadius, pieOuterRadius } = getPieRadius({
        chartContentSize: 500,
        thresholdLimit: NaN,
      });

      expect(pieInnerRadius).toBeCloseTo(124.5, 1);
      expect(pieOuterRadius).toBeCloseTo(125.5, 1);
    });

    it('should return 1px width if thresholdLimit is 0', () => {
      const { pieInnerRadius, pieOuterRadius } = getPieRadius({
        chartContentSize: 500,
        thresholdLimit: NaN,
      });

      expect(pieInnerRadius).toBeCloseTo(124.5, 1);
      expect(pieOuterRadius).toBeCloseTo(125.5, 1);
    });

    it('should return chartContentSize/4 - (chartContentSize/4 * 0.1) for pieInnerRadius and chartContentSize/4 + (chartContentSize/4 * 0.1) for pieOuterRadius if thresholdLimit is 10', () => {
      const { pieInnerRadius, pieOuterRadius } = getPieRadius({
        chartContentSize: 500,
        thresholdLimit: 10,
      });

      expect(pieInnerRadius).toBeCloseTo(112.5, 1);
      expect(pieOuterRadius).toBeCloseTo(137.5, 1);
    });

    it('should return 0 for pieInnerRadius and (chartContentSize/4)*2 for pieOuterRadius if thresholdLimit is over than 100', () => {
      const { pieInnerRadius, pieOuterRadius } = getPieRadius({
        chartContentSize: 500,
        thresholdLimit: 101,
      });

      expect(pieInnerRadius).toBeCloseTo(0, 0);
      expect(pieOuterRadius).toBeCloseTo(250, 0);
    });
  });

  describe('getScaleIndicatorRadius', () => {
    it('should calculate correct indicator radius for chart size of 200', () => {
      const indicatorRadius = getScaleIndicatorRadius({ chartSize: 200 });

      expect(indicatorRadius).toBeCloseTo(5.6, 2);
    });

    it('should calculate correct indicator radius for chart size of 1000', () => {
      const indicatorRadius = getScaleIndicatorRadius({ chartSize: 1000 });

      expect(indicatorRadius).toBeCloseTo(28, 2);
    });
  });

  describe('getChartContentSize', () => {
    it('should minus doulbe of domainPadding from chartSize', () => {
      const chartContentSize = getChartContentSize({
        chartSize: 500,
        domainPadding: 50,
      });

      expect(chartContentSize).toEqual(400);
    });
  });
});
