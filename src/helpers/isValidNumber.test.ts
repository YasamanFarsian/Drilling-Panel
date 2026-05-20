import { isValidNumber } from './isValidNumber';

describe('isValidNumber', () => {
  it('should return true for valid numbers', () => {
    expect(isValidNumber(1)).toBe(true);
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(-1)).toBe(true);
    expect(isValidNumber(1.1)).toBe(true);
  });

  it('should return false for non-numbers', () => {
    expect(isValidNumber('1')).toBe(false);
    expect(isValidNumber('test')).toBe(false);
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber({})).toBe(false);
    expect(isValidNumber([])).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(isValidNumber(NaN)).toBe(false);
  });
});
