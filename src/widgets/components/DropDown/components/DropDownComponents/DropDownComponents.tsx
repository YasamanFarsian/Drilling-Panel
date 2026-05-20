/* eslint-disable max-lines */
import roadmapDragStylesValues from '@dt-advisory/styles/roadmapDragStyleConstants';
import roadmapTorqueStyleConstants from '@dt-advisory/styles/roadmapTorqueStyleConstants';
import { ThemeMode } from '@dt-advisory/styles/theme';
import {
  bitDepthStrokes,
  casingShoeDepthStrokes,
  holeDepthStrokes,
} from '@dt-advisory/widgets/components/ReferenceLine';
import {
  bedHeightColors,
  cuttingLineStrokes,
  cuttingProportionColors,
} from '@dt-advisory/widgets/Cutting/components/CuttingChart/CuttingChart.style';
import {
  downholeMwdEcd,
  downholeMwdEcdStroke,
  ecdStrokes,
  esdStrokes,
  maxBoundColors,
  minBoundColors,
} from '@dt-advisory/widgets/Ecd/components/EcdChart/EcdChart.style';
import { heStrokes } from '@dt-advisory/widgets/Ecd/components/HistoricalEnvelope/HistoricalEnvelope.style';
import {
  bucklingLimitColors,
  tensileLimitColors,
  tensionStrokes,
} from '@dt-advisory/widgets/TransientMechanicalDrag/components/TransientMechanicalDragChart/TransientMechanicalDragChart.style';
import {
  torqueStrokes,
  torsionalLimitStrokes,
} from '@dt-advisory/widgets/TransientMechanicalTorque/components/TransientMechanicalTorqueChart/TransientMechanicalTorqueChart.style';
import { wellboreColors } from '@dt-advisory/widgets/Wellbore/useStyles';
import React from 'react';

type LineProps = {
  color: string;
  width: string;
  dashArray?: string;
};
const Line = ({ color, width, dashArray = '' }: LineProps) => (
  <svg width="18" height="3" viewBox="0 0 18 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line
      y1="1.5"
      x2="18"
      y2="1.5"
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dashArray}
    />
  </svg>
);

type SquareProps = {
  fill: string;
};
const Square = ({ fill }: SquareProps) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="2" fill={fill} />
  </svg>
);

type CircleProps = {
  fill: string;
  r?: string;
};
type DoubleCircleProps = {
  fillInner: string;
  fillOuter: string;
  rOuter?: string;
  rInner?: string;
};

const Circle = ({ fill, r = '7' }: CircleProps) => (
  <svg height="18" width="18">
    <circle cx="9" cy="9" r={r} fill={fill} />
  </svg>
);
const DoubleCircle = ({ fillInner, fillOuter, rOuter, rInner }: DoubleCircleProps) => (
  <svg height="18" width="18">
    <circle cx={9} cy={9} r={rOuter} fill={fillOuter} />
    <circle cx={9} cy={9} r={rInner} fill={fillInner} />
  </svg>
);

const Dot = ({ fill }: Pick<CircleProps, 'fill'>) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6" fill={fill} />
  </svg>
);

const FlatLine = ({ strokeColor }: { strokeColor: string }) => (
  <svg width="18" height="1" viewBox="0 0 18 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="0.5" x2="18" y2="0.5" stroke={strokeColor} />
  </svg>
);

export const BitDepthLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Line color={bitDepthStrokes[mode]} width="3" dashArray="4,4" />
);

export const HoleDepthLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Line color={holeDepthStrokes[mode]} width="3" />
);

export const LastCasingDepthLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Line color={casingShoeDepthStrokes[mode]} width="2" />
);

export const ECDLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Line color={ecdStrokes[mode]} width="3" />
);

export const InclinationLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Line color={cuttingLineStrokes[mode]} width="4" />
);

export const ESDLegendSVG = ({ mode }: { mode: ThemeMode }) => {
  return (
    <svg width="18" height="3" viewBox="0 0 18 3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="1.5"
        y1="1.5"
        x2="16.5"
        y2="1.5"
        stroke={esdStrokes[mode]}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
    </svg>
  );
};

