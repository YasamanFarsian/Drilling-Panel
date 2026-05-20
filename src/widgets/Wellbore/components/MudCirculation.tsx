import React from 'react';
import type { SVGType } from '../WellboreChartHelper';

type MudCirculationProps = {
  mud: SVGType['mud'];
};
export const MudCirculation = ({ mud }: MudCirculationProps) => (
  <>
    <filter id="mudBlur" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
    </filter>
    {mud.map((v: any, i: number) => (
      <circle key={i} r="12" fill="yellow" filter="url(#mudBlur)" opacity=".8">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          dur="2s"
          values={v}
          repeatCount="indefinite"
        />
      </circle>
    ))}
  </>
);
