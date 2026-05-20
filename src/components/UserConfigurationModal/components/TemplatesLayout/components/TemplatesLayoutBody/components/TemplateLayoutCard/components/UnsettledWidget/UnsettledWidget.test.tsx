import { useTheme } from '@emotion/react';
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import UnsettledWidget from './UnsettledWidget';

jest.mock('@emotion/react', () => ({
  ...jest.requireActual('@emotion/react'),
  useTheme: jest.fn().mockReturnValue({ mode: 'light' }),
}));

describe('UnsettledWidget', () => {
  describe('isEditable = true', () => {
    const mockedProps = { isEditable: true };
    it('should render plus icon light if theme.mode = light', () => {
      (useTheme as unknown as jest.Mock).mockReturnValue({ mode: 'light' });
      renderWithThemeProviders(<UnsettledWidget {...mockedProps} />);

      expect(screen.queryByTestId('unsettled_widget--plusIconLight')).toBeInTheDocument();
    });

    it('should render plus icon dark if theme.mode = dark', () => {
      (useTheme as unknown as jest.Mock).mockReturnValue({ mode: 'dark' });
      renderWithThemeProviders(<UnsettledWidget {...mockedProps} />);

      expect(screen.queryByTestId('unsettled_widget--plusIconDark')).toBeInTheDocument();
    });

    it('should have cursor pointer at unsettled_widget root level', () => {
      renderWithThemeProviders(<UnsettledWidget {...mockedProps} />);
      expect(screen.queryByTestId('unsettled_widget_1677041721300')).toHaveStyle(
        'cursor: pointer;',
      );
    });
  });

  describe('isEditable = false', () => {
    const mockedProps = { isEditable: false };
    it('should not render plus icon', () => {
      renderWithThemeProviders(<UnsettledWidget {...mockedProps} isEditable={false} />);

      expect(screen.queryByTestId('unsettled_widget--plusIconDark')).not.toBeInTheDocument();
      expect(screen.queryByTestId('unsettled_widget--plusIconLight')).not.toBeInTheDocument();
    });

    it('should not have cursor pointer at unsettled_widget root level', () => {
      renderWithThemeProviders(<UnsettledWidget {...mockedProps} />);
      expect(screen.queryByTestId('unsettled_widget_1677041721300')).not.toHaveStyle(
        'cursor: pointer;',
      );
    });
  });
});
