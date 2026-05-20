import {
  getLabelDx,
  getLabelDy,
  getYLabelPos,
  getYLabelPosOfLargeWidget,
} from './lineWithLabelHelpers';

describe('lineWithLabelHelpers', () => {
  describe('getYLabelPosOfLargeWidget', () => {
    const maxY = 100;
    const holeDepth = 50;
    const scale = { x: (input: number) => input * 2 }; // Mock scale function
    const LABEL_HEIGHT = 16; // must align with real height of label
    const LABEL_SPACE_FROM_HOLE_DEPTH = 5;
    it('should calculate yPos correctly when placementTop is true', () => {
      const yPos = getYLabelPosOfLargeWidget({ maxY, placementTop: true, holeDepth, scale });

      expect(yPos).toBe(scale.x(holeDepth) + LABEL_SPACE_FROM_HOLE_DEPTH);
    });

    it('should calculate yPos correctly when placementTop is false', () => {
      const yPos = getYLabelPosOfLargeWidget({ maxY, placementTop: false, holeDepth, scale });

      expect(yPos).toBe(scale.x(holeDepth) + LABEL_SPACE_FROM_HOLE_DEPTH + LABEL_HEIGHT);
    });

    it('should handle undefined scale gracefully', () => {
      const yPos = getYLabelPosOfLargeWidget({ maxY, placementTop: false, holeDepth });

      expect(yPos).toBe(-16);
    });

    it('should adjust yPos correctly when label overflows maxY', () => {
      const yPos = getYLabelPosOfLargeWidget({ maxY, placementTop: false, holeDepth: 90, scale });

      expect(yPos).toBe(scale.x(maxY) - LABEL_HEIGHT);
    });
  });

  describe('getYLabelPos', () => {
    const yPosLargeWidget = 100;
    const yPosSmallWidget = 50;
    it('should return yPosLargeWidget when isSmallVersion is false', () => {
      const result = getYLabelPos({ yPosLargeWidget, yPosSmallWidget, isSmallVersion: false });

      expect(result).toBe(yPosLargeWidget);
    });

    it('should return yPosSmallWidget when isSmallVersion is true', () => {
      const result = getYLabelPos({ yPosLargeWidget, yPosSmallWidget, isSmallVersion: true });

      expect(result).toBe(yPosSmallWidget);
    });

    it('should handle undefined yPosSmallWidget gracefully when isSmallVersion is true', () => {
      const result = getYLabelPos({ yPosLargeWidget, isSmallVersion: true });

      expect(result).toBeUndefined();
    });

    it('should handle undefined yPosSmallWidget gracefully when isSmallVersion is false', () => {
      const result = getYLabelPos({ yPosLargeWidget, isSmallVersion: false });

      expect(result).toBe(yPosLargeWidget);
    });
  });

  describe('getLabelDx', () => {
    const horizontalShift = 10;
    it('should return horizontalShift when isSmallVersion is true', () => {
      const result = getLabelDx({ horizontalShift, isSmallVersion: true });

      expect(result).toBe(5.333333333333333);
    });

    it('should return 0 when isSmallVersion is false', () => {
      const result = getLabelDx({ horizontalShift, isSmallVersion: false });

      expect(result).toBe(-6.4);
    });
  });

  describe('getLabelDy', () => {
    const verticalShift = 5;
    it('should return verticalShift when isSmallVersion is true', () => {
      const result = getLabelDy({ verticalShift, isSmallVersion: true });

      expect(result).toBe(3.555555555555556);
    });

    it('should return 0 when isSmallVersion is false', () => {
      const result = getLabelDy({ verticalShift, isSmallVersion: false });

      expect(result).toBe(0);
    });
  });
});
