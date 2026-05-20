import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Gradients from './Gradients';

describe('ECD Gradients', () => {
  const mockedProps = {
    configs: {
      light: [],
      dark: [],
    },
    id: 'Gradients',
  };

  it('should render Gradients without crashing', () => {
    renderWithThemeProviders(<Gradients {...mockedProps} />);
  });
});
