import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { mapWithKeyId } from '@dt-advisory/helpers/keyId';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import TwoRowsSixWidgetsTemplate, {
  TwoRowsSixWidgetsTemplatePropsType,
} from './TwoRowsSixWidgetsTemplate';

describe('TwoRowsSixWidgetsTemplate', () => {
  const mockedProps: TwoRowsSixWidgetsTemplatePropsType = {
    onSelectWidget: jest.fn(),
    isEditable: true,
    widgetsToLoad: mapWithKeyId([
      WidgetsLoaderEnum.Cutting,
      WidgetsLoaderEnum.Ecd,
      WidgetsLoaderEnum.Wellbore,
    ]),
    onRemoveWidget: jest.fn(),
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <TwoRowsSixWidgetsTemplate {...mockedProps} />,
    );
    expect(getByTestId('two_rows_six_widgets_template_1677057631733')).toBeInTheDocument();
  });

  it('should call onSelectWidget on click widget at index 0', () => {
    const mockOnSelectWidget = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TwoRowsSixWidgetsTemplate {...mockedProps} onSelectWidget={mockOnSelectWidget} isEditable />,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('two_rows_six_widgets_template--widget0'));
    });
    expect(mockOnSelectWidget).toHaveBeenCalledWith(0);
  });

  it('should call onSelectWidget on click widget at index 1', () => {
    const mockOnSelectWidget = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TwoRowsSixWidgetsTemplate {...mockedProps} onSelectWidget={mockOnSelectWidget} isEditable />,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('two_rows_six_widgets_template--widget1'));
    });
    expect(mockOnSelectWidget).toHaveBeenCalledWith(1);
  });

  it('should call onSelectWidget on click widget at index 2', () => {
    const mockOnSelectWidget = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TwoRowsSixWidgetsTemplate {...mockedProps} onSelectWidget={mockOnSelectWidget} isEditable />,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('two_rows_six_widgets_template--widget2'));
    });
    expect(mockOnSelectWidget).toHaveBeenCalledWith(2);
  });

  it('should NOT call onSelectWidget on click widget at index 0', () => {
    const mockOnSelectWidget = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TwoRowsSixWidgetsTemplate
        {...mockedProps}
        onSelectWidget={mockOnSelectWidget}
        isEditable={false}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('two_rows_six_widgets_template--widget0'));
    });
    expect(mockOnSelectWidget).not.toHaveBeenCalled();
  });

  it('should NOT call onSelectWidget on click widget at index 1', () => {
    const mockOnSelectWidget = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TwoRowsSixWidgetsTemplate
        {...mockedProps}
        onSelectWidget={mockOnSelectWidget}
        isEditable={false}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('two_rows_six_widgets_template--widget1'));
    });
    expect(mockOnSelectWidget).not.toHaveBeenCalled();
  });

  it('should NOT call onSelectWidget on click widget at index 2', () => {
    const mockOnSelectWidget = jest.fn();
    renderWithThemeAndLocaleProviders(
      <TwoRowsSixWidgetsTemplate
        {...mockedProps}
        onSelectWidget={mockOnSelectWidget}
        isEditable={false}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('two_rows_six_widgets_template--widget2'));
    });
    expect(mockOnSelectWidget).not.toHaveBeenCalled();
  });
});
