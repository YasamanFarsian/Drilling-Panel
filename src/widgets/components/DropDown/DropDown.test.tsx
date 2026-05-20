import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DropDown from './DropDown';

describe('DropDown', () => {
  it('should render without crashing', () => {
    renderWithThemeProviders(<DropDown type="ecd" />);
  });
});
