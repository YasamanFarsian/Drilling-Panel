/* eslint-disable max-lines */
import * as wellboreGeometry from '../lib/wellboreGeometry';
import { inclinationValues } from './testInclinationValues';

type WellboreParams = {
  neutralPoint: number;
  bitDepth: number;
  holeDepth: number;
  casingDepth: number;
  targetDepth: number;
  cuttingBed: number[][];
  cuttingProportion: number[][];
  mudCirculation: boolean;
  bitRotation: boolean;
  inclination: wellboreGeometry.Inclination;
};

export const wellboreParams: WellboreParams = {
  neutralPoint: 0,
  bitDepth: 3700,
  holeDepth: 5700,
  casingDepth: 1750,
  targetDepth: 5700,
  cuttingBed: [
    [0, 0.1],
    [100, 0.3],
    [200, 0.7],
    [400, 0.5],
    [600, 0.7],
    [800, 0.5],
    [1000, 0.7],
    [1200, 0.4],
    [1400, 0.6],
    [1500, 0.2],
  ],
  cuttingProportion: [
    [0, 0.1],
    [100, 0.3],
    [200, 0.7],
    [400, 0.5],
    [600, 0.7],
    [800, 0.5],
    [1000, 0.7],
    [1200, 0.4],
    [1400, 0.6],
    [1500, 0.2],
  ],
  bitRotation: true,
  mudCirculation: true,
  inclination: inclinationValues,
};
