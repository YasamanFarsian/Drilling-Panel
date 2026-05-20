import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import TemplateLayoutSkeletonLoading from './TemplateLayoutSkeletonLoading';

describe('TemplateLayoutSkeletonLoading', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<TemplateLayoutSkeletonLoading />);
    expect(getByTestId('template_layout_skeleton_loading_1676563555792')).toBeInTheDocument();
  });
});
