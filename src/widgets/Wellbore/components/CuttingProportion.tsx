import React from 'react';
import type { SVGType } from '../WellboreChartHelper';
import { Path, PathProps } from './Path';

type CuttingProportionProps = {
  cuttingProportion: SVGType['cuttingProportion'];
  cuttingProportionStroke: PathProps['stroke'];
  cuttingProportionFill: PathProps['fill'];
};
export const CuttingProportion = (props: CuttingProportionProps) => (
  <>
    <Path
      d={props.cuttingProportion}
      stroke={props.cuttingProportionStroke}
      fill={props.cuttingProportionFill}
    />
  </>
);
