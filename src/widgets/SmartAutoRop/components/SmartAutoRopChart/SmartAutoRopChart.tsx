import { useTheme } from '@emotion/react';
import React from 'react';
import useDimensions from 'react-cool-dimensions';
import { useIntl } from 'react-intl';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryPie, VictoryScatter } from 'victory';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { SmartRopDataKeyType } from '../../SmartAutoRopTypes';
import SmartAutoRopIndicator from './components/SmartAutoRopIndicator';
import { containerStyle } from './SmartAutoRopChart.style';
import {
  getChartContentSize,
  getChartSize,
  getPieRadius,
  getPieSliceColor,
  getScaleIndicatorRadius,
} from './smartAutoRopChartHelpers';

export type IndicatorDataType = { x: number; y: number; dataKey: SmartRopDataKeyType };

export type SmartAutoRopChartPropsType = {
  activeDataKeys: SmartRopDataKeyType[];
  indicatorData: IndicatorDataType[];
  inactive: boolean;
};

const PIE_DATA: { x: SmartRopDataKeyType; y: number }[] = [
  { x: 'ROP', y: 1 },
  { x: 'RPM', y: 1 },
  { x: 'WOB', y: 1 },
  { x: 'FlowRate', y: 1 },
];

// eslint-disable-next-line max-lines-per-function
const SmartAutoRopChart = ({
  activeDataKeys,
  indicatorData,
  inactive,
}: SmartAutoRopChartPropsType): JSX.Element => {
  const dataTestIdPrefix = WidgetsLoaderEnum.SmartAutoRop;
  const { formatMessage } = useIntl();
  const { observe, width: containerWidth, height: containerHeight } = useDimensions();
  const labelStyle = useWidgetSettingsStore((state) => state.widgetStyle.labelStyle);
  const theme = useTheme();
  const thresholdLimit = useSettingsStore((state) => state.settings.smartAutoRop.thresholdLimit);

  const customLabelStyle = {
    ...labelStyle,
    fill: theme.palette.text.primary,
    fontSize: scalePxAsVw(12),
  };

  // chartWidth must strictly equal to chartHeight to make it display as square as per design
  const chartSize = getChartSize({ containerWidth, containerHeight });
  const xCenter = chartSize / 2;
  const yCenter = chartSize / 2;

  const indicatorRadius = getScaleIndicatorRadius({ chartSize });
  const domainPadding = indicatorRadius;
  const chartContentSize = getChartContentSize({
    chartSize,
    domainPadding,
  });

  const { pieInnerRadius, pieOuterRadius } = getPieRadius({
    chartContentSize,
    thresholdLimit,
  });

  return (
    <div ref={observe} data-testid="smart_auto_rop_chart_1683862623315" css={containerStyle}>
      <VictoryChart
        domain={{ x: [-1, 1], y: [-1, 1] }}
        padding={0}
        domainPadding={domainPadding}
        width={chartSize}
        height={chartSize}
        style={{
          parent: {
            width: containerWidth,
            height: containerHeight,
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <VictoryPie
          standalone={false}
          data={PIE_DATA}
          labels={() => ''}
          innerRadius={pieInnerRadius}
          radius={pieOuterRadius}
          startAngle={-45}
          style={{
            data: {
              fill: ({ datum }) => {
                const dataKey = datum.x as SmartRopDataKeyType;
                return getPieSliceColor({ dataKey, activeDataKeys, theme, inactive });
              },
            },
          }}
        />
        <VictoryAxis
          tickFormat={() => ''}
          style={{
            axis: { stroke: theme.smartAutoRop.chart.axis },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={() => ''}
          style={{
            axis: { stroke: theme.smartAutoRop.chart.axis },
          }}
        />
        {!inactive && (
          <VictoryScatter
            data={indicatorData}
            dataComponent={
              <SmartAutoRopIndicator activeDataKeys={activeDataKeys} radius={indicatorRadius} />
            }
          />
        )}
        <VictoryLabel
          data-testid={`${dataTestIdPrefix}-label-flowRate`}
          text={formatMessage({ id: 'widget.smartAutoRop.chartLabel.flowRate' })}
          x={0}
          y={yCenter}
          dy={scalePxAsVw(22)}
          textAnchor="start"
          style={customLabelStyle}
        />
        <VictoryLabel
          data-testid={`${dataTestIdPrefix}-label-rpm`}
          text={formatMessage({ id: 'widget.smartAutoRop.chartLabel.rpm' })}
          x={chartSize}
          y={yCenter}
          dy={scalePxAsVw(22)}
          textAnchor="end"
          style={customLabelStyle}
        />
        <VictoryLabel
          data-testid={`${dataTestIdPrefix}-label-rop`}
          text={formatMessage({ id: 'widget.smartAutoRop.chartLabel.rop' })}
          x={xCenter}
          y={0}
          dx={scalePxAsVw(17)}
          dy={scalePxAsVw(5)}
          textAnchor="start"
          style={customLabelStyle}
        />
        <VictoryLabel
          data-testid={`${dataTestIdPrefix}-label-wob`}
          text={formatMessage({ id: 'widget.smartAutoRop.chartLabel.wob' })}
          x={xCenter}
          y={chartSize}
          dx={scalePxAsVw(17)}
          dy={scalePxAsVw(-5)}
          textAnchor="start"
          style={customLabelStyle}
        />
      </VictoryChart>
    </div>
  );
};

export default SmartAutoRopChart;
