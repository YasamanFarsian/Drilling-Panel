/* eslint-disable complexity */
/* eslint-disable max-lines-per-function, @typescript-eslint/no-explicit-any */
import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { WIDGET_HIDING_CUSTOM_PADDING } from '@dt-advisory/styles/constants';
import CartesianGraph from '@dt-advisory/widgets/components/CartesianGraph';
import CartesianXAxis from '@dt-advisory/widgets/components/CartesianXAxis';
import DepthAxis from '@dt-advisory/widgets/components/DepthAxis';
import Gradients from '@dt-advisory/widgets/components/Gradients';
import ReferenceLine from '@dt-advisory/widgets/components/ReferenceLine';
import {
  getFormattedDatum,
  WidgetTooltip,
} from '@dt-advisory/widgets/components/WidgetTooltip/WidgetTooltip';
import { useTheme } from '@emotion/react';
import React from 'react';
import {
  VictoryArea,
  VictoryScatter,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryGroup,
} from 'victory';
import { ECDStream } from '../../EcdTypes';
import { useEcdChart } from '../../hooks/useEcdChart';
import { AlongStringEcdElement } from '../AlongStringEcd';
import BelowBitDepthOverlay from '../BelowBitDepthOverlay';
import ClosestLine from '../ClosestLine';
import { DownholeMwdEcdElement } from '../DownholeMwdEcd';
import HistoricalEnvelope from '../HistoricalEnvelope';
import {
  axisStyle,
  ecdLineStyle,
  esdLineStyle,
  inactiveEcdLineStyle,
  inactiveEsdLineStyle,
  maxBoundGradients,
  maxBoundInactiveGradients,
  maxBoundInactiveStrokes,
  maxBoundStrokes,
  minBoundGradients,
  minBoundInactiveGradients,
  minBoundInactiveStrokes,
  minBoundStrokes,
} from './EcdChart.style';
import { useIntl } from 'react-intl';

export type EcdChartPropsType = {
  data: ECDStream | null;
  widgetId: string;
  inactive?: boolean;
  isSmallVersion?: boolean;
  numOfTicks: number;
  enableTooltips?: boolean;
};

