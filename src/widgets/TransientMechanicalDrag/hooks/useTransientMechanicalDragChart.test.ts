import { renderHook } from '@testing-library/react-hooks';
import * as MOCKED_DATA from '@dt-advisory/helpers/tests/mockedData/transientMechanicalDrag/mockedData.json';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { useTransientMechanicalDragChart } from './useTransientMechanicalDragChart';

const mockedHookprops = MOCKED_DATA;

describe('useTransientMechanicalDragChart', () => {
  it('should return correct values', () => {
    const { result } = renderHook(() => useTransientMechanicalDragChart(mockedHookprops, 5), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.maxDomain).toMatchObject({ x: 565, y: 11155800 });
    expect(result.current.minDomain).toMatchObject({ x: 0, y: -202160 });
    expect(result.current.bitDepth).toEqual(565);
    expect(result.current.lastCasingDepth).toEqual(mockedHookprops.lastCasingDepth);
    expect(result.current.bucklingLimit[0]).toMatchObject({ x: 0.933160316569641, y: 0 });
    expect(result.current.tensileLimit[0]).toMatchObject({
      x: 0.933160316569641,
      y: 276058.41178464,
    });
    expect(result.current.tension[0].x).toEqual(0.933160316569641);
    expect(result.current.hideAxisLabel).toEqual(false);
  });
  /*  it('should return correct values', () => {
    const mockedHookprops2 = {
      ...mockedHookprops,
      bitDepth: null,
      lastCasingDepth: null,
      mechanicalProfiles: null,
    } as unknown as TransientMechanicalDragType;
    const { result } = renderHook(() => useTransientMechanicalDragChart(mockedHookprops2), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.bucklingLimit).toMatchObject([]);
    expect(result.current.tensileLimit).toMatchObject([]);
    expect(result.current.tension).toMatchObject([]);
    expect(result.current.bitDepth).toEqual(0);
    expect(result.current.lastCasingDepth).toEqual(0);
  });*/
});
