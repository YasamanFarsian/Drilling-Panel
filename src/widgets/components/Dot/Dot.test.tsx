import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Dot, { DotPropsType } from './Dot';

describe('Dot', () => {
  const mockedProps: DotPropsType = {
    fill: 'red',
    data: [{ x: 10, y: 20 }],
  };

  it('should render without crashing', () => {
    const { container } = renderWithThemeProviders(<Dot {...mockedProps} />);
    expect(container?.querySelector('svg')).toBeTruthy();
  });
});
