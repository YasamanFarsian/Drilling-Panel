import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import MsalConfigErrorScreen from './MsalConfigErrorScreen';

describe('MsalConfigErrorScreen', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<MsalConfigErrorScreen />);
    expect(getByTestId('msal_config_error_screen')).toBeInTheDocument();
  });
});
