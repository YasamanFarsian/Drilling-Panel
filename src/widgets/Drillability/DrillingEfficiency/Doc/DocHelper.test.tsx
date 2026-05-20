import { calculateStartAngle } from './DocHelper';

describe('calculateStartAngle function', () => {
  it('should calculate start angle correctly', () => {
    const angle1 = calculateStartAngle(5, 0, 10);
    expect(angle1).toBe(90);

    const angle2 = calculateStartAngle(0, -10, 10);
    expect(angle2).toBe(90);

    const angle3 = calculateStartAngle(10, 0, 20);
    expect(angle3).toBe(90);

    const angle5 = calculateStartAngle(2, 0, 5);
    expect(angle5).toBe(72);
  });
});
