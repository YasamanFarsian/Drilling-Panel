import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import TrippingLimits from './TrippingLimits';

describe('TrippingLimits', () => {
  const mockedProps = {
    isLoading: false,
    data: {
      withCirculations: [
        {
          uid: 'fooid',
          fromDepth: 4,
          toDepth: 4,
          maxVelDownwards: 4,
          maxVelUpwards: 4,
        },
      ],
      withoutCirculations: [
        {
          uid: 'barid',
          fromDepth: 5,
          toDepth: 5,
          maxVelDownwards: 5,
          maxVelUpwards: 5,
        },
      ],
    },
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<TrippingLimits {...mockedProps} />);
    expect(getByTestId('at_operationInfo_trippingLimits')).toBeInTheDocument();
  });

  it('should render without crashing without data', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<TrippingLimits isLoading={false} />);
    expect(getByTestId('at_operationInfo_trippingLimits')).toBeInTheDocument();
  });
});
