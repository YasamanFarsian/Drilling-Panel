import { useAuthenticationFlow } from '@dt-advisory/hooks/useAuthenticationFlow';
import { useConfigs } from '@dt-advisory/providers/Configs';
import EmbedderProvider from '@dt-advisory/providers/Embedder';
import { render, waitFor } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import React from 'react';
import MsalConfigurationProvider from './MsalConfiguration';

const mockedMsal = {
  redirectUri: 'mockeDredirectUri',
  clientId: 'mockedclientId',
  authority: 'mockedauthority',
  knownAuthorities: 'mockedknownAuthorities',
  scopes: 'mockedscopes',
};

jest.mock('@dt-advisory/providers/Configs');

function getInstance(): MsalReactTester {
  return new MsalReactTester();
}

jest.mock('@dt-advisory/services/MsalAuthentication', () => {
  const msalTester = getInstance();
  msalTester.spyMsal();
  return {
    setup: jest.fn(),
    getInstance: () => msalTester.client,
  };
});
jest.mock('@dt-advisory/hooks/useAuthenticationFlow', () => ({
  ...jest.requireActual('@dt-advisory/hooks/useAuthenticationFlow'),
  useAuthenticationFlow: jest.fn(),
}));

const mockUseAuthenticationFlow = (value: any) => {
  (useAuthenticationFlow as jest.Mock).mockImplementation(() => ({
    getIsCustomer: jest.fn().mockResolvedValue(value),
    logout: jest.fn(),
  }));
};

const mockUseAuthenticationFlowThrow = () => {
  (useAuthenticationFlow as jest.Mock).mockImplementation(() => ({
    getIsCustomer: () => Promise.reject(new Error('rejected')),
  }));
};

describe('MsalConfiguration Provider', () => {
  it.each([false, true])(
    'should render with enableAuthentication true and customer %s',
    async (value) => {
      (useConfigs as jest.Mock).mockReturnValue({
        enableAuthentication: true,
        baseApiUrl: 'foo',
        msal: {
          sekal: {
            ...mockedMsal,
            clientId: 'sekalClientId',
          },
          customer: {
            ...mockedMsal,
            clientId: 'customerClientId',
          },
        },
      });
      mockUseAuthenticationFlow(value);
      const { getByTestId } = render(
        <EmbedderProvider>
          <MsalConfigurationProvider>
            <div data-testid="MsalConfigurationProvider__children__foo"></div>
          </MsalConfigurationProvider>
        </EmbedderProvider>,
      );

      await waitFor(() => expect(getByTestId('full_page_loading')).toBeInTheDocument());
    },
  );

  it('should render with enableAuthentication true and exception', async () => {
    (useConfigs as jest.Mock).mockReturnValue({
      enableAuthentication: true,
      baseApiUrl: 'foo',
      msal: {
        sekal: {
          ...mockedMsal,
          clientId: 'sekalClientId',
        },
        customer: {
          ...mockedMsal,
          clientId: 'customerClientId',
        },
      },
    });
    mockUseAuthenticationFlowThrow();
    const { getByTestId } = render(
      <EmbedderProvider>
        <MsalConfigurationProvider>
          <div data-testid="MsalConfigurationProvider__children__foo"></div>
        </MsalConfigurationProvider>
      </EmbedderProvider>,
    );
    await waitFor(() => expect(getByTestId('full_page_loading')).toBeInTheDocument());
  });
  it('should render without crashing with enableAuthentication false', async () => {
    (useConfigs as jest.Mock).mockReturnValue({
      enableAuthentication: false,
      baseApiUrl: 'foo',
      msal: {
        sekal: {
          ...mockedMsal,
          clientId: 'sekalClientId',
        },
        customer: {
          ...mockedMsal,
          clientId: 'customerClientId',
        },
      },
    });
    mockUseAuthenticationFlow(false);
    const { getByTestId } = render(
      <EmbedderProvider>
        <MsalConfigurationProvider>
          <div data-testid="MsalConfigurationProvider__children__foo"></div>
        </MsalConfigurationProvider>
      </EmbedderProvider>,
    );

    await waitFor(() =>
      expect(getByTestId('MsalConfigurationProvider__children__foo')).toBeInTheDocument(),
    );
  });
});
