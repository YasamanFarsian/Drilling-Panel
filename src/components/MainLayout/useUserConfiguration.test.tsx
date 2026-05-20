import { getSettings } from '@dt-advisory/api/settings/settings.query';
import { useUserConfiguration } from '@dt-advisory/components/MainLayout/useUserConfiguration';
import fallbackUserConfiguration from '@dt-advisory/config/fallbackUserConfiguration.json';
import { useOperationId } from '@dt-advisory/hooks/useOperationInfo';
import { useConfigs } from '@dt-advisory/providers/Configs';
import {
  ConfigurationStoreType,
  useUserConfigurationStore,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('@dt-advisory/store/UserConfiguration/UserConfiguration');
jest.mock('@dt-advisory/config/configurationLoader');
jest.mock('@dt-advisory/api/settings/settings.query');

jest.mock('@dt-advisory/providers/Configs', () => ({
  useConfigs: jest.fn(),
}));
jest.mock('@dt-advisory/hooks/useOperationInfo', () => ({
  useOperationId: jest.fn(),
}));

const mockedGetSettings = getSettings as jest.MockedFunction<typeof getSettings>;

const setDefaultConfig = jest.fn();
const getDefaultConfig = jest.fn();

const defaultMockConfigurationStoreState = {
  configIsLoaded: true,
  getDefaultConfig,
  setDefaultConfig,
};
const mockUserConfigurationStore = (mockState?: Partial<ConfigurationStoreType>) => {
  (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
    callback(mockState ?? defaultMockConfigurationStoreState),
  );
};

describe('useUserConfiguration', () => {
  let wrapper: any;

  beforeEach(() => {
    jest.clearAllMocks();
    // Re-mock before each
    (useOperationId as jest.Mock).mockReturnValue('fake-operation-id');
    mockUserConfigurationStore();

    // Create a new instance of QueryClient for each test
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    queryClient.clear(); // Clear the cache

    // Reinit wrapper to not have cache otherwise mocking getSettings again wont work
    wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
    );
  });

  it('should return settings returned from getSettings API', async () => {
    const mockApiConfig = { mockedUserConfig: 'from-api' };
    (useConfigs as jest.Mock).mockReturnValue({ userConfiguration: undefined });
    (getSettings as jest.Mock).mockResolvedValueOnce(mockApiConfig);

    const { result, waitFor } = renderHook(() => useUserConfiguration(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check if the setDefaultConfig was called with the API configuration
    expect(setDefaultConfig).toHaveBeenCalledWith(mockApiConfig);
  });

  it('should return default setting from local storage if getSettings fails', async () => {
    const mockLocalStorageConfig = { mockedUserConfig: 'from-local-storage' };
    (useConfigs as jest.Mock).mockReturnValue({ userConfiguration: undefined });
    (getSettings as jest.Mock).mockRejectedValue(new Error('axios error'));
    getDefaultConfig.mockReturnValue(mockLocalStorageConfig);

    const { result, waitFor } = renderHook(() => useUserConfiguration(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check if the setDefaultConfig was called with the local storage configuration
    expect(setDefaultConfig).toHaveBeenCalledWith(mockLocalStorageConfig);
  });

  it('should return envConfig settings if local storage and API both fail', async () => {
    const mockEnvConfig = { mockedUserConfig: 'from-env' };
    (useConfigs as jest.Mock).mockReturnValue({ userConfiguration: mockEnvConfig });
    (getSettings as jest.Mock).mockRejectedValue(new Error('axios error'));
    getDefaultConfig.mockReturnValue(undefined);

    const { result, waitFor } = renderHook(() => useUserConfiguration(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check if the setDefaultConfig was called with the env configuration
    expect(setDefaultConfig).toHaveBeenCalledWith(mockEnvConfig);
  });

  it('should use fallbackUserConfig if envConfig and API both fail, and no local storage config', async () => {
    (useConfigs as jest.Mock).mockReturnValue({ userConfiguration: undefined });
    (getSettings as jest.Mock).mockRejectedValue(new Error('axios error'));
    getDefaultConfig.mockReturnValue(undefined);

    const { result, waitFor } = renderHook(() => useUserConfiguration(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check if the setDefaultConfig was called with the fallback configuration
    expect(setDefaultConfig).toHaveBeenCalledWith(fallbackUserConfiguration);
  });
});
