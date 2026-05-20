import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ZeroOnAxis from './ZeroOnAxis';

describe('ECD ZeroOnAxis', () => {
  const mockedProps = {};

  it('should render ZeroOnAxis without crashing', () => {
    renderWithThemeProviders(<ZeroOnAxis {...mockedProps} />);
  });
});
