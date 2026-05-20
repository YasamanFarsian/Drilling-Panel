/* eslint-disable max-lines-per-function, @typescript-eslint/no-explicit-any, complexity */
import { OperationInfoType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import { Box, Skeleton } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import useDimensions from 'react-cool-dimensions';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel } from 'victory';
import { GeoPressureToggleValue } from './components/GeoPressureToggler';
import { Line } from './components/Line';
import { Tick } from './components/Tick';
import {
  getAreaStyle,
  getAxisStyle,
  getDefaultTheme,
  greenColor,
  redColor,
  skeletonContainerStyle,
  widgetContainerStyle,
} from './GeoPressure.style';
import { geoPressureWidgetHelper } from './GeoPressureWidgetHelper';
import { useCustomPaddingGeoPressureGraph } from './hooks/useCustomPaddingGeoPressureGraph';
import { useScalingTickSize } from './hooks/useScalingTickSize';

type GeoPressureWidgetType = {
  data?: OperationInfoType['geoPressure'];
  mode: GeoPressureToggleValue;
};

export const GeoPressureWidget = ({ data, mode }: GeoPressureWidgetType) => {
  const theme = useTheme();
  const customPadding = useCustomPaddingGeoPressureGraph();
  const { getLabel } = useUnitLabels();
  const getYAxisLabel = (toggleValue: GeoPressureToggleValue): string => {
    const dynamicLabel =
      toggleValue === GeoPressureToggleValue.MD
        ? 'operationInfo.geoPressure.mudWeightData.axisY.mode.md.dynamic.label'
        : 'operationInfo.geoPressure.mudWeightData.axisY.mode.tvd.dynamic.label';
    return getLabel(dynamicLabel, UnitTypeEnums.Depth);
  };

  const isDark = theme.mode === 'dark';
  const defaultTheme = getDefaultTheme(isDark);
  const YAxisLabel = getYAxisLabel(mode);

  const { mudWeightData, fracturationPressureInEMW, porePressureGradientInEMW } =
    geoPressureWidgetHelper({ mode, data });

  const geoPressureWidgetWrapper = useDimensions();

  const tick = useScalingTickSize();

  if (!data)
    return (
      <div css={skeletonContainerStyle}>
        <Skeleton width="100%" height="400px" />
      </div>
    );
  return (
    <Box ref={geoPressureWidgetWrapper.observe} css={widgetContainerStyle}>
      <VictoryChart
        padding={customPadding}
        theme={defaultTheme}
        height={geoPressureWidgetWrapper.height}
        width={geoPressureWidgetWrapper.width}
        containerComponent={<VictoryContainer responsive={false} />}
        horizontal
      >
        <VictoryAxis
          crossAxis={false}
          invertAxis
          axisLabelComponent={<VictoryLabel dy={-5} />}
          orientation={'left'}
          label={YAxisLabel}
          groupComponent={<g role="geo_pressure_y_axis" />}
          tickLabelComponent={<VictoryLabel dx={15} />}
          tickFormat={(y: number) => y}
          style={{
            ticks: {
              color: 'transparent',
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dy={10} />}
          orientation={'bottom'}
          label={getLabel(
            'operationInfo.geoPressure.mudWeightData.axisX.dynamic.label',
            UnitTypeEnums.Density,
          )}
          style={getAxisStyle(isDark, tick)}
          tickFormat={(x: number) => (x % 2 !== 0 ? x : '')}
          tickComponent={<Tick long={(x: number) => x % 2 !== 0} />}
          tickLabelComponent={<VictoryLabel dy={0} />}
        />
        <VictoryArea style={getAreaStyle(isDark)} data={mudWeightData} />
        <Line color={greenColor} data={fracturationPressureInEMW} />
        <Line color={redColor} data={porePressureGradientInEMW} />
      </VictoryChart>
    </Box>
  );
};
