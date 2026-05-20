import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import Timer from './Timer';

describe('Timer', () => {
  const mockedProps = {
    timestamp: new Date('01-01-2023'),
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<Timer {...mockedProps} />);
    expect(getByTestId('at_main_noConnection')).toBeInTheDocument();
  });
});
