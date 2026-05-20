/* eslint-disable max-lines-per-function, @typescript-eslint/no-non-null-assertion */
import { useTheme } from '@mui/styles';
import React, { SVGProps } from 'react';
import { ClipPath, Curve, VictoryArea, VictoryLine } from 'victory';
import {
  closestFracStrokes,
  closestPoreStrokes,
  defaultStrokes,
  inactiveStrokes,
  StokesType,
} from './ClosestLine.style';

function PathWithBackground({
  style: _,
  id,
  showBackground,
  inactive = false,
  ...props
}: SVGProps<SVGPathElement> & { showBackground: boolean; inactive?: boolean }) {
  const theme = useTheme();
  let strokes: StokesType;
  if (inactive) {
    strokes = inactiveStrokes;
  } else if ('closest-frac' === id) {
    strokes = closestFracStrokes;
  } else if ('closest-pore' === id) {
    strokes = closestPoreStrokes;
  } else {
    strokes = defaultStrokes;
  }

  const stroke = strokes[theme.mode];

  const background = theme.palette.background.paper;

  return (
    <>
      {showBackground && <path {...props} strokeWidth={3} stroke={background} />}
      <path {...props} stroke={stroke} strokeWidth={1.5} strokeDasharray={6} />
    </>
  );
}

export type ClosestLinePropsType = {
  id: string;
  depth: number;
  from: number;
  to: number;
  showBackground: boolean;
  domain?: { y: [number, number]; x: [number, number] };
  inactive?: boolean;
};

const ClosestLine = ({
  id,
  depth,
  from,
  to,
  showBackground,
  inactive = false,
  ...props
}: ClosestLinePropsType): JSX.Element => {
  const {
    x: [x1, x0],
    y: [y0, y1],
  } = props.domain!;
  const clipId = `${id}-clip`;

  return (
    <g>
      <VictoryArea
        {...props}
        groupComponent={<ClipPath clipId={clipId} />}
        data={[
          { x: x0, y: to, y0: from },
          { x: x1, y: to, y0: from },
        ]}
      />
      <VictoryLine
        {...props}
        data={[
          { x: depth, y: y0 },
          { x: depth, y: y1 },
        ]}
        dataComponent={
          <Curve
            clipPath={`url(#${clipId})`}
            pathComponent={
              <PathWithBackground showBackground={showBackground} id={id} inactive={inactive} />
            }
          />
        }
      />
    </g>
  );
};

export default ClosestLine;
