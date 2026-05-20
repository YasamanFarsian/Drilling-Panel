import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<ErrorFallback />);
    expect(getByTestId('error_fallback')).toBeInTheDocument();
  });
});
