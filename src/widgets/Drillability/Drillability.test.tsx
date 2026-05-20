import { waitFor } from '@testing-library/react';
import React from 'react';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import Drillability from './Drillability';

mockedSignalR();
const mockedProps = {
  widgetId: 'mock-drillablity-id',
  HostDataProvider: DataProvider,
  useHostDataProvider: useDataProvider,
};
describe('Drillability', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <Drillability {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );
    expect(getByTestId('baseWidget_Drillability')).toBeInTheDocument();
    expect(getByTestId(`container_${WidgetsLoaderEnum.Drillability}`)).toBeInTheDocument();
    expect(getByTestId('loading-dark')).toBeInTheDocument();
  });
  it('should not render loader', async () => {
    const { queryByRole } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <Drillability {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );
    await waitFor(() => expect(queryByRole('loading-dark')).not.toBeInTheDocument());
  });
});
