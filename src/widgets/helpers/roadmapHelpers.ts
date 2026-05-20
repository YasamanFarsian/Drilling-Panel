import { RoadmapStateType } from '@dt-advisory/store/Settings';
import { BasicValueType, CoordinatesType } from '@dt-advisory/widgets/helpers/types';
import { RoadmapDragPatchedType } from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragTypes';
import { RoadmapTorquePatchedType } from '@dt-advisory/widgets/RoadmapTorque/RoadmapTorqueTypes';
import { getMdToUseWithPerc } from './mdHelper';

const MD_PERC_VALUE = 0.05;
export const DEPTH_BUFFER = 1; // We can increase the value to add a buffer for Y max axis

const getValuesByKey = (data: BasicValueType[], key: keyof BasicValueType): number[] => {
  return data.map((x) => (x ? x[key] : 0));
};

const getMaxY = (data?: BasicValueType[]): number => {
  if (!data) return 0;
  return Math.max(...getValuesByKey(data, 'md'));
};

const getMinY = (data?: BasicValueType[]): number => {
  if (!data) return 0;
  return Math.min(...getValuesByKey(data, 'md'));
};

const getMaxX = (data?: BasicValueType[]): number => {
  if (!data) return 0;
  return Math.max(...getValuesByKey(data, 'val'));
};

const getMinX = (data?: BasicValueType[]): number => {
  if (!data) return 0;
  return Math.min(...getValuesByKey(data, 'val'));
};

export const getAllMaxY = (data: Array<BasicValueType[] | undefined>): number => {
  const numbers: number[] = data.map((x) => getMaxY(x));
  const result = Math.max(...numbers);
  return isFinite(result) ? result : 0;
};

export const getAllMinY = (data: Array<BasicValueType[] | undefined>): number => {
  const numbers: number[] = data.map((x) => getMinY(x));
  const result = Math.min(...numbers);
  return isFinite(result) ? result : 0;
};

export const getAllMaxX = (data: Array<BasicValueType[] | undefined>): number => {
  const numbers: number[] = data.map((x) => getMaxX(x));
  const result = Math.max(...numbers);
  return isFinite(result) ? result : 0;
};

export const getAllMinX = (data: Array<BasicValueType[] | undefined>): number => {
  const numbers: number[] = data.map((x) => getMinX(x));
  const result = Math.min(...numbers);
  return isFinite(result) ? result : 0;
};

export const isValidMinMax = (value: number, defaultValue: number) => {
  if (value !== 0) return value;
  return defaultValue;
};

type CurrentDataType = { [x: string]: BasicValueType[] };
type InputType = { currentData: CurrentDataType };
type OutputType = { currentData: { [x: string]: CoordinatesType[] } };

export const convertDataForWidget = <T extends InputType, R extends OutputType>(data: T): R => {
  const converted = { ...data } as unknown as R;
  for (const [k, v] of Object.entries(data.currentData)) {
    converted.currentData[k] = v.map((d) => ({
      x: d.md,
      y: d.val,
    }));
  }

  return converted;
};

// Filter md values from maxMD
export const filterValuesAbovemaxMD = (data: CurrentDataType, maxMD: number): void => {
  Object.entries(data).forEach((x) => {
    const key = x[0] as keyof typeof data;
    const value = x[1];
    data[key] = value.filter((v) => v.md <= maxMD);
  });
};

export const getCurrentStateData = <T>(
  currentState: RoadmapStateType,
  currentData: T,
  data: RoadmapDragPatchedType | RoadmapTorquePatchedType | undefined,
) => {
  let newCurrentData: T;
  switch (currentState) {
    case 'Drilling':
      newCurrentData = { ...currentData, ...data?.drilling };
      break;
    case 'Tripping':
      newCurrentData = { ...currentData, ...data?.tripping };
      break;
    default:
      const lines = data?.isDrilling ? data?.drilling : data?.tripping;
      newCurrentData = { ...currentData, ...lines };
  }
  return newCurrentData;
};

type GetMinAndMaxDomainPropsType = {
  maxMD: number;
  minY: number;
  minX: number;
  maxX: number;
  defaultMaxX: number;
  defaultMaxMD: number;
};
export const getMinAndMaxDomain = ({
  maxMD,
  minY,
  minX,
  maxX,
  defaultMaxX,
  defaultMaxMD,
}: GetMinAndMaxDomainPropsType) => {
  const minDomain = { x: minY, y: minX };
  const maxDomain = {
    x: isValidMinMax(maxMD, defaultMaxMD) * DEPTH_BUFFER,
    y: isValidMinMax(maxX, defaultMaxX),
  };
  return {
    minDomain,
    maxDomain,
  };
};

export const getMaxMd = ({ md, td }: { md: number; td: number }) => {
  return getMdToUseWithPerc({ MD: md, TD: td, options: { increase: MD_PERC_VALUE } });
};

const BUFFER_LEFT = 0.05;
const BUFFER_RIGHT = 0.05;
export const addBufferLeft = (value: number): number => value - value * BUFFER_LEFT;
export const addBufferRight = (value: number): number => value + value * BUFFER_RIGHT;
