import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ZeroOnAxis from '@dt-advisory/widgets/components/ZeroOnAxis';
import CartesianGraph from './CartesianGraph';

describe('Component CartesianGraph', () => {
  it('should render CartesianGraph without crashing when inactive', () => {
    renderWithThemeProviders(
      <CartesianGraph inactive={true}>
        <ZeroOnAxis />
      </CartesianGraph>,
    );
  });
  it('should render CartesianGraph without crashing when inslips', () => {
    renderWithThemeProviders(
      <CartesianGraph inslips={true}>
        <ZeroOnAxis />
      </CartesianGraph>,
    );
  });
  it('should render CartesianGraph on small version', () => {
    renderWithThemeProviders(
      <CartesianGraph isSmallVersion={true}>
        <ZeroOnAxis />
      </CartesianGraph>,
    );
  });
});
