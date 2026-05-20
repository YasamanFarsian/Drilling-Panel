import mockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patched.mock.json';
import { RoadmapStateType } from '@dt-advisory/store/Settings';
import {
  ConvertedRoadmapDragWidgetType,
  RoadmapDragPatchedType,
  RoadmapDragWidgetType,
} from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragTypes';
import {
  addBufferLeft,
  addBufferRight,
  convertDataForWidget,
  filterValuesAbovemaxMD,
  getAllMaxX,
  getAllMaxY,
  getAllMinX,
  getAllMinY,
  getCurrentStateData,
  getMaxMd,
  getMinAndMaxDomain,
  isValidMinMax,
} from './roadmapHelpers';

describe('getAllMaxY, getAllMinX, getAllMaxX', () => {
  it('should return correct max value for getAllMaxY, getAllMinX, getAllMaxX', () => {
    const mocked = [
      [
        { md: 1, val: 2 },
        { md: 2, val: 3 },
      ],
      [
        { md: 0, val: 2 },
        { md: 2, val: 4 },
      ],
    ];
    expect(getAllMaxY(mocked)).toEqual(2);
    expect(getAllMinY(mocked)).toEqual(0);
    expect(getAllMaxX(mocked)).toEqual(4);
    expect(getAllMinX(mocked)).toEqual(2);
  });
  it('should return correct max value for getAllMaxY, getAllMinX, getAllMaxX', () => {
    const mocked = [undefined];
    expect(getAllMaxY(mocked)).toEqual(0);
    expect(getAllMinY(mocked)).toEqual(0);
    expect(getAllMaxX(mocked)).toEqual(0);
    expect(getAllMinX(mocked)).toEqual(0);
  });
});

describe('isValidMinMax', () => {
  it('should return correct value', () => {
    expect(isValidMinMax(0, 10)).toEqual(10);
    expect(isValidMinMax(2, 10)).toEqual(2);
  });
});

describe('getMinAndMaxDomain', () => {
  it('should return correct min and max domains', () => {
    const result = getMinAndMaxDomain({
      maxMD: 10,
      minY: 0,
      minX: 0,
      maxX: 5,
      defaultMaxX: 1,
      defaultMaxMD: 5,
    });
    expect(result).toMatchObject({
      minDomain: { x: 0, y: 0 },
      maxDomain: { x: 10, y: 5 },
    });
  });
});

describe('getMaxMd', () => {
  it('should return corect value', () => {
    const result = getMaxMd({ md: 10, td: 11 });
    expect(result).toEqual(10.5);
  });
});

const defaultBasicValue = [
  { md: 100, val: 200 },
  { md: 200, val: 300 },
];
const convertedDefaultBasicValue = [
  { x: 100, y: 200 },
  { x: 200, y: 300 },
];
const initialDefaultValues = {
  isDrilling: true,
  lastUpdated: 'foo',
  currentTime: 'foo',
  bitDepth: 100,
  holeDepth: 100,
  casingShoeDepth: 100,
  minDomain: { x: 0, y: 0 },
  maxDomain: { x: 100, y: 10 },
};
const getValues = (isConverted: boolean) => {
  return {
    line0: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line12Left: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line22Left: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line32Left: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line42Left: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line12Right: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line22Right: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line32Right: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    line42Right: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    dotsLeft: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    dotsCenter: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
    dotsRight: isConverted ? convertedDefaultBasicValue : defaultBasicValue,
  };
};
describe('convertDataForWidget', () => {
  const mockedSelectedData: RoadmapDragWidgetType = {
    ...initialDefaultValues,
    currentData: getValues(false) as RoadmapDragWidgetType['currentData'],
  };
  const mockedConvertedSelectedData: ConvertedRoadmapDragWidgetType = {
    ...initialDefaultValues,
    currentData: getValues(true) as ConvertedRoadmapDragWidgetType['currentData'],
    tickValues: [-5, 0, 5, 10, 15],
  };
  it('should return correct converted values', () => {
    const result = convertDataForWidget(mockedSelectedData);
    expect(result.currentData).toMatchObject(mockedConvertedSelectedData.currentData);
  });
});

describe('filterValuesAbovemaxMD', () => {
  it('should return correct filtered values', () => {
    const currentData = getValues(false) as RoadmapDragWidgetType['currentData'];
    filterValuesAbovemaxMD(currentData, 100);
    expect(currentData.line0.length).toEqual(1);
  });
});

const mockedCurrentData: any = {
  line0: [],
};

const getResult = (state: RoadmapStateType) => {
  return getCurrentStateData(
    state,
    mockedCurrentData,
    mockedData.data as unknown as RoadmapDragPatchedType,
  );
};
describe('getCurrentStateData', () => {
  it('should return correct value if it is Drilling', () => {
    const result = getResult('Drilling');
    expect(result.line0[0].md).toEqual(14.3);
  });
  it('should return correct value if it is Tripping', () => {
    const result = getResult('Tripping');
    expect(result.line0[0].md).toEqual(7.7);
  });
  it('should return correct value if it is Automatic', () => {
    const result = getResult('Automatic');
    expect(result.line0[0].md).toEqual(14.3);
  });
});

describe('addBufferRight and addBufferLeft', () => {
  it('should decrease by 5%', () => {
    const result = addBufferLeft(10);
    expect(result).toEqual(9.5);
  });
  it('should increase by 5%', () => {
    const result = addBufferRight(10);
    expect(result).toEqual(10.5);
  });
});
