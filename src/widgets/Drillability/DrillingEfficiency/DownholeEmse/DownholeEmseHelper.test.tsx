import { calculateStartAngle } from './DownholeEmseHelper';

describe('calculateStartAngle function', () => {
  it('calculates the start angle correctly', () => {
    const startAngle = calculateStartAngle(5, 0, 10);
    expect(startAngle).toBe(0);
  });

  it('calculates the start angle correctly for maximum value', () => {
    const startAngle = calculateStartAngle(10, 0, 10);
    expect(startAngle).toBe(90);
  });
});
