import { calculationDuration } from './baseSnackbarHelpers';

describe('baseSnackbarHelpers', () => {
  describe('calculationDuration', () => {
    it('should return defaultDuration when text is less than 3 words', () => {
      const result = calculationDuration('Hello world');
      expect(result).toEqual(3000);
    });

    it('should return properly when text is more than 3 words', () => {
      const result = calculationDuration('test test test test test');
      expect(result).toEqual(3500);
    });

    it('should return maximum duration 10 seconds when text is too long', () => {
      const result = calculationDuration(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      );
      expect(result).toEqual(10000);
    });
  });
});
