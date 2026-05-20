import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Trajectory from './Trajectory';

describe('Trajectory', () => {
  const mockedProps = {
    isLoading: false,
    data: {
      actualAz: 3,
      actualIncl: 3,
      actualMD: 3,
      actualTVD: 3,
      plannedAz: 3,
      plannedIncl: 3,
      plannedMD: 3,
      plannedTVD: 3,
    },
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<Trajectory {...mockedProps} />);
    expect(getByTestId('at_operationInfo_trajectory')).toBeInTheDocument();
  });
  it('should render without crashing withouth data', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<Trajectory isLoading={false} />);
    expect(getByTestId('at_operationInfo_trajectory')).toBeInTheDocument();
  });
});
