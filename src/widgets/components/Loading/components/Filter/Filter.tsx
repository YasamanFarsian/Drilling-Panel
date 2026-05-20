import React from 'react';

const Filter = (): JSX.Element => {
  return (
    <filter
      role="filter_1687945410592"
      x="-46.9%"
      y="-34.4%"
      width="193.8%"
      height="193.8%"
      filterUnits="objectBoundingBox"
      id="g"
    >
      <feMorphology radius={0.5} operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1" />
      <feOffset dy={2} in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
      <feGaussianBlur stdDeviation={2} in="shadowOffsetOuter1" result="shadowBlurOuter1" />
      <feComposite
        in="shadowBlurOuter1"
        in2="SourceAlpha"
        operator="out"
        result="shadowBlurOuter1"
      />
      <feColorMatrix
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13548951 0"
        in="shadowBlurOuter1"
      />
    </filter>
  );
};

export default Filter;
