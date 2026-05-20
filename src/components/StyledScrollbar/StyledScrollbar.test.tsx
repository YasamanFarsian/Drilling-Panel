import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import StyledScrollbar from './StyledScrollbar';

describe('StyledScrollbar', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<StyledScrollbar data-testid="for-testing" />);
    expect(getByTestId('for-testing')).toHaveStyle('overflow-y: auto;');
  });
});
