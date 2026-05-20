import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import LoadingLight from './LoadingLight';

describe('LoadingLight', () => {
  const mockedProps = {};

  it('should render without crashing', () => {
    renderWithThemeProviders(<LoadingLight {...mockedProps} />);
  });
});
