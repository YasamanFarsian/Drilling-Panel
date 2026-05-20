import { render } from '@testing-library/react';
import React from 'react';
import {
  ConfigsProviderWrapper,
  renderWithThemeAndLocaleProviders,
} from '@dt-advisory/helpers/tests/renderWithContext';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import NoStreamingTimerChartGroupProvider from './NoStreamingTimerChartGroup';

describe('NoStreamingTimerChartGroupProvider', () => {
  it('should render NoStreamingTimerChartGroupProvider without crashing', () => {
    renderWithThemeAndLocaleProviders(
      <ConfigsProviderWrapper>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <></>
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProviderWrapper>,
    );
  });
});
