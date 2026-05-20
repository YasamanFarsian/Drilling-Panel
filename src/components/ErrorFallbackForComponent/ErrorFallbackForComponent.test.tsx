import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ErrorFallbackForComponent from './ErrorFallbackForComponent';

describe('ErrorFallbackForComponent', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<ErrorFallbackForComponent />);
    expect(getByTestId('error_fallback_for_component_1676987859521')).toBeInTheDocument();
  });
});
