import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import InactiveEcd from './InactiveEcd';

describe('ECD InactiveEcd', () => {
  const mockedProps = {};

  it('should render InactiveEcd without crashing', () => {
    renderWithThemeAndLocaleProviders(<InactiveEcd {...mockedProps} />);
  });
});
