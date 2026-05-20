import React from 'react';
import type { SVGType } from '../WellboreChartHelper';

type InclinationProps = {
  inclination: SVGType['inclination'];
};
export const InclinationSVG = ({ inclination }: InclinationProps) => (
  <>
    <g id="inclination">
      {inclination.map((o: any, i: number) => (
        <g key={i}>
          <line x1={o[1]} y1={o[2]} x2={o[3]} y2={o[4]} />
          <text x={o[5]} y={o[6]} dominantBaseline="middle" textAnchor="middle">
            {o[0]}
          </text>
        </g>
      ))}
    </g>
  </>
);
