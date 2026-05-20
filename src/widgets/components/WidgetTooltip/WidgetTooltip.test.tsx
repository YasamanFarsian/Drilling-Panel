import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryVoronoiContainer } from 'victory';
import WidgetTooltip, { getFormattedDatum } from './WidgetTooltip';

jest.mock('@dt-advisory/utils/Tooltip', () => ({
  Tooltip: {
    Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

describe('WidgetTooltip', () => {
  const renderChart = (mockedProps: any) => {
    return renderWithThemeAndLocaleProviders(
      <VictoryChart
        domainPadding={{ y: 10 }}
        data-testid="mock-container"
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryGroup>
          <VictoryLine
            data-testid="mock_victory_line"
            y={(datum) => Math.sin(2 * Math.PI * datum.x)}
            labelComponent={
              <WidgetTooltip
                active={true}
                name={mockedProps.name}
                flyoutWidth={mockedProps.flyoutWidth}
                axisUnitLabel={mockedProps.axisUnitLabel}
                depthAxisUnitLabel={mockedProps.depthAxisUnitLabel}
              />
            }
          />
        </VictoryGroup>
      </VictoryChart>,
    );
  };
  it('should render WidgetTooltip with correct value', () => {
    const mockedProps = {
      name: 'foo',
      axisUnitLabel: 'sg',
      depthAxisUnitLabel: 'km',
    };
    renderWithThemeAndLocaleProviders(
      <WidgetTooltip
        active={true}
        name={mockedProps.name}
        axisUnitLabel={mockedProps.axisUnitLabel}
        depthAxisUnitLabel={mockedProps.depthAxisUnitLabel}
        x={42}
        y={42}
        datum={{ x: 42, y: 42 }}
      />,
    );
    const firstTextElement = screen.getByText('42.00km', { exact: false });
    expect(firstTextElement).toBeInTheDocument();
  });

  it('should return correct formatted data', () => {
    const result = getFormattedDatum({ x: 1.423424, y: 4.4265656 });
    expect(result).toEqual('1.42 4.43');
  });

  it('should render WidgetTooltip without crashing', async () => {
    renderChart({
      name: 'ECD',
      axisUnitLabel: 'sg',
      depthAxisUnitLabel: 'm',
    });
    const container = screen.getByTestId('mock_victory_line');
    fireEvent.mouseOver(container);
  });
});
