/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any */
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { DEFAULT_LABEL_STYLE } from '@dt-advisory/styles/constants';
import XAxisTick from '@dt-advisory/widgets/components/XAxisTick';
import GridLine from '@dt-advisory/widgets/Ecd/components/GridLine';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import React, { memo } from 'react';
import useDimensions from 'react-cool-dimensions';
import { VictoryAxis, VictoryAxisProps, VictoryLabel } from 'victory';

function tickFormat(tick: number): string {
  const value = tick * 9 - 45;

  return [0, 45, 90].includes(value) ? `${value.toString()}` : '';
}

const CustomTickLabel = ({ x, y, hideLabel, text }: any): JSX.Element => {
  const widgetStyle = useWidgetSettingsStore((state) => state.widgetStyle);

  const style: any = {
    ...widgetStyle.labelStyle,
    fontSize: scalePxAsVh(DEFAULT_LABEL_STYLE.fontSize),
    fill: 'currentColor',
    display: hideLabel ? 'none' : '',
  };

  const textElem = useDimensions();
  const textElemWidth = textElem.width ?? 0;
  return (
    <text
      data-testid="x-inclination-custom-tick-label"
      ref={textElem.observe as React.LegacyRef<SVGTextElement>}
      x={x - textElemWidth / 2}
      y={y + widgetStyle.xSpaceBetweenTickAndLabel}
      style={style}
    >
      {text}
    </text>
  );
};

export type InclinationAxisPropsType = VictoryAxisProps & {
  hideLabel?: boolean;
  tickOffsetY?: number;
};

const InclinationAxis = ({
  hideLabel = false,
  tickOffsetY,
  ...props
}: InclinationAxisPropsType): JSX.Element => {
  const widgetStyle = useWidgetSettingsStore((x) => x.widgetStyle);

  const baseTickValues = [5, 10, 15];
  const { getLabel } = useUnitLabels();
  return (
    <VictoryAxis
      {...props}
      offsetY={hideLabel ? 0 : tickOffsetY}
      crossAxis
      dependentAxis
      orientation="bottom"
      tickValues={baseTickValues}
      tickFormat={tickFormat}
      tickComponent={<XAxisTick />}
      tickLabelComponent={<CustomTickLabel hideLabel={hideLabel} />}
      axisLabelComponent={
        <VictoryLabel
          dy={widgetStyle.xAxisOffset}
          inline
          style={{
            ...widgetStyle.labelStyle,
            fill: 'currentColor',
            display: hideLabel ? 'none' : '',
          }}
        />
      }
      domain={[0, 20]}
      gridComponent={<GridLine interval={200} shouldSkip={(data) => data === 10} />}
      label={getLabel('widget.cutting_chart.axis.x.dynamic.label.bottom', UnitTypeEnums.Angle)}
    />
  );
};

const MemoizedInclinationAxis = memo(
  InclinationAxis,
  arePropsEqual([
    'width',
    'height',
    'domain.x[0]',
    'domain.x[1]',
    'domain.y[0]',
    'domain.y[1]',
    'hideLabel',
  ]),
);
MemoizedInclinationAxis.displayName = 'InclinationAxis';
export default MemoizedInclinationAxis;
