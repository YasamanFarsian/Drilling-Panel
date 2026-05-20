import React from 'react';
import type { SVGType } from '../WellboreChartHelper';
import { Path, PathProps } from './Path';

type DrillStringProps = {
  drillString: SVGType['drillString'];
  drillStringStroke: PathProps['stroke'];
  drillStringFill: PathProps['fill'];
  drillStringColoring: SVGType['drillStringColoring'];
  drillStringColoringFill: PathProps['fill'];
};

export const DrillString = (props: DrillStringProps) => (
  <>
    <filter id="drillStringBlur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
    </filter>
    <Path d={props.drillString} stroke={props.drillStringStroke} fill={props.drillStringFill} />
    <Path
      d={props.drillStringColoring}
      fill={props.drillStringColoringFill}
      filter="url(#drillStringBlur)"
    />
  </>
);

type DrillStringCasingSideProps = {
  side1: PathProps;
  side2: PathProps;
};
export const DrillStringCasingSide = ({ side1, side2 }: DrillStringCasingSideProps) => (
  <>
    <Path d={side1.d} stroke={side1.stroke} fill={side1.fill} />
    <Path d={side2.d} stroke={side2.stroke} fill={side2.fill} />
  </>
);
