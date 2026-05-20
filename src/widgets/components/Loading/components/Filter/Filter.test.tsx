import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Filter from './Filter';

describe('Filter', () => {
  it('should render without crashing', () => {
    const { getByRole } = renderWithThemeProviders(<Filter />);
    expect(getByRole('filter_1687945410592')).toBeInTheDocument();
  });
});
