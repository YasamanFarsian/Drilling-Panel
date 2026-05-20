import { mapWithKeyId } from '@dt-advisory/helpers/keyId';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { act, fireEvent, screen } from '@testing-library/react';
import OneRowThreeWidgetsTemplate, {
  OneRowThreeWidgetsTemplatePropsType,
} from './OneRowThreeWidgetsTemplate';

describe('OneRowThreeWidgetsTemplate', () => {
  const mockedProps: OneRowThreeWidgetsTemplatePropsType = {
    onSelectWidget: jest.fn(),
    isEditable: false,
    widgetsToLoad: mapWithKeyId([WidgetsLoaderEnum.Ecd, WidgetsLoaderEnum.Cutting]),
    onRemoveWidget: jest.fn(),
  };

  describe('isEditable = true', () => {
    it('should call onSelectWidget on click widget at index 0', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowThreeWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_three_widgets_template--widget0'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(0);
    });

    it('should call onSelectWidget on click widget at index 1', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowThreeWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_three_widgets_template--widget1'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(1);
    });

    it('should call onSelectWidget on click widget at index 2', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowThreeWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_three_widgets_template--widget2'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(2);
    });
  });

  describe('isEditable = false', () => {
    it('should not call onSelectWidget on click widget at index 0', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowThreeWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_three_widgets_template--widget0'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });

    it('should not call onSelectWidget on click widget at index 1', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowThreeWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_three_widgets_template--widget1'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });

    it('should not call onSelectWidget on click widget at index 2', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowThreeWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_three_widgets_template--widget2'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });
  });
});
