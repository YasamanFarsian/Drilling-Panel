import { Box, Skeleton } from '@mui/material';
import { useTheme } from '@mui/styles';
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
import {
  geoPressureWidgetHelper,
  GeoPressureWidgetHelperPropsType,
} from './GeoPressureWidgetHelper';
import { useCustomPaddingGeoPressureGraph } from './hooks/useCustomPaddingGeoPressureGraph';
import { useScalingTickSize } from './hooks/useScalingTickSize';

type GeoPressureWidgetType = GeoPressureWidgetHelperPropsType;

export const GeoPressureWidget = ({ data, mode }: GeoPressureWidgetType) => {
  const theme = useTheme();
  const customPadding = useCustomPaddingGeoPressureGraph();
  const isDark = theme.mode === 'dark';
  const defaultTheme = getDefaultTheme(isDark);
  const yLabel = mode === GeoPressureToggleValue.MD ? 'MD (m)' : 'TVD (m)';

  const { mudWeightData, fracturationPressureInEMW, porePressureGradientInEMW } =
    geoPressureWidgetHelper({ mode, data });

  const wrapper = useDimensions();
  const tick = useScalingTickSize();

  if (!data)
    return (
      <div css={skeletonContainerStyle}>
        <Skeleton width="100%" height="400px" />
      </div>
    );

  return (
    <Box ref={wrapper.observe} css={widgetContainerStyle}>
      <VictoryChart
        padding={customPadding}
        theme={defaultTheme}
        height={wrapper.height}
        width={wrapper.width}
        containerComponent={<VictoryContainer responsive={false} />}
        horizontal
      >
        <VictoryAxis
          crossAxis={false}
          invertAxis
          axisLabelComponent={<VictoryLabel dy={-5} />}
          orientation="left"
          label={yLabel}
          tickLabelComponent={<VictoryLabel dx={15} />}
          tickFormat={(y: number) => y}
          style={{ ticks: { color: 'transparent' } }}
        />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dy={10} />}
          orientation="bottom"
          label="Equivalent Mud Weight (sg)"
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
