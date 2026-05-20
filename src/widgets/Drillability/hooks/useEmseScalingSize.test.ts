import { renderHook } from '@testing-library/react';
import { mockInnerWidth } from '@dt-advisory/__mocks__/windowMock';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { useEmseScalingSize } from './useEmseScalingSize';

const screenList = [
  {
    width: 1200,
    label: 'lg to xl',
    expectedViewBox: '10 35 440 520',
  },
  {
    width: 1800,
    label: 'xl to 2k',
    expectedViewBox: '20 35 380 560',
  },
  {
    width: 2200,
    label: '2k to bigger',
    expectedViewBox: '20 35 380 560',
  },
  {
    width: 2880,
    label: '4k to bigger',
    expectedViewBox: '20 25 390 562',
  },
];

describe('useEmseScalingSize', () => {
  screenList.forEach(({ width, label, expectedViewBox }) => {
    it(`should return viewBox "${expectedViewBox}" when width is ${width} (${label} screen size)`, () => {
      mockInnerWidth(width);
      const { result } = renderHook(() => useEmseScalingSize(), {
        wrapper: ConfigsProviderWrapper,
      });
      expect(result.current).toBe(expectedViewBox);
    });
  });
});
