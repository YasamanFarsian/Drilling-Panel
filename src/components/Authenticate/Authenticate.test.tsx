import { MsalProvider } from '@azure/msal-react';
import { MsalReactTester } from 'msal-react-tester';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  mockedAuthProviderMock,
  mockedConfigsProviderMock,
} from '@dt-advisory/helpers/tests/mock/providers';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import * as Auth from '@dt-advisory/providers/Authentication';
import EmbedderProvider from '@dt-advisory/providers/Embedder';
import Authenticate from './Authenticate';

jest.mock('@dt-advisory/components/MainLayout/useUserConfiguration', () => ({
  useUserConfiguration: jest.fn().mockReturnValue({ isLoading: false }),
}));
mockedAuthProviderMock();
mockedConfigsProviderMock();

describe('On Failure', () => {
  let msalTester: MsalReactTester;

  beforeEach(() => {
    msalTester = new MsalReactTester();
    msalTester.spyMsal();
  });

  it('should render Error fallback without crashing - ErrorFallback', async () => {
    jest.spyOn(Auth, 'useAuthentication').mockReturnValue({
      enableAuthentication: true,
      isAuthenticated: false,
      signOut: jest.fn(),
    });
    // Ask msal-react-tester to generate a failure
    msalTester.generateFailure();
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <EmbedderProvider>
        <MsalProvider instance={msalTester.client}>
          <MemoryRouter>
            <Authenticate />
          </MemoryRouter>
          ,
        </MsalProvider>
      </EmbedderProvider>,
    );
    await msalTester.waitForRedirect();
    await msalTester.waitForLogin();
    expect(getByTestId('error_fallback')).toBeInTheDocument();
  });
});

describe('AuthenticatedRoute', () => {
  let msalTester: MsalReactTester;

  beforeEach(() => {
    // new instance of msal tester for each test:
    msalTester = new MsalReactTester();
    // or new MsalReactTester("Redirect") / new MsalReactTester("Popup")

    // Ask msal-react-tester to handle and mock all msal-react processes:
    msalTester.spyMsal();
  });
  it('should render AuthenticatedRoute without crashing - MainLayout', () => {
    jest.spyOn(Auth, 'useAuthentication').mockReturnValue({
      enableAuthentication: false,
      isAuthenticated: false,
      signOut: jest.fn(),
    });
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <EmbedderProvider>
        <MemoryRouter>
          <Authenticate />
        </MemoryRouter>
      </EmbedderProvider>,
    );
    expect(getByTestId('main_layout')).toBeInTheDocument();
  });
  it('should render AuthenticatedRoute without crashing when enableAuth is disabled', () => {
    jest.spyOn(Auth, 'useAuthentication').mockReturnValue({
      enableAuthentication: false,
      isAuthenticated: false,
      signOut: jest.fn(),
    });
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <EmbedderProvider>
        <MemoryRouter>
          <Authenticate />
        </MemoryRouter>
      </EmbedderProvider>,
    );
    expect(getByTestId('main_layout')).toBeInTheDocument();
  });
  it('should render Full Page Loading without crashing - FullPageLoading', async () => {
    jest.spyOn(Auth, 'useAuthentication').mockReturnValue({
      enableAuthentication: true,
      isAuthenticated: false,
      signOut: jest.fn(),
    });
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <EmbedderProvider>
        <MsalProvider instance={msalTester.client}>
          <MemoryRouter>
            <Authenticate />
          </MemoryRouter>
          ,
        </MsalProvider>
      </EmbedderProvider>,
    );
    expect(getByTestId('full_page_loading')).toBeInTheDocument();
    await msalTester.waitForRedirect();
    await msalTester.waitForLogin();

    msalTester.resetSpyMsal();
  });
});
