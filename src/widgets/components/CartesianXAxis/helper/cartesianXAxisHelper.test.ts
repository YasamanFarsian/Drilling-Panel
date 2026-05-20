import { getDomainValue, getText } from './cartesianXAxisHelper';

describe('cartesianXAxisHelper', () => {
  describe('getText', () => {
    it('should be return empty string when index modulas with 2 the result not equal 0', () => {
      const text = getText('1234', 3);
      expect(text).toBe('');
    });

    it('should be return "1234" if index modulas with 2 and result is equal 0', () => {
      const text = getText('1234', 4);
      expect(text).toBe('1234');
    });
  });

  describe('getDomainValue', () => {
    it('it should be return min and max which are passed by props when isRound is false', () => {
      const { minDomain, maxDomain } = getDomainValue({
        minValue: 0,
        maxValue: 1.81,
        isRound: false,
        roundNumber: 0,
      });

      expect(minDomain).toBe(0);
      expect(maxDomain).toBe(1.81);
    });

    it('it should be return round min and round max which are passed by props when isRound is true', () => {
      const { minDomain, maxDomain } = getDomainValue({
        minValue: 1.4,
        maxValue: 42,
        isRound: true,
        roundNumber: 0.1,
      });

      expect(minDomain).toBe(1.4);
      expect(maxDomain).toBe(42);
    });
  });
});
