import { ThemeMode } from './theme';

type StyleValueType = Record<ThemeMode, string>;
type PaddingType = 'bottom' | 'top' | 'left' | 'right';

export type RoadmapTorqueStyleConstantsType = {
  legend: {
    frictions: StyleValueType;
    surfTorqueFrw: StyleValueType;
    surfTorqueMeasuredUp: StyleValueType;
    surfTorqueMeasuredDown: StyleValueType;
  };
  lineLabel: {
    color: StyleValueType;
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
    backgroundColor: StyleValueType;
    backgroundPadding: Record<PaddingType, number>;
  };
};

const roadmapTorqueStyleConstants: RoadmapTorqueStyleConstantsType = {
  legend: {
    frictions: { light: '#C2C2C2', dark: '#C2C2C2' },
    surfTorqueFrw: { light: '#191919', dark: '#FBFBFB' },
    surfTorqueMeasuredUp: { light: '#096E4A', dark: '#00DB7F' },
    surfTorqueMeasuredDown: { light: '#1671FF', dark: '#1671FF' },
  },
  lineLabel: {
    color: { light: '#686868', dark: '#969696' },
    fontFamily: 'inherit',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.5,
    backgroundColor: { light: '#F6F6F6', dark: '#1C2430' },
    backgroundPadding: { left: 5, right: 5, top: 1, bottom: 1 },
  },
};

export default roadmapTorqueStyleConstants;
