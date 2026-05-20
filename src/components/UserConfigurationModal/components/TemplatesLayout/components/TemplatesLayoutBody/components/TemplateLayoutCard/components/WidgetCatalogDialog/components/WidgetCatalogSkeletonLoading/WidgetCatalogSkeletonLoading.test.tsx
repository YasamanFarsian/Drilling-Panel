import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import WidgetCatalogSkeletonLoading from './WidgetCatalogSkeletonLoading';

describe('WidgetCatalogSkeletonLoading', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<WidgetCatalogSkeletonLoading />);
    expect(getByTestId('widget_catalog_skeleton_loading_1678890453914')).toBeInTheDocument();
  });
});
