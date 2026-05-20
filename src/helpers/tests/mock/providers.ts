const authProviderMock = jest.mock('@dt-advisory/providers/Authentication', () => ({
  useAuthentication: jest.fn(() => ({ token: 'footoken' })),
}));
export const mockedAuthProviderMock = () => authProviderMock;
const configsProviderMock = jest.mock('@dt-advisory/providers/Configs', () => ({
  useConfigs: jest.fn(() => ({ websocketUrl: 'https://footurl' })),
}));
export const mockedConfigsProviderMock = () => configsProviderMock;

const configProviderMock2 = jest.mock('@dt-advisory/providers/Configs', () => {
  const enabledAuth = {
    websocketUrl: 'https://mock-websocket-url',
    enableAuthentication: true,
  };
  const disabledAuth = {
    websocketUrl: 'https://mock-websocket-url',
    enableAuthentication: false,
  };
  return {
    useConfigs: jest.fn().mockReturnValueOnce(disabledAuth).mockReturnValue(enabledAuth),
  };
});
export const mockedConfigProviderMock2 = () => configProviderMock2;
