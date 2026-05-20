import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import LoadingDark from './LoadingDark';

describe('LoadingDark', () => {
  const mockedProps = {};

  it('should render without crashing', () => {
    renderWithThemeProviders(<LoadingDark {...mockedProps} />);
  });
});
