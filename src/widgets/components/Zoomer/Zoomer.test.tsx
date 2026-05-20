import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Zoomer from './Zoomer';

describe('Zoomer', () => {
  it('should render without crashing', () => {
    renderWithThemeProviders(<Zoomer widgetId="ecd" zoomer="ecd" />);
  });
});
