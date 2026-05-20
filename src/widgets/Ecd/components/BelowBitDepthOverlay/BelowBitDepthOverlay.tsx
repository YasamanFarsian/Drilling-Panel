/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { useTheme } from '@mui/styles';
import React, { memo } from 'react';
import { Area, VictoryArea } from 'victory';
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';
import { overlayStyle } from './BelowBitDepthOverlay.style';

const Overlay = ({ inactive, style, ...props }: any) => {
  const theme = useTheme();
  const { fill, inactiveFill } = overlayStyle[theme.mode];

  return (
    <g>
      <path {...props} fill={inactive ? inactiveFill : fill} fillOpacity={1.0} />
      <path {...props} fill="url(#pattern_xpIM)" />
    </g>
  );
};

export type BelowBitDepthOverlayPropsType = {
  MD: number;
  TD: number;
  domain?: { y: [number, number]; x: [number, number] };
  inactive?: boolean;
  hideLabel?: boolean;
};
const BelowBitDepthOverlay = ({
  MD,
  TD,
  inactive = false,
  hideLabel = false,
  ...props
}: BelowBitDepthOverlayPropsType) => {
  const { domain } = props;
  const { x, y } = domain!;
  const [min, max] = y;
  const [maxX] = x;
  return (
    <>
      <VictoryArea
        {...props}
        data={[
          { x: MD, y: max, y0: min },
          { x: maxX, y: max, y0: min },
        ]}
        dataComponent={<Area pathComponent={<Overlay inactive={inactive} />} />}
      />
      <defs>
        <pattern
          id="pattern_xpIM"
          patternUnits="userSpaceOnUse"
          width="9.5"
          height="9.5"
          patternTransform="rotate(135)"
        >
          <line x1="0" y="0" x2="0" y2="9.5" stroke="transparent" strokeWidth="1" />
        </pattern>
      </defs>
    </>
  );
};

const MemoedBelowBitDepthOverlay = memo(
  BelowBitDepthOverlay,
  arePropsEqual([
    'width',
    'height',
    'domain.x[0]',
    'domain.x[1]',
    'domain.y[0]',
    'domain.y[1]',
    'MD',
    'hideLabel',
  ]),
);
MemoedBelowBitDepthOverlay.displayName = 'BelowBitDepthOverlay';

export default MemoedBelowBitDepthOverlay;
