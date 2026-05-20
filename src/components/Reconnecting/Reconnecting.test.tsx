import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import Reconnecting from './Reconnecting';

describe('Reconnecting', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<Reconnecting />);
    expect(getByTestId('reconnecting')).toBeInTheDocument();
  });
});
