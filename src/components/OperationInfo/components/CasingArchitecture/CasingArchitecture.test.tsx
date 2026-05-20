import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import CasingArchitecture from './CasingArchitecture';

describe('CasingArchitecture', () => {
  const mockedProps = {
    isLoading: false,
    data: [
      {
        uid: 'foouid',
        fromDepth: 3,
        toDepth: 2,
        od: 'foood',
        id: 'fooid',
      },
    ],
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <CasingArchitecture {...mockedProps} />,
    );
    expect(getByTestId('at_operationInfo_casingArchitecture')).toBeInTheDocument();
  });
  it('should render without crashing if no data', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <CasingArchitecture isLoading={false} />,
    );
    expect(getByTestId('at_operationInfo_casingArchitecture')).toBeInTheDocument();
  });
});