const EcdChart = (props: EcdChartPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const widgetName = WidgetsLoaderEnum.Ecd;
  const theme = useTheme();
  const widgetStyle = useWidgetSettingsStore((state) => state.widgetStyle);
  const {
    minDomain,
    maxDomain,
    casingShoeDepth,
    bitDepth,
    holeDepth,
    MD,
    TD,
    data,
    margins,
    closestToFracLine,
    closestToPoreLine,
    historicalEnvelopeData,
    alongStringEcd,
    downholeEcd,
    hideAxisLabel,
    tickValues,
  } = useEcdChart(props);

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
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Density),
  });

  return (
    <CartesianGraph
      widgetName={widgetName}
      minDomain={minDomain}
      maxDomain={maxDomain}
      customPadding={hideAxisLabel ? hideAxisLabelPadding : customPadding}
      horizontal
      inactive={props.inactive}
      isSmallVersion={props.isSmallVersion}
      containerComponent={<VictoryVoronoiContainer disable={!Boolean(props.enableTooltips)} />}
    >
      <VictoryAxis crossAxis invertAxis style={axisStyle} />
      <DepthAxis
        data-testid={`${widgetName}-depthAxis`}
        axisLabel={'widget.ecd.axis.y.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Depth)}
        isSmallVersion={props.isSmallVersion}
        hideLabel={hideAxisLabel}
        minDomain={minDomain}
        maxDomain={maxDomain}
      />
      <CartesianXAxis
        data-testid={`${widgetName}-x-axis`}
        axisLabel={'widget.ecd.axis.x.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Density)}
        hideLabel={hideAxisLabel}
        isSmallVersion={props.isSmallVersion}
        fixedValue={2}
        adjustFirstTik={true}
        tickOffsetY={hideAxisLabel ? hideAxisLabelPadding.bottom : customPadding.bottom}
        tickValues={tickValues}
      />

      <Gradients
        configs={props.inactive ? maxBoundInactiveGradients : maxBoundGradients}
        id={'max-bound'}
      />
      <HistoricalEnvelope
        data-testid={`${widgetName}-historical-envelope`}
        data={historicalEnvelopeData.data}
        domain={historicalEnvelopeData.domain}
        inactive={props.inactive}
      />
      <BelowBitDepthOverlay
        data-testid={`${widgetName}-belowBitDepthOverlay`}
        MD={MD}
        TD={TD}
        inactive={props.inactive}
        hideLabel={hideAxisLabel}
      />
      <VictoryArea
        data-testid={`${widgetName}-max-bound-pressure`}
        name="max-bound-pressure"
        data={margins}
        x={0}
        y={2}
        y0={() => maxDomain.y}
        style={{
          data: {
            stroke: props.inactive
              ? maxBoundInactiveStrokes[theme.mode]
              : maxBoundStrokes[theme.mode],
            strokeWidth: '1px',
            fill: `url(#max-bound-${theme.mode})`,
          },
        }}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.ecd.legend.maxGeoPressure.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={175}
            datumX="0"
            datumY="2"
          />
        }
      />

      <Gradients
        configs={props.inactive ? minBoundInactiveGradients : minBoundGradients}
        id={'min-bound'}
      />
      <VictoryArea
        data-testid={`${widgetName}-min-bound-pressure`}
        name="min-bound-pressure"
        data={margins}
        x={0}
        y={1}
        style={{
          data: {
            stroke: props.inactive
              ? minBoundInactiveStrokes[theme.mode]
              : minBoundStrokes[theme.mode],
            strokeWidth: '1px',
            fill: `url(#min-bound-${theme.mode})`,
          },
        }}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.ecd.legend.minGeoPressure.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={175}
            datumX="0"
            datumY="1"
          />
        }
      />
      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.ecd.legend.ecd.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
          />
        }
      >
        <VictoryLine
          data-testid={`${widgetName}-line-ecd`}
          name="ecd"
          style={props.inactive ? inactiveEcdLineStyle(theme.mode) : ecdLineStyle(theme.mode)}
          data={data.ecd}
        />
      </VictoryGroup>
      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.ecd.legend.esd.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
          />
        }
      >
        <VictoryLine
          data-testid={`${widgetName}-line-esd`}
          name="esd"
          data={data.esd}
          style={props.inactive ? inactiveEsdLineStyle(theme.mode) : esdLineStyle(theme.mode)}
        />
      </VictoryGroup>

      <ReferenceLine
        data-testid={`${widgetName}-line-casingShoeDepth`}
        depth={casingShoeDepth}
        colorStrokeType="casingShoeDepth"
        inactive={props.inactive}
      />
      <ReferenceLine
        data-testid={`${widgetName}-line-bitDepth`}
        depth={bitDepth}
        colorStrokeType="bitDepth"
        inactive={props.inactive}
      />
      <ReferenceLine
        data-testid={`${widgetName}-line-holdDepth`}
        depth={holeDepth}
        colorStrokeType="holeDepth"
        inactive={props.inactive}
      />
      <ClosestLine
        data-testid={`${widgetName}-closet-pore`}
        id="closest-pore"
        {...closestToPoreLine}
        inactive={props.inactive}
      />
      <ClosestLine
        data-testid={`${widgetName}-closet-frac`}
        id="closest-frac"
        {...closestToFracLine}
        inactive={props.inactive}
      />
      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.ecd.legend.alongString.text' })}
            flyoutWidth={150}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            withBlueDot={false}
          />
        }
      >
        <VictoryScatter
          name="alongStringEcd"
          data-testid={`${widgetName}-along-ecd`}
          data={alongStringEcd}
          dataComponent={<AlongStringEcdElement />}
        />
      </VictoryGroup>
      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.ecd.legend.downholeMWD.text' })}
            flyoutWidth={150}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            withBlueDot={false}
          />
        }
      >
        <VictoryScatter
          name="downholeEcd"
          data-testid={`${widgetName}-downholeMwd`}
          data={downholeEcd}
          dataComponent={<DownholeMwdEcdElement />}
        />
      </VictoryGroup>
    </CartesianGraph>
  );
};

export default EcdChart;
