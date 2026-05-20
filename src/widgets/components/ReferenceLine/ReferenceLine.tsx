/* eslint-disable max-lines-per-function, complexity */
import { useTheme } from '@mui/styles';
import React, { memo, useMemo } from 'react';
import { VictoryLine } from 'victory';
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';

export const HOLE_DEPTH_THICKNESS = 3;

const defaultStrokes = {
  light: '#7067b0',
  dark: '#5d5db0',
};

const inactiveStrokes = {
  light: '#292929',
  dark: '#D0D1D2',
};

export const casingShoeDepthStrokes = {
  light: '#C3C2C1',
  dark: '#C3C2C1',
};

export const bitDepthStrokes = {
  light: '#1C1C1A',
  dark: '#DA914D',
};

export const holeDepthStrokes = {
  light: '#696969',
  dark: '#FFFFFFFC',
};

const ReferenceLine = ({
  depth,
  colorStrokeType,
  domain,
  inactive = false,
  ...props
}: any): JSX.Element => {
  const theme = useTheme();
  const isCasingShoe = 'casingShoeDepth' === colorStrokeType;
  const isBitDepth = 'bitDepth' === colorStrokeType;
  const isHoleDepth = 'holeDepth' === colorStrokeType;
  let strokes;
  if (inactive) {
    strokes = inactiveStrokes;
  } else if (isCasingShoe) {
    strokes = casingShoeDepthStrokes;
  } else if (isBitDepth) {
    strokes = bitDepthStrokes;
  } else if (isHoleDepth) {
    strokes = holeDepthStrokes;
  } else {
    strokes = defaultStrokes;
  }
  const stroke = strokes[theme.mode];
  const { y } = domain;
  const [min, max] = y;
  const data = useMemo(
    () => [
      { x: depth, y: min },
      { x: depth, y: max },
    ],
    [min, max, depth],
  );

  return (
    <g role="reference-line" className="referenceLine">
      <VictoryLine
        {...props}
        domain={domain}
        style={{
          data: {
            stroke,
            strokeWidth: isHoleDepth ? HOLE_DEPTH_THICKNESS : '2px',
            strokeDasharray: isBitDepth ? '4' : '',
          },
        }}
        data={data}
      />
    </g>
  );
};

const MemoizedReferenceLine = memo(
  ReferenceLine,
  arePropsEqual([
    'width',
    'height',
    'domain.x[0]',
    'domain.x[1]',
    'domain.y[0]',
    'domain.y[1]',
    'depth',
  ]),
);
MemoizedReferenceLine.displayName = 'ReferenceLine';
export default ReferenceLine;
