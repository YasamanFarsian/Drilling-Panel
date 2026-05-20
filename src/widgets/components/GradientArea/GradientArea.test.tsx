import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import GradientArea from './GradientArea';

describe('Component GradientArea', () => {
  const mockedProps = {
    id: 'test',
    configs: {
      light: [{ offset: '100%', stopColor: '#FFFFFF', stopOpacity: 1 }],
      dark: [{ offset: '100%', stopColor: '#000000', stopOpacity: 1 }],
    },
    strokes: {
      light: '#FFFFFF',
      dark: '#000000',
    },
  };
  it('should render GradientArea without crashing', () => {
    renderWithThemeProviders(<GradientArea {...mockedProps} />);
  });
});
