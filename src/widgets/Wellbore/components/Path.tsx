import React from 'react';

export type PathProps = {
  d: string;
  stroke?: string;
  fill: string;
  filter?: string;
};
export const Path = ({ d, stroke, fill, filter }: PathProps) => (
  <path d={d} stroke={stroke} fill={fill} filter={filter} />
);
