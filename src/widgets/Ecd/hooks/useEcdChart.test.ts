import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { useZoomerToggleStore } from '@dt-advisory/store/ZoomerToggle';
import { useEcdChart } from './useEcdChart';
import { EcdChartPropsType } from '../components/EcdChart';
import { ECDStream } from '../EcdTypes';

describe('ECD useEcdChart', () => {
  const mockedHookprops = {
    data: {
      currentTime: '2023-01-04T08:47:39.5289985Z',
      lastUpdated: '2023-01-04T08:47:39.5289699Z',
      ecd: [
        {
          md: 75.699,
          val: 1.24595366847978,
        },
        {
          md: 91.521,
          val: 1.23925654723398,
        },
        {
          md: 107.343,
          val: 1.23446474768909,
        },
      ],
      alongStringEcd: [
        {
          md: 320,
          val: 1.2166,
        },
        {
          md: 380,
          val: 1.2106,
        },
        {
          md: 420,
          val: 1.2066,
        },
        {
          md: 480,
          val: 1.2066,
        },
      ],
      downholeEcd: 1.2,
      downholeEcdMd: 540,
      esdLastUpdate: '2023-01-04T08:47:39.5289699Z',
      esd: [
        {
          md: 2.25,
          val: 1.16101676181971,
        },
        {
          md: 12.411,
          val: 1.16116878769915,
        },
        {
          md: 28.232999999999997,
          val: 1.1611930045754,
        },
      ],
      marginLastUpdate: '2023-01-04T08:47:39.4941305Z',
      margins: [
        {
          Md: 309,
          Min: 1,
          Max: 1.34,
        },
        {
          Md: 314.1976986075,
          Min: 1,
          Max: 1.34,
        },
        {
          Md: 324.5930958225,
          Min: 1,
          Max: 1.34,
        },
      ],
      pressureLastUpdate: '2023-01-04T08:47:39.4941288Z',
      pressure: {
        CasingShoeDepth: 309,
        BitDepth: 564.7222612804572,
        Md: 579.2803275919771,
        Td: 600,
        MinEcd: 0.8999,
        MaxEcd: 1.4741,
      },
      nearestPressure: {
        fracLastUpdate: '2023-01-04T08:47:39.4941288Z',
        frac: {
          depth: 309,
          ecd: 1.20670230591832,
          val: 1.34,
        },
        poreLastUpdate: '2023-01-04T08:47:39.4941288Z',
        pore: {
          depth: 579,
          ecd: 1.19942769467231,
          val: 1,
        },
      },
      ecdHist: [
        {
          min: {
            md: 80,
            val: 1.22688180384109,
          },
          max: {
            md: 80,
            val: 1.26646315095251,
          },
        },
      ],
    } as unknown as ECDStream,
  } as EcdChartPropsType;

  it('should return defined values', () => {
    const { result } = renderHook(() => useEcdChart(mockedHookprops), {
      wrapper: ConfigsProviderWrapper,
    });

    expect(result.current.minDomain).toBeDefined();
    expect(result.current.maxDomain).toBeDefined();
    expect(result.current.data).toBeDefined();
    expect(result.current.historicalEnvelopeData.data).toEqual([
      { Md: 80, Max: 1.22688180384109, Min: 1.26646315095251 },
    ]);
  });
  it('should return empty historicalEnvelopeData', () => {
    const mockedHookprops2 = {
      data: {
        ...mockedHookprops.data,
        ecdHist: [],
      } as ECDStream,
    } as EcdChartPropsType;
    const { result } = renderHook(() => useEcdChart(mockedHookprops2), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.historicalEnvelopeData.data).toEqual([]);
  });
  it('should return something', () => {
    renderHook(() => useZoomerToggleStore());
    const { result } = renderHook(() => useEcdChart(mockedHookprops), {
      wrapper: ConfigsProviderWrapper,
    });

    expect(result.current.minDomain).toBeDefined();
    expect(result.current.maxDomain).toBeDefined();
    expect(result.current.data).toBeDefined();
    expect(result.current.historicalEnvelopeData).toBeDefined();
  });

  it('should return minDomain = x: 295.48598362040116, y: 0.8999 and maxDomain = 593.4700447905559, y: 1.4741 when ecdToggle is true', () => {
    const { result: ecdToggle } = renderHook(() => useZoomerToggleStore());
    act(() => {
      ecdToggle.current.toggleZoom('ecd');
    });

    const { result } = renderHook(() => useEcdChart(mockedHookprops), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.minDomain).toStrictEqual({ x: 295.48598362040116, y: 0.8999 });
    expect(result.current.maxDomain).toStrictEqual({ x: 593.4700447905559, y: 1.4741 });
  });
});
