/* eslint-disable max-lines, max-lines-per-function, max-params, complexity,@typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow */
import { lithologyValues } from './data/lithology';
import { calcStep } from './lib/chart';
import * as geometry from './lib/geometry';
import * as svglib from './lib/svg';
import * as wellboreGeometry from './lib/wellboreGeometry';
import { WellboreParams } from './WellboreChartSVG';

type ViewBoxType = {
  width: number;
  height: number;
  margin: { left: number; top: number; bottom: number; right: number };
};

type SVGAxisXType = {
  label: number;
  sx: number;
};

type SVGAxisYType = {
  label: number;
  sy: number;
};

const offset = {
  // viewport units
  drillString: 7,
  hole: 17,
  casing: { inner: 18, outer: 23 },
  lithology: null, // hidden, to show use {lithology: 48, chart: 50,}
  chart: 26,
  inclination: 24,
  chartMax: 100, // maximum chart offset for value = 1.0
};

export type SVGType = {
  drawArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  neutralPoint: { x: number | undefined; y: number | undefined };
  drillString: string;
  drillStringColoring: string;
  hole: string;
  chartMax: string;
  casing: {
    side1: string;
    side2: string;
  };
  lithology: any[];
  bhaTransform: string;
  cuttingBed: string;
  cuttingProportion: string;
  mud: string[];
  axis: { x: SVGAxisXType[]; y: SVGAxisYType[]; yLabelPos?: number };
  inclination: any[];
  zoomMarker: null;
};

export type Axis = {
  x: {
    screenMin: number;
    screenMax: number;
    min: number;
    max: number;
    stepsCount: number;
  };
  y: {
    screenMin: number;
    screenMax: number;
    min: number;
    max: number;
    stepsCount: number;
  };
};

export type Size = {
  width: number;
  height: number;
};

const getViewBox = (size: Size): ViewBoxType => ({
  width: size.width || 500,
  height: size.height || 500,
  margin: { left: 65, top: 20, bottom: 30, right: 10 }, // margin between viewBox border and draw-area
});

const getInitialSVG = (viewBox: ViewBoxType): SVGType => ({
  drawArea: {
    x: viewBox.margin.left,
    y: viewBox.margin.top,
    width: viewBox.width - viewBox.margin.left - viewBox.margin.right,
    height: viewBox.height - viewBox.margin.top - viewBox.margin.bottom,
  },
  neutralPoint: { x: undefined, y: undefined },
  drillString: '',
  drillStringColoring: '',
  hole: '',
  chartMax: '',
  casing: {
    side1: '',
    side2: '',
  },
  lithology: [],
  bhaTransform: '',
  cuttingBed: '',
  cuttingProportion: '',
  mud: [],
  axis: { x: [], y: [] },
  inclination: [],
  zoomMarker: null,
});

const getInitialAxis = (viewBox: ViewBoxType) => ({
  x: {
    screenMin: 75,
    screenMax: viewBox.width,
    min: 0,
    max: 3200,
    stepsCount: 10,
  },
  y: {
    screenMin: 50,
    screenMax: viewBox.height - 20,
    min: 0,
    max: 400,
    stepsCount: 8,
  },
});

const calcBaseGeometry = (
  inclination: wellboreGeometry.Inclination,
  initialSVG: SVGType,
): {
  trajectoryBoundingBox: geometry.Rect;
  transformation: geometry.Transformation;
  baseGeometry: wellboreGeometry.BaseGeometry;
} => {
  // calc trajectory from inclination
  const baseGeometry: wellboreGeometry.BaseGeometry =
    wellboreGeometry.calcBaseGeometry(inclination);

  // fit trajectory into drawArea
  const trajectoryBoundingBox: geometry.Rect = geometry.findBoundingBox(baseGeometry.trajectory);
  const transfTrajectory = geometry.findFitTransformation(
    trajectoryBoundingBox,
    initialSVG.drawArea,
  );
  const tmpBaseGeometry = {
    md: baseGeometry.md,
    trajectory: geometry.transformCoordinates(baseGeometry.trajectory, transfTrajectory),
    trajectoryOrt: baseGeometry.trajectoryOrt,
  };

  // fit trajectory with charts into drawArea (simple way, assume linear scaling for charts)
  const l1 = wellboreGeometry.trajectoryOffset(tmpBaseGeometry, offset.chartMax);
  const l2 = wellboreGeometry.trajectoryOffset(tmpBaseGeometry, -offset.chartMax);
  const l = l1.concat(l2.reverse());
  const chartBoundingBox = geometry.findBoundingBox(l);
  const transfChart = geometry.findFitTransformation(chartBoundingBox, initialSVG.drawArea);
  const transformation: geometry.Transformation = geometry.combineTransformations(
    transfTrajectory,
    transfChart,
  );
  baseGeometry.trajectory = geometry.transformCoordinates(baseGeometry.trajectory, transformation);

  return {
    trajectoryBoundingBox,
    transformation,
    baseGeometry,
    //geometry,
  };
};

