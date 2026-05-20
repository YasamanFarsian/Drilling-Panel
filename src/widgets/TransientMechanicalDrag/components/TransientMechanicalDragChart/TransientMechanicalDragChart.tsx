import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { WIDGET_HIDING_CUSTOM_PADDING } from '@dt-advisory/styles/constants';
import CartesianGraph from '@dt-advisory/widgets/components/CartesianGraph';
import CartesianXAxis from '@dt-advisory/widgets/components/CartesianXAxis';
import DepthAxis from '@dt-advisory/widgets/components/DepthAxis';
import Gradients from '@dt-advisory/widgets/components/Gradients';
import ReferenceLine from '@dt-advisory/widgets/components/ReferenceLine';
import WidgetTooltip, {
  getFormattedDatum,
} from '@dt-advisory/widgets/components/WidgetTooltip/WidgetTooltip';
import { useTheme } from '@emotion/react';
import React from 'react';
import { useIntl } from 'react-intl';
import { VictoryArea, VictoryAxis, VictoryLine, VictoryVoronoiContainer } from 'victory';
import { useTransientMechanicalDragChart } from '../../hooks/useTransientMechanicalDragChart';
import { TransientMechanicalDragType } from '../../TransientMechanicalDragTypes';
import {
  axisStyle,
  bucklingLimitGradients,
  bucklingLimitInactiveGradients,
  bucklingLimitInactiveStrokes,
  bucklingLimitStrokes,
  inactiveTensionLineStyle,
  tensileLimitGradients,
  tensileLimitInactiveGradients,
  tensileLimitInactiveStrokes,
  tensileLimitStrokes,
  tensionLineStyle,
} from './TransientMechanicalDragChart.style';
import { getBucklingLimitY0, getTensileLimitY0 } from './transientMechanicalDragChartHelpers';

export type TransientMechanicalDragChartPropsType = {
  data: TransientMechanicalDragType | null;
  inactive?: boolean;
  isSmallVersion?: boolean;
  numOfTicks: number;
  enableTooltips?: boolean;
};

// eslint-disable-next-line max-lines-per-function, complexity
const TransientMechanicalDragChart = (
  props: TransientMechanicalDragChartPropsType,
): JSX.Element => {
  const { formatMessage } = useIntl();
  const dataTestIdPrefix = WidgetsLoaderEnum.TransientMechanicalDrag;
  const theme = useTheme();
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
    bucklingLimit,
    tensileLimit,
    bitDepth,
    lastCasingDepth,
    hideAxisLabel,
    tension,
    tickValues,
  } = useTransientMechanicalDragChart(props.data, props.numOfTicks);
  const depthAxisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Length),
  });

  const axisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Force),
  });
  return (
    <CartesianGraph
      widgetName={dataTestIdPrefix}
      minDomain={minDomain}
      maxDomain={maxDomain}
      horizontal
      isSmallVersion={props.isSmallVersion}
      inactive={props.inactive}
      customPadding={hideAxisLabel ? hideAxisLabelPadding : customPadding}
      containerComponent={<VictoryVoronoiContainer disable={!Boolean(props.enableTooltips)} />}
    >
      <VictoryAxis invertAxis style={axisStyle} />
      <DepthAxis
        data-testid={`${dataTestIdPrefix}-depthAxis`}
        axisLabel={'widget.transientmechanicaldrag.axis.y.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Length)}
        isSmallVersion={props.isSmallVersion}
        hideLabel={hideAxisLabel}
        maxDomain={maxDomain}
        crossAxis={false}
      />
      <CartesianXAxis
        axisLabel={'widget.transientmechanicaldrag.axis.x.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Force)}
        hideLabel={hideAxisLabel}
        isSmallVersion={props.isSmallVersion}
        fixedValue={0}
        tickOffsetY={hideAxisLabel ? hideAxisLabelPadding.bottom : customPadding.bottom}
        tickValues={tickValues}
      />

      <VictoryLine
        data-testid={`${dataTestIdPrefix}-tension`}
        name="tension"
        data={tension}
        style={props.inactive ? inactiveTensionLineStyle(theme.mode) : tensionLineStyle(theme.mode)}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.transientmechanicaldrag.legend.tension.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={120}
          />
        }
      />

      <Gradients
        configs={props.inactive ? bucklingLimitInactiveGradients : bucklingLimitGradients}
        id={'buckling-limit'}
      />
      <VictoryArea
        data-testid={`${dataTestIdPrefix}-bucklingLimit`}
        name="buckling-limit"
        data={bucklingLimit}
        y0={() => getBucklingLimitY0({ minDomain })}
        style={{
          data: {
            stroke: props.inactive
              ? bucklingLimitInactiveStrokes[theme.mode]
              : bucklingLimitStrokes[theme.mode],
            strokeWidth: '1px',
            fill: `url(#buckling-limit-${theme.mode})`,
          },
        }}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({
              id: 'widget.transientmechanicaldrag.legend.bucklinglimit.text',
            })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={175}
          />
        }
      />

      <Gradients
        configs={props.inactive ? tensileLimitInactiveGradients : tensileLimitGradients}
        id={'tensile-limit'}
      />
      <VictoryArea
        data-testid={`${dataTestIdPrefix}-tensileLimit`}
        name="tensile-limit"
        data={tensileLimit}
        x="x"
        y="y"
        y0={() => getTensileLimitY0({ maxDomain })}
        style={{
          data: {
            stroke: props.inactive
              ? tensileLimitInactiveStrokes[theme.mode]
              : tensileLimitStrokes[theme.mode],
            strokeWidth: '1px',
            fill: `url(#tensile-limit-${theme.mode})`,
          },
        }}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({
              id: 'widget.transientmechanicaldrag.legend.tensilelimit.text',
            })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={175}
            datumX="x"
            datumY="y"
          />
        }
      />

      <ReferenceLine
        data-testid={`${dataTestIdPrefix}-bitDepth`}
        depth={bitDepth}
        colorStrokeType="bitDepth"
        inactive={false}
      />

      <ReferenceLine
        data-testid={`${dataTestIdPrefix}-casingShoeDepth`}
        depth={lastCasingDepth}
        colorStrokeType="casingShoeDepth"
        inactive={false}
      />
    </CartesianGraph>
  );
};

export default TransientMechanicalDragChart;
