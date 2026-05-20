import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import SmartAutoRopIndicator, { SmartAutoRopIndicatorPropsType } from './SmartAutoRopIndicator';

describe('SmartAutoRopIndicator', () => {
  const mockedProps: SmartAutoRopIndicatorPropsType = {
    activeDataKeys: [],
    radius: 4,
  };

  it('should render without crashing', () => {
    renderWithThemeProviders(<SmartAutoRopIndicator {...mockedProps} />);
  });
});
