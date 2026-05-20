import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import MiddleLine from './MiddleLine';

describe('Cuttings chart MiddleLine', () => {
  it('should render MiddleLine without crashing', () => {
    const mockedProps = {
      domain: { y: [1, 2], x: [1, 2] } as {
        y: [number, number];
        x: [number, number];
      },
    };
    renderWithThemeProviders(<MiddleLine {...mockedProps} />);
  });
});
