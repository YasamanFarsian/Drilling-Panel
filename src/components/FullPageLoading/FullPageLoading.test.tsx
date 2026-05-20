import React from 'react';
import renderWithThemeProviders from '@dt-advisory/helpers/tests/renderWithContext';
import FullPageLoading from './FullPageLoading';

describe('FullPageLoading', () => {
  const mockedProps = {
    status: 'foo',
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<FullPageLoading {...mockedProps} />);
    expect(getByTestId('full_page_loading')).toBeInTheDocument();
  });
});
