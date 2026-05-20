/* eslint-disable @typescript-eslint/no-explicit-any, max-lines-per-function */
import AreaComponent, {
  AreaComponentPropsType,
} from '@dt-advisory/widgets/components/AreaComponent';
import { useTheme } from '@mui/styles';
import React from 'react';
import { VictoryLine } from 'victory';
import { gradients, inactiveGradients, inactiveStrokes, strokes } from './HistoricalEnvelope.style';

export type HistoricalEnvelopePropsType = Pick<
  AreaComponentPropsType,
  'data' | 'domain' | 'inactive'
>;

const HistoricalEnvelope = ({
  data,
  domain,
  inactive = false,
  ...props
}: HistoricalEnvelopePropsType): JSX.Element => {
  const theme = useTheme();
  const stroke = strokes[theme.mode];
  return (
    <g>
      <AreaComponent
        {...props}
        name="historcal-envelope"
        domain={domain}
        data={data?.map((val) => ({ x: val.Md, y: val.Max, y0: val.Min }))}
        gradientConfig={{
          id: 'historical-envelope',
          configs: inactive ? inactiveGradients : gradients,
          strokes: inactive ? inactiveStrokes : strokes,
          strokeWidth: 0.25,
        }}
      />
      <VictoryLine
        {...props}
        style={{
          data: {
            stroke,
            strokeWidth: 0.25,
          },
        }}
        domain={domain}
        data={data?.map((val) => ({ x: val.Md, y: val.Min }))}
      />
    </g>
  );
};

export default HistoricalEnvelope;
