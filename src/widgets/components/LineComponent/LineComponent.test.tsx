import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import LineComponent from '@dt-advisory/widgets/components/LineComponent/LineComponent';

describe('LineComponent', () => {
  const mockedProps = { name: 'name' };

  it('should render Gradients without crashing', () => {
    renderWithThemeProviders(<LineComponent {...mockedProps} />);
  });
});
