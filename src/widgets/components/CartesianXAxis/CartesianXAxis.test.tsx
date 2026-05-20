import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import CartesianXAxis from './CartesianXAxis';

describe('ECD CartesianXAxis', () => {
  const mockedProps = {
    inactive: false,
    domain: { y: [1, 2], x: [1, 2] } as {
      y: [number, number];
      x: [number, number];
    },
    isSmallVersion: false,
    hideLabel: true,
    axisLabel: 'testLabel',
    axisUnit: 'testUnit',
  };

  it('should render CartesianXAxis without crashing', () => {
    renderWithThemeAndLocaleProviders(<CartesianXAxis {...mockedProps} />);
  });
});
