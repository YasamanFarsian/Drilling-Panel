import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import WidgetsLoader from './WidgetsLoader';

describe('WidgetsLoader', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<WidgetsLoader />);
    expect(getByTestId('widgets_loader')).toBeInTheDocument();
  });
});
