import { mapWithKeyId } from './keyId';

describe('mapWithKeyId', () => {
  it('should return list with `key`', () => {
    const result = mapWithKeyId(['1', '2', '3']);
    const el = result[0];
    expect(el.key).toBeDefined();
    expect(el.value).toEqual('1');
  });
  it('should return empty list', () => {
    const result = mapWithKeyId([]);
    expect(result.length).toEqual(0);
  });
});
