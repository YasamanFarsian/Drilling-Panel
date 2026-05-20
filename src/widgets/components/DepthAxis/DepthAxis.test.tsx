import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DepthAxis from './DepthAxis';

describe('DepthAxis', () => {
  const mockedProps = {
    hideAxis: false,
    domain: { y: [1, 2], x: [1, 2] } as {
      y: [number, number];
      x: [number, number];
    },
    axisLabel: 'test',
    axisUnit: 'test',
  };

  it('should render DepthAxis without crashing', () => {
    renderWithThemeAndLocaleProviders(<DepthAxis {...mockedProps} />);
  });

  it('should render DepthAxis without crashing when hideAxis is true', () => {
    renderWithThemeAndLocaleProviders(<DepthAxis {...mockedProps} hideAxis={true} />);
  });
});
