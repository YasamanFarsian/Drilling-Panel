import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import NoWidget from './NoWidget';

describe('NoWidget', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<NoWidget />);
    expect(getByTestId('no_widget')).toBeInTheDocument();
  });
});
