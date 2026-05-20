import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { WidgetStatusEnum } from '../BaseWidget';
import WidgetStatus, { WidgetStatusPropsType } from './WidgetStatus';

describe('WidgetStatus', () => {
  it('should render status INACTIVE', () => {
    const mockedProps: WidgetStatusPropsType = {
      label: WidgetStatusEnum.INACTIVE,
      widgetLabel: WidgetsLoaderEnum.Ecd,
    };
    renderWithThemeAndLocaleProviders(<WidgetStatus {...mockedProps} />);
    expect(screen.getByTestId(`widget_status_${mockedProps.widgetLabel}`)).toHaveTextContent(
      mockedProps.label,
    );
  });

  it.each([WidgetStatusEnum.ACTIVE, WidgetStatusEnum.UNREADY])(
    'should should not render status %p',
    (status: WidgetStatusEnum) => {
      const mockedProps: WidgetStatusPropsType = {
        label: status,
        widgetLabel: WidgetsLoaderEnum.Ecd,
      };
      renderWithThemeAndLocaleProviders(<WidgetStatus {...mockedProps} />);
      expect(screen.queryByTestId(`widget_status_${mockedProps.widgetLabel}`)).toBeNull();
    },
  );
});
