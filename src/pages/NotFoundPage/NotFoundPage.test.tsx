import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  const mockedProps = {};

  it('should render without crashing', () => {
    renderWithThemeProviders(<NotFoundPage {...mockedProps} />);
  });
});
