import { scalePxAsVmin } from './viewportUnitHelpers';

describe('scalePxAsVmin', () => {
  it('should return 18 when width and height of window is 1920 and 1080', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    });
    const size = scalePxAsVmin(18);
    expect(size).toBe(18);
  });

  it('should return 8.4375 when scalePxAsVw return value less than scalePxAsVh', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 900,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    });
    const size = scalePxAsVmin(18);
    expect(size).toBe(8.4375);
  });

  it('should return 8.333333333333334 when scalePxAsVh return value less than scalePxAsVw', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 900,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 500,
    });
    const size = scalePxAsVmin(18);
    expect(size).toBe(8.333333333333334);
  });
});
