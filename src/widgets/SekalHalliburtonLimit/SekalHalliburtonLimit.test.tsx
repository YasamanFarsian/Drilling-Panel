import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import React from 'react';
import SekalHalliburtonLimit from './SekalHalliburtonLimit';

const mockedProps = {
  widgetId: 'foo',
  HostDataProvider: DataProvider,
  useHostDataProvider: useDataProvider,
};

describe('SekalHalliburtonLimit', () => {
  it('renders without crashing', () => {
    const { container } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <SekalHalliburtonLimit {...mockedProps} />
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
