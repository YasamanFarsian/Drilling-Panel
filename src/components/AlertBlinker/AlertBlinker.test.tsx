import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import AlertBlinker from './AlertBlinker';

describe('AlertBlinker', () => {
  const mockedProps = {};

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<AlertBlinker {...mockedProps} />);
    expect(getByTestId('alert_blinker')).toBeInTheDocument();
  });
});
