import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import GeoPressureToggler, { GeoPressureToggleValue } from './GeoPressureToggler';

describe('GeoPressureToggler', () => {
  const mockedProps = {
    onToggle: jest.fn(),
    value: GeoPressureToggleValue.MD,
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <GeoPressureToggler {...mockedProps} />,
    );
    expect(getByTestId('geo_pressure_toggler')).toBeInTheDocument();
  });
});
