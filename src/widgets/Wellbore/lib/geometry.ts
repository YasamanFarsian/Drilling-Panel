/* eslint-disable @typescript-eslint/no-explicit-any  */
// common geometry methods
// Andrei Svetlichnyi 2021.07

export type Point = [x: number, y: number];

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Transformation of coordinates 2D, without rotation
export type Transformation = {
  s: number; // scale
  tx: number; // translate x
  ty: number; // translate y
};

// fit rect into boundingBox
export function findFitTransformation(rect: Rect, boundingBox: Rect): Transformation {
  return {
    s: Math.min(boundingBox.width / rect.width, boundingBox.height / rect.height),
    tx: boundingBox.x - rect.x,
    ty: boundingBox.y - rect.y,
  };
}

export function transformCoordinates(coordinates: Point[], t: Transformation): Point[] {
  return coordinates.map((o) => [t.tx + o[0] * t.s, t.ty + o[1] * t.s]);
}

export function combineTransformations(t1: Transformation, t2: Transformation): Transformation {
  return {
    s: t1.s * t2.s,
    tx: t1.tx * t2.s + t2.tx,
    ty: t1.ty * t2.s + t2.ty,
  };
}

export function findBoundingBox(coordinates: Point[]): Rect {
  const x = coordinates.map((o) => o[0]);
  const y = coordinates.map((o) => o[1]);
  const minX = Math.min(...x);
  const minY = Math.min(...y);
  return {
    x: minX,
    width: Math.max(...x) - minX,
    y: minY,
    height: Math.max(...y) - minY,
  };
}

// return [dx: number, dy: number]
function orthogonalVector(p0: Point, p1: Point): Point {
  const vx = p1[0] - p0[0];
  const vy = p1[1] - p0[1];
  const len = Math.sqrt(vx * vx + vy * vy);
  return [-vy / len, vx / len];
}

export function orthogonalPolyline(line: Point[]): Point[] {
  let n: any = null;
  let prevN: any = null;
  return line.map((v, i, { length }) => {
    if (i < length - 1) {
      n = orthogonalVector(v, line[i + 1]);
    }
    const res = prevN ? [(prevN[0] + n[0]) / 2, (prevN[1] + n[1]) / 2] : n;
    prevN = n;
    return res;
  });
}
