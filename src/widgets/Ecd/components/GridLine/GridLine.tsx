import { useTheme } from '@mui/styles';
import React, { ComponentProps, memo } from 'react';
import { LineSegment } from 'victory';
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';
import { math } from '@dt-advisory/helpers/mathjs';
import { configs } from './GridLine.style';

export type GridLinePropsType = ComponentProps<typeof LineSegment> & {
  interval?: number;
  shouldSkip?: (data: number) => boolean;
};

const GridLine = ({
  interval = 1,
  shouldSkip,
  ...props
}: GridLinePropsType): JSX.Element | null => {
  const theme = useTheme();

  if (shouldSkip?.(props.datum)) {
    return null;
  }

  const isEven = (math.number(math.bignumber(props.datum).mod(interval)) as number) === 0;
  const [evenColor, oddColor] = configs[theme.mode];
  const stroke = isEven ? evenColor : oddColor;
  const strokeWidth = isEven ? 1 : 0.5;

  return <LineSegment {...props} style={{ stroke, strokeWidth }} />;
};

const memoedGridLine = memo(GridLine, arePropsEqual(['x1', 'x2', 'y1', 'y2']));
memoedGridLine.displayName = 'GridLine';
export default memoedGridLine;
