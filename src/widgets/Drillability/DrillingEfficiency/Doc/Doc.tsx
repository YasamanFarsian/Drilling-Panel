/* eslint-disable max-lines-per-function */
import { useTheme } from '@mui/styles';
import React from 'react';
import { VictoryPie } from 'victory';
import { useDocScalingSize } from '../../hooks/useDocScalingSize';
import { labelStyle, valueStyle } from './Doc.style';
import { calculateStartAngle } from './DocHelper';

type DocParams = {
  val: number;
  label: string;
  widgetName?: string;
};
/* eslint-disable no-param-reassign */
const DocGraph = ({ val, label, widgetName = 'unassigned' }: DocParams) => {
  const dataTestIdPrefix = `${widgetName}-docGraph`;
  const theme = useTheme();
  const pieTheme = theme.drillability.charts.doc;
  const [min, max] = [0, 10];
  const valueAngle = calculateStartAngle(val, min, max);
  const viewBoxDoc = useDocScalingSize();

  return (
    <svg viewBox={viewBoxDoc} height="100%" width="100%">
      <VictoryPie
        standalone={false}
        colorScale={
          Array.isArray(pieTheme.pieThemeData) ? pieTheme.pieThemeData : [pieTheme.pieThemeData]
        }
        innerRadius={116}
        labels={[]}
        data={[{ y: max }]}
        data-testid={`${dataTestIdPrefix}-arc-circle`}
      />
      <VictoryPie
        standalone={false}
        colorScale={[theme.drillability.charts.dataBackgroundColor]}
        startAngle={valueAngle - 180}
        endAngle={-valueAngle - 180}
        innerRadius={116}
        labels={[]}
        data={[{ y: 10 }]}
        data-testid={`${dataTestIdPrefix}-arc-path`}
      />
      <text
        x="201"
        y="227"
        style={valueStyle(theme.mode)}
        textAnchor="middle"
        data-testid={`${dataTestIdPrefix}-val-text`}
      >
        {val}
      </text>
      <text
        x="195"
        y="430"
        style={labelStyle(theme.mode)}
        data-testid={`${dataTestIdPrefix}-label-text`}
        textAnchor="middle"
      >
        {label}
      </text>
    </svg>
  );
};

export default DocGraph;
