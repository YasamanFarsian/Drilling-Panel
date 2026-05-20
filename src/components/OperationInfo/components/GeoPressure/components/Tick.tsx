import React from 'react';
import { LineSegment, LineSegmentProps } from 'victory';

type TickPropsType = {
  invert?: boolean;
  long: (x: number) => boolean;
} & LineSegmentProps;

export const Tick = ({ style, invert = false, long = () => false, ...props }: TickPropsType) => {
  const key = invert ? 'y2' : 'y1';
  const data = props.datum;
  const propsKey = props[key];
  return (
    <LineSegment
      {...props}
      style={style}
      {...{
        [key]: long(data) && propsKey ? propsKey - style.size / 2 : props[key],
      }}
    />
  );
};
