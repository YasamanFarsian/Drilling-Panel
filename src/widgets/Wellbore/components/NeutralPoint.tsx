import React from 'react';
import type { SVGType } from '../WellboreChartHelper';
import { PathProps } from './Path';

type neutralPointProps = {
  neutralPointX: SVGType['neutralPoint']['x'];
  neutralPointY: SVGType['neutralPoint']['y'];
  neutralPointFill: PathProps['stroke'];
  neutralPointStroke: PathProps['fill'];
};
export const NeutralPoint = (props: neutralPointProps) => (
  <>
    <circle
      cx={props.neutralPointX}
      cy={props.neutralPointY}
      r="6"
      fill={props.neutralPointFill}
      stroke={props.neutralPointStroke}
    />
  </>
);
