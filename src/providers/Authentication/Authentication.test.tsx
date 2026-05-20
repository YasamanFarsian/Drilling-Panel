import { Configuration } from '@azure/msal-browser';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import MsalAuthentication from '@dt-advisory/services/MsalAuthentication';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import AuthenticationProvider, { useAuthentication } from './Authentication';

jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn().mockReturnValue(true),
}));
jest.mock('@azure/msal-browser', () => {
  const MockedPublicClientApplicationValue = {
    getAllAccounts: jest.fn().mockReturnValue([
      {
        username: 'foo',
      },
    ]),
    addEventCallback: jest.fn((callback) => callback),
    getActiveAccount: jest.fn().mockReturnValue({} as any),
    setActiveAccount: jest.fn(),
    acquireTokenSilent: jest.fn().mockReturnValue({ accessToken: '', expiresOn: new Date() }),
  };
  const MockedPublicClientApplication = jest.fn(() => MockedPublicClientApplicationValue);
  return {
    __esModule: true,
    ...jest.requireActual('@azure/msal-browser'),
    PublicClientApplication: MockedPublicClientApplication,
  };
});

jest.mock('@dt-advisory/hooks/useAuthenticationFlow', () => ({
  __esModule: true,
  useAuthenticationFlow: () => ({
    getIsCustomer: jest.fn().mockResolvedValue({ isCustomer: false, redirectUri: '' }),
    logout: jest.fn(),
  }),
}));

describe('AuthenticationProvider', () => {
  beforeAll(() => {
    MsalAuthentication.setup({} as Configuration, []);
  });
  it('should render AuthenticationProvider without crashing', () => {
    render(
      <ConfigsProvider>
        <AuthenticationProvider>
          <div data-testid="authentication-provider-test" />
        </AuthenticationProvider>
      </ConfigsProvider>,
    );

    expect(screen.getByTestId('authentication-provider-test')).toBeInTheDocument();
  });

  it('useAuthentication should return correct initial data', () => {
    const { result } = renderHook(() => useAuthentication(), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.enableAuthentication).toBeFalsy();
    expect('function' === typeof result.current.signOut).toBeTruthy();
  });

  it('should throw an error if context is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined);
    const { result } = renderHook(() => useAuthentication());

    expect(result.error).toEqual(
      Error('useAuthentication can not be used outside AuthenticationProvider'),
    );
  });
});
