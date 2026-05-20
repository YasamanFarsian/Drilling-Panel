import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import configurationLoader from '@dt-advisory/config/configurationLoader';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider, { Status, useConfigs, useFetchConfigs } from './Configs';

jest.mock('@dt-advisory/api/settings/settings.query');
jest.mock('@dt-advisory/config/configurationLoader');

describe('Configs Provider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <ConfigsProvider>
        <></>
      </ConfigsProvider>,
    );
  });

  it('useAuthentication should return correct initial data', () => {
    const { result } = renderHook(() => useConfigs(), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.baseApiUrl).toEqual('');
    expect(result.current.enableAuthentication).toEqual(false);
    expect(result.current.websocketUrl).toEqual('https://sekal-api-dev.azurewebsites.net');
  });

  describe('useFetchConfigs', () => {
    it('should return envConfig settings', async () => {
      (configurationLoader.getConfig as jest.Mock).mockImplementationOnce(
        jest.fn(() => ({
          baseApiUrl: 'test-api-url',
          userConfiguration: {
            mockedUserConfig: 'test-user-config',
          },
        })),
      );

      const { result, waitFor } = renderHook(() => useFetchConfigs(), {
        wrapper: ConfigsProviderWrapper,
      });

      await waitFor(() => expect(result.current.status).not.toBe(Status.Loading));

      expect(result.current.configs?.userConfiguration).toEqual({
        mockedUserConfig: 'test-user-config',
      });
    });

    it('should set status to Error on fetch failure', async () => {
      // Mock ConfigurationLoader.getConfig to throw an error
      (configurationLoader.getConfig as jest.Mock).mockRejectedValue(new Error('Fetch error'));

      const { result, waitFor } = renderHook(() => useFetchConfigs(), {
        wrapper: ConfigsProviderWrapper,
      });

      await waitFor(() => expect(result.current.status).toBe(Status.Error));
    });
  });
});
