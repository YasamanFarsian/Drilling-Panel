import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DownholeMwdEcd from './DownholeMwdEcd';

describe('DownholeMwdEcd', () => {
  const mockedProps = {
    data: [{ x: 0, y: 0 }],
  };

  it('should render without crashing', () => {
    renderWithThemeProviders(<DownholeMwdEcd {...mockedProps} />);
  });
});
