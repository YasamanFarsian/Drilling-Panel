import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetLayoutEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import WidgetLayout from './WidgetLayout';

const getChildren = (num: number) => {
  const children = [];
  for (let i = 0; i < num; i++) {
    children.push(<div id={`${i}`} />);
  }
  return children;
};

describe('WidgetLayout', () => {
  it('should render OneRowThreeWidgets without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(
      <WidgetLayout layout={WidgetLayoutEnum.OneRowThreeWidgets}>{getChildren(3)}</WidgetLayout>,
    );
    expect(getByTestId('widget_layout')).toBeInTheDocument();
  });
  it('should render OneRowFourWidgets without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(
      <WidgetLayout layout={WidgetLayoutEnum.OneRowFourWidgets}>{getChildren(4)}</WidgetLayout>,
    );
    expect(getByTestId('widget_layout')).toBeInTheDocument();
  });
  it('should render OneRowFiveWidgets without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(
      <WidgetLayout layout={WidgetLayoutEnum.OneRowFiveWidgets}>{getChildren(5)}</WidgetLayout>,
    );
    expect(getByTestId('widget_layout')).toBeInTheDocument();
  });
  it('should render TwoRowsSixWidgets without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(
      <WidgetLayout layout={WidgetLayoutEnum.TwoRowsSixWidgets}>{getChildren(6)}</WidgetLayout>,
    );
    expect(getByTestId('widget_layout')).toBeInTheDocument();
  });
});
