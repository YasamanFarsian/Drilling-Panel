import { ThemeMode } from '@dt-advisory/styles/theme';

type StyleValueType = Record<ThemeMode, string>;
type PaddingType = 'bottom' | 'top' | 'left' | 'right';

export type RoadmapDragStyleConstantsType = {
  legend: {
    slackoffMeasured: StyleValueType;
    pickupMeasured: StyleValueType;
    FRWMeasured: StyleValueType;
    slackoffFrictions: StyleValueType;
    pickupFrictions: StyleValueType;
    FRWFrictions: StyleValueType;
  };
  lineLabel: {
    color: StyleValueType;
    fontFamily: string;
    fontSize: number;
    fontWeight: string | number;
    lineHeight: number;
    backgroundColor: StyleValueType;
    backgroundPadding: Record<PaddingType, number>;
  };
};

const roadmapDragStyleConstants: RoadmapDragStyleConstantsType = {
  legend: {
    slackoffFrictions: { light: '#AEDDEB', dark: '#AEDDEB' },
    pickupFrictions: { light: '#A4D9A6', dark: '#A4D9A6' },
    FRWFrictions: { light: '#191919', dark: '#FBFBFB' },
    FRWMeasured: { light: '#191919', dark: '#FBFBFB' },
    pickupMeasured: { light: '#096E4A', dark: '#00DB7F' },
    slackoffMeasured: { light: '#1671FF', dark: '#1671FF' },
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

export default roadmapDragStyleConstants;
