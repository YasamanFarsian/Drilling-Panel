/* eslint-disable max-lines-per-function */
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
import {
  VictoryArea,
  VictoryAxis,
  VictoryGroup,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory';
import { useTransientMechanicalTorqueChart } from '../../hooks/useTransientMechanicalTorqueChart';
import { TransientMechanicalTorqueType } from '../../TransientMechanicalTorqueTypes';
import {
  axisStyle,
  inactiveTorqueLineStyle,
  torqueLineStyle,
  torsionalLimitGradients,
  torsionalLimitInactiveGradients,
  torsionalLimitInactiveStrokes,
  torsionalLimitStrokes,
} from './TransientMechanicalTorqueChart.style';

export type TransientMechanicalTorquePropsType = {
  data: TransientMechanicalTorqueType | null;
  inactive?: boolean;
  isSmallVersion?: boolean;
  numOfTicks: number;
  enableTooltips?: boolean;
};

// eslint-disable-next-line complexity
const TransientMechanicalTorqueChart = (props: TransientMechanicalTorquePropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const dataTestIdPrefix = WidgetsLoaderEnum.TransientMechanicalTorque;
  const widgetStyle = useWidgetSettingsStore((state) => state.widgetStyle);
  const theme = useTheme();

  const {
    maxDomain,
    minDomain,
    bitDepth,
    lastCasingDepth, // same as casingShoeDepth
    torque,
    torsionalLimit,
    hideAxisLabel,
    tickValues,
  } = useTransientMechanicalTorqueChart(props.data, props.numOfTicks);

  const customPadding = {
    ...widgetStyle.customPadding,
  };
  const hideAxisLabelPadding = {
    ...WIDGET_HIDING_CUSTOM_PADDING,
    top: 0,
  };
  const depthAxisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Length),
  });

  const axisUnitLabel = formatMessage({
    id: getUnitLabelIdByUnitType(UnitTypeEnums.Torque),
  });

  return (
    <CartesianGraph
      widgetName={dataTestIdPrefix}
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
        data-testid={`${dataTestIdPrefix}-depthAxis`}
        axisLabel={'widget.transientmechanicaltorque.axis.y.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Length)}
        isSmallVersion={props.isSmallVersion}
        hideLabel={hideAxisLabel}
        maxDomain={maxDomain}
        crossAxis={false}
      />
      <CartesianXAxis
        axisLabel={'widget.transientmechanicaltorque.axis.x.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Torque)}
        hideLabel={hideAxisLabel}
        tickValues={tickValues}
        isSmallVersion={props.isSmallVersion}
        tickOffsetY={hideAxisLabel ? hideAxisLabelPadding.bottom : customPadding.bottom}
      />

      <Gradients
        configs={props.inactive ? torsionalLimitInactiveGradients : torsionalLimitGradients}
        id={'torsional-limit-area'}
      />
      <VictoryArea
        data-testid={`${dataTestIdPrefix}-torsionalLimitArea`}
        name="torsional-limit-area"
        data={torsionalLimit}
        y0={() => (typeof maxDomain === 'object' && maxDomain.y ? maxDomain.y : 0)}
        style={{
          data: {
            stroke: props.inactive
              ? torsionalLimitInactiveStrokes[theme.mode]
              : torsionalLimitStrokes[theme.mode],
            strokeWidth: '1px',
            fill: `url(#torsional-limit-area-${theme.mode})`,
          },
        }}
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({
              id: 'widget.transientmechanicaltorque.legend.torsionalLimit.text',
            })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={175}
          />
        }
      />

      <ReferenceLine
        data-testid={`${dataTestIdPrefix}-bitDepth`}
        depth={bitDepth}
        colorStrokeType="bitDepth"
        inactive={props.inactive}
      />

      <ReferenceLine
        data-testid={`${dataTestIdPrefix}-lastCasingDepth`}
        depth={lastCasingDepth}
        colorStrokeType="casingShoeDepth"
        inactive={props.inactive}
      />

      <VictoryGroup
        labels={({ datum }) => getFormattedDatum(datum)}
        labelComponent={
          <WidgetTooltip
            name={formatMessage({ id: 'widget.transientmechanicaltorque.legend.toque.text' })}
            axisUnitLabel={axisUnitLabel}
            depthAxisUnitLabel={depthAxisUnitLabel}
            flyoutWidth={120}
          />
        }
      >
        <VictoryLine
          data-testid={`${dataTestIdPrefix}-torque`}
          name="torque"
          data={torque}
          style={props.inactive ? inactiveTorqueLineStyle(theme.mode) : torqueLineStyle(theme.mode)}
        />
      </VictoryGroup>
    </CartesianGraph>
  );
};

export default TransientMechanicalTorqueChart;
