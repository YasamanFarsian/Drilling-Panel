import React, { SVGProps } from 'react';

export type GradientsPropsType = {
  configs: {
    light: SVGProps<SVGStopElement>[];
    dark: SVGProps<SVGStopElement>[];
  };
  id: string;
};

const Gradients = ({ configs, id }: GradientsPropsType): JSX.Element => {
  return (
    <defs>
      {Object.entries(configs).map(([key, value], index) => (
        <linearGradient key={`${key}-${index}`} id={`${id}-${key}`} x1="0" y1="0" x2="1" y2="0">
          {value.map((gradient, i) => (
            <stop key={`${gradient.stopOpacity}-${i}`} {...gradient} />
          ))}
        </linearGradient>
      ))}
    </defs>
  );
};

export default Gradients;
