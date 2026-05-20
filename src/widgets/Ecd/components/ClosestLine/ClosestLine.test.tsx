import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ClosestLine from './ClosestLine';

describe('ECD ClosestLine', () => {
  const mockedProps = {
    id: 'ClosestLine',
    depth: 0,
    from: 0,
    to: 1,
    showBackground: false,
    domain: { y: [1, 2], x: [1, 2] } as {
      y: [number, number];
      x: [number, number];
    },
  };

  it('should render ClosestLine without crashing', () => {
    renderWithThemeProviders(<ClosestLine {...mockedProps} />);
  });

  it('should render ClosestLine without crashing when inactive true', () => {
    renderWithThemeProviders(<ClosestLine {...mockedProps} inactive={true} />);
  });

  it('should render ClosestLine without crashing when showBackground true', () => {
    renderWithThemeProviders(<ClosestLine {...mockedProps} showBackground={true} />);
  });
});
