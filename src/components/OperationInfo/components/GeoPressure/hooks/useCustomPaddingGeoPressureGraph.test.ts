import { renderHook } from '@testing-library/react';
import { mockInnerWidth } from '@dt-advisory/__mocks__/windowMock';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { useCustomPaddingGeoPressureGraph } from './useCustomPaddingGeoPressureGraph';

const screenList = [
  {
    width: 950,
    label: 'md to lg',
    expectedValue: {
      bottom: 56.88888888888889,
      left: 42.666666666666664,
      right: 42.666666666666664,
      top: 56.88888888888889,
    },
  },
  {
    width: 1400,
    label: 'lg to xl',
    expectedValue: {
      bottom: 46.22222222222222,
      left: 42.666666666666664,
      right: 37.333333333333336,
      top: 39.111111111111114,
    },
  },
  {
    width: 1600,
    label: 'xl to 2K',
    expectedValue: {
      bottom: 46.22222222222222,
      left: 42.666666666666664,
      right: 42.666666666666664,
      top: 35.55555555555556,
    },
  },
  {
    width: 2600,
    label: '2k to 4k',
    expectedValue: {
      bottom: 49.77777777777778,
      left: 42.666666666666664,
      right: 42.666666666666664,
      top: 35.55555555555556,
    },
  },
  {
    width: 3850,
    label: '4k to bigger',
    expectedValue: {
      bottom: 46.22222222222222,
      left: 42.666666666666664,
      right: 42.666666666666664,
      top: 35.55555555555556,
    },
  },
];

describe('useCustomPaddingGeoPressureGraph', () => {
  screenList.forEach(({ width, label, expectedValue }) => {
    it(`should return top = ${expectedValue.top}, bottom = ${expectedValue.bottom}, right = ${expectedValue.right} and left = ${expectedValue.left} when width is ${width} between ${label} screen size`, () => {
      mockInnerWidth(width);
      const { result } = renderHook(() => useCustomPaddingGeoPressureGraph(), {
        wrapper: ConfigsProviderWrapper,
      });
      expect(result.current).toStrictEqual(expectedValue);
    });
  });
});
