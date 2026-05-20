import { UnitsConfiguration } from '@dt-advisory/api/units/units.types';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { setConfigResponse } from '@dt-advisory/helpers/units/unitsHelper';
import React from 'react';
import InclinationAxis /*, { Label }*/ from './InclinationAxis';

describe('Cuttings chart InclinationAxis', () => {
  const mockConfig: UnitsConfiguration = {
    Angle: { unit: 'Degree', conversion: 'x*2' },
  };
  it('should render InclinationAxis without crashing', () => {
    const { getAllByTestId } = renderWithThemeAndLocaleProviders(<InclinationAxis />);
    expect(getAllByTestId('x-inclination-custom-tick-label')?.length).toEqual(3);
  });

  it('should has display: none when the hideLabel is true', () => {
    setConfigResponse(mockConfig);
    const { container, getByText } = renderWithThemeAndLocaleProviders(
      <InclinationAxis hideLabel={true} />,
    );
    expect(container.querySelector('div.VictoryContainer')).toBeInTheDocument();
    expect(getByText('Inclination (°)')).toHaveStyle('display: none');
  });
});
