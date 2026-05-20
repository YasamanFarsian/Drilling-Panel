import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Settings, { SettingsPropsType } from './Settings';

describe('Settings', () => {
  const mockedProps: SettingsPropsType = {
    onClick: jest.fn(),
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<Settings {...mockedProps} />);
    expect(getByTestId('settings_1676907540122')).toBeInTheDocument();
  });
});
