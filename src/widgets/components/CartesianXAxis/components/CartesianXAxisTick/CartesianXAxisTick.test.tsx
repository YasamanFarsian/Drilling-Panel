import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import CartesianXAxisTick, { CartesianXAxisTickPropsType } from './CartesianXAxisTick';

describe('CartesianXAxisTick', () => {
  const mockedProps: CartesianXAxisTickPropsType = {};

  it('should render without crashing', () => {
    const { getByRole } = renderWithThemeProviders(<CartesianXAxisTick {...mockedProps} />);
    expect(getByRole('presentation')).toBeInTheDocument();
  });
});
