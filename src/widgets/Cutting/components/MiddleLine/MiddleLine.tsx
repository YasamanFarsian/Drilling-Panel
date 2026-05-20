import { useTheme } from '@mui/styles';
import React, { memo } from 'react';
import { VictoryLine, VictoryLineProps } from 'victory';
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';
import { Domain } from '@dt-advisory/helpers/types/types';
import { strokes } from './MiddleLine.style';

export type MiddleLinePropsType = VictoryLineProps & { pos?: number; hideLabel?: boolean };

const MiddleLine = (props: MiddleLinePropsType): JSX.Element => {
  const theme = useTheme();
  const [x] = (props.domain as Domain).x;
  const stroke = strokes[theme.mode];
  const data = [
    { x: 0, y: props.pos ?? 10 },
    { x, y: props.pos ?? 10 },
  ];

  const style = {
    data: {
      stroke,
      strokeDasharray: '8',
      strokeWidth: 0.6,
    },
  };
  return <VictoryLine {...props} style={style} data={data} />;
};

const MemoizedMiddleLine = memo(
  MiddleLine,
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
MemoizedMiddleLine.displayName = 'MiddleLine';
export default MemoizedMiddleLine;
