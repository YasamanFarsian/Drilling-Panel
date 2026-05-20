import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import ErrorIcon from './ErrorIcon';

describe('ErrorIcon', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<ErrorIcon />);
    expect(getByTestId('ErrorOutlinedIcon')).toBeInTheDocument();
  });
});
