import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import CustomTickLabel, { CustomTickLabelPropsType } from './CustomTickLabel';

describe('CustomTickLabel', () => {
  const mockedProps: CustomTickLabelPropsType = {
    ticks: [0.055275104955893516, 0.055275104955893516, 0.055275104955893516] as never,
    x: 10 as never,
    y: 10 as never,
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<CustomTickLabel {...mockedProps} />);
    expect(getByTestId('x-aix-custom-tick-label')).toBeInTheDocument();
  });
});
