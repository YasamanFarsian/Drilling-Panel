import { renderHook } from '@testing-library/react';
import { mockInnerWidth } from '@dt-advisory/__mocks__/windowMock';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { useScalingTickSize } from './useScalingTickSize';

const screenList = [
  {
    width: 950,
    label: 'md to lg',
    expectedValue: 3,
  },
  {
    width: 1400,
    label: 'lg to xl',
    expectedValue: 4,
  },
  {
    width: 1600,
    label: 'xl to 2K',
    expectedValue: 5,
  },
  {
    width: 2600,
    label: '2k to 4k',
    expectedValue: 6,
  },
  {
    width: 3850,
    label: '4k to bigger',
    expectedValue: 10,
  },
];

describe('useScalingTickSize', () => {
  screenList.forEach(({ width, label, expectedValue }) => {
    it(`should return ${expectedValue} when width is ${width} between ${label} screen size`, () => {
      mockInnerWidth(width);
      const { result } = renderHook(() => useScalingTickSize(), {
        wrapper: ConfigsProviderWrapper,
      });
      expect(result.current).toBe(expectedValue);
    });
  });
});
