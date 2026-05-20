import { getFormattedValue, getValue } from './OperationHelper';

describe('OperationHelper', () => {
  it('should return - ', () => {
    const result = getValue();
    expect(result).toEqual('-');
  });

  it('should return max 3 decimal points ', () => {
    const result = getFormattedValue(0.1234);
    expect(result).toEqual(0.123);
  });

  it('should return int ', () => {
    const result = getFormattedValue(1234);
    expect(result).toEqual(1234);
  });

  it('should return - ', () => {
    const result = getFormattedValue();
    expect(result).toEqual('-');
  });

  it('should return - ', () => {
    const result = getFormattedValue(NaN);
    expect(result).toEqual('-');
  });

  it('should return - ', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const foo: any = 'foo';
    const result = getFormattedValue(foo);
    expect(result).toEqual('-');
  });
});
