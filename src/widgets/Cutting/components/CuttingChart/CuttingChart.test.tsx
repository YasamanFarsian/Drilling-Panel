import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import CuttingChart from './CuttingChart';

describe('Cuttings chart CuttingChart', () => {
  const mockedProps = {
    data: {
      casingShoeDepth: 308,
      currentTime: '',
      tdBottom: 600,
      bitDepth: 23,
      md: 23,
      lastUpdated: '2022-03-09T06:49:49.9713219Z',
      bedHeightLastUpdate: '2022-03-09T06:49:49.9713219Z',
      bedHeight: [
        {
          md: 2.25,
          val: 0,
        },
      ],
      proportionMassFractionsLastUpdate: '2022-03-09T06:49:49.9713219Z',
      proportionMassFractions: [
        {
          md: 2.25,
          val: 0,
        },
      ],
      cuttingInclinationLastUpdate: '2022-03-09T06:49:49.9713219Z',
      cuttingInclination: [
        {
          md: 2.25,
          val: 0,
        },
      ],
      cuttingInclinationDepth: [
        {
          md: 2.25,
          val: 0,
        },
      ],
      cuttingsMassFractions: [
        {
          md: 2.25,
          val: 0,
        },
      ],
      hideAxisLabel: true,
      isLive: false,
    },
  };

  it('should render CuttingChart without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<CuttingChart {...mockedProps} />);
    expect(getByTestId('Cutting-cartesian_graph')).toBeInTheDocument();
  });
  it('should render CuttingChart with hideAxisLabel false', () => {
    mockedProps.data.hideAxisLabel = false;
    const { getByTestId } = renderWithThemeAndLocaleProviders(<CuttingChart {...mockedProps} />);
    expect(getByTestId('Cutting-cartesian_graph')).toBeInTheDocument();
  });
});
