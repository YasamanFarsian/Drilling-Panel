import { render } from '@testing-library/react';
import React from 'react';
import ThemeProvider from './Theme';

describe('Theme Provider', () => {
  it('should render without crashing', () => {
    render(
      <ThemeProvider>
        <></>
      </ThemeProvider>,
    );
  });
  it('should render host theme with light theme without crashing', () => {
    render(
      <ThemeProvider isHostTheme isLightTheme>
        <></>
      </ThemeProvider>,
    );
  });
});
