import { useTheme } from '@mui/styles';
import React from 'react';
import { VictoryArea, VictoryTooltip } from 'victory';
import Gradients, { GradientsPropsType } from '@dt-advisory/widgets/components/Gradients';

export type GradientAreaPropsType = GradientsPropsType & {
  strokes: { light: string; dark: string };
  strokeWidth?: number | string;
};

const GradientArea = ({
  id,
  configs,
  strokes,
  strokeWidth,
  ...props
}: GradientAreaPropsType): JSX.Element => {
  const theme = useTheme();
  const stroke = strokes[theme.mode];

  return (
    <g>
      <Gradients configs={configs} id={id} />
      <VictoryArea
        {...props}
        style={{
          data: {
            stroke,
            strokeWidth: strokeWidth ?? '0.26rem',
            fill: `url(#${id}-${theme.mode})`,
          },
        }}
      />
    </g>
  );
};

export default GradientArea;
