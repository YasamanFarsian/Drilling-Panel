import { getCatesianXAxisDomain } from './getCatesianXAxisDomain';
describe('getCatesianXAxisDomain', () => {
  const mockedProps = {
    minDomain: {
      x: 0,
      y: 1.3899999,
    },
    maxDomain: {
      x: 608,
      y: 2.34444,
    },
    roundNumber: 0.1,
  };
  it('should return correct value', () => {
    const result = getCatesianXAxisDomain(mockedProps);
    expect(result).toStrictEqual({
      minDomain: { x: 0, y: 1.3 },
      maxDomain: { x: 608, y: 2.4 },
    });
  });
});
