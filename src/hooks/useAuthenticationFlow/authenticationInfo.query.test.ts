import fetchAuthenticationInfo from './authenticationInfo.query';

global.fetch = jest.fn();

describe('fetchAuthenticationInfo', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return true', async () => {
    // Arrange
    const mockResponse = {
      ok: true,
      json: async () => ({ isCustomer: true }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    const result = await fetchAuthenticationInfo('');
    expect(result).toBeTruthy();
  });
});