const calcAxis = (
  trajectLimits: geometry.Rect,
  transform: geometry.Transformation,
  initialAxis: Axis,
): Axis => {
  const [[trajectScreenMinX, trajectScreenMinY], [trajectScreenMaxX, trajectScreenMaxY]] =
    geometry.transformCoordinates(
      [
        [trajectLimits.x, trajectLimits.y],
        [trajectLimits.x + trajectLimits.width, trajectLimits.y + trajectLimits.height],
      ],
      transform,
    );
  // simple axis setup
  [initialAxis.x.screenMin, initialAxis.y.screenMin] = [trajectScreenMinX, trajectScreenMinY];
  [initialAxis.x.max, initialAxis.y.max] = [
    trajectLimits.x + trajectLimits.width,
    trajectLimits.y + trajectLimits.height,
  ];

  // coord to screen transformation
  const shiftX = initialAxis.x.screenMin;
  const scaleX =
    (trajectScreenMaxX - initialAxis.x.screenMin) / (initialAxis.x.max - initialAxis.x.min);
  const shiftY = initialAxis.y.screenMin;
  const scaleY =
    (trajectScreenMaxY - initialAxis.y.screenMin) / (initialAxis.y.max - initialAxis.y.min);

  initialAxis.x.max = (initialAxis.x.screenMax - shiftX) / scaleX;
  initialAxis.y.max = (initialAxis.y.screenMax - shiftY) / scaleY;

  return initialAxis;
};

