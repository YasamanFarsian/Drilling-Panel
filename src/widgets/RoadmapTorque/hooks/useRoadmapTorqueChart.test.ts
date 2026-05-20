import { act, renderHook } from '@testing-library/react-hooks';
import * as mockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patched.mock.json';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { updateModel, updateState } from '@dt-advisory/helpers/tests/roadmapTestHelpers';
import { useSettingsStore } from '@dt-advisory/store/Settings/Settings';
import { DEPTH_BUFFER } from '@dt-advisory/widgets/helpers/roadmapHelpers';
import { defaultRoadmapTorqueValues } from '../RoadmapTorqueConstants';
import { useRoadmapTorqueChart } from './useRoadmapTorqueChart';

const widgetId = 'torque123';

const defaultData = {
  lastUpdated: mockedData.lastUpdated,
  currentTime: mockedData.currentTime,
  isDrilling: mockedData.data.isDrilling,
  bitDepth: mockedData.data.bitDepth,
  holeDepth: mockedData.data.md,
  casingShoeDepth: mockedData.data.casingShoeDepth,
};

const drillingMinMaxDomain = {
  minDomain: { x: 0, y: 0 },
  maxDomain: { x: 5250.525 * DEPTH_BUFFER, y: 20 },
};

const trippingMinMaxDomain = {
  minDomain: { x: 0, y: 0 },
  maxDomain: { x: 5250.525 * DEPTH_BUFFER, y: 20 },
};

const _convert = (data: any[]) => {
  return data.map((x) => ({ x: x.md, y: x.val }));
};

const DrillingLines = {
  line0: _convert(mockedData.data.drilling.line0),
  line12: _convert(mockedData.data.drilling.line12),
  line22: _convert(mockedData.data.drilling.line22),
  line32: _convert(mockedData.data.drilling.line32),
  line42: _convert(mockedData.data.drilling.line42),
};

const TrippingLines = {
  line0: _convert(mockedData.data.tripping.line0),
  line12: _convert(mockedData.data.tripping.line12),
  line22: _convert(mockedData.data.tripping.line22),
  line32: _convert(mockedData.data.tripping.line32),
  line42: _convert(mockedData.data.tripping.line42),
};

type DataKeyType = 'drilling' | 'tripping';
const getMeasuredDots = (key: DataKeyType) => ({
  dotsLeft: _convert(mockedData.data[key].measured),
  dotsCenter: _convert(mockedData.data[key].measuredDown),
  dotsRight: _convert(mockedData.data[key].measuredUp),
});

const getKinMeasuredDots = (key: DataKeyType) => ({
  dotsLeft: _convert(mockedData.data[key].kinMeasured),
  dotsCenter: _convert(mockedData.data[key].kinMeasuredDown),
  dotsRight: _convert(mockedData.data[key].kinMeasuredUp),
});
const getStatMeasuredDots = (key: DataKeyType) => ({
  dotsLeft: _convert(mockedData.data[key].statMeasured),
  dotsCenter: _convert(mockedData.data[key].statMeasuredDown),
  dotsRight: _convert(mockedData.data[key].statMeasuredUp),
});

const getRenderedHooksResult = (data: any) => {
  const { result } = renderHook(
    () => useRoadmapTorqueChart({ roadmapTorqueData: data, widgetId, numOfTicks: 5 }),
    {
      wrapper: ConfigsProviderWrapper,
    },
  );
  return result.current;
};

