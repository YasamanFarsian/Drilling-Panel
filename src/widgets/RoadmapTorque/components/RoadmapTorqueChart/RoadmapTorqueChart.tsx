/* eslint-disable max-lines-per-function */

import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { WIDGET_HIDING_CUSTOM_PADDING } from '@dt-advisory/styles/constants';
import roadmapTorqueStyleConstants from '@dt-advisory/styles/roadmapTorqueStyleConstants';
import CartesianGraph from '@dt-advisory/widgets/components/CartesianGraph';
import { DotSVG } from '@dt-advisory/widgets/components/Dot';
import LabelListMapper from '@dt-advisory/widgets/components/LabelListMapper/LabelListMapper';
import ReferenceLine from '@dt-advisory/widgets/components/ReferenceLine';
import RoadmapCommonAxis from '@dt-advisory/widgets/components/RoadmapCommonAxis';
import WidgetTooltip, {
  getFormattedDatum,
} from '@dt-advisory/widgets/components/WidgetTooltip/WidgetTooltip';
import { axisStyle } from '@dt-advisory/widgets/RoadmapDrag/components/RoadmapDragChart/RoadmapDragChart.style';
import { useTheme } from '@emotion/react';
import React from 'react';
import { useIntl } from 'react-intl';
import {
  VictoryAxis,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryVoronoiContainer,
} from 'victory';
import { ConvertedRoadmapTorqueWidgetType } from '../../RoadmapTorqueTypes';
import { getListOfLines } from './roadmapTorqueHelper';

export type RoadmapTorqueChartPropsType = {
  data: ConvertedRoadmapTorqueWidgetType;
  isSmallVersion: boolean;
  hideAxisLabel: boolean;
  inactive?: boolean;
  enableTooltips?: boolean;
};

const RoadmapTorqueChart = ({
  data,
  inactive,
  isSmallVersion,
  hideAxisLabel,
  enableTooltips,
}: RoadmapTorqueChartPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const dataTestIdPrefix = `${WidgetsLoaderEnum.RoadmapTorque}-`;
  const theme = useTheme();
  const widgetStyle = useWidgetSettingsStore((state) => state.widgetStyle);
  const customPadding = {
    ...widgetStyle.customPadding,
  };
  const hideAxisLabelPadding = {
    ...WIDGET_HIDING_CUSTOM_PADDING,
  };
  const depthAxisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Depth),
  });

  const axisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Torque),
  });

  const labelStyle = roadmapTorqueStyleConstants.lineLabel;
  const linesData = getListOfLines(data, theme.mode);

  const minDomain = data.minDomain;
  const maxDomain = data.maxDomain;

  const currentCustomPadding = hideAxisLabel ? hideAxisLabelPadding : customPadding;
  const tickOffsetY = hideAxisLabel ? hideAxisLabelPadding.bottom : customPadding.bottom;

  return (
    <CartesianGraph
      widgetName={WidgetsLoaderEnum.RoadmapTorque}
      minDomain={minDomain}
      maxDomain={maxDomain}
      isSmallVersion={isSmallVersion}
      inactive={inactive}
      customPadding={currentCustomPadding}
      horizontal
      containerComponent={<VictoryVoronoiContainer disable={!Boolean(enableTooltips)} />}
    >
      <VictoryAxis invertAxis style={axisStyle} />
      <RoadmapCommonAxis
        depthAxisLabel={'widget.roadmapTorque.axis.y.dynamic.label'}
        depthAxisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Depth)}
        isSmallVersion={isSmallVersion}
        hideAxisLabel={hideAxisLabel}
        maxDomain={maxDomain}
        xAxisLabel={'widget.roadmapTorque.axis.x.dynamic.label'}
        xAxisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Torque)}
        tickOffsetY={tickOffsetY}
        tickValues={data.tickValues}
      />
      {linesData.map((line) => (
        <VictoryLine
          data-testid={`${dataTestIdPrefix}-${line.label}`}
          key={line.label}
          data={line.data}
          style={{
            data: { stroke: line.lineColor },
          }}
          labels={({ datum }) => getFormattedDatum(datum)}
          labelComponent={
            <WidgetTooltip
              name={formatMessage({ id: 'widget.roadmapTorque.legend.frictions.text' })}
              axisUnitLabel={axisUnitLabel}
              depthAxisUnitLabel={depthAxisUnitLabel}
              flyoutWidth={120}
            />
          }
        />
      ))}

      <ReferenceLine
        depth={data.casingShoeDepth}
        colorStrokeType="casingShoeDepth"
        inactive={inactive}
      />
      <ReferenceLine depth={data.bitDepth} colorStrokeType="bitDepth" inactive={inactive} />
      <ReferenceLine depth={data.holeDepth} colorStrokeType="holeDepth" inactive={inactive} />
      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.roadmapTorque.legend.surfTorqueFrw.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={225}
          />
        }
      >
        <VictoryScatter
          name="surfTorqueFrw"
          data={data.currentData.dotsLeft}
          dataComponent={
            <DotSVG fill={roadmapTorqueStyleConstants.legend.surfTorqueFrw[theme.mode]} />
          }
        />
      </VictoryGroup>

      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.roadmapTorque.legend.surfTorqueMeasuredDown.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={225}
          />
        }
      >
        <VictoryScatter
          name="surfTorqueMeasuredDown"
          data={data.currentData.dotsCenter}
          dataComponent={
            <DotSVG fill={roadmapTorqueStyleConstants.legend.surfTorqueMeasuredDown[theme.mode]} />
          }
        />
      </VictoryGroup>

      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.roadmapTorque.legend.surfTorqueMeasuredUp.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={225}
          />
        }
      >
        <VictoryScatter
          name="surfTorqueMeasuredUp"
          data={data.currentData.dotsRight}
          dataComponent={
            <DotSVG fill={roadmapTorqueStyleConstants.legend.surfTorqueMeasuredUp[theme.mode]} />
          }
        />
      </VictoryGroup>

      <LabelListMapper
        linesData={linesData}
        maxY={maxDomain.x}
        labelStyle={labelStyle}
        isSmallVersion={isSmallVersion}
        minDomain={minDomain}
        maxDomain={maxDomain}
        holeDepth={data.holeDepth}
      />
    </CartesianGraph>
  );
};

export default RoadmapTorqueChart;
