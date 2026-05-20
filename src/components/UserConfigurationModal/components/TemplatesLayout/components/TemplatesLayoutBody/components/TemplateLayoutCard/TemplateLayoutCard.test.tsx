import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetLayoutEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { act, fireEvent, screen, within } from '@testing-library/react';
import * as useRemoveWidgetFromTemplate from './hooks/useRemoveWidgetFromTemplate';
import TemplateLayoutCard, { TemplateLayoutCardPropsType } from './TemplateLayoutCard';

describe('TemplateLayoutCard', () => {
  const mockedProps: TemplateLayoutCardPropsType = {
    id: '1',
    isEditable: true,
    name: 'Drilling',
    gridConfig: [
      [0, 2, 1],
      [0, 2, 1],
    ],
    widgetConfig: [{ key: 'Ecd' }, { key: 'Cutting' }] as any,
    currentSelectedLayout: WidgetLayoutEnum.OneRowThreeWidgets,
  };

  const wrapWithTemplatesLayoutProvider = (isEditable: boolean) => {
    return <TemplateLayoutCard {...mockedProps} isEditable={isEditable} />;
  };

  it('should render edit button if isEditable is true', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));
    expect(screen.queryByTestId('template_layout_card--edit_button')).toBeInTheDocument();
  });

  it('should not render edit button if isEditable is false', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(false));
    expect(screen.queryByTestId('template_layout_card--edit_button')).not.toBeInTheDocument();
  });

  it('should render delete button if isEditable is true', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));
    expect(screen.queryByTestId('template_layout_card--delete_button')).toBeInTheDocument();
  });

  it('should not render delete button if isEditable is false', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(false));
    expect(screen.queryByTestId('template_layout_card--delete_button')).not.toBeInTheDocument();
  });

  it('should render duplicate button if isEditable is true', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));
    expect(screen.getByTestId('template_layout_card--duplicate_button')).toBeInTheDocument();
  });

  it('should render duplicate button if isEditable is false', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(false));
    expect(screen.getByTestId('template_layout_card--duplicate_button')).toBeInTheDocument();
  });

  it('should render delete template confirm dialog when click on delete button', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));
    act(() => {
      fireEvent.click(screen.getByTestId('template_layout_card--delete_button'));
    });
    expect(
      screen.getByTestId('delete_template_layout_confirm_dialog_1677568422248'),
    ).toBeInTheDocument();
  });

  it('should render duplicate template dialog when click on duplicate button', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));
    act(() => {
      fireEvent.click(screen.getByTestId('template_layout_card--duplicate_button'));
    });
    expect(screen.getByTestId('template_name_form_dialog')).toBeInTheDocument();
    expect(screen.getByText('Duplicate Template')).toBeInTheDocument();
  });

  it('should render widget catalog dialog when click on a widget', () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));
    act(() => {
      fireEvent.click(screen.getByTestId('one_row_three_widgets_template--widget2'));
    });
    expect(screen.getByTestId('widget_catalog_dialog_1678767476098')).toBeInTheDocument();
  });

  it('should not show disable button if duplicated button clicked', async () => {
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));
    await act(async () => {
      fireEvent.click(screen.getByTestId('template_layout_card--duplicate_button'));
    });
    expect(screen.getByTestId('template_name_form_dialog--saveBtn')).not.toHaveAttribute(
      'disabled',
    );
  });

  it('should call handleRemoveWidget with widgetToLoadIdx=2 and current templateBody from prop if click on remove button on idx=2', () => {
    const mockHandleRemoveWidget = jest.fn();

    jest
      .spyOn(useRemoveWidgetFromTemplate, 'useRemoveWidgetFromTemplate')
      .mockReturnValue({ handleRemoveWidget: mockHandleRemoveWidget });
    renderWithThemeAndLocaleProviders(wrapWithTemplatesLayoutProvider(true));

    const OneRowThreeWidgetsTemplate = screen.getByTestId(
      'one_row_three_widgets_template--widget2',
    );
    const deleteButtonAtIdx1 = within(OneRowThreeWidgetsTemplate).getByTestId(
      'widget_template--deleteBtn',
    );

    fireEvent.click(deleteButtonAtIdx1);

    expect(mockHandleRemoveWidget).toHaveBeenCalledTimes(1);

    const mockTemplateBody = {
      name: mockedProps.name,
      isEditable: mockedProps.isEditable,
      gridConfig: mockedProps.gridConfig,
      widgetConfig: mockedProps.widgetConfig,
    };
    expect(mockHandleRemoveWidget).toHaveBeenCalledWith(2, mockTemplateBody);
  });
});
