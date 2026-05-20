import { act, renderHook } from '@testing-library/react-hooks';
import * as patchedMockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patched.mock.json';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { updateModel, updateState } from '@dt-advisory/helpers/tests/roadmapTestHelpers';
import { useSettingsStore } from '@dt-advisory/store/Settings/Settings';
import { DEPTH_BUFFER } from '@dt-advisory/widgets/helpers/roadmapHelpers';
import { defaultRoadmapDragValues } from '../RoadmapDragConstants';
import { useRoadmapDragChart } from './useRoadmapDragChart';

const widgetId = '123';

const defaultData = {
  lastUpdated: patchedMockedData.lastUpdated,
  currentTime: patchedMockedData.currentTime,
  isDrilling: patchedMockedData.data.isDrilling,
  bitDepth: patchedMockedData.data.bitDepth,
  holeDepth: patchedMockedData.data.md,
  casingShoeDepth: patchedMockedData.data.casingShoeDepth,
};

const _convert = (data: any[]) => {
  return data.map((x) => ({ x: x.md, y: x.val }));
};

const DrillingLines = {
  line0: _convert(patchedMockedData.data.drilling.line0),
  line12Left: _convert(patchedMockedData.data.drilling.line12Left),
  line22Left: _convert(patchedMockedData.data.drilling.line22Left),
  line32Left: _convert(patchedMockedData.data.drilling.line32Left),
  line42Left: _convert(patchedMockedData.data.drilling.line42Left),
  line12Right: _convert(patchedMockedData.data.drilling.line12Right),
  line22Right: _convert(patchedMockedData.data.drilling.line22Right),
  line32Right: _convert(patchedMockedData.data.drilling.line32Right),
  line42Right: _convert(patchedMockedData.data.drilling.line42Right),
};

const TrippingLines = {
  line0: _convert(patchedMockedData.data.tripping.line0),
  line12Left: _convert(patchedMockedData.data.tripping.line12Left),
  line22Left: _convert(patchedMockedData.data.tripping.line22Left),
  line32Left: _convert(patchedMockedData.data.tripping.line32Left),
  line42Left: _convert(patchedMockedData.data.tripping.line42Left),
  line12Right: _convert(patchedMockedData.data.tripping.line12Right),
  line22Right: _convert(patchedMockedData.data.tripping.line22Right),
  line32Right: _convert(patchedMockedData.data.tripping.line32Right),
  line42Right: _convert(patchedMockedData.data.tripping.line42Right),
};

const emptyCurrentData = {
  line0: [],
  line12Left: [],
  line22Left: [],
  line32Left: [],
  line42Left: [],
  line12Right: [],
  line22Right: [],
  line32Right: [],
  line42Right: [],
  dotsLeft: [],
  dotsCenter: [],
  dotsRight: [],
};

const getRenderedHooksResult = (data: any) => {
  const { result } = renderHook(
    () => useRoadmapDragChart({ roadmapDragData: data, widgetId, numOfTicks: 5 }),
    {
      wrapper: ConfigsProviderWrapper,
    },
  );
  return result.current;
};

