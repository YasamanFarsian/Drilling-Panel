import { getBucklingLimitY0, getTensileLimitY0 } from './transientMechanicalDragChartHelpers';

describe('transientMechanicalDragChartHelpers', () => {
  describe('getBucklingLimitY0 function', () => {
    it('should return 0 when minDomain is undefined', () => {
      expect(getBucklingLimitY0({})).toBe(0);
    });

    it('should return 0 when minDomain is a number', () => {
      expect(getBucklingLimitY0({ minDomain: 5 })).toBe(0);
    });

    it('should return the y value when minDomain is an object with a y property', () => {
      expect(getBucklingLimitY0({ minDomain: { y: 10 } })).toBe(10);
    });

    it('should return 0 when minDomain is an object without a y property', () => {
      expect(getBucklingLimitY0({ minDomain: {} })).toBe(0);
    });
  });

  describe('getTensileLimitY0 function', () => {
    it('should return 0 when maxDomain is undefined', () => {
      expect(getTensileLimitY0({})).toBe(0);
    });

    it('should return 0 when maxDomain is a number', () => {
      expect(getTensileLimitY0({ maxDomain: 5 })).toBe(0);
    });

    it('should return the y value when maxDomain is an object with a y property', () => {
      expect(getTensileLimitY0({ maxDomain: { y: 10 } })).toBe(10);
    });

    it('should return 0 when maxDomain is an object without a y property', () => {
      expect(getTensileLimitY0({ maxDomain: {} })).toBe(0);
    });
  });
});
