import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import EmptyTemplateLayout from './EmptyTemplateLayout';

describe('EmptyTemplateLayout', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<EmptyTemplateLayout />);
    expect(getByTestId('empty_template_layout_1676562585410')).toBeInTheDocument();
  });
});
