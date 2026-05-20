import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { AppearanceEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import ChangeThemeToggleButtonGroup from './ChangeThemeToggleButtonGroup';

describe('ChangeThemeToggleButtonGroup', () => {
  const mockOnChange = jest.fn();
  it('renders with light theme icon initially', () => {
    const { getByTestId } = render(
      <ChangeThemeToggleButtonGroup value={AppearanceEnum.LIGHT} onChange={() => mockOnChange} />,
    );

    expect(getByTestId('light-theme-icon')).toBeInTheDocument();
  });

  it('renders with dark theme icon when the theme is dark', () => {
    const { getByTestId } = render(
      <ChangeThemeToggleButtonGroup value={AppearanceEnum.DARK} onChange={() => mockOnChange} />,
    );

    expect(getByTestId('dark-theme-icon')).toBeInTheDocument();
  });

  it('calls onChange with the correct value when clicked on light button', () => {
    const { getByTestId } = render(
      <ChangeThemeToggleButtonGroup value={AppearanceEnum.LIGHT} onChange={mockOnChange} />,
    );

    fireEvent.click(getByTestId('light-theme-icon'));

    expect(mockOnChange).toHaveBeenCalledWith(AppearanceEnum.DARK);
  });

  it('calls onChange with the correct value when clicked on dark button', () => {
    const { getByTestId } = render(
      <ChangeThemeToggleButtonGroup value={AppearanceEnum.DARK} onChange={mockOnChange} />,
    );

    fireEvent.click(getByTestId('dark-theme-icon'));

    expect(mockOnChange).toHaveBeenCalledWith(AppearanceEnum.LIGHT);
  });
});
