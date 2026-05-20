/* eslint-disable max-lines-per-function */
import React from 'react';
import { YAxis } from './components/Axis';
import { BottomHoleAssembly } from './components/BottomHoleAssembly';
import { CuttingProportion } from './components/CuttingProportion';
import { DrillString, DrillStringCasingSide } from './components/DrillString';
import { InclinationSVG } from './components/Inclination';
import { MudCirculation } from './components/MudCirculation';
import { NeutralPoint } from './components/NeutralPoint';
import { Path } from './components/Path';
import { Inclination } from './lib/wellboreGeometry';
import { WellboreAppearance } from './WellboreChartAppearance';
import { getWellBoreChartData, Size } from './WellboreChartHelper';

export type WellboreParams = {
  neutralPoint: number;
  bitDepth: number;
  holeDepth: number;
  casingDepth: number;
  targetDepth: number;
  cuttingBed: number[][];
  cuttingProportion: number[][];
  mudCirculation: boolean;
  bitRotation: boolean;
  inclination: Inclination;
};

type WellboreChartPropsType = {
  hideAxisLabel: boolean;
  data: WellboreParams;
  size: Size;
  appearance: WellboreAppearance;
};
export function WellboreChart({ hideAxisLabel, data, size, appearance }: WellboreChartPropsType) {
  const { viewBox, axis, svg } = getWellBoreChartData(size, data);
  const yAxisMargin = 30;

  return (
    <svg
      preserveAspectRatio="xMinYMax meet"
      width={viewBox.width}
      height={viewBox.height}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {/* axis */}
      {/*<XAxis svgAxis={svg.axis} axis={axis} /> hide this axis until further notice - SK-1240*/}
      <g transform={`translate(${yAxisMargin}, 0)`}>
        {/* cuttingBed */}
        <Path
          d={svg.cuttingBed}
          stroke={appearance.cuttingBedColor}
          fill={appearance.cuttingBedColor}
        />
      </g>
      <YAxis
        hideAxisLabel={hideAxisLabel}
        svgAxis={svg.axis}
        axis={axis}
        title={appearance.axisLabelY}
      />

      {/* hole */}
      <Path d={svg.hole} stroke={appearance.holeColor} fill={appearance.holeColor} />
      <Path d={svg.chartMax} stroke="black" fill="red" />

      {/* mud circulation */}
      {data.mudCirculation && <MudCirculation mud={svg.mud} />}

      {/* drill string */}
      <DrillString
        drillString={svg.drillString}
        drillStringStroke="black"
        drillStringFill="black"
        drillStringColoring={svg.drillStringColoring}
        drillStringColoringFill="white"
      />
      <DrillStringCasingSide
        side1={{ d: svg.casing.side1, stroke: 'black', fill: 'gray' }}
        side2={{ d: svg.casing.side2, stroke: 'black', fill: 'gray' }}
      />

      {/* bottom hole assembly */}
      <BottomHoleAssembly bhaTransform={svg.bhaTransform} bitRotation={data.bitRotation} />

      {/* cuttingProportion */}
      <CuttingProportion
        cuttingProportion={svg.cuttingProportion}
        cuttingProportionStroke={appearance.cuttingProportionColor}
        cuttingProportionFill={appearance.cuttingProportionColor}
      />

      {/* neutral point */}
      <NeutralPoint
        neutralPointX={svg.neutralPoint.x}
        neutralPointY={svg.neutralPoint.y}
        neutralPointFill={appearance.neutralPointColor}
        neutralPointStroke="fill"
      />

      {/* inclination */}
      <InclinationSVG inclination={svg.inclination} />
    </svg>
  );
}
