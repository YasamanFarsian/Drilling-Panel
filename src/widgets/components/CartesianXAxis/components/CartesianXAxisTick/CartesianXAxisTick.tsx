import React from 'react';
import { LineSegment } from 'victory';
import { SMALL_TICK_LENGTH, TICK_LENGTH } from '@dt-advisory/styles/constants';
import { scalePxAsVh } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
import { getX } from '../../helper/cartesianXAxisHelper';

export type CartesianXAxisTickPropsType = Record<string, never>;

const CartesianXAxisTick = ({ style, adjustFirstTik, ...props }: any): JSX.Element => {
  const isMiddleTick = props.index !== 0 && props.index % 2 !== 0;
  const currentTickLength = scalePxAsVh(TICK_LENGTH);
  const currentSmalTickLength = scalePxAsVh(SMALL_TICK_LENGTH);

  return (
    <LineSegment
      {...props}
      x1={getX(props.index, props.x1, adjustFirstTik)}
      x2={getX(props.index, props.x2, adjustFirstTik)}
      y1={props.y1}
      y2={isMiddleTick ? props.y1 + currentSmalTickLength : props.y1 + currentTickLength}
      type="tick"
      style={style}
    />
  );
};

export default CartesianXAxisTick;
