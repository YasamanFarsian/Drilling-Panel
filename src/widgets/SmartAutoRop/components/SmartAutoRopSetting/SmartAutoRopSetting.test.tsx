import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import SmartAutoRopSetting from './SmartAutoRopSetting';

describe('SmartAutoRopSetting', () => {
  it('should render without crashing', () => {
    renderWithThemeAndLocaleProviders(<SmartAutoRopSetting />);
  });
});
