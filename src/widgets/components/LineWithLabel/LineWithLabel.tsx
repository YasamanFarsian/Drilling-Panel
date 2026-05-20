/* eslint-disable complexity */
import React, { memo } from 'react';
import { VictoryLine } from 'victory';
import { arePropsStrictlyEqual } from '@dt-advisory/helpers/arePropsEqual';
import { CoordinatesType } from '../../helpers/types';

export type LineWithLabelPropsType = {
  data: CoordinatesType[];
  lineColor: string;
};

// eslint-disable-next-line max-lines-per-function
const LineWithLabel = ({ data, lineColor, ...props }: LineWithLabelPropsType): JSX.Element => {
  if (!data.length) return <></>;
  return (
    <VictoryLine
      {...props}
      data={data}
      style={{
        data: { stroke: lineColor },
      }}
    />
  );
};

const memoizedLineWithLabel = memo(LineWithLabel, arePropsStrictlyEqual(['data']));
memoizedLineWithLabel.displayName = 'LineWithLabel';
export default memoizedLineWithLabel;
