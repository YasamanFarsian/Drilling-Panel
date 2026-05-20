import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import Syncing from './Syncing';

describe('Syncing', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<Syncing />);
    expect(getByTestId('syncing')).toBeInTheDocument();
  });
});
