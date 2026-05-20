import { renderHook } from '@testing-library/react-hooks';
import * as MOCKED_DATA from '@dt-advisory/helpers/tests/mockedData/wellbore/wellbore_before_adapter.json';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { wellboreParams } from './data/testWellboreParams';
import useWellboreChartAdapter from './useWellboreChartAdapter';
import { WellboreStreamMessage } from './WellboreTypes';

const currentMockedData = MOCKED_DATA as unknown as WellboreStreamMessage;

describe('useWellboreChartAdapter', () => {
  it('should return correct values when is connected FALSE', () => {
    const { result } = renderHook(() => useWellboreChartAdapter(false, {} as any), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current).toEqual(wellboreParams);
  });
  it('should return correct values when is connected TRUE', () => {
    const { result } = renderHook(() => useWellboreChartAdapter(true, currentMockedData as any), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.bitDepth).toEqual(currentMockedData.config.bitDepth);
    expect(result.current.casingDepth).toEqual(currentMockedData.config.casingDepth);
    expect(result.current.holeDepth).toEqual(currentMockedData.config.holeDepth);
    expect(result.current.neutralPoint).toEqual(currentMockedData.config.neutralPoint);
    expect(result.current.targetDepth).toEqual(currentMockedData.config.targetDepth);
    expect(result.current.bitRotation).toEqual(currentMockedData.config.bitRotation);
    expect(result.current.mudCirculation).toEqual(currentMockedData.config.mudCirculation);
    expect(Array.isArray(result.current.inclination)).toBeTruthy();
    expect(Array.isArray(result.current.cuttingBed)).toBeTruthy();
  });
});
