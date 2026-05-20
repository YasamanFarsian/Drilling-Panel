import React from 'react';
import { VictoryScatter } from 'victory';
import { arePropsStrictlyEqual } from '@dt-advisory/helpers/arePropsEqual';
import { CoordinatesType } from '../../helpers/types';

export type DotPropsType = {
  fill: string;
  data: CoordinatesType[];
};

const SVG_SIZE = 5;

export const DotSVG = (props: any) => (
  <svg
    x={props.x - SVG_SIZE / 2}
    y={props.y - SVG_SIZE / 2}
    width={SVG_SIZE}
    height={SVG_SIZE}
    viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={SVG_SIZE / 2} cy={SVG_SIZE / 2} r={SVG_SIZE / 2} fill={props.fill} />
  </svg>
);

const Dot = ({ fill, data, ...props }: DotPropsType): JSX.Element => {
  return <VictoryScatter {...props} data={data} dataComponent={<DotSVG fill={fill} />} />;
};

const MemoizedDot = React.memo(Dot, arePropsStrictlyEqual(['data', 'fill', 'width', 'height'])); // Width and height are passed by VictoryAPI. Basically, on first load width and height set to 0 but it got updated in CartesianGraph
MemoizedDot.displayName = 'Dot';
export default MemoizedDot;
