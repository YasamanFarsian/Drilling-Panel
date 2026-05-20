import { UnitsConfiguration } from '@dt-advisory/api/units/units.types';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { setConfigResponse } from '@dt-advisory/helpers/units/unitsHelper';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import GeoPressure from './GeoPressure';

describe('GeoPressure', () => {
  const mockConfig: UnitsConfiguration = {
    Depth: { unit: 'Meter', conversion: 'x' },
  };

  beforeEach(() => {
    setConfigResponse(mockConfig);
  });

  afterEach(() => {
    setConfigResponse(undefined);
  });

  const mockedProps = {
    isLoading: false,
    data: {
      fitData: [
        {
          uid: 'foouid',
          md: 3,
          val: 4,
        },
      ],
      mudWeightData: [
        {
          fractionPressureEmw: 1,
          tvd: 2,
          md: 3,
          porePressureEmw: 4,
        },
      ],
    },
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<GeoPressure {...mockedProps} />);
    expect(getByTestId('at_operationInfo_geoPressure')).toBeInTheDocument();
    const buttons = screen.queryAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    const yAxis = screen.queryAllByRole('geo_pressure_y_axis');
    expect(yAxis[0].textContent).toMatch(/MD \(m\)/);
  });
  it('should render without crashing withouth data', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<GeoPressure isLoading={false} />);
    expect(getByTestId('at_operationInfo_geoPressure')).toBeInTheDocument();
  });
});
