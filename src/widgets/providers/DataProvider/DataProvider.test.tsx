/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React, { useContext } from 'react';
import {
  mockedAuthProviderMock,
  mockedConfigsProviderMock,
} from '@dt-advisory/helpers/tests/mock/providers';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import DataProvider, { useDataProvider } from './DataProvider';

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

describe('DataProvider Provider', () => {
  it('should render without crashing', () => {
    render(
      <DataProvider widgetType={'mock-widget' as WidgetsEnum} checkSafeData={jest.fn()}>
        <></>
      </DataProvider>,
    );
  });
  it('should update state properly', () => {
    (useContext as jest.Mock).mockReturnValue(mockContextValue);
    const { result } = renderHook(() => useDataProvider<any>());
    expect(result.current).toEqual(mockContextValue);
  });
  it('should throw an error if context is undefined', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce(undefined);
    const { result } = renderHook(() => useDataProvider<any>());
    expect(result.error).toEqual(Error('useDataProvider can not be used outside DataProvider'));
  });
});
