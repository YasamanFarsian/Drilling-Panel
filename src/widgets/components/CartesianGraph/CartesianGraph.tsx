/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { HTMLAttributes } from 'react';
import { VictoryChart, VictoryChartProps, VictoryTheme, VictoryThemeDefinition } from 'victory';
import { useBaseWidget } from '@dt-advisory/providers/BaseWidget';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { containerStyle } from './CartesianGraph.style';

const padding = { left: 90, bottom: 104, right: 30, top: 60 };

const theme: VictoryThemeDefinition = {
  axis: {
    offsetY: 40,
    style: {
      ...VictoryTheme.grayscale.axis!.style,
      axis: { stroke: 'transparent' },
      axisLabel: { fill: 'currentColor', fontFamily: 'inherit' },
      ticks: { stroke: 'currentColor', size: 8 },
      tickLabels: { fill: 'currentColor', fontFamily: 'inherit' },
    },
  },
};

export type CartesianGraphPropsType = VictoryChartProps &
  Pick<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
    customPadding?: { left: number; bottom: number; right: number; top: number };
    inactive?: boolean;
    inslips?: boolean;
    isSmallVersion?: boolean;
    widgetName?: WidgetsLoaderEnum | 'unassigned';
  };

// eslint-disable-next-line max-lines-per-function
const CartesianGraph = ({
  customPadding,
  inactive = false,
  inslips = false,
  isSmallVersion = false,
  widgetName = 'unassigned',
  ...props
}: CartesianGraphPropsType): JSX.Element => {
  const { dimension } = useBaseWidget();
  const currentPadding = customPadding ?? padding;
  const width = dimension?.width ?? 0;
  const height = dimension?.height ?? 0;

  return (
    <div data-testid={`${widgetName}-cartesian_graph`} css={containerStyle(inactive, inslips)}>
      <VictoryChart
        theme={theme}
        padding={currentPadding}
        width={width}
        height={height}
        {...props}
        style={{
          parent: {
            width: dimension.width,
            height: dimension.height,
          },
        }}
      />
    </div>
  );
};

export default CartesianGraph;
