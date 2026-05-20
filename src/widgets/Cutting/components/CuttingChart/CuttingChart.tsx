/* eslint-disable max-lines-per-function, complexity */
import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { WIDGET_HIDING_CUSTOM_PADDING } from '@dt-advisory/styles/constants';
import CartesianGraph from '@dt-advisory/widgets/components/CartesianGraph';
import DepthAxis from '@dt-advisory/widgets/components/DepthAxis';
import Gradients from '@dt-advisory/widgets/components/Gradients';
import ReferenceLine from '@dt-advisory/widgets/components/ReferenceLine';
import {
  getFormattedDatum,
  WidgetTooltip,
} from '@dt-advisory/widgets/components/WidgetTooltip/WidgetTooltip';
import { RATIO } from '@dt-advisory/widgets/Cutting/components/CuttingChart/CuttingChartConstants';
import InclinationAxis from '@dt-advisory/widgets/Cutting/components/InclinationAxis';
import ProportionAxis from '@dt-advisory/widgets/Cutting/components/ProportionAxis';
import { CuttingChartStreamMessage } from '@dt-advisory/widgets/Cutting/CuttingTypes';
import { useCuttingDataStream } from '@dt-advisory/widgets/Cutting/hooks/useCuttingDataStream';
import BelowBitDepthOverlay from '@dt-advisory/widgets/Ecd/components/BelowBitDepthOverlay';
import { useTheme } from '@emotion/react';
import React from 'react';
import { useIntl } from 'react-intl';
import { VictoryArea, VictoryAxis, VictoryLine, VictoryVoronoiContainer } from 'victory';
import {
  axisStyle,
  bedHeightGradients,
  bedHeightStrokes,
  cuttingInclinationStyle,
  cuttingProportionGradients,
  cuttingProportionStrokes,
} from './CuttingChart.style';

export type CuttingChartPropsType = {
  data: CuttingChartStreamMessage;
  isSmallVersion?: boolean;
  enableTooltips?: boolean;
};

const CuttingChart = ({
  data,
  isSmallVersion,
  enableTooltips = false,
}: CuttingChartPropsType): JSX.Element => {
  const theme = useTheme();

  const { formatMessage } = useIntl();
  const widgetName = WidgetsLoaderEnum.Cutting;
  const widgetStyle = useWidgetSettingsStore((state) => state.widgetStyle);

  const customPadding = {
    ...widgetStyle.customPadding,
  };
  const hideAxisLabelPadding = {
    ...WIDGET_HIDING_CUSTOM_PADDING,
  };
  const {
    minDomain,
    maxDomain,
    proportionData,
    bedData,
    bitDepth,
    holeDepth,
    cuttingData,
    casingShoeDepth,
    MD,
    TD,
    hideAxis,
    hideAxisLabel,
  } = useCuttingDataStream({ data });
  const depthAxisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Depth),
  });

  const axisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Angle),
  });

  const suspensionUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Proportion),
  });

  const bedUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.SmallLength),
  });

  return (
    <CartesianGraph
      widgetName={widgetName}
      horizontal
      minDomain={minDomain}
      maxDomain={maxDomain}
      customPadding={hideAxisLabel ? hideAxisLabelPadding : customPadding}
      isSmallVersion={isSmallVersion}
      containerComponent={<VictoryVoronoiContainer disable={!Boolean(enableTooltips)} />}
    >
      <Gradients configs={bedHeightGradients} id={'bed'} />
      <VictoryArea
        data-testid={`${widgetName}-bedHeightArea`}
        name="bed-height-area"
        data={bedData}
        y={({ y }) => (y ? y * RATIO : 0.0)}
        style={{
          data: {
            stroke: bedHeightStrokes[theme.mode],
            strokeWidth: '0px',
            fill: `url(#bed-${theme.mode})`,
          },
        }}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.cutting_chart.legend.cuttingsInBed.text' })}
            axisUnitLabel={bedUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={150}
            datumY="tooltipInclinationValue"
          />
        }
      />

      <Gradients configs={cuttingProportionGradients} id={'proportion'} />
      <VictoryArea
        data-testid={`${widgetName}-cuttingPropotion`}
        name="cutting-proportion"
        data={proportionData}
        y={({ y }) => 20 - y * RATIO}
        y0={() => maxDomain.y}
        style={{
          data: {
            stroke: cuttingProportionStrokes[theme.mode],
            strokeWidth: '0px',
            fill: `url(#proportion-${theme.mode})`,
          },
        }}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.cutting_chart.legend.cuttingsInSuspensions.text' })}
            axisUnitLabel={suspensionUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={150}
          />
        }
      />

      <VictoryAxis crossAxis invertAxis style={axisStyle} />
      <DepthAxis
        data-testid={`${widgetName}-depthAxis`}
        axisLabel={'widget.cutting_chart.axis.y.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Depth)}
        hideAxis={hideAxis}
        hideLabel={hideAxisLabel}
        isSmallVersion={isSmallVersion}
        maxDomain={maxDomain}
      />
      <VictoryLine
        data-testid={`${widgetName}-cuttingInclination`}
        name="cuttingInclination"
        data={cuttingData}
        style={cuttingInclinationStyle(theme.mode)}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.cutting_chart.legend.Inclination.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            datumY="tooltipInclinationValue"
          />
        }
      />

      <InclinationAxis
        data-testid={`${widgetName}-inclinationAxis`}
        hideLabel={hideAxisLabel}
        tickOffsetY={hideAxisLabel ? hideAxisLabelPadding.bottom : customPadding.bottom}
      />
      <ProportionAxis hideLabel={hideAxisLabel} />
      <ReferenceLine
        data-testid={`${widgetName}-casingShoeDepth`}
        depth={casingShoeDepth}
        colorStrokeType="casingShoeDepth"
      />
      <ReferenceLine
        data-testid={`${widgetName}-bitDepth`}
        depth={bitDepth}
        colorStrokeType="bitDepth"
      />
      <ReferenceLine
        data-testid={`${widgetName}-holeDepth`}
        depth={holeDepth}
        colorStrokeType="holeDepth"
      />
      <BelowBitDepthOverlay
        data-testid={`${widgetName}-BelowBitDepthOverlay`}
        MD={MD}
        TD={TD}
        hideLabel={hideAxisLabel}
      />
    </CartesianGraph>
  );
};

export default CuttingChart;