export const HELegendSVG = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="18" rx="2" fill="url(#paint0_linear_3600_4785)" fillOpacity="0.25" />
      <defs>
        <linearGradient
          id="paint0_linear_3600_4785"
          x1="10.5291"
          y1="5.59556"
          x2="-0.869952"
          y2="5.86788"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={heStrokes.light} stopOpacity="0.6" />
          <stop offset="1" stopColor={heStrokes.light} stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const MinGeoPressureLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={minBoundColors[mode]} />
);

export const MaxGeoPressureLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={maxBoundColors[mode]} />
);

export const CuttingsInSuspensionLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={cuttingProportionColors[mode]} />
);

export const CuttingsInBedLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={bedHeightColors[mode]} />
);

export const WellboreInSuspensionLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={wellboreColors.cuttingProportion[mode]} />
);

export const WellboreInBedLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={wellboreColors.cuttingBedHeight[mode]} />
);

export const WellboreNeutralLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Circle fill={wellboreColors.neutralPoint[mode]} />
);

export const ECDCircleSVG = ({ color }: { color: string }) => <Circle fill={color} r="6" />;

export const AlongStringEcdSVG = ({ mode }: { mode: ThemeMode }) => (
  <Circle fill={downholeMwdEcd[mode]} r="6" />
);

export const DownholeMwdEcdSVG = ({ mode }: { mode: ThemeMode }) => (
  <DoubleCircle
    fillInner={downholeMwdEcdStroke[mode]}
    fillOuter={downholeMwdEcd[mode]}
    rOuter="6"
    rInner="3.5"
  />
);

export const TransientMechanicalDragBucklingLimitLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={bucklingLimitColors[mode]} />
);

export const TransientMechanicalDragTensileLimitLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={tensileLimitColors[mode]} />
);

export const TensionLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Line color={tensionStrokes[mode]} width="3" />
);

export const TorqueLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Line color={torqueStrokes[mode]} width="3" />
);

export const TransientMechanicalTorqueTorsionalLimitLegendSVG = ({ mode }: { mode: ThemeMode }) => (
  <Square fill={torsionalLimitStrokes[mode]} />
);

// RoadmapDrag
export const DotSlackoffMeasured = ({ mode }: { mode: ThemeMode }) => {
  return <Dot fill={roadmapDragStylesValues.legend.slackoffMeasured[mode]} />;
};
export const DotPickupMeasured = ({ mode }: { mode: ThemeMode }) => {
  return <Dot fill={roadmapDragStylesValues.legend.pickupMeasured[mode]} />;
};

export const DotFRWMeasured = ({ mode }: { mode: ThemeMode }) => {
  return <Dot fill={roadmapDragStylesValues.legend.FRWMeasured[mode]} />;
};

export const LineFRWFrictions = ({ mode }: { mode: ThemeMode }) => {
  return <FlatLine strokeColor={roadmapDragStylesValues.legend.FRWFrictions[mode]} />;
};
export const LinePickupFrictions = ({ mode }: { mode: ThemeMode }) => {
  return <FlatLine strokeColor={roadmapDragStylesValues.legend.pickupFrictions[mode]} />;
};

export const LineSlackoffFrictions = ({ mode }: { mode: ThemeMode }) => {
  return <FlatLine strokeColor={roadmapDragStylesValues.legend.slackoffFrictions[mode]} />;
};

// RoadmapTorque
export const LineFrictions = ({ mode }: { mode: ThemeMode }) => {
  return <FlatLine strokeColor={roadmapTorqueStyleConstants.legend.frictions[mode]} />;
};
export const DotSurfTorqueFrw = ({ mode }: { mode: ThemeMode }) => {
  return <Dot fill={roadmapTorqueStyleConstants.legend.surfTorqueFrw[mode]} />;
};
export const DotSurfTorqueMeasuredUp = ({ mode }: { mode: ThemeMode }) => {
  return <Dot fill={roadmapTorqueStyleConstants.legend.surfTorqueMeasuredUp[mode]} />;
};
export const DotSurfTorqueMeasuredDown = ({ mode }: { mode: ThemeMode }) => {
  return <Dot fill={roadmapTorqueStyleConstants.legend.surfTorqueMeasuredDown[mode]} />;
};
