import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import AreaComponent from './AreaComponent';

describe('AreaComponent', () => {
  const mockProps = {
    id: '111',
    strokes: {
      light: '',
      dark: '',
    },
    configs: {
      light: [],
      dark: [],
    },
  };

  it('should render AreaComponent without crashing', () => {
    renderWithThemeProviders(<AreaComponent gradientConfig={mockProps} />);
  });
});
