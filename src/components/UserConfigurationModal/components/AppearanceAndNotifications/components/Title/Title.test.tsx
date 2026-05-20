import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Title, { TitlePropsType } from './Title';

describe('Title', () => {
  const mockedProps: TitlePropsType = {
    value: 'foo',
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<Title {...mockedProps} />);
    expect(getByTestId('title_1676546212865')).toBeInTheDocument();
  });
});