const calcSvg = (
  initalSVG: SVGType,
  baseGeometry: wellboreGeometry.BaseGeometry,
  _params: WellboreParams,
  transformation: geometry.Transformation,
  axis: Axis,
): SVGType => {
  const bg = baseGeometry;

  // find nearest point in baseGeometry.trajectory by MD
  const findNearestByMd = (md: number): number =>
    wellboreGeometry.findNearestElement(baseGeometry.md, md);

  const svgPath = (start: number, end: number, offset1: number, offset2: number): string => {
    const l1 = wellboreGeometry.trajectoryOffsetSlice(baseGeometry, offset1, start, end);
    const l2 = wellboreGeometry.trajectoryOffsetSlice(baseGeometry, offset2, start, end);
    const l = l1.concat(l2.reverse());
    return svglib.pathLines(l);
  };

  // neutral point
  {
    const p = wellboreGeometry.trajectoryPoint(bg, _params.neutralPoint);
    initalSVG.neutralPoint = { x: p[0], y: p[1] };
  }

  // drill string
  {
    const bhaLen = 60; // bha length on screen
    const bhaLenMD = bhaLen / transformation.s; // bha length in meters, calculated from screen image
    const n = findNearestByMd(_params.bitDepth - bhaLenMD / 2) + 1;
    initalSVG.drillString = svgPath(0, n, -offset.drillString, offset.drillString);
    initalSVG.drillStringColoring = svgPath(0, n, -1, 4);
  }

  // hole
  {
    const n = findNearestByMd(_params.holeDepth) + 1;
    initalSVG.hole = svgPath(0, n, -offset.hole, offset.hole);
  }
  // Test - ToDo remove
  // initalSVG.chartMax = svgPath(0, -1, -offsetMax, offsetMax)

  // casing
  {
    const n = findNearestByMd(_params.casingDepth) + 1;
    initalSVG.casing.side1 = svgPath(0, n, -offset.casing.inner, -offset.casing.outer);
    initalSVG.casing.side2 = svgPath(0, n, offset.casing.inner, offset.casing.outer);
  }

  // lithology
  if (offset.lithology) {
    initalSVG.lithology = [];
    for (const v of lithologyValues) {
      initalSVG.lithology.push({
        d: svgPath(v.start, v.end, -offset.lithology, offset.lithology),
        fill: v.fill,
      });
    }
  }

  // bha
  {
    const bhaLen = 60; // bha length on screen
    let n0 = findNearestByMd(_params.bitDepth);
    if (n0 === 0) {
      n0 = 1;
    }
    const p0 = bg.trajectory[n0]; // bha bottom coordinate
    let n1 = n0;
    let p1; // bha top coordinate
    while (1) {
      p1 = bg.trajectory[--n1];
      let dx = p1[0] - p0[0];
      let dy = p1[1] - p0[1];
      const l = Math.sqrt(dx * dx + dy * dy);
      if (l > bhaLen || !n1) {
        let x = p1[0];
        let y = p1[1];
        // interpolate position between trajectory points, if possible
        if (l > bhaLen) {
          x = p0[0] - ((p0[0] - p1[0]) / l) * bhaLen;
          y = p0[1] - ((p0[1] - p1[1]) / l) * bhaLen;
        }
        const n2 = Math.round(n1 + 0.85 * (n0 - n1));
        const p2 = bg.trajectory[n2]; // point close to bit center
        dx = p1[0] - p2[0];
        dy = p1[1] - p2[1];
        const bhaAngle = (Math.atan2(-dy, -dx) * 180) / Math.PI;
        initalSVG.bhaTransform = `translate(${x} ${y}) rotate(${bhaAngle} 0 0)`;
        break;
      }
    }
  }

  // axis
  {
    const renderAxis = (axis: any): { coordinate: number; label: number }[] => {
      const step = calcStep(axis.max - axis.min, axis.stepsCount);
      const scale2 = (axis.screenMax - axis.screenMin) / (axis.max - axis.min);
      const res = [];
      for (let label = axis.min; label <= axis.max; label += step) {
        const coordinate = axis.screenMin + (label - axis.min) * scale2;
        res.push({ coordinate, label });
      }
      return res;
    };

    initalSVG.axis.x = renderAxis(axis.x).map((o) => ({
      label: o.label,
      sx: o.coordinate,
    }));
    initalSVG.axis.y = renderAxis(axis.y).map((o) => ({
      label: o.label,
      sy: o.coordinate,
    }));

    const getIndex = (data: SVGAxisYType[]) => {
      const len = (data || []).length;
      const indexY = Math.round((len - 1) / 2);
      return indexY > -1 && indexY < len ? indexY : null;
    };
    const indexY = getIndex(initalSVG.axis.y);
    if ('number' === typeof indexY) {
      initalSVG.axis.yLabelPos = (initalSVG.axis.y[indexY].sy - 50) * -1;
    }
  }

  // cutting bed
  {
    const chartWidth = offset.chartMax - offset.chart;
    const maxDepth = Math.max.apply(
      null,
      _params.cuttingBed.map((o) => o[0]),
    );
    const cuttingBedScale = 1; // keep for a while to make next merge easy; see commit 86914d2 from 2022.02.21 "front: add zoom selector"; A.S. 2022.06.14
    const k = cuttingBedScale * chartWidth;
    const cuttingPoints = _params.cuttingBed.map((o) =>
      // scale and limit values
      wellboreGeometry.trajectoryPointOffset(
        bg,
        o[0],
        offset.chart + Math.min(k * o[1], chartWidth),
      ),
    );
    const bottom = wellboreGeometry.trajectoryOffset(bg, offset.chart);
    const bb = bottom.slice(0, findNearestByMd(maxDepth));
    initalSVG.cuttingBed = svglib.pathLines([...cuttingPoints, ...bb.reverse()]);
  }

  // cutting proportion
  {
    const chartWidth = offset.chartMax - offset.chart;
    const maxDepth = Math.max.apply(
      null,
      _params.cuttingProportion.map((o) => o[0]),
    );
    const cuttingProportionScale = 1; // keep for a while to make next merge easy; see commit 86914d2 from 2022.02.21 "front: add zoom selector"; A.S. 2022.06.14
    const k = cuttingProportionScale * chartWidth;
    const cuttingPoints = _params.cuttingProportion.map((o) =>
      // scale and limit values
      wellboreGeometry.trajectoryPointOffset(
        bg,
        o[0],
        -offset.chart - Math.min(k * o[1], chartWidth),
      ),
    );
    const bottom = wellboreGeometry.trajectoryOffset(bg, -offset.chart);
    const bb = bottom.slice(0, findNearestByMd(maxDepth));
    initalSVG.cuttingProportion = svglib.pathLines([...cuttingPoints, ...bb.reverse()]);
  }

  // mud
  {
    initalSVG.mud = [];
    const step = 10;
    const end = Math.min(findNearestByMd(_params.bitDepth), bg.trajectory.length);
    let p0;
    for (let i = end; i > 0; i -= step) {
      const p1 = bg.trajectory[i];
      if (p0) {
        initalSVG.mud.push(`${p0[0]}, ${p0[1]}; ${p1[0]}, ${p1[1]}`);
      }
      p0 = p1;
    }
  }

  // inclination
  {
    const marks = [0, 20, 40, 60, 80, 90];
    const incl = wellboreGeometry.findInclinationMarksDepth(_params.inclination, marks);
    const markLen = 10;
    const txtOffset = 10;
    initalSVG.inclination = incl.map((inc) => {
      return [
        inc[1], // inclination
        ...wellboreGeometry.trajectoryPointOffset(bg, inc[0], offset.inclination), // x1, y1
        ...wellboreGeometry.trajectoryPointOffset(bg, inc[0], offset.inclination + markLen), // x2, y2
        ...wellboreGeometry.trajectoryPointOffset(
          bg,
          inc[0],
          offset.inclination + markLen + txtOffset,
        ), // xTxt, yTxt
      ];
    });
  }
  return initalSVG;
};

export const getWellBoreChartData = (size: Size, params: WellboreParams) => {
  // svg viewBox
  const viewBox = getViewBox(size);

  // initial svg
  const initalSVG = getInitialSVG(viewBox);

  // axis
  const initialAxis = getInitialAxis(viewBox);

  // calcBaseGeometry
  const { trajectoryBoundingBox, transformation, baseGeometry } = calcBaseGeometry(
    params.inclination,
    initalSVG,
  );

  const axis = calcAxis(trajectoryBoundingBox, transformation, initialAxis);

  // rendered svg
  const svg = calcSvg(initalSVG, baseGeometry, params, transformation, axis);

  return {
    viewBox,
    axis,
    svg,
  };
};
