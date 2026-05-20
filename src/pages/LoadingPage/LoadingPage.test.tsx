import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import LoadingPage from './LoadingPage';

describe('LoadingPage', () => {
  const mockedProps = {};

  it('should render without crashing', () => {
    renderWithThemeProviders(<LoadingPage {...mockedProps} />);
  });
});
