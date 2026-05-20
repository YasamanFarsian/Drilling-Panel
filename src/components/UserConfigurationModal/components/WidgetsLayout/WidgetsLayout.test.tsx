import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import WidgetsLayout from './WidgetsLayout';

describe('WidgetsLayout', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<WidgetsLayout />);
    expect(getByTestId('user_configuration_modal_widgets_layout')).toBeInTheDocument();
  });
  it('should be able to select layout withouth crashing', () => {
    const { queryAllByRole } = renderWithThemeAndLocaleProviders(<WidgetsLayout />);
    const BoxContainer = queryAllByRole('button');
    const btnOneRowThreeWidgets = BoxContainer[0];
    fireEvent.click(btnOneRowThreeWidgets);
    const btnOneRowFourWidgets = BoxContainer[1];
    fireEvent.click(btnOneRowFourWidgets);
    const btnOneRowFiveWidgets = BoxContainer[2];
    fireEvent.click(btnOneRowFiveWidgets);
    const btnTwoRowSixWidgets = BoxContainer[3];
    fireEvent.click(btnTwoRowSixWidgets);
  });
});
