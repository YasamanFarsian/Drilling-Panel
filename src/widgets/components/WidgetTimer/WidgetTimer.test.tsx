import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import WidgetTimer from './WidgetTimer';

describe('Component WidgetTimer', () => {
  const mockedProps = {
    label: 'cuttings' as any,
  };
  it('should render WidgetTimer without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<WidgetTimer {...mockedProps} />);
    expect(getByTestId(`widgetTimer_${mockedProps.label}_noConnection`)).toBeInTheDocument();
  });
});
