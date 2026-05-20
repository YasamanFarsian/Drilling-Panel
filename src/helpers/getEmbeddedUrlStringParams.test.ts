import { mockUrlStringParams } from '@dt-advisory/helpers/tests/mock/urlStringParams';
import getEmbeddedUrlStringParams from './getEmbeddedUrlStringParams';

describe('getEmbeddedUrlStringParams', () => {
  it('should return undefined', () => {
    const result = getEmbeddedUrlStringParams();
    expect(result).toBeUndefined();
  });
  it('should return embedded access token', () => {
    mockUrlStringParams();
    const result = getEmbeddedUrlStringParams();
    expect(result).toEqual('mocked-access-token');
  });
});
