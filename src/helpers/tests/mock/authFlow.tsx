const useAuthFlowMock = jest.mock('@dt-advisory/hooks/useAuthenticationFlow', () => ({
  __esModule: true,
  useAuthenticationFlow: () => ({
    getIsCustomer: jest.fn().mockResolvedValue({ isCustomer: false, redirectUri: '' }),
    logout: jest.fn(),
  }),
}));

export const mockUseAuthFlow = () => useAuthFlowMock;
