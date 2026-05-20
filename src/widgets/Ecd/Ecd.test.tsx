import React from 'react';
import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import Ecd from './Ecd';

const mockedProps = {
  widgetId: 'foo',
  HostDataProvider: DataProvider,
  useHostDataProvider: useDataProvider,
};

describe('Ecd', () => {
  it('should render without crashing', () => {
    renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <Ecd {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );
  });
});
