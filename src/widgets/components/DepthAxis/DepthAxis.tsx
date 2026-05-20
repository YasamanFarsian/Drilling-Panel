/* eslint-disable max-lines-per-function, complexity */
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { Domain } from '@dt-advisory/widgets/helpers/types';
import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { VictoryAxis, VictoryAxisProps } from 'victory';
import GridLine from '../../Ecd/components/GridLine';
import { getTickValues, tickToShow } from './depthAxisHelper';

export type DepthAxisPropsType = VictoryAxisProps & {
  hideAxis?: boolean;
  isSmallVersion?: boolean;
  hideLabel?: boolean;
  axisLabel: string;
  axisUnit: string;
};

const DepthAxis = ({
  maxDomain,
  minDomain,
  domain,
  hideAxis = false,
  isSmallVersion = false,
  hideLabel = false,
  axisLabel,
  axisUnit,
  ...props
}: DepthAxisPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const widgetStyle = useWidgetSettingsStore((x) => x.widgetStyle);

  const max = (maxDomain as Domain)?.x;
  const min = (minDomain as Domain)?.x;
  const result = getTickValues(isSmallVersion, max, min);
  const padding = widgetStyle.yAxisPadding;

  return (
    <VictoryAxis
      crossAxis
      {...props}
      orientation="left"
      tickValues={result?.tickValues}
      label={formatMessage(
        {
          id: axisLabel,
          defaultMessage: '-',
        },
        { unit: formatMessage({ id: axisUnit, defaultMessage: '-' }) },
      )}
      groupComponent={<g role="presentation" id="depth-axis-group" />}
      gridComponent={<GridLine interval={200} />}
      tickFormat={(tick: number) => tickToShow(tick, result?.steps)}
      style={{
        axis: { stroke: 'transparent' },
        axisLabel: {
          ...widgetStyle.labelStyle,
          padding,
          fill: hideLabel ? 'transparent' : 'currentColor',
        },
        ticks: { stroke: 'transparent' },
        tickLabels: {
          ...widgetStyle.labelStyle,
          fill: hideAxis || hideLabel ? 'transparent' : 'currentColor',
        },
      }}
    />
  );
};

const memoedDepthAxis = memo(
  DepthAxis,
  arePropsEqual([
    'width',
    'height',
    'domain.x[0]',
    'domain.x[1]',
    'domain.y[0]',
    'domain.y[1]',
    'hideLabel',
    'maxDomain.x',
    'maxDomain.y',
    'minDomain.x',
    'minDomain.y',
  ]),
);
memoedDepthAxis.displayName = 'DepthAxis';

export default memoedDepthAxis;
