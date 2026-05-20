import {
  mockedAuthProviderMock,
  mockedConfigsProviderMock,
} from '@dt-advisory/helpers/tests/mock/providers';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import useReplayStore from '@dt-advisory/utils/replay-store/use-replay-store';
import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React, { act, useContext } from 'react';
import HostJsonProviderProvider, { useHostJsonProvider } from './HostJsonProvider';

mockedAuthProviderMock();
mockedConfigsProviderMock();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockContextValue: any = {
  data: { currentTime: 'foo' },
  isConnected: true,
};

mockedSignalR();

describe('HostJsonProvider Provider', () => {
  it('should startReplays on receive message if current status is triggered', async () => {
    act(() => {
      useReplayStore.getState().triggerReplays(0, 100000);
    });

    render(
      <HostJsonProviderProvider widgetType={'mock-widget' as WidgetsEnum} checkSafeData={jest.fn()}>
        <></>
      </HostJsonProviderProvider>,
    );

    await waitFor(() => expect(useReplayStore.getState().status).toEqual('replaying'));
  });
  it('should not startReplays on receive message if current status is idle', async () => {
    act(() => {
      useReplayStore.getState().stopReplays();
    });

    expect(useReplayStore.getState().status).toEqual('idle');

    render(
      <HostJsonProviderProvider widgetType={'mock-widget' as WidgetsEnum} checkSafeData={jest.fn()}>
        <></>
      </HostJsonProviderProvider>,
    );

    await waitFor(() => expect(useReplayStore.getState().status).toEqual('idle'));
  });
  it('should update state properly', () => {
    (useContext as jest.Mock).mockReturnValue(mockContextValue);
    const { result } = renderHook(() => useHostJsonProvider<any>());
    expect(result.current).toEqual(mockContextValue);
  });
  it('should throw an error if context is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined);
    const { result } = renderHook(() => useHostJsonProvider<any>());
    expect(result.error).toEqual(
      Error('useHostJsonProvider can not be used outside HostJsonProviderProvider'),
    );
  });
  it('should render with unit settings', () => {
    const { getByTestId } = render(
      <HostJsonProviderProvider
        widgetType={'mock-widget' as WidgetsEnum}
        checkSafeData={jest.fn()}
        unitsSettings={{ foo: 'bar' } as any}
      >
        <div data-testid="mocked_widget"></div>
      </HostJsonProviderProvider>,
    );
    expect(getByTestId('mocked_widget')).toBeInTheDocument();
  });
});
