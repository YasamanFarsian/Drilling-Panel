import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import AlongStringEcd from './AlongStringEcd';

describe('AlongStringEcd', () => {
  const mockedProps = {
    data: [
      {
        x: 0,
        y: 0,
      },
    ],
  };

  it('should render without crashing', () => {
    renderWithThemeProviders(<AlongStringEcd {...mockedProps} />);
  });
});
