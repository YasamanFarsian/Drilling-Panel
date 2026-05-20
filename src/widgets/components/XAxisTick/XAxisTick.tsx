import React from 'react';
import { LineSegment } from 'victory';
import { TICK_LENGTH } from '@dt-advisory/styles/constants';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export type XAxisTickPropsType = any;

const XAxisTick = ({
  style,
  invert,
  long = () => false,
  ...props
}: XAxisTickPropsType): JSX.Element => {
  return (
    <LineSegment
      {...props}
      type="tick"
      y1={props.y1}
      y2={props.y1 + scalePxAsVh(TICK_LENGTH)}
      style={style}
    />
  );
};

export default XAxisTick;
