import React from 'react';
import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import Cutting from './Cutting';

describe('Cutting', () => {
  const mockedProps = {
    widgetId: 'foo',
    HostDataProvider: DataProvider,
    useHostDataProvider: useDataProvider,
  };

  it('should render without crashing', () => {
    renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <Cutting {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );
  });
});
