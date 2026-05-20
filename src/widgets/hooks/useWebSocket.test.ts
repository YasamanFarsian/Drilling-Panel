import useHasUserBeenInactive from '@dt-advisory/hooks/useHasUserBeenInactive';
import { useHostSettingsStore } from '@dt-advisory/store/HostSettingsStore';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import {
  useWSConnectionStore,
  WsConnection,
  WsConnectionState,
} from '@dt-advisory/store/WsConnection';
import { renderHook } from '@testing-library/react-hooks';
import { useWebSocket } from './useWebSocket';

const mockPath = 'mockPath';
jest.mock('@dt-advisory/services/MsalAuthentication', () => ({
  getToken: jest.fn().mockReturnValue('foo-token'),
}));
jest.mock('@dt-advisory/providers/Authentication', () => ({
  useAuthentication: jest.fn(() => ({ token: 'mock-token' })),
}));

jest.mock('@dt-advisory/providers/Configs', () => {
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

jest.mock('@dt-advisory/store/Settings', () => ({
  useSettingsStore: jest.fn(() => ({ settings: { operationId: 'mock-opid' } })),
}));
jest.mock('@dt-advisory/store/UserConfiguration/UserConfiguration', () => ({
  WidgetsEnum: { MockWidget: 'mock-widget' },
}));
jest.mock('@dt-advisory/store/HostSettingsStore');
const mockHostSettingsStore = (isEmbedded: boolean, accessToken: string | null) => {
  const mockState = {
    isEmbedded,
    accessToken,
    updateHostSettings: jest.fn(),
  };
  (useHostSettingsStore as unknown as jest.Mock).mockImplementation((callback) =>
    callback(mockState),
  );
};

jest.mock('@dt-advisory/store/WsConnection');
const mockWsConnectionStoreNoReconnecting = (shouldReconnect: boolean) => {
  const mockState: WsConnection = {
    shouldReconnect,
    wsConnectionStates: {
      safeguard: true,
      cuttingchart: false,
      wellbore: false,
      ecd: false,
    } as WsConnectionState,
    setWsConnectionStates: jest.fn(),
    setShouldReconnect: jest.fn(),
  };
  (useWSConnectionStore as unknown as jest.Mock).mockImplementation((callback) =>
    callback(mockState),
  );
};

jest.mock('@dt-advisory/hooks/useHasUserBeenInactive');
const mockUseHasUserBeenInactiveFalse = jest.fn().mockImplementation(() => {
  (useHasUserBeenInactive as unknown as jest.Mock).mockImplementation(() => false);
});
const mockUseHasUserBeenInactiveTrue = jest.fn().mockImplementation(() => {
  (useHasUserBeenInactive as unknown as jest.Mock)
    .mockImplementationOnce(() => true)
    .mockImplementation(() => false);
});

describe('useWebSocket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  it('should behave correctly if auth is disabled', async () => {
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveTrue();
    const { result, waitFor } = renderHook(() => useWebSocket({ path: mockPath as WidgetsEnum }));
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  });
  it('should behave correctly isEmbedded and has access token', async () => {
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveTrue();
    mockHostSettingsStore(true, 'foo-token');
    const { result, waitFor } = renderHook(() => useWebSocket({ path: mockPath as WidgetsEnum }));
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  });
  it('should behave correctly not isEmbedded and has access token', async () => {
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveTrue();
    mockHostSettingsStore(false, null);
    const { result, waitFor } = renderHook(() => useWebSocket({ path: mockPath as WidgetsEnum }));
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  });
  it('should not connect to the server user active', async () => {
    jest.useFakeTimers();
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveFalse();
    const { result, waitFor, waitForNextUpdate } = renderHook(() =>
      useWebSocket({ path: mockPath as WidgetsEnum }),
    );
    expect(result.current.ws).not.toBeDefined();
    expect(result.current.isConnected).toBe(false);
    await waitForNextUpdate();
    jest.advanceTimersByTime(5000);
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  }, 10000);
  it('should not connect to the server with user has been inactive', async () => {
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveTrue();
    const { result, waitFor, waitForNextUpdate } = renderHook(() =>
      useWebSocket({ path: mockPath as WidgetsEnum }),
    );
    expect(result.current.ws).not.toBeDefined();
    expect(result.current.isConnected).toBe(false);

    await waitForNextUpdate();
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  }, 10000);
  it('should not connect and create new instance when user has been inactive', async () => {
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveTrue();
    const { result, waitFor } = renderHook(() => useWebSocket({ path: mockPath as WidgetsEnum }));
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  });
  it('should stop connection when is shouldreconnect true', async () => {
    mockWsConnectionStoreNoReconnecting(true);
    mockUseHasUserBeenInactiveTrue();
    const { result, waitFor } = renderHook(() => useWebSocket({ path: mockPath as WidgetsEnum }));
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  });
  it('should run correctly after inject msal getToken method', async () => {
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveTrue();
    const getTokenFormHost = async () => 'foo-token';
    const { result, waitFor } = renderHook(() =>
      useWebSocket({ path: mockPath as WidgetsEnum, getTokenFormHost }),
    );
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  });
  it('should run correctly after injecting operationId from host', async () => {
    mockWsConnectionStoreNoReconnecting(false);
    mockUseHasUserBeenInactiveTrue();
    const getTokenFormHost = async () => 'foo-token';
    const { result, waitFor } = renderHook(() =>
      useWebSocket({ path: mockPath as WidgetsEnum, getTokenFormHost, hostOperationId: '101' }),
    );
    await waitFor(() => expect(result.current.isConnected).toBe(false));
  });
});
