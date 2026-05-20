import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ErrorScreen from './ErrorScreen';

describe('ErrorScreen', () => {
  const mockedProps = {};

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<ErrorScreen {...mockedProps} />);
    expect(getByTestId('error_screen')).toBeInTheDocument();
  });
});