describe('useRoadmapTorqueChart', () => {
  beforeAll(() => {
    const { result: initialRoadmap } = renderHook(() => useSettingsStore((x) => x.initialRoadmap));
    act(() => {
      initialRoadmap.current(widgetId);
    });
  });
  // default values
  it('should return correct values when state is Automatic and model is SteadyState', () => {
    const result = getRenderedHooksResult(mockedData);
    expect(result).toMatchObject({
      isDrilling: mockedData.data.isDrilling,
      lastUpdated: mockedData.lastUpdated,
      currentTime: mockedData.currentTime,
      bitDepth: mockedData.data.bitDepth,
      holeDepth: mockedData.data.md,
      casingShoeDepth: mockedData.data.casingShoeDepth,
      minDomain: { x: 0, y: 0 },
      maxDomain: { x: 5250.525 * DEPTH_BUFFER, y: 20 },
      currentData: {
        ...DrillingLines,
        ...getMeasuredDots('drilling'),
      },
    });

    const mockedData2 = {
      operationId: mockedData.operationId,
      lastUpdated: mockedData.lastUpdated,
      currentTime: mockedData.currentTime,
      data: {
        ...mockedData.data,
        isDrilling: false,
        bitDepth: null,
        casingShoeDepth: null,
        td: null,
      },
    };
    const result2 = getRenderedHooksResult(mockedData2);

    expect(result2).toMatchObject({
      lastUpdated: mockedData2.lastUpdated,
      currentTime: mockedData2.currentTime,
      isDrilling: mockedData2.data.isDrilling,
      bitDepth: defaultRoadmapTorqueValues.data.bitDepth,
      holeDepth: mockedData2.data.md,
      casingShoeDepth: defaultRoadmapTorqueValues.data.casingShoeDepth,
      minDomain: { x: 0, y: 0 },
      maxDomain: { x: 800 * DEPTH_BUFFER, y: 10 },
      currentData: {
        line0: [],
        line12: [],
        line22: [],
        line32: [],
        line42: [],
        dotsLeft: [],
        dotsCenter: [],
        dotsRight: [],
      },
    });
    const result3 = getRenderedHooksResult(null);

    expect(result3).toMatchObject({
      isDrilling: false,
      lastUpdated: '',
      currentTime: '',
      bitDepth: defaultRoadmapTorqueValues.data.bitDepth,
      holeDepth: defaultRoadmapTorqueValues.data.md,
      casingShoeDepth: defaultRoadmapTorqueValues.data.casingShoeDepth,
      minDomain: { x: 0, y: 0 },
      maxDomain: { x: 800 * DEPTH_BUFFER, y: 10 },
      currentData: {
        line0: [],
        line12: [],
        line22: [],
        line32: [],
        line42: [],
        dotsLeft: [],
        dotsCenter: [],
        dotsRight: [],
      },
    });
  });

  // Drilling
  it('should return correct values when state is Drilling and model is SteadyState', () => {
    updateState(widgetId, 'Drilling');
    const result = getRenderedHooksResult(mockedData);
    expect(result).toMatchObject({
      ...defaultData,
      ...drillingMinMaxDomain,
      currentData: {
        ...DrillingLines,
        ...getMeasuredDots('drilling'),
      },
    });
  });
  it('should return correct values when state is Drilling and model is TransientKinetic', () => {
    updateModel(widgetId, 'TransientKinetic');
    const result = getRenderedHooksResult(mockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: { x: drillingMinMaxDomain.maxDomain.x, y: 15.4 },
      minDomain: { x: drillingMinMaxDomain.minDomain.x, y: 5.6 },
      currentData: {
        ...DrillingLines,
        ...getKinMeasuredDots('drilling'),
      },
    });
  });
  it('should return correct values when state is Drilling and model is TransientStatic', () => {
    updateModel(widgetId, 'TransientStatic');
    const result = getRenderedHooksResult(mockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: { x: drillingMinMaxDomain.maxDomain.x, y: 14 },
      minDomain: { x: drillingMinMaxDomain.minDomain.x, y: 5.6 },
      currentData: {
        ...DrillingLines,
        ...getStatMeasuredDots('drilling'),
      },
    });
  });

  // Tripping
  const defaultTrippingMinDomain = { x: trippingMinMaxDomain.minDomain.x, y: 5 };
  it('should return correct values when state is Tripping and model is SteadyState', () => {
    updateState(widgetId, 'Tripping');
    updateModel(widgetId, 'Steadystate');
    const result = getRenderedHooksResult(mockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: { x: trippingMinMaxDomain.maxDomain.x, y: 25 },
      minDomain: defaultTrippingMinDomain,
      currentData: {
        ...TrippingLines,
        ...getMeasuredDots('tripping'),
      },
    });
  });
  it('should return correct values when state is Tripping and model is TransientKinetic', () => {
    updateModel(widgetId, 'TransientKinetic');
    const result = getRenderedHooksResult(mockedData);
    expect(result).toMatchObject({
      ...defaultData,
      ...trippingMinMaxDomain,
      maxDomain: { x: trippingMinMaxDomain.maxDomain.x, y: 25 },
      minDomain: defaultTrippingMinDomain,
      currentData: {
        ...TrippingLines,
        ...getKinMeasuredDots('tripping'),
      },
    });
  });
  it('should return correct values when state is Tripping and model is TransientStatic', () => {
    updateModel(widgetId, 'TransientStatic');
    const result = getRenderedHooksResult(mockedData);
    expect(result).toMatchObject({
      ...defaultData,
      ...trippingMinMaxDomain,
      maxDomain: { x: trippingMinMaxDomain.maxDomain.x, y: 25 },
      minDomain: defaultTrippingMinDomain,
      currentData: {
        ...TrippingLines,
        ...getStatMeasuredDots('tripping'),
      },
    });
  });
});
