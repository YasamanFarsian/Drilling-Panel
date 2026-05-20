import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetLayoutEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import WidgetCatalogDialog, { WidgetCatalogDialogPropsType } from './WidgetCatalogDialog';

jest.mock('./useGetWidgets', () => {
  return {
    useGetWidgets: jest
      .fn()
      .mockReturnValueOnce({
        isLoadingWidgets: true,
        widgets: undefined,
      })
      .mockReturnValueOnce({
        isLoadingWidgets: false,
        widgets: [],
      })
      .mockReturnValueOnce({
        isLoadingWidgets: false,
        widgets: [
          {
            key: 'Ecd',
          },
        ],
      }),
  };
});

describe('WidgetCatalogDialog', () => {
  const mockedProps: WidgetCatalogDialogPropsType = {
    currentSelectedLayout: WidgetLayoutEnum.OneRowThreeWidgets,
    selectedWidgets: [],
    selectingWidgetIdx: 0,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    isSubmitting: false,
  };

  it('should render without crashing with loading widget catalog', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <WidgetCatalogDialog {...mockedProps} />,
    );
    expect(getByTestId('widget_catalog_dialog_1678767476098')).toBeInTheDocument();
    expect(getByTestId('widget_catalog_skeleton_loading_1678890453914')).toBeInTheDocument();
  });

  it('should render without crashing with empty widget catalog', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <WidgetCatalogDialog {...mockedProps} />,
    );
    expect(getByTestId('empty_widget_catalog_1678892958026')).toBeInTheDocument();
  });
  it('should render without crashing with non empty widget catalog', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <WidgetCatalogDialog {...mockedProps} />,
    );
    expect(getByTestId('widget_catalog_1678936303802')).toBeInTheDocument();
  });
});
