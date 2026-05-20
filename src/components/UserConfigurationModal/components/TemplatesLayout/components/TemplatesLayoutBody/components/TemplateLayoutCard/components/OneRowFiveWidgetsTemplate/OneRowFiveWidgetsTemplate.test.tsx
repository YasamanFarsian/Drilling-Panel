import { mapWithKeyId } from '@dt-advisory/helpers/keyId';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { act, fireEvent, screen } from '@testing-library/react';
import OneRowFiveWidgetsTemplate, {
  OneRowFiveWidgetsTemplatePropsType,
} from './OneRowFiveWidgetsTemplate';

describe('OneRowFiveWidgetsTemplate', () => {
  const mockedProps: OneRowFiveWidgetsTemplatePropsType = {
    onSelectWidget: jest.fn(),
    isEditable: true,
    widgetsToLoad: mapWithKeyId([
      WidgetsLoaderEnum.Cutting,
      WidgetsLoaderEnum.Ecd,

      WidgetsLoaderEnum.Unsettled,
      WidgetsLoaderEnum.Unsettled,
    ]),
    onRemoveWidget: jest.fn(),
  };

  describe('grid position', () => {
    it('should have gridRow = 1/3 and gridColumn = 1/2 if it is 0 idx widget', () => {
      renderWithThemeAndLocaleProviders(<OneRowFiveWidgetsTemplate {...mockedProps} />);

      const element = screen.getByTestId('one_row_five_widgets_template--widget0');
      expect(element).toHaveStyle('grid-row: 1/3');
      expect(element).toHaveStyle('grid-column: 1/2');
    });
    it('should have gridRow = 1 and gridColumn = 2 if it is 1 index widget', () => {
      renderWithThemeAndLocaleProviders(<OneRowFiveWidgetsTemplate {...mockedProps} />);

      const element = screen.getByTestId('one_row_five_widgets_template--widget1');
      expect(element).toHaveStyle('grid-row: 1');
      expect(element).toHaveStyle('grid-column: 2');
    });
    it('should have gridRow = 1 gridColumn = 3 if it is 2 index widget', () => {
      renderWithThemeAndLocaleProviders(<OneRowFiveWidgetsTemplate {...mockedProps} />);

      const element = screen.getByTestId('one_row_five_widgets_template--widget2');
      expect(element).toHaveStyle('grid-row: 1');
      expect(element).toHaveStyle('grid-column: 3');
    });
    it('should have gridRow = 2 gridColumn = 2 if it is 3 index widget', () => {
      renderWithThemeAndLocaleProviders(<OneRowFiveWidgetsTemplate {...mockedProps} />);

      const element = screen.getByTestId('one_row_five_widgets_template--widget3');
      expect(element).toHaveStyle('grid-row: 2');
      expect(element).toHaveStyle('grid-column: 2');
    });
    it('should have gridRow = 2 gridColumn = 3 if it is 4 index widget', () => {
      renderWithThemeAndLocaleProviders(<OneRowFiveWidgetsTemplate {...mockedProps} />);

      const element = screen.getByTestId('one_row_five_widgets_template--widget4');
      expect(element).toHaveStyle('grid-row: 2');
      expect(element).toHaveStyle('grid-column: 3');
    });
  });

  describe('isEditable = true', () => {
    it('should call onSelectWidget on click widget at index 0', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget0'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(0);
    });

    it('should call onSelectWidget on click widget at index 1', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget1'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(1);
    });
    it('should call onSelectWidget on click widget at index 2', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget2'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(2);
    });
    it('should call onSelectWidget on click widget at index 3', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget3'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(3);
    });
    it('should call onSelectWidget on click widget at index 4', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget4'));
      });
      expect(mockOnSelectWidget).toHaveBeenCalledWith(4);
    });
  });

  describe('isEditable = false', () => {
    it('should not call onSelectWidget on click widget at index 0', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget0'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });

    it('should not call onSelectWidget on click widget at index 1', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget1'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });
    it('should not call onSelectWidget on click widget at index 2', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget2'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });
    it('should not call onSelectWidget on click widget at index 3', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget3'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });
    it('should not call onSelectWidget on click widget at index 4', () => {
      const mockOnSelectWidget = jest.fn();
      renderWithThemeAndLocaleProviders(
        <OneRowFiveWidgetsTemplate
          {...mockedProps}
          onSelectWidget={mockOnSelectWidget}
          isEditable={false}
        />,
      );

      act(() => {
        fireEvent.click(screen.getByTestId('one_row_five_widgets_template--widget4'));
      });
      expect(mockOnSelectWidget).not.toHaveBeenCalled();
    });
  });
});
