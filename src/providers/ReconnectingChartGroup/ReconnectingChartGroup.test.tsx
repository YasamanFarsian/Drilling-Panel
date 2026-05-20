import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import {
  ReconnectingChartGroupProviderWrapper,
  renderWithThemeAndLocaleProviders,
} from '@dt-advisory/helpers/tests/renderWithContext';
import {
  useWSConnectionStore,
  WsConnection,
  WsConnectionState,
} from '@dt-advisory/store/WsConnection';
import ReconnectingChartGroupProvider, {
  DISABLE_IS_RECONNECTING,
  useReconnectingChartGroup,
} from './ReconnectingChartGroup';

jest.mock('@dt-advisory/store/WsConnection');
const mockWsConnectionStoreNoReconnecting = () => {
  const mockState: WsConnection = {
    shouldReconnect: false,
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
const mockWsConnectionStoreReconnecting = () => {
  const mockState: WsConnection = {
    shouldReconnect: false,
    wsConnectionStates: {
      safeguard: false,
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

jest.mock('@dt-advisory/hooks/useTimer', () => {
  return {
    useTimeoutConnect: jest
      .fn()
      .mockReturnValueOnce({
        isConnectionTimeout: false,
        pause: jest.fn(),
      })
      .mockReturnValueOnce({
        isConnectionTimeout: false,
        pause: jest.fn(),
      })
      .mockReturnValue({
        isConnectionTimeout: true,
        pause: jest.fn(),
      }),
  };
});

describe('ReconnectingChartGroupProvider', () => {
  afterEach(() => jest.clearAllMocks());
  it('should render ReconnectingChartGroupProvider without crashing', () => {
    mockWsConnectionStoreNoReconnecting();
    renderWithThemeAndLocaleProviders(
      <ReconnectingChartGroupProvider>
        <></>
      </ReconnectingChartGroupProvider>,
    );
  });

  it('should return isReconnecting false', async () => {
    mockWsConnectionStoreNoReconnecting();
    const { result } = renderHook(() => useReconnectingChartGroup(), {
      wrapper: ReconnectingChartGroupProviderWrapper,
    });
    await waitFor(() => expect(result.current.isReconnecting).toBeFalsy());
  });

  it('should return isReconnecting true', async () => {
    jest.useFakeTimers();
    mockWsConnectionStoreReconnecting();
    const { result } = renderHook(() => useReconnectingChartGroup(), {
      wrapper: ReconnectingChartGroupProviderWrapper,
    });
    jest.advanceTimersByTime(DISABLE_IS_RECONNECTING * 1000);
    await waitFor(() => expect(result.current.isReconnecting).toBeFalsy());
  });
  it('should throw an error if context is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined);
    const { result } = renderHook(() => useReconnectingChartGroup());

    expect(result.error).toEqual(
      Error('useReconnectingChartGroup can not be used outside ReconnectingChartGroupProvider'),
    );
  });
});
