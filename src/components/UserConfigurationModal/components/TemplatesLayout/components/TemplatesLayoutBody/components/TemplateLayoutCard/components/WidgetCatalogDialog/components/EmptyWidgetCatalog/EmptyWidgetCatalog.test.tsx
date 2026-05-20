import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import EmptyWidgetCatalog from './EmptyWidgetCatalog';

describe('EmptyWidgetCatalog', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<EmptyWidgetCatalog />);
    expect(getByTestId('empty_widget_catalog_1678892958026')).toBeInTheDocument();
  });
});
