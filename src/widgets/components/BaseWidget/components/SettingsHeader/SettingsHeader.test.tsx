import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import SettingsHeader, { SettingsHeaderPropsType } from './SettingsHeader';

describe('SettingsHeader', () => {
  const mockedProps: SettingsHeaderPropsType = {
    onClose: jest.fn(),
    type: 'safeguards',
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<SettingsHeader {...mockedProps} />);
    expect(getByTestId('settings_header_1677074473828')).toBeInTheDocument();
  });
});
