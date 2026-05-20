import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { Inclination } from './lib/wellboreGeometry';
import { wellboreAppearance } from './WellboreChartAppearance';
import { WellboreChart } from './WellboreChartSVG';

describe('Wellbore chart', () => {
  const mockedProps = {
    hideAxisLabel: true,
    data: {
      neutralPoint: 0,
      bitDepth: 600,
      holeDepth: 600,
      casingDepth: 300,
      targetDepth: 2500,
      cuttingBed: [
        [1, 2],
        [1, 2],
      ],
      cuttingProportion: [
        [1, 3],
        [1, 4],
      ],
      mudCirculation: false,
      bitRotation: false,
      inclination: [
        [1, 0],
        [1, 0],
      ] as Inclination,
    },
    size: {
      width: 100,
      height: 100,
    },
    appearance: wellboreAppearance['dark'],
  };

  it('should render WellboreChart without crashing', () => {
    renderWithThemeAndLocaleProviders(<WellboreChart {...mockedProps} />);
  });
});
