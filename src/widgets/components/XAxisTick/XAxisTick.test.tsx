import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import XAxisTick from './XAxisTick';

describe('Component XAxisTick', () => {
  const mockedProps = {
    invert: false,
    style: {},
  };
  it('should render XAxisTick without crashing', () => {
    renderWithThemeProviders(<XAxisTick {...mockedProps} />);
  });

  it('should render XAxisTick without crashing when invert true', () => {
    const mockedProps2 = {
      invert: true,
      style: {
        size: 100,
      },
    };
    renderWithThemeProviders(<XAxisTick {...mockedProps2} />);
  });
});
