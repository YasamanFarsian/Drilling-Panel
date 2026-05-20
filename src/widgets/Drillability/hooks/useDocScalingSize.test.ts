import { renderHook } from '@testing-library/react';
import { mockInnerWidth } from '@dt-advisory/__mocks__/windowMock';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { useDocScalingSize } from './useDocScalingSize';

const screenList = [
  {
    width: 1280,
    label: 'lg to xl',
    expectedViewBox: '20 30 360 462',
  },
  {
    width: 1920,
    label: 'xl to 2k',
    expectedViewBox: '20 18 360 480',
  },
  {
    width: 2560,
    label: '2k to bigger',
    expectedViewBox: '20 25 420 472',
  },
  {
    width: 2880,
    label: '4k to bigger',
    expectedViewBox: '20 40 360 462',
  },
];

describe('useDocScalingSize', () => {
  screenList.forEach(({ width, label, expectedViewBox }) => {
    it(`should return viewBox "${expectedViewBox}" when width is ${width} (${label} screen size)`, () => {
      mockInnerWidth(width);
      const { result } = renderHook(() => useDocScalingSize(), {
        wrapper: ConfigsProviderWrapper,
      });
      expect(result.current).toBe(expectedViewBox);
    });
  });
});
