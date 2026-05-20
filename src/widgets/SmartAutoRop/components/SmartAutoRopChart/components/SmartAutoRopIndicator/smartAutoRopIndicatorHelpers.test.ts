import { getIndicatorIconRotateAngle } from './smartAutoRopIndicatorHelpers';

describe('smartAutoRopIndicatorHelpers', () => {
  describe('getIndicatorIconRotateAngle', () => {
    it('should return 0 when dataKey is ROP and y > 0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: 0, y: 0.6, dataKey: 'ROP' });
      expect(result).toBe(0);
    });

    it('should return 180 when dataKey is ROP and y <= 0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: 0, y: 0.5, dataKey: 'ROP' });
      expect(result).toBe(180);
    });

    it('should return 90 when dataKey is RPM and x > 0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: 0.6, y: 0, dataKey: 'RPM' });
      expect(result).toBe(90);
    });

    it('should return 270 when dataKey is RPM and x <= 0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: 0.5, y: 0, dataKey: 'RPM' });
      expect(result).toBe(270);
    });

    it('should return 180 when dataKey is WOB and y < -0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: 0, y: -0.6, dataKey: 'WOB' });
      expect(result).toBe(180);
    });

    it('should return 0 when dataKey is WOB and y >= -0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: 0, y: -0.5, dataKey: 'WOB' });
      expect(result).toBe(0);
    });

    it('should return 270 when dataKey is FlowRate and x < -0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: -0.6, y: 0, dataKey: 'FlowRate' });
      expect(result).toBe(270);
    });

    it('should return 90 when dataKey is FlowRate and x >= -0.5', () => {
      const result = getIndicatorIconRotateAngle({ x: -0.5, y: 0, dataKey: 'FlowRate' });
      expect(result).toBe(90);
    });

    it('should return 0 when dataKey is not ROP, RPM, WOB or FlowRate', () => {
      // Assuming that the function is called with a wrong dataKey
      const result = getIndicatorIconRotateAngle({ x: 0, y: 0, dataKey: 'WRONG_KEY' as any });
      expect(result).toBe(0);
    });
  });
});
