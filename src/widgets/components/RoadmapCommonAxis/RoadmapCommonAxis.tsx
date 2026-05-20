/* eslint-disable max-lines-per-function */
import React from 'react';
import CartesianXAxis from '@dt-advisory/widgets/components/CartesianXAxis';
import DepthAxis from '@dt-advisory/widgets/components/DepthAxis';

export type RoadmapCommonAxisPropsType = {
  depthAxisLabel: string;
  depthAxisUnit: string;
  isSmallVersion: boolean;
  hideAxisLabel: boolean;
  maxDomain: { x: number; y: number };
  xAxisLabel: string;
  xAxisUnit: string;
  tickOffsetY: number;
  tickValues: number[];
};

const RoadmapCommonAxis = ({
  depthAxisLabel,
  depthAxisUnit,
  isSmallVersion,
  hideAxisLabel,
  maxDomain,
  xAxisLabel,
  xAxisUnit,
  tickOffsetY,
  tickValues,
  ...props
}: RoadmapCommonAxisPropsType): JSX.Element => {
  return (
    <>
      <DepthAxis
        {...props}
        axisLabel={depthAxisLabel}
        axisUnit={depthAxisUnit}
        isSmallVersion={isSmallVersion}
        hideLabel={hideAxisLabel}
        maxDomain={maxDomain}
        crossAxis={false}
      />
      <CartesianXAxis
        {...props}
        axisLabel={xAxisLabel}
        axisUnit={xAxisUnit}
        hideLabel={hideAxisLabel}
        isSmallVersion={isSmallVersion}
        fixedValue={1}
        tickOffsetY={tickOffsetY}
        tickValues={tickValues}
      />
    </>
  );
};

export default RoadmapCommonAxis;
