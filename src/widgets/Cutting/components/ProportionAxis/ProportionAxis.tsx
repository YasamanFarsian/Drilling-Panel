/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any, max-lines */
import { getBedHeightLeftTickLabelOffset } from '@dt-advisory/components/MainLayout/responsiveMainLayoutHelper';
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { DEFAULT_LABEL_STYLE } from '@dt-advisory/styles/constants';
import {
  scalePxAsVh,
  scalePxAsVmin,
  scalePxAsVw,
} from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { useTheme } from '@mui/styles';
import React, { memo, useEffect, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import {
  LineSegment,
  VictoryAxis,
  VictoryAxisProps,
  VictoryLabel,
  VictoryLabelProps,
} from 'victory';
import { labelColors } from './ProportionAxis.style';

function reverseTickValues(tick: number) {
  if (tick === 0) return '20';
  if (tick === 20) return '0';
  return '';
}

export type ProportionAxisPropsType = VictoryAxisProps & {
  hideLabel?: boolean;
};

const XAxisTick = ({ style, invert, long = () => false, ...props }: any): JSX.Element => {
  const key = invert ? 'y2' : 'y1';
  const data = props.datum;

  const y1 = props.y1 - 100;

  return (
    <LineSegment
      {...props}
      y1={y1}
      type="tick"
      style={style}
      {...{
        [key]: long(data) ? props[key] - style.size / 2 : props[key],
      }}
    />
  );
};

const baseTickValues = [0, 5, 10, 15, 20];

const textAnchor = ({ ticks, index }: { ticks: number[]; index: number }) => {
  switch (index + 1) {
    case ticks.length:
      return 'end';
    case 1:
      return 'start';
    default:
      return 'middle';
  }
};

const ProportionAxis = ({ hideLabel = false, ...props }: ProportionAxisPropsType): JSX.Element => {
  const screenWidth = window.innerWidth;
  const theme = useTheme();
  const widgetStyle = useWidgetSettingsStore((x) => x.widgetStyle);

  const { getLabel } = useUnitLabels();
  const labelComponentStyle = {
    ...widgetStyle.labelStyle,
    fontSize: scalePxAsVh(DEFAULT_LABEL_STYLE.fontSize),
    fill: labelColors[theme.mode],
    width: 20,
  };

  const [zeroOnAxisElem, setZeroOnAxisElem] = useState<SVGGraphicsElement | null>(null);
  const [proportionValueGroupElem, setProportionValueGroupElem] =
    useState<SVGGraphicsElement | null>(null);
  const proportionValueGroup = useDimensions();
  const leftProportion = useDimensions();

  useEffect(() => {
    const zeroOnAxis = document.getElementById('depth-axis-group') as unknown as SVGGraphicsElement;
    const _proportionValueGroup = document.getElementById(
      'proportion-value-group',
    ) as unknown as SVGGraphicsElement;

    if (zeroOnAxis && _proportionValueGroup) {
      setZeroOnAxisElem((zeroOnAxis as SVGGraphicsElement | null) ?? null);
      setProportionValueGroupElem((_proportionValueGroup as SVGGraphicsElement | null) ?? null);
    }
  }, []);

  const zeroOnYAxisLen = zeroOnAxisElem?.children.length ?? 0;
  const zeroOnAxisY = Number(
    zeroOnAxisElem?.children[zeroOnYAxisLen - 1]?.children[0]?.getAttribute('y') ?? 0,
  );
  const rightX = Number(
    proportionValueGroup.entry?.target.children[6].children[0].getAttribute('x') ?? 0,
  );
  const leftX = Number(proportionValueGroupElem?.children[2]?.children[0].getAttribute('x') ?? 0);

  const labelOffset = getBedHeightLeftTickLabelOffset(screenWidth);

  if (hideLabel) {
    return <></>;
  }
  return (
    <>
      <VictoryAxis
        {...props}
        offsetY={scalePxAsVh(38) + zeroOnAxisY}
        crossAxis
        dependentAxis
        orientation="top"
        tickValues={baseTickValues}
        tickFormat={reverseTickValues}
        tickComponent={
          <XAxisTick
            long={(data: number) => {
              return [5, 10, 15].includes(data);
            }}
          />
        }
        tickLabelComponent={<></>}
      />

      {/* label: SUSPENSION */}
      <VictoryAxis
        {...props}
        offsetY={scalePxAsVh(30) + zeroOnAxisY}
        crossAxis
        dependentAxis
        orientation="top"
        tickValues={baseTickValues}
        tickFormat={reverseTickValues}
        tickComponent={<></>}
        groupComponent={
          <g
            role="proportion-value-group"
            id="proportion-value-group"
            ref={proportionValueGroup.observe as React.LegacyRef<SVGGElement>}
          />
        }
        tickLabelComponent={
          <VictoryLabel
            dy={0}
            style={labelComponentStyle}
            textAnchor={textAnchor as VictoryLabelProps['textAnchor']}
          />
        }
        axisLabelComponent={<VictoryLabel dy={15} style={labelComponentStyle} />}
        label={getLabel('widget.cutting_chart.axis.x.dynamic.label.top', UnitTypeEnums.Proportion)}
      />

      {/* Left tick */}
      <VictoryAxis
        {...props}
        crossAxis
        tickValues={[0]}
        orientation="left"
        tickComponent={<></>}
        tickLabelComponent={<VictoryLabel x={leftX + scalePxAsVw(labelOffset)} />}
        groupComponent={
          <g
            role="presentation"
            id="left-proportion-group"
            ref={leftProportion.observe as React.LegacyRef<SVGGElement>}
          />
        }
        style={{
          ticks: {
            size: 10,
          },
          tickLabels: {
            ...widgetStyle.labelStyle,
          },
        }}
      />
      {/* Label: BED HEIGHT */}
      <VictoryAxis
        {...props}
        crossAxis
        dependentAxis
        orientation="top"
        label={getLabel(
          'widget.cutting_chart.axis.x.dynamic.label2.top',
          UnitTypeEnums.SmallLength,
        )}
        tickComponent={<></>}
        tickLabelComponent={<></>}
        axisLabelComponent={
          <VictoryLabel style={labelComponentStyle} y={zeroOnAxisY + scalePxAsVmin(1)} />
        }
      />
      {/* Right tick */}
      <VictoryAxis
        {...props}
        crossAxis
        tickValues={[400]}
        tickComponent={<></>}
        orientation="right"
        style={{
          ticks: {
            size: 10,
          },
          tickLabels: widgetStyle.labelStyle,
        }}
        tickLabelComponent={
          <VictoryLabel
            style={labelComponentStyle}
            textAnchor="end"
            x={rightX}
            y={zeroOnAxisY - scalePxAsVmin(3)}
          />
        }
      />
    </>
  );
};

const MemoizedProportionAxis = memo(
  ProportionAxis,
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
MemoizedProportionAxis.displayName = 'ProportionAxis';
export default MemoizedProportionAxis;
