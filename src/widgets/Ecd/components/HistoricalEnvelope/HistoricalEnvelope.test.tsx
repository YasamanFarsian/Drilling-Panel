import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import HistoricalEnvelope from './HistoricalEnvelope';

describe('ECD HistoricalEnvelope', () => {
  const mockedProps = {
    data: [
      {
        Md: 0.5,
        Min: 0,
        Max: 1,
      },
    ],
    domain: { y: [1, 2], x: [1, 2] } as {
      y: [number, number];
      x: [number, number];
    },
    inactive: false,
  };

  it('should render HistoricalEnvelope without crashing', () => {
    renderWithThemeProviders(<HistoricalEnvelope {...mockedProps} />);
  });
});
