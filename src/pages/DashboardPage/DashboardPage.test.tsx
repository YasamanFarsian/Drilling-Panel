import React from 'react';
import { MemoryRouter } from 'react-router';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReactQueryProvider from '@dt-advisory/providers/ReactQueryProvider';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import DashboardPage from './DashboardPage';

describe('DashboardPage', () => {
  it('should render DashboardPage without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <MemoryRouter>
        <ReactQueryProvider>
          <ConfigsProvider>
            <ReconnectingChartGroupProvider>
              <NoStreamingTimerChartGroupProvider>
                <DashboardPage />
              </NoStreamingTimerChartGroupProvider>
            </ReconnectingChartGroupProvider>
          </ConfigsProvider>
        </ReactQueryProvider>
      </MemoryRouter>,
    );
    expect(getByTestId('dashboard_page')).toBeInTheDocument();
  });
});