describe('useRoadmapDragChart', () => {
  beforeAll(() => {
    const { result: initialRoadmap } = renderHook(() => useSettingsStore((x) => x.initialRoadmap));
    act(() => {
      initialRoadmap.current(widgetId);
    });
  });
  // default values
  it('should return correct values when state is Automatic and model is SteadyState', () => {
    const result = getRenderedHooksResult(patchedMockedData);
    expect(result).toMatchObject({
      isDrilling: patchedMockedData.data.isDrilling,
      lastUpdated: patchedMockedData.lastUpdated,
      currentTime: patchedMockedData.currentTime,
      bitDepth: patchedMockedData.data.bitDepth,
      holeDepth: patchedMockedData.data.md,
      casingShoeDepth: patchedMockedData.data.casingShoeDepth,
      minDomain: { x: 0, y: 5 },
      maxDomain: { x: 5250.525 * DEPTH_BUFFER, y: 25 },
      currentData: {
        ...DrillingLines,
        dotsLeft: _convert(patchedMockedData.data.drilling.leftMeasured),
        dotsCenter: _convert(patchedMockedData.data.drilling.centerMeasured),
        dotsRight: _convert(patchedMockedData.data.drilling.rightMeasured),
      },
    });

    const mockedData2 = {
      operationId: patchedMockedData.operationId,
      lastUpdated: patchedMockedData.lastUpdated,
      currentTime: patchedMockedData.currentTime,
      data: {
        ...patchedMockedData.data,
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
      bitDepth: defaultRoadmapDragValues.data.bitDepth,
      holeDepth: mockedData2.data.md,
      casingShoeDepth: defaultRoadmapDragValues.data.casingShoeDepth,
      minDomain: { x: 0, y: 0 },
      maxDomain: { x: 800 * DEPTH_BUFFER, y: 10 },
      currentData: emptyCurrentData,
    });
    const result3 = getRenderedHooksResult(null);

    expect(result3).toMatchObject({
      isDrilling: false,
      lastUpdated: '',
      currentTime: '',
      bitDepth: defaultRoadmapDragValues.data.bitDepth,
      holeDepth: defaultRoadmapDragValues.data.md,
      casingShoeDepth: defaultRoadmapDragValues.data.casingShoeDepth,
      minDomain: { x: 0, y: 0 },
      maxDomain: { x: 800 * DEPTH_BUFFER, y: 10 },
      currentData: emptyCurrentData,
    });
  });

  // Drilling
  const defaultDrillingMaxDomain = { x: 5250.525 * DEPTH_BUFFER, y: 25 };
  const defaultDrillingMinDomain = { x: 0, y: 5 };
  it('should return correct values when state is Drilling and model is SteadyState', () => {
    updateState(widgetId, 'Drilling');
    const result = getRenderedHooksResult(patchedMockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: defaultDrillingMaxDomain,
      minDomain: defaultDrillingMinDomain,
      currentData: {
        ...DrillingLines,
        dotsLeft: _convert(patchedMockedData.data.drilling.leftMeasured),
        dotsCenter: _convert(patchedMockedData.data.drilling.centerMeasured),
        dotsRight: _convert(patchedMockedData.data.drilling.rightMeasured),
      },
    });
  });
  it('should return correct values when state is Drilling and model is TransientKinetic', () => {
    updateModel(widgetId, 'TransientKinetic');
    const result = getRenderedHooksResult(patchedMockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: defaultDrillingMaxDomain,
      minDomain: { ...defaultDrillingMinDomain },
      currentData: {
        ...DrillingLines,
        dotsLeft: _convert(patchedMockedData.data.drilling.kinLeftMeasured),
        dotsCenter: _convert(patchedMockedData.data.drilling.kinCenterMeasured),
        dotsRight: _convert(patchedMockedData.data.drilling.kinRightMeasured),
      },
    });
  });
  it('should return correct values when state is Drilling and model is TransientStatic', () => {
    updateModel(widgetId, 'TransientStatic');
    const result = getRenderedHooksResult(patchedMockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: defaultDrillingMaxDomain,
      minDomain: { ...defaultDrillingMinDomain },
      currentData: {
        ...DrillingLines,
        dotsLeft: _convert(patchedMockedData.data.drilling.statLeftMeasured),
        dotsCenter: _convert(patchedMockedData.data.drilling.statCenterMeasured),
        dotsRight: _convert(patchedMockedData.data.drilling.statRightMeasured),
      },
    });
  });

  // Tripping
  const defaultTrippingMaxDomain = { x: 5250.525 * DEPTH_BUFFER, y: 25 };
  const defaultTrippingMinDomain = { x: 0, y: 5 };
  it('should return correct values when state is Tripping and model is SteadyState', () => {
    updateState(widgetId, 'Tripping');
    updateModel(widgetId, 'Steadystate');
    const result = getRenderedHooksResult(patchedMockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: defaultTrippingMaxDomain,
      minDomain: defaultTrippingMinDomain,
      currentData: {
        ...TrippingLines,
        dotsLeft: _convert(patchedMockedData.data.tripping.leftMeasured),
        dotsCenter: _convert(patchedMockedData.data.tripping.centerMeasured),
        dotsRight: _convert(patchedMockedData.data.tripping.rightMeasured),
      },
    });
  });
  it('should return correct values when state is Tripping and model is TransientKinetic', () => {
    updateModel(widgetId, 'TransientKinetic');
    const result = getRenderedHooksResult(patchedMockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: defaultTrippingMaxDomain,
      minDomain: defaultTrippingMinDomain,
      currentData: {
        ...TrippingLines,
        dotsLeft: _convert(patchedMockedData.data.tripping.kinLeftMeasured),
        dotsCenter: _convert(patchedMockedData.data.tripping.kinCenterMeasured),
        dotsRight: _convert(patchedMockedData.data.tripping.kinRightMeasured),
      },
    });
  });
  it('should return correct values when state is Tripping and model is TransientStatic', () => {
    updateModel(widgetId, 'TransientStatic');
    const result = getRenderedHooksResult(patchedMockedData);
    expect(result).toMatchObject({
      ...defaultData,
      maxDomain: defaultTrippingMaxDomain,
      minDomain: defaultTrippingMinDomain,
      currentData: {
        ...TrippingLines,
        dotsLeft: _convert(patchedMockedData.data.tripping.statLeftMeasured),
        dotsCenter: _convert(patchedMockedData.data.tripping.statCenterMeasured),
        dotsRight: _convert(patchedMockedData.data.tripping.statRightMeasured),
      },
    });
  });
});
