import { renderHook } from '@testing-library/react-hooks';
import * as MOCKED_DATA from '@dt-advisory/helpers/tests/mockedData/cuttingChart/cutting.dump.json';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import * as ToggleStore from '@dt-advisory/store/ZoomerToggle';
import { CuttingChartStreamMessage } from '../CuttingTypes';
import { useCuttingDataStream } from './useCuttingDataStream';

describe('useCuttingDataStream', () => {
  const mockedHookprops = {
    data: MOCKED_DATA as unknown as CuttingChartStreamMessage,
  };
  it('should return correct values', () => {
    const { result } = renderHook(() => useCuttingDataStream(mockedHookprops), {
      wrapper: ConfigsProviderWrapper,
    });

    expect(result.current.minDomain).toBeDefined();
    expect(result.current.maxDomain).toMatchObject({
      x: MOCKED_DATA.md + MOCKED_DATA.md * 0.05,
      y: 20,
    });
    expect(result.current.bitDepth).toEqual(MOCKED_DATA.bitDepth);
  });
  it('should return correct max domain value', () => {
    const MOCKED_DATA2 = { ...MOCKED_DATA } as unknown as CuttingChartStreamMessage;
    MOCKED_DATA2.md = MOCKED_DATA2.md + 100; // increase its value by 100 to be greater than tdBottom
    const { result } = renderHook(() => useCuttingDataStream({ data: MOCKED_DATA2 }), {
      wrapper: ConfigsProviderWrapper,
    });

    expect(result.current.maxDomain).toMatchObject({
      x: MOCKED_DATA2.tdBottom + MOCKED_DATA2.tdBottom * 0.05,
      y: 20,
    });
  });

  it('should return correct hideAxis flag', () => {
    const MOCKED_DATA2 = { ...MOCKED_DATA } as unknown as CuttingChartStreamMessage;
    MOCKED_DATA2.tdBottom = 0;
    MOCKED_DATA2.bitDepth = 0;
    const { result } = renderHook(() => useCuttingDataStream({ data: MOCKED_DATA2 }), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.hideAxis).toEqual(true);
  });
  it('should return correct max domain if zoomerCutting is true', () => {
    jest.spyOn(ToggleStore, 'useZoomerToggleStore').mockReturnValue(true);
    const { result } = renderHook(() => useCuttingDataStream(mockedHookprops), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.maxDomain).toMatchObject({
      x: MOCKED_DATA.bitDepth,
      y: 20,
    });
  });
});
