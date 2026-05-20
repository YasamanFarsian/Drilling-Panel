import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import CartesianGraph from '@dt-advisory/widgets/components/CartesianGraph';
import ProportionAxis from './ProportionAxis';

describe('Cuttings chart ProportionAxis', () => {
  it('should render without crashing', () => {
    const { queryAllByRole } = renderWithThemeAndLocaleProviders(
      <CartesianGraph horizontal minDomain={{ x: 0, y: 0 }} maxDomain={{ x: 10, y: 600 }}>
        <ProportionAxis />
      </CartesianGraph>,
    );
    const roles = queryAllByRole('proportion-value-group');
    expect(roles.length).not.toEqual(0);
  });
  it('should render ProportionAxis without crashing', () => {
    const { queryAllByRole } = renderWithThemeAndLocaleProviders(<ProportionAxis />);
    const roles = queryAllByRole('proportion-value-group');
    expect(roles.length).not.toEqual(0);
  });
  it('should not render ProportionAxis when hideLabel is true', () => {
    const { queryAllByRole } = renderWithThemeAndLocaleProviders(
      <ProportionAxis hideLabel={true} />,
    );
    const roles = queryAllByRole('proportion-value-group');
    expect(roles.length).toEqual(0);
  });
});
