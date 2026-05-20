import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import BelowBitDepthOverlay from './BelowBitDepthOverlay';

describe('ECD BelowBitDepthOverlay', () => {
  const mockedProps = {
    MD: 1,
    TD: 2,
    domain: { y: [1, 2], x: [1, 2] } as {
      y: [number, number];
      x: [number, number];
    },
  };

  it('should render BelowBitDepthOverlay without crashing', () => {
    renderWithThemeProviders(<BelowBitDepthOverlay {...mockedProps} />);
  });

  it('should render BelowBitDepthOverlay without crashing when inactive true', () => {
    renderWithThemeProviders(<BelowBitDepthOverlay {...mockedProps} inactive={true} />);
  });
});
