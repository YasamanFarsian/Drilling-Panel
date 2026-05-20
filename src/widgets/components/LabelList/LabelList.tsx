/* eslint-disable complexity */
import React, { memo } from 'react';
import { VictoryLabel, VictoryScatter } from 'victory';
import { arePropsStrictlyEqual } from '@dt-advisory/helpers/arePropsEqual';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { RoadmapDragStyleConstantsType } from '@dt-advisory/styles/roadmapDragStyleConstants';
import { ThemeMode } from '@dt-advisory/styles/theme';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { CoordinatesType, Domain } from '../../helpers/types';
import {
  getLabelDx,
  getLabelDy,
  getYLabelPos,
  getYLabelPosOfLargeWidget,
} from '../LineWithLabel/lineWithLabelHelpers';

const WITHIN_AREA_PERCENTAGE = 0.1; // 10%

export type LabelListPropsType = {
  label: string;
  data: CoordinatesType[];
  maxY: number;
  mode: ThemeMode;
  labelStyle: RoadmapDragStyleConstantsType['lineLabel'];
  isSmallVersion: boolean;
  placementTop?: boolean;
  minDomain: Domain;
  maxDomain: Domain;
  holeDepth: number;
  scale?: {
    x: (input: number) => number;
    y: (input: number) => number;
  };
};
// eslint-disable-next-line max-lines-per-function
const LabelList = ({
  label,
  data,
  labelStyle,
  mode,
  maxY,
  isSmallVersion,
  placementTop = false,
  minDomain,
  maxDomain,
  holeDepth,
  scale,
  ...props
}: LabelListPropsType): JSX.Element => {
  const isHeaderVisible = useSettingsStore((x) => x.settings.isHeaderVisible);
  const len = data.length > 0 ? data.length - 1 : 0;
  const lastDataPoint = data[len];
  const labelX = lastDataPoint?.x ?? 0; // Y axis
  const labelY = lastDataPoint?.y ?? 0; // X axis
  const labelMainStyle: Omit<
    RoadmapDragStyleConstantsType['lineLabel'],
    'color' | 'backgroundColor' | 'backgroudPadding'
  > = {
    ...labelStyle,
    fontSize: scalePxAsVh(labelStyle.fontSize),
  };
  const PLACEMENT_TOP_SHIFT_FACTOR = 3;
  const PLACEMENT_BOTTOM_SHIFT_FACTOR = !isHeaderVisible ? 1.5 : 1;
  const overflowArea = maxY - maxY * WITHIN_AREA_PERCENTAGE;
  const isOverflow = labelX >= overflowArea;
  let verticalShift = isOverflow ? -10 : 10;
  verticalShift *= placementTop ? PLACEMENT_TOP_SHIFT_FACTOR : PLACEMENT_BOTTOM_SHIFT_FACTOR;
  let horizontalShift = 0;

  // calculate horizontal shift based on some previous data point
  if (placementTop) {
    const somePreviousDataPoint = data[len - 10];
    const somePreviousDataPointY = somePreviousDataPoint?.y ?? 0;
    horizontalShift = (labelY - somePreviousDataPointY) * -1;
  }

  const yPosLargeWidget = getYLabelPosOfLargeWidget({ placementTop, maxY, holeDepth, scale });
  const yPosSmallWidget = scale?.x(labelX);
  const yPos = getYLabelPos({ yPosSmallWidget, yPosLargeWidget, isSmallVersion });
  if (!data.length) return <></>;
  return (
    <>
      <VictoryScatter
        {...props}
        data={data}
        labels={({ datum }) => {
          if (len && datum?.x === labelX && datum?.y === labelY) return label;
          return null;
        }}
        style={{ data: { fill: 'none' } }}
        labelComponent={
          <VictoryLabel
            labelPlacement="vertical"
            backgroundComponent={<rect rx={3} />}
            renderInPortal
            dx={getLabelDx({ isSmallVersion, horizontalShift })}
            dy={getLabelDy({ isSmallVersion, verticalShift })}
            y={yPos}
            textAnchor="middle"
            verticalAnchor="start"
            style={{
              ...labelMainStyle,
              fill: labelStyle.color[mode],
            }}
            backgroundStyle={{ fill: labelStyle.backgroundColor[mode], opacity: 1 }}
            backgroundPadding={labelStyle.backgroundPadding}
          />
        }
      />
    </>
  );
};

const memoizedLabelList = memo(
  LabelList,
  arePropsStrictlyEqual([
    'data',
    'label',
    'mode',
    'width',
    'height',
    'minDomain',
    'maxDomain',
    'holeDepth',
  ]), // Width and height are passed by VictoryAPI. Basically, on first load width and height set to 0 but it got updated in CartesianGraph
);
memoizedLabelList.displayName = 'LabelList';
export default memoizedLabelList;
