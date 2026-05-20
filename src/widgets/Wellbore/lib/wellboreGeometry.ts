/* eslint-disable max-params, complexity */
// geometry methods, specific to wellbore
// Andrei Svetlichnyi 2021.07

import { Point } from './geometry';
import * as geo from './geometry';

/* md: measured depth, inclination: inclination angle in grad */
export type Inclination = [md: number, inclination: number][];

export type BaseGeometry = {
  md: number[];
  trajectory: Point[];
  trajectoryOrt: [ortX: number, ortY: number][];
};

// Calc unfolded trajectory (NOT a projection)
function calcUnfoldedTrajectory(inclination: Inclination): [md: number, x: number, y: number][] {
  function toRadians(angle: number): number {
    return angle * (Math.PI / 180);
  }

  let x = 0;
  let y = 0;
  const result: [md: number, x: number, y: number][] = [[0, 0, 0]];
  for (let i = 0; i < inclination.length - 1; i++) {
    const a = inclination[i]; // segment start
    const b = inclination[i + 1]; // segment end
    const l = b[0] - a[0]; // segment len
    const incl = toRadians(a[1]);
    x += l * Math.sin(incl);
    y += l * Math.cos(incl);
    result.push([b[0], x, y]);
  }
  return result;
}

export function calcBaseGeometry(inclination: Inclination): BaseGeometry {
  const unfoldedTrajectory = calcUnfoldedTrajectory(inclination);
  const md = unfoldedTrajectory.map((o) => o[0]);
  const trajectory: geo.Point[] = unfoldedTrajectory.map((o) => [o[1], o[2]]);
  const trajectoryOrt = geo.orthogonalPolyline(trajectory);
  return {
    md,
    trajectory,
    trajectoryOrt,
  };
}

// find index of the nearest element in ordered array
export function findNearestElement(arr: number[], x: number): number {
  let m = 1;
  let n = arr.length - 1;
  let k = NaN;
  while (m <= n) {
    // tslint:disable-next-line:no-bitwise
    k = (m + n) >> 1;
    if (arr[k] < x) {
      m = k + 1;
    } else if (arr[k - 1] > x) {
      n = k - 1;
    } else {
      break;
    }
  }
  // k - nearest from top, k-1 - nearest from bottom (arr[k] >= x)
  return (arr[k] + arr[k - 1]) / 2 < x ? k : k - 1;
}

// closest trajectory point, matching md
export function trajectoryPoint(baseGeometry: BaseGeometry, md: number): Point {
  const n = findNearestElement(baseGeometry.md, md);
  return baseGeometry.trajectory[n];
}

// closest trajectory point, matching md, shifted from trajectory by offset
export function trajectoryPointOffset(
  baseGeometry: BaseGeometry,
  md: number,
  offset: number,
): Point {
  const n = findNearestElement(baseGeometry.md, md);
  const p = baseGeometry.trajectory[n];
  const ort = baseGeometry.trajectoryOrt[n];
  return [p[0] + ort[0] * offset, p[1] + ort[1] * offset];
}

// trajectory, shifted by offset
export function trajectoryOffset(baseGeometry: BaseGeometry, offset: number): Point[] {
  return baseGeometry.trajectory.map((v, i) => [
    v[0] + baseGeometry.trajectoryOrt[i][0] * offset,
    v[1] + baseGeometry.trajectoryOrt[i][1] * offset,
  ]);
}

export function trajectoryOffsetSlice(
  baseGeometry: BaseGeometry,
  offset: number,
  start: number,
  end: number,
): Point[] {
  return trajectoryOffset(baseGeometry, offset).slice(start, end);
}

// find inclination marks depth
export function findInclinationMarksDepth(inclination: Inclination, marks: number[]) {
  const incl = findInclinationIntersections(inclination, marks);
  return clearInclinationIntersections(incl);
}

// find intersection points - inclination segments with marks
function findInclinationIntersections(inclination: Inclination, marks: number[]): Inclination {
  let prevMD = null;
  let prevIncl: any = null;
  const result: Inclination = [];
  for (const row of inclination) {
    const md = row[0];
    const incl = row[1];
    if (prevMD === null) {
      prevMD = md;
      prevIncl = incl;
    }
    // eslint-disable-next-line no-loop-func
    const mm = marks.filter((l) => (prevIncl <= l && l <= incl) || (incl <= l && l <= prevIncl));
    for (const m of mm) {
      const depth =
        incl === prevIncl
          ? (md + prevMD) / 2
          : prevMD + ((md - prevMD) * (m - prevIncl)) / (incl - prevIncl);
      result.push([depth, m]);
    }
    prevMD = md;
    prevIncl = incl;
  }
  return result;
}

function clearInclinationIntersections(marks: Inclination): Inclination {
  let p1 = 0;
  let p2 = marks.length - 1;

  // clear start/end points
  while (p1 < p2 && marks[p1][1] === 0) p1++;
  if (p1 > 0) p1--;
  while (p1 < p2 && marks[p2][1] === 90) p2--;
  if (p2 < marks.length - 1) p2++;

  // clear middle points
  const result: Inclination = [];
  for (let prev = marks[p1++]; p1 <= p2; p1++) {
    if (marks[p1][1] !== prev[1]) {
      const depth = (prev[0] + marks[p1 - 1][0]) / 2;
      result.push([depth, prev[1]]);
      prev = marks[p1];
    }
  }
  return result;
}
