/* eslint-disable max-lines-per-function */
import { useTheme } from '@mui/styles';
import React from 'react';
import { VictoryPie } from 'victory';
import { useEmseScalingSize } from '../../hooks/useEmseScalingSize';
import {
  arrowPointer,
  axeStyle,
  chartContainer,
  labelStyle,
  pieTheme,
  valueStyle,
} from './DownholeEmse.style';
import { calculateStartAngle } from './DownholeEmseHelper';

type DownholeEmseParams = {
  val: number;
  label: string;
  widgetName?: string;
};
const DownholeEmseGraph = ({ val, label, widgetName = 'unassigned' }: DownholeEmseParams) => {
  const dataTestIdPrefix = `${widgetName}-DownholeEmse`;
  const [min, max] = [0, 10];
  const valueAngle = calculateStartAngle(val, min, max);
  const theme = useTheme();
  const barGraphStyle = pieTheme(theme.mode);
  const arrowStyle = arrowPointer(theme.mode);
  const eMseScalingSize = useEmseScalingSize();
  const arrow =
    'M15.6637 9.36676C16.1979 10.0197 15.7334 11 14.8898 11L1.11024 11C0.266613 11 -0.197933 10.0197 0.336285 9.36676L7.22604 0.945948C7.62615 0.456931 8.37385 0.456932 8.77396 0.945949L15.6637 9.36676Z';

  return (
    <div css={chartContainer} data-testid={`${dataTestIdPrefix}`}>
      <svg viewBox={eMseScalingSize} height="100%" width="100%">
        <VictoryPie
          standalone={false}
          colorScale={[barGraphStyle.data.fill]}
          startAngle={90}
          endAngle={-90}
          innerRadius={130}
          labels={[]}
          data={[{ y: max }]}
        />
        <VictoryPie
          standalone={false}
          colorScale={['#34a9cc']}
          startAngle={valueAngle}
          endAngle={-90}
          innerRadius={130}
          labels={[]}
          data={[{ y: val }]}
        />

        <text
          data-testid={`${dataTestIdPrefix}-value`}
          style={valueStyle(theme.mode)}
          x="212"
          y="155"
          textAnchor="middle"
        >
          {val}
        </text>
        <g transform={val >= 0 ? 'translate(175 143)' : 'translate(185 155) rotate(180)'}>
          <path d={arrow} style={{ fill: arrowStyle.data.fill }} />
        </g>
        <text data-testid={`${dataTestIdPrefix}-min`} x="55" y="223" style={axeStyle(theme.mode)}>
          {min}
        </text>
        <text data-testid={`${dataTestIdPrefix}-max`} x="330" y="223" style={axeStyle(theme.mode)}>
          {max}
        </text>
        <text
          data-testid={`${dataTestIdPrefix}-label`}
          x="200"
          y="252"
          style={labelStyle(theme.mode)}
          textAnchor="middle"
        >
          {label}
        </text>
      </svg>
    </div>
  );
};
export default DownholeEmseGraph;
