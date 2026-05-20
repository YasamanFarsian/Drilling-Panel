/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
/* eslint-disable no-param-reassign */
import { useTheme } from '@mui/styles';
import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryStack } from 'victory';
import { barTheme, chartContainer, labelStyle, lableTheme } from './Thermometer.style';

export type ThermometerParams = {
  lo?: number;
  hi?: number;
  value?: number;
  label: string;
  range: { min: number; max: number };
  widgetName?: string;
};

const Thermometer = ({ lo, hi, label, range, widgetName = 'unassigned' }: ThermometerParams) => {
  const dataTestIdPrefix = `${widgetName}-thermometer`;
  const theme = useTheme();
  if (lo == undefined) lo = NaN;
  if (hi == undefined) hi = NaN;

  const valueStyle = lableTheme(theme.mode);
  const barGraphStyle = barTheme(theme.mode);

  const [viewBox, setViewBox] = React.useState('51 18 350 1030');
  React.useEffect(() => {
    const handleResize = () => {
      const newViewBox = window.innerWidth > 2016 ? '51 18 350 1030' : '61 18 320 1050';
      setViewBox(newViewBox);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const valueHeight = hi !== undefined && hi <= range.max ? hi : range.max;

  const LabelWithPointer = ({ x, y, lableValue }: any) => {
    return (
      <g>
        <text
          x={x + 42}
          y={y + 7}
          style={{
            fontFamily: 'Helvetica Neue',
            fontSize: '1.1vw',
            fontWeight: 700,
            fill: valueStyle.data.fill,
          }}
        >
          {lableValue}
        </text>
        <text
          x={x + 15}
          y={y + 7}
          style={{
            fontFamily: 'Helvetica Neue',
            fontSize: '0.9vw',
            fill: valueStyle.data.fill,
          }}
        >
          ◀
        </text>
      </g>
    );
  };
  return (
    <div css={chartContainer} data-testid={dataTestIdPrefix}>
      <svg viewBox={viewBox} height="100%" width="100%">
        <VictoryChart height={1000} standalone={false}>
          <VictoryAxis
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: {
                fill: 'transparent',
              },
            }}
          />
          <VictoryStack style={{ data: { width: 15 } }}>
            <VictoryBar
              data-testid={`${dataTestIdPrefix}-bar`}
              style={barGraphStyle}
              cornerRadius={2}
              data={[{ x: '0', y: range.max }]}
              labels={() => range.max}
              labelComponent={
                <VictoryLabel
                  dx={-40}
                  dy={22}
                  style={{
                    fontFamily: 'Helvetica Neue',
                    fontSize: '28px',
                    fontWeight: 500,
                    fill: valueStyle.data.fill,
                  }}
                />
              }
            />
            <VictoryBar
              style={{ data: { fill: 'none' } }}
              cornerRadius={2}
              data={[{ x: '0', y: range.min }]}
              labels={() => range.min}
              labelComponent={
                <VictoryLabel
                  dx={-40}
                  dy={900}
                  style={{
                    fontFamily: 'Helvetica Neue',
                    fontSize: '28px',
                    fontWeight: 500,
                    fill: valueStyle.data.fill,
                  }}
                />
              }
            />
          </VictoryStack>

          <VictoryStack style={{ data: { width: 15 }, labels: { fontSize: 19 } }}>
            {isNaN(lo) || (
              <VictoryBar
                style={{ data: { fill: barGraphStyle.data.fill } }}
                cornerRadius={2}
                data={[{ x: '0', y: lo }]}
                labels={() => null}
                barWidth={15}
                labelComponent={<LabelWithPointer lableValue={lo} />}
              />
            )}

            {isNaN(hi) || (
              <VictoryBar
                style={{ data: { fill: '#34a9cc' } }}
                cornerRadius={2}
                data={[{ x: '0', y: valueHeight }]}
                labels={() => null}
                barWidth={15}
                labelComponent={<LabelWithPointer lableValue={hi} />}
              />
            )}
          </VictoryStack>
        </VictoryChart>
        <text
          data-testid={`${dataTestIdPrefix}-label`}
          x="223"
          y="1030"
          css={labelStyle}
          textAnchor="middle"
        >
          {label}
        </text>
      </svg>
    </div>
  );
};

export default Thermometer;
