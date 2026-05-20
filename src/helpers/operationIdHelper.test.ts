import { validateOperationId } from './operationIdHelper';

describe('validateOperationId', () => {
  it('should be a valid string number 1', () => {
    const result = validateOperationId('1');
    expect('string' === typeof result).toBeTruthy();
    expect(result).toEqual('1');
  });

  it('should be a valid string number 0', () => {
    const result = validateOperationId('0');
    expect('string' === typeof result).toBeTruthy();
    expect(result).toEqual('0');
  });

  it('should be a valid string number 123', () => {
    const result = validateOperationId('123');
    expect('string' === typeof result).toBeTruthy();
    expect(result).toEqual('123');
  });

  it('should be return null if undefined', () => {
    const result = validateOperationId();
    expect(result).toEqual(null);
  });

  it('should be return null if empty string', () => {
    const result = validateOperationId('');
    expect(result).toEqual(null);
  });

  it('should be return null if string does not contain only digits', () => {
    const result = validateOperationId('23A1');
    expect(result).toEqual(null);
  });

  it('should be return null if string contains special chars', () => {
    const result = validateOperationId("*|231_/-/\b\r'\n\t");
    expect(result).toEqual(null);
  });

  it('should be return valid string if it contains space chars', () => {
    const result = validateOperationId('101 ');
    expect(result).toEqual('101');
  });

  it('should be return valid string if it contains space chars', () => {
    const result = validateOperationId(' 101 ');
    expect(result).toEqual('101');
  });
});
