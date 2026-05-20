import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import GridLine from './GridLine';

describe('ECD GridLine', () => {
  const mockedProps = {
    datum: 0,
  };

  it('should render GridLine without crashing', () => {
    const { queryByRole } = renderWithThemeProviders(<GridLine {...mockedProps} />);
    expect(queryByRole('presentation')).toBeInTheDocument();
  });
  it('should render GridLine without crashing', () => {
    const { queryByRole } = renderWithThemeProviders(
      <GridLine {...mockedProps} shouldSkip={(data: any) => true} />,
    );
    expect(queryByRole('presentation')).not.toBeInTheDocument();
  });
});
