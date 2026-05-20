import React from 'react';
import { VictoryLine, VictoryLineProps } from 'victory';

type LinePropsType = {
  color: string;
} & VictoryLineProps;

export const Line = ({ data, color, ...props }: LinePropsType) => {
  return (
    <VictoryLine
      {...props}
      style={{
        data: {
          stroke: color,
          strokeWidth: 1,
        },
      }}
      data={data}
    />
  );
};
