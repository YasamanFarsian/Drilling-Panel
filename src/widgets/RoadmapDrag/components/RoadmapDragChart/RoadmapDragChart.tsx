import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { WIDGET_HIDING_CUSTOM_PADDING } from '@dt-advisory/styles/constants';
import roadmapDragStyleConstants from '@dt-advisory/styles/roadmapDragStyleConstants';
import CartesianGraph from '@dt-advisory/widgets/components/CartesianGraph';
import CartesianXAxis from '@dt-advisory/widgets/components/CartesianXAxis';
import DepthAxis from '@dt-advisory/widgets/components/DepthAxis';
import { DotSVG } from '@dt-advisory/widgets/components/Dot';
import LabelListMapper from '@dt-advisory/widgets/components/LabelListMapper/LabelListMapper';
import ReferenceLine from '@dt-advisory/widgets/components/ReferenceLine';
import WidgetTooltip, {
  getFormattedDatum,
} from '@dt-advisory/widgets/components/WidgetTooltip/WidgetTooltip';
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
import { ConvertedRoadmapDragWidgetType } from '../../RoadmapDragTypes';
import { axisStyle } from './RoadmapDragChart.style';
import { getListOfLines } from './roadmapDragChartHelper';

export type RoadmapDragChartPropsType = {
  data: ConvertedRoadmapDragWidgetType;
  isSmallVersion: boolean;
  hideAxisLabel: boolean;
  inactive?: boolean;
  enableTooltips?: boolean;
};

// eslint-disable-next-line max-lines-per-function
const RoadmapDragChart = ({
  data,
  inactive,
  isSmallVersion,
  hideAxisLabel,
  enableTooltips,
}: RoadmapDragChartPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const dataTestIdPrefix = `${WidgetsLoaderEnum.RoadmapDrag}-`;
  const theme = useTheme();
  const widgetStyle = useWidgetSettingsStore((state) => state.widgetStyle);

  const customPadding = widgetStyle.customPadding;
  const hideAxisLabelPadding = WIDGET_HIDING_CUSTOM_PADDING;

  const depthAxisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Length),
  });

  const axisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Weight),
  });

  const labelStyle = {
    ...roadmapDragStyleConstants.lineLabel,
    ...widgetStyle.labelStyle,
  };
  const linesData = getListOfLines(data, theme.mode);

  const minDomain = data.minDomain;
  const maxDomain = data.maxDomain;

  return (
    <CartesianGraph
      widgetName={WidgetsLoaderEnum.RoadmapDrag}
      minDomain={minDomain}
      maxDomain={maxDomain}
      horizontal
      isSmallVersion={isSmallVersion}
      inactive={inactive}
      customPadding={hideAxisLabel ? hideAxisLabelPadding : customPadding}
      containerComponent={<VictoryVoronoiContainer disable={!Boolean(enableTooltips)} />}
    >
      <VictoryAxis invertAxis style={axisStyle} />
      <DepthAxis
        data-testid={`${dataTestIdPrefix}-depthAxis`}
        axisLabel={'widget.roadmapDrag.axis.y.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Length)}
        isSmallVersion={isSmallVersion}
        hideLabel={hideAxisLabel}
        maxDomain={maxDomain}
        crossAxis={false}
      />
      <CartesianXAxis
        axisLabel={'widget.roadmapDrag.axis.x.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Weight)}
        hideLabel={hideAxisLabel}
        isSmallVersion={isSmallVersion}
        fixedValue={0}
        tickOffsetY={hideAxisLabel ? hideAxisLabelPadding.bottom : customPadding.bottom}
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
              name={formatMessage({ id: line.localeKey })}
              axisUnitLabel={axisUnitLabel}
              depthAxisUnitLabel={depthAxisUnitLabel}
              flyoutWidth={120}
            />
          }
        />
      ))}

      <ReferenceLine
        data-testid={`${dataTestIdPrefix}-casingShoeDepth`}
        depth={data.casingShoeDepth}
        colorStrokeType="casingShoeDepth"
        inactive={inactive}
      />
      <ReferenceLine
        data-testid={`${dataTestIdPrefix}-bitDepth`}
        depth={data.bitDepth}
        colorStrokeType="bitDepth"
        inactive={inactive}
      />
      <ReferenceLine
        data-testid={`${dataTestIdPrefix}-holeDepth`}
        depth={data.holeDepth}
        colorStrokeType="holeDepth"
        inactive={inactive}
      />
      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.roadmap.legend.slackoffMeasured.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={150}
          />
        }
      >
        <VictoryScatter
          name="slackoffMeasured"
          data={data.currentData.dotsLeft}
          dataComponent={
            <DotSVG fill={roadmapDragStyleConstants.legend.slackoffMeasured[theme.mode]} />
          }
        />
      </VictoryGroup>

      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.roadmap.legend.FRWMeasured.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={150}
          />
        }
      >
        <VictoryScatter
          name="FRWMeasured"
          data={data.currentData.dotsCenter}
          dataComponent={<DotSVG fill={roadmapDragStyleConstants.legend.FRWMeasured[theme.mode]} />}
        />
      </VictoryGroup>
      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.roadmap.legend.pickupMeasured.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={150}
          />
        }
      >
        <VictoryScatter
          name="PickupMeasured"
          data={data.currentData.dotsRight}
          dataComponent={
            <DotSVG fill={roadmapDragStyleConstants.legend.pickupMeasured[theme.mode]} />
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

export default React.memo(RoadmapDragChart);
