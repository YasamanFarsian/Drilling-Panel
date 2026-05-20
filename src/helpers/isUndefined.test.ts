import { isUndefined } from './isUndefined';

describe('isUndefined', () => {
  it('should return true when the input is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should return false when the input is null', () => {
    expect(isUndefined(null)).toBe(false);
  });

  it('should return false for non-null and non-undefined values', () => {
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(false)).toBe(false);
  });
});
