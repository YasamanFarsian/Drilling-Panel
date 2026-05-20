import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import SmartAutoRopChart, { SmartAutoRopChartPropsType } from './SmartAutoRopChart';

describe('SmartAutoRopChart', () => {
  const mockedProps: SmartAutoRopChartPropsType = {
    activeDataKeys: ['ROP'],
    indicatorData: [{ x: 0, y: 0.1, dataKey: 'ROP' }],
    inactive: false,
  };

  it('should render without crashing', () => {
    renderWithThemeAndLocaleProviders(<SmartAutoRopChart {...mockedProps} />);
  });

  it('should render active state properly', () => {
    const { queryByTestId } = renderWithThemeAndLocaleProviders(
      <SmartAutoRopChart {...mockedProps} />,
    );
    expect(queryByTestId('smart_auto_rop_indicator_ROP')).toBeInTheDocument();
  });

  it('should render inactive state correctly', () => {
    const { queryByTestId } = renderWithThemeAndLocaleProviders(
      <SmartAutoRopChart {...mockedProps} inactive={true} />,
    );
    expect(queryByTestId('smart_auto_rop_indicator_ROP')).not.toBeInTheDocument();
    expect(queryByTestId('smart_auto_rop_indicator_RPM')).not.toBeInTheDocument();
    expect(queryByTestId('smart_auto_rop_indicator_WOB')).not.toBeInTheDocument();
    expect(queryByTestId('smart_auto_rop_indicator_FlowRate')).not.toBeInTheDocument();
  });
});
